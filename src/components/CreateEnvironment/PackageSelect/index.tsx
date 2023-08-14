import { Autocomplete, Box, TextField } from "@mui/material";
import { useEffect, useState, useContext } from "react";
import DropdownChip from "../../PackageChip";
import { PackageContext } from "../PackageContext";
import _ from 'lodash';

// Displays an autocomplete box, where the option(s) selected are MUI chips,
// each with their own dropdown to display package versions.
export default function PackageSelect(props: any) {
  const packageContext = useContext(PackageContext);

  const [packages, setPackages] = useState([]);
  const [activeTags, setActiveTags] = useState(['']);

  console.log('activeTags', activeTags);

  // Parse package names from data.
  useEffect(() => {
    const packages = props.data.map((item: any) => item.name);
    setPackages(packages)
  }, [props.data])

  // findPackageVersionsFromName finds all available versions of a package.
  const findPackageVersionsFromName = (names: string[]) => {
    var versions: string[] = [];

    names.map((name) => {
      const index = props.data.findIndex(
        (element: any) => element.name === name
      );
      const packageVersions = props.data[index].versions;
      versions.push(packageVersions);
    })

    return versions;
  }

  const onDelete = (data: any) => {
    console.log('trying to delete', data, 'from', activeTags);
    const result = activeTags.filter((tag) => tag !== data);
    console.log('result', result);
    setActiveTags(result);
    //setActiveTags((prevActiveTags) => 
    //  prevActiveTags.filter((tag) => {
    //    console.log(tag)
    //    tag !== data
    //  })
    //)

    console.log('state now', activeTags);
  }

  // renderTags displays each selected autocomplete option as an MUI chip which
  // contains a dropdown, hence the custom name, DropdownChip.
  const renderTags = (tags: string[]) => {
    setActiveTags(tags)
    const packageVersions = findPackageVersionsFromName(tags);

    return activeTags.map((option: any, index: any) => ( 
      <DropdownChip 
        key={index}
        data={option}
        versions={packageVersions[index]}
        tags={tags}
        activeTags={activeTags}
        setActiveTags={setActiveTags}
        onDelete={onDelete}
      />
    ))
  }

  // updatePackages takes the list of all packages selected on softpackWeb
  // (python and R, at time of writing) and updates with the selected package:
  // value.
  const updatePackages = (event: any, value: string[], action: string) => {
    const package_ = event.target.textContent;
    console.log('value', value, action);

    if (action === "selectOption") {
      addPackage(package_);
    }

    // This line needs redressing: it's upholding the functionality of
    // findPackageVersionsFromName, which is unsustainable.
    console.log('doing stuff');
    setActiveTags(value);
  }

  const addPackage = (package_: string[]) => {
    const result = packageContext.testPackages.concat(package_);
    console.log('result', result);
    packageContext.setTestPackages(result);
    
    console.log(packageContext.testPackages)
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
          
          console.log('what is tag value', tags)
          return (
            renderTags(tags)
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
        //onChange={(event, value, action) => updatePackages(event, value, action)}
      />
    </Box>
  );
}
