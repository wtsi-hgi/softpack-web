import { Autocomplete, Box, TextField } from "@mui/material";
import DropdownChip from "../../PackageChip";
import { Package } from "../../../queries";
import { ReactNode, useMemo } from "react";
import { Listbox } from "./Listbox";

type PackageSelectParams = {
  packages: Map<string, string[]>;
  selectedPackages: Package[];
  setSelectedPackages: (packages: Package[]) => void;
}

// Displays an autocomplete box, where the option(s) selected are MUI chips,
// each with their own dropdown to display package versions.
export default function PackageSelect(props: PackageSelectParams) {
  const selectedPackageNames = useMemo(() => props.selectedPackages.map(({ name }) => name), [props.selectedPackages]);
  const selectedPackageVersions = useMemo(() => props.selectedPackages.map(({ version }) => version), [props.selectedPackages]);

  // renderTags displays each selected autocomplete option as an MUI chip which
  // contains a dropdown, hence the custom name, DropdownChip.
  const renderTags = (tags: string[]) => {
    return tags.map((packageName, index) => (
      <DropdownChip
        key={packageName}
        name={packageName}
        versions={props.packages.get(packageName) ?? []}
        selectedVersion={selectedPackageVersions[index]}
        onChange={version => props.setSelectedPackages(props.selectedPackages.toSpliced(index, 1, { name: packageName, version }))}
        onDelete={() => props.setSelectedPackages(props.selectedPackages.toSpliced(index, 1))}
      />
    ))
  }

  return (
    <Box>
      <Autocomplete
        multiple
        disableCloseOnSelect
        disableListWrap
        options={[...props.packages.keys()]}
        ListboxComponent={Listbox}
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
        renderOption={(props, option, state) => (
          // this gets passed to Listbox's renderRow, but we have to lie about the type...
          { props, option, state } as unknown as ReactNode
        )}
        value={selectedPackageNames}
        onChange={(_, value) => {
          const prevVersions = new Map<string, string | null>();
          props.selectedPackages.forEach(({ name, version }) => prevVersions.set(name, version))
          props.setSelectedPackages(value.map(name => ({
            name,
            version: prevVersions.get(name) ?? null,
          })))
        }}
      />
    </Box>
  );
}
