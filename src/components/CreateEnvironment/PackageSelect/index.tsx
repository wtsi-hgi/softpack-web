import { Autocomplete, Box, TextField } from "@mui/material";
import DropdownChip from "../../PackageChip";

type PackageSelectParams = {
  packages: Map<string, string[]>;
  selectedPackages: string[];
  setSelectedPackages: (packages: string[]) => void;
}

// Displays an autocomplete box, where the option(s) selected are MUI chips,
// each with their own dropdown to display package versions.
export default function PackageSelect(props: PackageSelectParams) {
  // renderTags displays each selected autocomplete option as an MUI chip which
  // contains a dropdown, hence the custom name, DropdownChip.
  const renderTags = (tags: string[]) => {
    return tags.map((packageName, index) => (
      <DropdownChip
        key={index}
        data={packageName}
        versions={props.packages.get(packageName) ?? []}
        tags={tags}
        setActiveTags={props.setSelectedPackages}
        onDelete={() => props.setSelectedPackages(props.selectedPackages.toSpliced(index, 1))}
      />
    ))
  }

  return (
    <Box>
      <Autocomplete
        multiple
        disableCloseOnSelect
        options={[...props.packages.keys()]}
        renderTags={renderTags}
        renderInput={(params) => {
          return (
            <TextField
              {...params}
              variant="standard"
              label={props.selectedPackages.length ? "" : "Search..."}
            />
          );
        }}
        value={props.selectedPackages}
        onChange={(_, value) => props.setSelectedPackages(value)}
      />
    </Box>
  );
}
