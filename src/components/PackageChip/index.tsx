import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
//import { useContext } from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import { Chip, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import { anyPackageVersion } from "../CreateEnvironment/packageValidation";

//import { PackageContext } from "../CreateEnvironment/PackageContext";

type DropdownChipParams = {
  name: string;
  versions: string[];
  selectedVersion: string | null | undefined;
  onChange: (version: string | null) => void;
  onDelete: () => void;
};

// DropdownChip is an MUI chip that comes with a dropdown. It is used to display
// a package, and when clicked, displays the versions the package can come in.
function DropdownChip(props: DropdownChipParams) {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);

  const handleClose = (target: HTMLElement) => {
    if (target.textContent != "") {
      props.onChange(target.textContent);
    }

    setAnchorEl(null);
    setOpen(!open);
  };

  return (
    <div>
      <Chip
        label={
          props.selectedVersion
            ? `${props.name} (${props.selectedVersion})`
            : props.name
        }
        onClick={(event) => {
          setAnchorEl(event.currentTarget);
          setOpen(!open);
        }}
        deleteIcon={<CancelIcon />}
        avatar={open ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
        onDelete={props.onDelete}
      />
      <Menu
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={(e: { target: HTMLElement }) => handleClose(e.target)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        {props.versions.map((version, index) => {
          return (
            <MenuItem
              key={index}
              component="a"
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => handleClose(e.target as HTMLElement)}
            >
              {version || anyPackageVersion}
            </MenuItem>
          );
        })}
      </Menu>
    </div>
  );
}

export default DropdownChip;
