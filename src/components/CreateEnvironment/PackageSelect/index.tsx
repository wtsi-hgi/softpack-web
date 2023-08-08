import { Autocomplete, Box, TextField } from "@mui/material";
import { useEffect, useState, useContext } from "react";
import DropdownChip from "../../PackageChip";
import { PackageContext } from "../PackageContext";
import _ from 'lodash';

// Displays an autocomplete box, where the option(s) selected are MUI chips,
// each with their own dropdown to display package versions.
export default function PackageSelect(props: any) {
  const [packages, setPackages] = useState([]);
  const [lastPackage, setLastPackage] = useState(['']);
  const [activeTags, setActiveTags] = useState(['']);

  const packageContext = useContext(PackageContext);

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
  const renderTags = (tags: string[]) => {
    const packageVersions = findPackageVersionsFromName(tags);

    return activeTags.map((option: any, index: any) => ( 
      <DropdownChip 
        key={index}
        data={option}
        versions={packageVersions[index]}
        tags={tags}
        setActiveTags={setActiveTags}
      />
    ))
  }

  // updatePackages takes the list of all packages selected on softpackWeb
  // (python and R, at time of writing) and updates with the selected package:
  // value.
  const updatePackages = (value: string[], action: string) => {
    console.log('context from PackageSelect', packageContext?.testPackages);
    // difference is equal to the package just selected.
    console.log('updatePackages value:', value);
    setActiveTags(value);

    let difference = value.filter(x => lastPackage.indexOf(x) === -1);
    console.log('difference', difference);
    console.log('action', action);
    
    const allPackages = props.packages.concat(difference);    
    props.setPackages(allPackages);
    packageContext?.setTestPackages(allPackages)
    setLastPackage(value);
    console.log('allPackages', allPackages);
  }

  // checkActiveTagsValue determines whether the value of activeTags is its
  // default [''].
  const checkActiveTagsValue = () => {
    const defaultValue = ['']
    return _.isEqual(activeTags, defaultValue)
  }

  return (
    <Box>
      <Autocomplete
        multiple
        options={packages}
        renderTags={(tags) => {
          //setActiveTags(tags)

          return (
            renderTags(activeTags)
          )
        }}
        renderInput={(params) => {
          return (
            <TextField
              {...params}
              variant="standard"
              label={checkActiveTagsValue() ? "Search..." : ""}
            />
          );
        }}
        onChange={(_, value, action) => updatePackages(value, action)}
      />
    </Box>
  );
}
