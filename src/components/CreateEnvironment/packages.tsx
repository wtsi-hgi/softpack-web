import { Autocomplete, Box, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import DropdownChip from "../DropdownChip";

function Packages(props: any) {
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    const packages = props.packages.map((item: any) => item.name);
    setPackages(packages)
  })

  const findPackageVersionsFromName = (names: string[]) => {
    var versions: string[] = [];

    names.map((name) => {
      const index = props.packages.findIndex((element: any) => element.name === name);
      const packageVersions = props.packages[index].versions;
      versions.push(packageVersions);
    })

    return versions;
  }

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
      />
    </Box>
  );
}

export default Packages;