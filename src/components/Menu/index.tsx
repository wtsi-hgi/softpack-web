import ConstructionIcon from "@mui/icons-material/Construction";
import HelpCenterIcon from "@mui/icons-material/HelpCenter";
import TagIcon from "@mui/icons-material/LocalOffer";
import WidgetsIcon from "@mui/icons-material/Widgets";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { NavLink } from "react-router-dom";

// Sidebar is the sidebar of the program.
const Menu = () => {
  return (
    <ButtonGroup aria-label="sidebar buttons" sx={{ marginLeft: 2, flexGrow: 1 }}>
      <Button component={NavLink} to="/about" startIcon={<HelpCenterIcon />}>
        About
      </Button>
      <Button component={NavLink} to="/environments" startIcon={<WidgetsIcon />}>
        Environments
      </Button>
      <Button component={NavLink} to="/tags" startIcon={<TagIcon />}>
        Tags
      </Button>
      <Button component={NavLink} to="/create" startIcon={<ConstructionIcon />}>
        Create Environment
      </Button>
    </ButtonGroup>
  );
};

export default Menu;
