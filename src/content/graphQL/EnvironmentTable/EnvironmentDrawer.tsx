import { Box, Drawer } from "@mui/material";
import { useState } from "react";

function EnvironmentDrawer(props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Drawer anchor="right">
      Hello {props.name}!
    </Drawer>
  ); 
}

export default EnvironmentDrawer