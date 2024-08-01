import ConstructionIcon from "@mui/icons-material/Construction";
import HelpCenterIcon from "@mui/icons-material/HelpCenter";
import TagIcon from "@mui/icons-material/LocalOffer";
import WidgetsIcon from "@mui/icons-material/Widgets";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import { NavLink } from "react-router-dom";

const drawerWidth = 240;

// Sidebar is the sidebar of the program.
const Sidebar = () => {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        position: 'sticky',
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: "border-box" },
      }}
    >
      <Toolbar />
      <List component="nav" sx={{ p: 0 }}>
        <ListItemButton component={NavLink} to={"/about"}>
          <ListItemIcon>
            <HelpCenterIcon />
          </ListItemIcon>
          <ListItemText primary="About" />
        </ListItemButton>
        <ListItemButton component={NavLink} to={"/environments"}>
          <ListItemIcon>
            <WidgetsIcon />
          </ListItemIcon>
          <ListItemText primary="Environments" />
        </ListItemButton>
        <ListItemButton component={NavLink} to={"/tags"}>
          <ListItemIcon>
            <TagIcon />
          </ListItemIcon>
          <ListItemText primary="Tags" />
        </ListItemButton>
        <ListItemButton component={NavLink} to={"/create"}>
          <ListItemIcon>
            <ConstructionIcon />
          </ListItemIcon>
          <ListItemText primary="Create Environment" />
        </ListItemButton>
      </List>
    </Drawer>
  );
};

export default Sidebar;
