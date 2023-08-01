import { Autocomplete, Box, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import DropdownChip from "../../DropdownChip";

// Displays an autocomplete box, where the option(s) selected are MUI chips,
// each with their own dropdown to display package versions.
function Package(props: any) {
  const [packages, setPackages] = useState([]);

  // Parse package names from data.
  useEffect(() => {
    const packages = props.data.map((item: any) => item.name);
    setPackages(packages)
  }, [props.data])

  // findPackageVersionsFromName finds all available versions of a package.
  const findPackageVersionsFromName = (names: string[]) => {
    var versions: string[] = [];

    names.map((name) => {
      const index = props.data.findIndex((element: any) => element.name === name);
      const packageVersions = props.data[index].versions;
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

  // updatePackages takes the list of all packages selected on softpackWeb
  // (python and R, at time of writing) and updates with the selected package:
  // value.
  const updatePackages = (value: string[]) => {
    const allPackages = props.packages.concat(value);
    props.setPackages(allPackages);
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
        onChange={(_, value) => updatePackages(value)}
      />
    </Box>
  );
}

export default Package;