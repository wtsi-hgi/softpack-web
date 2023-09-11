import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CreateIcon from '@mui/icons-material/Create';
import Toolbar from '@mui/material/Toolbar';
import { NavLink } from 'react-router-dom';
import WidgetsIcon from '@mui/icons-material/Widgets';
import { Typography } from '@mui/material';

const drawerWidth = 240;

// Sidebar is the sidebar of the program.
const Sidebar = () => {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
      }}
    >
      <Toolbar>
        <Typography
          variant="h2"
          sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >SoftPack</Typography>
      </Toolbar>

      <List component="nav" sx={{ p: 0 }}>
        <ListItemButton component={NavLink} to={'/'}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItemButton>
        <ListItemButton component={NavLink} to={'/environments'}>
          <ListItemIcon>
            <WidgetsIcon />
          </ListItemIcon>
          <ListItemText primary="Environments" />
        </ListItemButton>
        <ListItemButton component={NavLink} to={'/create'}>
          <ListItemIcon>
            <CreateIcon />
          </ListItemIcon>
          <ListItemText primary="Create Environment" />
        </ListItemButton>
        <Divider />
        <ListItemButton component={NavLink} to={'settings'}>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItemButton>
      </List>
    </Drawer>
  );
};

export default Sidebar;
