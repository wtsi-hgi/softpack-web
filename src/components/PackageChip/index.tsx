import { Chip, Menu, MenuItem } from "@mui/material";
import { useContext, useState } from "react";
import CancelIcon from '@mui/icons-material/Cancel';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { PackageContext } from "../CreateEnvironment/PackageContext";

// DropdownChip is an MUI chip that comes with a dropdown.
function DropdownChip(props: any) {
  const packageContext = useContext(PackageContext);
  
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [version, setVersion] = useState(null);

  const handleDelete = (tagToDelete: any) => {
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
  }
  
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
    setOpen(!open);
  };

  const handleClose = (event: any, index: any) => {
    // Check if index is 0 (as this refers to the latest version of the 
    // package) to decide whether or not to update label name; no need to 
    // update if user has selected latest version, as all packages are 
    // implicitly their latest version.

    if (index == 0) {
      setVersion(null);
    } else {
      setVersion(event.target.textContent);
    }

    setAnchorEl(null);
    setOpen(!open);
  };

  return (
    <div>
      <Chip
        label={version ? props.data + ' (' + version + ')' : props.data}
        onClick={handleClick}
        deleteIcon={<CancelIcon />}
        avatar={open ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
        onDelete={() => props.onDelete(props.data)}
        sx={{m:'3px'}}
      />
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      > 
        {props.versions.map((version: any, index: any) => {
          return (
            <MenuItem
              key={index}
              component="a"
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => handleClose(e, index)}
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