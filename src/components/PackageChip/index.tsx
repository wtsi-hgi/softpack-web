import { Chip, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
//import { useContext } from "react";
import CancelIcon from '@mui/icons-material/Cancel';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
//import { PackageContext } from "../CreateEnvironment/PackageContext";

type DropdownChipParams = {
  data: string;
  onDelete: (d: string) => void;
  versions: string[];
  tags: string[];
  setActiveTags: (tags: string[]) => void;
}

// DropdownChip is an MUI chip that comes with a dropdown. It is used to display
// a package, and when clicked, displays the versions the package can come in.
function DropdownChip(props: DropdownChipParams) {
  //const packageContext = useContext(PackageContext);

  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);
  const [version, setVersion] = useState<string | null>(null);

  // handleDelete is currently being worked upon 16/08/23
  {/*const handleDelete = (tagToDelete: string) => {
    console.log('delete attempt on', tagToDelete);

    console.log('packages', packageContext.testPackages);
    console.log('tags', props.activeTags);
    
    const newPackages = packageContext.testPackages.filter(
      (package_: string) => package_ !== tagToDelete);

    const newTags = props.activeTags.filter(
      (package_: string) => package_ !== tagToDelete);

    console.log('newPackages', newPackages);
    console.log('newTags', newTags);
    
    packageContext.setTestPackages(newPackages);
    props.setActiveTags(newTags);
    console.log(packageContext.testPackages);
  }*/}

  const handleClose = (target: HTMLElement, index: number) => {
    // Check if index is 0 (as this refers to the latest version of the 
    // package) to decide whether or not to update label name; no need to 
    // update if user has selected latest version, as all packages are 
    // implicitly their latest version.

    if (index == 0) {
      setVersion(null);
    } else if (index > 0) {
      setVersion(target.textContent);
    }

    setAnchorEl(null);
    setOpen(!open);
  };

  return (
    <div>
      <Chip
        label={version ? props.data + ' (' + version + ')' : props.data}
        onClick={event => {
          setAnchorEl(event.currentTarget);
          setOpen(!open);
        }}
        deleteIcon={<CancelIcon />}
        avatar={open ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
        onDelete={() => props.onDelete(props.data)}
        sx={{ m: '3px' }}
      />
      <Menu
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={(e: { target: HTMLElement }) => handleClose(e.target, -1)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        {props.versions.map((version, index) => {
          return (
            <MenuItem
              key={index}
              component="a"
              target="_blank"
              rel="noopener noreferrer"
              onClick={e => handleClose(e.target as HTMLElement, index)}
            >
              {version}
            </MenuItem>
          )
        })}
      </Menu>
    </div>
  );
}

export default DropdownChip;