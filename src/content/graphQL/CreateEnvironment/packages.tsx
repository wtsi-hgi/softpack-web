import { useQuery } from "@apollo/client";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Autocomplete, Box, Tab, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import ChipDropdown from "src/components/ChipDropdown";

function Packages(props) {
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    const packages = props.packages.map(item => item.name);
    setPackages(packages)
  })

  const findPackageVersionsFromName = (names: string[]) => {
    var versions = [];

    names.map((name) => {
      const index = props.packages.findIndex((element) => element.name === name);
      const packageVersions = props.packages[index].versions;
      versions.push(packageVersions);
    })

    return versions;
  }

  const renderTags = (value) => {
    const packageVersions = findPackageVersionsFromName(value);

    return value.map((option, index) => (
      <ChipDropdown 
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