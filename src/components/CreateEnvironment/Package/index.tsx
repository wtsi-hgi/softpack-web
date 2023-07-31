import { Autocomplete, Box, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import DropdownChip from "../../DropdownChip";

// Displays an autocomplete box, where the option(s) selected are MUI chips,
// each with their own dropdown to display package versions.
function Package(props: any) {
  const [packages, setPackages] = useState([]);

  // Parse package names from data.
  useEffect(() => {
    const packages = props.packages.map((item: any) => item.name);
    setPackages(packages)
  })

  // findPackageVersionsFromName finds all available versions of a package.
  const findPackageVersionsFromName = (names: string[]) => {
    var versions: string[] = [];

    names.map((name) => {
      const index = props.packages.findIndex((element: any) => element.name === name);
      const packageVersions = props.packages[index].versions;
      versions.push(packageVersions);
    })

    return versions;
  }

  // renderTags displays each selected autocomplete option as an MUI chip which
  // contains a dropdown, hence the custom name, DropdownChip.
  const renderTags = (value: any) => {
    const packageVersions = findPackageVersionsFromName(value);

    return value.map((option: any, index: any) => (
      <DropdownChip 
        key={index}
        data={option}
        versions={packageVersions[index]}
      />
    ))
  }
  
  return (
    <Box> 
      <Autocomplete
        multiple
        options={packages}
        renderTags={renderTags}
        renderInput={(params) => {
          return (
            <TextField
              {...params}
              variant="standard"
            />
          );
        }}
        onChange={(_, value) => props.setPackages(value)}
      />
    </Box>
  );
}

export default Package;