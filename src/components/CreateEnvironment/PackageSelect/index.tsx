import { Autocomplete, Box, TextField } from "@mui/material";
import { useState } from "react";
import DropdownChip from "../../PackageChip";

type PackageSelectParams = {
  packages: Map<string, string[]>;
  selectedPackages: string[];
  setSelectedPackages: (packages: string[]) => void;
}

// Displays an autocomplete box, where the option(s) selected are MUI chips,
// each with their own dropdown to display package versions.
export default function PackageSelect(props: PackageSelectParams) {
  const [lastPackage, setLastPackage] = useState<string[]>([]);
  const [activeTags, setActiveTags] = useState<string[]>([]);

  // renderTags displays each selected autocomplete option as an MUI chip which
  // contains a dropdown, hence the custom name, DropdownChip.
  const renderTags = (tags: string[]) => {
    return activeTags.map((option, index) => (
      <DropdownChip
        key={index}
        data={option}
        versions={props.packages.get(option) ?? []}
        tags={tags}
        setActiveTags={setActiveTags}
        onDelete={() => { }}
      />
    ))
  }

  // updatePackages takes the list of all packages selected on softpackWeb
  // (python and R, at time of writing) and updates with the selected package:
  // value.
  const updatePackages = (value: string[], _action: string) => {
    setActiveTags(value)
    // difference is equal to the package just selected. Because value by
    // default is all the selected packages.
    let difference = value.filter(x => lastPackage.indexOf(x) === -1);

    const allPackages = props.selectedPackages.concat(difference);
    props.setSelectedPackages(allPackages);
    setLastPackage(value);
  }

  return (
    <Box>
      <Autocomplete
        multiple
        options={[...props.packages.keys()]}
        renderTags={(tags) => {
          return (
            renderTags(tags)
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
