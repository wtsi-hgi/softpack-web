import { Autocomplete, Box, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import DropdownChip from "../../PackageChip";

type PackageSelectParams = {
  data: {
    name: string;
    versions: string[];
  }[];
  packages: string[];
  setPackages: (packages: string[]) => void;
}

// Displays an autocomplete box, where the option(s) selected are MUI chips,
// each with their own dropdown to display package versions.
export default function PackageSelect(props: PackageSelectParams) {
  const [packages, setPackages] = useState<string[]>([]);
  const [lastPackage, setLastPackage] = useState<string[]>([]);
  const [activeTags, setActiveTags] = useState<string[]>([]);

  // Parse package names from data.
  useEffect(() => {
    const packages = props.data.map(item => item.name);
    setPackages(packages)
  }, [props.data])

  // findPackageVersionsFromName finds all available versions of a package.
  const findPackageVersionsFromName = (names: string[]) => {
    var versions: string[][] = [];

    names.forEach((name) => {
      const index = props.data.findIndex(element => element.name === name);
      const packageVersions = props.data[index].versions;
      versions.push(packageVersions);
    })

    return versions;
  }

  // renderTags displays each selected autocomplete option as an MUI chip which
  // contains a dropdown, hence the custom name, DropdownChip.
  const renderTags = (tags: string[]) => {
    const packageVersions = findPackageVersionsFromName(tags);

    return activeTags.map((option, index) => (
      <DropdownChip
        key={index}
        data={option}
        versions={packageVersions[index]}
        tags={tags}
        setActiveTags={setActiveTags}
        onDelete={() => { }}
      />
    ))
  }

  console.log('active tags', activeTags);

  // updatePackages takes the list of all packages selected on softpackWeb
  // (python and R, at time of writing) and updates with the selected package:
  // value.
  const updatePackages = (value: string[], action: string) => {
    // difference is equal to the package just selected. Because value by
    // default is all the selected packages.
    let difference = value.filter(x => lastPackage.indexOf(x) === -1);
    console.log('difference', difference);
    console.log('action', action);

    const allPackages = props.packages.concat(difference);
    props.setPackages(allPackages);
    setLastPackage(value);
    console.log('allPackages', allPackages);
  }

  return (
    <Box>
      <Autocomplete
        multiple
        options={packages}
        renderTags={(tags) => {
          setActiveTags(tags)

          return (
            renderTags(activeTags)
          )
        }}
        renderInput={(params) => {
          return (
            <TextField
              {...params}
              variant="standard"
              label={activeTags.length ? "" : "Search..."}
            />
          );
        }}
        onChange={(_, value, action) => updatePackages(value, action)}
      />
    </Box>
  );
}
