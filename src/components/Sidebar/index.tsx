import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
<<<<<<< HEAD
import CreateIcon from '@mui/icons-material/Create';
import Toolbar from '@mui/material/Toolbar';
import { NavLink } from 'react-router-dom';
import WidgetsIcon from '@mui/icons-material/Widgets';
import { Typography } from '@mui/material';
=======
import Toolbar from '@mui/material/Toolbar';
import { NavLink } from 'react-router-dom';
import WidgetsIcon from '@mui/icons-material/Widgets';
>>>>>>> 2ce8933 (:sparkles: React admin template)

const drawerWidth = 240;

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
<<<<<<< HEAD
      <Toolbar >
        <Typography 
          variant="h2" 
          sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >SoftPack</Typography>
      </Toolbar>
      
      <List component="nav" sx={{ p: 0 }}>
=======
      <Toolbar />
      <List component="nav">
>>>>>>> 2ce8933 (:sparkles: React admin template)
        <ListItemButton component={NavLink} to={'/'}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItemButton>
<<<<<<< HEAD
        <ListItemButton component={NavLink} to={'/environments'}>
=======
        <ListItemButton component={NavLink} to={'/'}>
>>>>>>> 2ce8933 (:sparkles: React admin template)
          <ListItemIcon>
            <WidgetsIcon />
          </ListItemIcon>
          <ListItemText primary="Environments" />
        </ListItemButton>
<<<<<<< HEAD
        <ListItemButton component={NavLink} to={'/create'}>
          <ListItemIcon>
            <CreateIcon />
          </ListItemIcon>
          <ListItemText primary="Create Environment" />
        </ListItemButton>
=======
>>>>>>> 2ce8933 (:sparkles: React admin template)
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
