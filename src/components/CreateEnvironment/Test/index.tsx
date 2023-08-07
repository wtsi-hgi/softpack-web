import { Box } from "@mui/material";
import { useContext } from "react";
import { PackageContext } from "../PackageContext";

export default function Test() {
  const packages = useContext(PackageContext);

  const single = ['py-abc'];
  packages?.setPackages(single)

  return (
    <Box>
      <Box>Hello from test</Box>
      {packages?.packages?.map((package_) => {
        return (
          <Box>This is package {package_}</Box>
        );
      })}
      
    </Box>
  )
}
