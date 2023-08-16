import { Box } from "@mui/material";
import { useContext } from "react";
import { PackageContext } from "../PackageContext";

export default function Test() {
  const packages = useContext(PackageContext);

  return (
    <Box>
      <Box>Hello from test</Box>
      {packages?.testPackages?.map((package_) => {
        return (
          <Box>This is package {package_}</Box>
        );
      })}
    </Box>
  )
}
