import { Box } from "@mui/material";
import { useContext } from "react";
import { PackageContext } from "../PackageContext";

export default function Test() {
  const packages = useContext(PackageContext);

  const single = ['py-abc'];
  //packages?.setTestPackages(single)
  //packages?.setTestPackages(['single', 'double'])

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
