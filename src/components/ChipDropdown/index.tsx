import { Chip, Menu, MenuItem, makeStyles } from "@mui/material";
import { useState } from "react";
import CancelIcon from '@mui/icons-material/Cancel';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

function ChipDropdown(props) {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

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
        sx={{m:'0 3px 0 3px'}}
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
        <MenuItem
          component="a"
          href="https://example.com/link2"
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleClose}
        >
          Dropdown Link 2
        </MenuItem>
        <MenuItem
          component="a"
          href="https://example.com/link3"
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleClose}
        >
          Dropdown Link 3
        </MenuItem>
      </Menu>
    </div>
  );
}

export default ChipDropdown;
