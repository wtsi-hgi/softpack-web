import { Box, Drawer, Typography } from "@mui/material";
import { useState } from "react";

function EnvironmentDrawer(props) {
  const [isOpen, setIsOpen] = useState(true);

  console.log(props);

  return (
    <Drawer anchor="right" open={isOpen} onClose={(e) => setIsOpen(false)}>
      <Typography>Hello {props.name}!</Typography>
    </Drawer>
  ); 
}

export default EnvironmentDrawer