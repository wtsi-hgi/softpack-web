import { Chip, Menu, MenuItem, makeStyles } from "@mui/material";
import { useState } from "react";
import CancelIcon from '@mui/icons-material/Cancel';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

function ChipDropdown(props) {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  console.log('chip props', props);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(!open);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpen(!open);
  };

  return (
    <div>
      <Chip
        label={props.data}
        onClick={handleClick}
        deleteIcon={<CancelIcon />}
        avatar={open ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
        onDelete={(e) => console.log('delete attempt')}
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
        {props.versions.map((version, index) => {
          return (
            <MenuItem
              key={index}
              component="a"
              href="https://example.com/link"
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleClose}
            >
              {version}
            </MenuItem>
          )
        })}       
      </Menu>
    </div>
  );
}

export default ChipDropdown;
