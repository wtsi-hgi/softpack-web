import { Chip, Menu, MenuItem, makeStyles } from "@mui/material";
import { useState } from "react";
import CancelIcon from '@mui/icons-material/Cancel';
import MoreVertIcon from '@mui/icons-material/MoreVert';

function CustomChip(props) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = () => {
    // Handle menu item click action
    handleClose();
  };

  return (
    <div>
      <Chip
        label={props.name}
        onClick={handleClick}
        deleteIcon={<CancelIcon />}
        avatar={<MoreVertIcon />}
        onDelete={(e) => console.log('delete attempt')}
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
          href="https://example.com/link1"
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleClose}
        >
          Dropdown Link 1
        </MenuItem>
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

export default CustomChip;