import { Alert, Autocomplete, Box, TextField } from "@mui/material";
import { ReactNode, useContext, useMemo, useState } from "react";

import DropdownChip from "../../PackageChip";
import { Listbox } from "./Listbox";
import { stripPackageSearchPunctuation } from "../../../strings";
import { validatePackages } from "../packageValidation";
import { recipeDescriptionContext } from '../../ViewEnvironments/Drawer';
import { Package } from "../../../endpoints";

type PackageSelectParams = {
  packages: Map<string, string[]>;
  selectedPackages: Package[];
  setSelectedPackages: (packages: Package[]) => void;
};

// Displays an autocomplete box, where the option(s) selected are MUI chips,
// each with their own dropdown to display package versions.
export default function PackageSelect(props: PackageSelectParams) {
  const [recipeFilter, setRecipeFilter] = useState(""),
    [validPackages, invalidSelectedPackages, invalidSelectedVersionPackages] = useMemo(() => validatePackages(props.selectedPackages, props.packages), [props.selectedPackages]),
    selectedPackageNames = useMemo(() => validPackages.map(({ name }) => name), [validPackages]),
    selectedPackageVersions = useMemo(() => validPackages.map(({ version }) => version), [validPackages]),
    [recipeDescriptions, getRecipeDescription] = useContext(recipeDescriptionContext);

  // renderTags displays each selected autocomplete option as an MUI chip which
  // contains a dropdown, hence the custom name, DropdownChip.
  const renderTags = (tags: string[]) => {
    return tags.map((packageName, index) => <DropdownChip
      key={packageName}
      name={packageName}
      versions={props.packages.get(packageName) ?? []}
      selectedVersion={selectedPackageVersions[index] || null}
      onChange={(version) =>
        props.setSelectedPackages(
          validPackages.toSpliced(index, 1, {
            name: packageName,
            version: version || null,
          }),
        )
      }
      onDelete={() =>
        props.setSelectedPackages(validPackages.toSpliced(index, 1))
      }
      recipeDescriptions={recipeDescriptions} getRecipeDescription={getRecipeDescription}
    />);
  };

  return (
    <Box>
      <Autocomplete
        key="def"
        multiple
        openOnFocus
        disableCloseOnSelect
        disableListWrap
        options={[...props.packages.keys()]}
        filterOptions={(options, state) => {
          const inputValue = stripPackageSearchPunctuation(state.inputValue);
          return [
            ...inputValue.length >= 2 &&
              "python".startsWith(inputValue) &&
              options.includes("python") ? ["python"] : [],
            ...options.filter(element =>
              element.toLowerCase().replaceAll("-", "").startsWith(inputValue) &&
              element !== "python"
            ),
            ...options.filter(element =>
              element.toLowerCase().replaceAll("-", "").includes(inputValue) &&
              !element.toLowerCase().replaceAll("-", "").startsWith(inputValue) &&
              element !== "python"
            )
          ];
        }}
        ListboxComponent={Listbox}
        renderTags={renderTags}
        renderInput={(params) => {
          return (
            <TextField
              {...params}
              value={params.inputProps.value}
              variant="standard"
              label={props.selectedPackages.length ? "" : "Search..."}
            />
          );
        }}
        renderOption={(props, option, state) =>
          // this gets passed to Listbox's renderRow, but we have to lie about the type...
          ({ props, option, state }) as unknown as ReactNode
        }
        inputValue={recipeFilter}
        onInputChange={(e, value) => e && setRecipeFilter(value)}
        value={selectedPackageNames}
        onChange={(_, value) => {
          const prevVersions = new Map<string, string | null | undefined>();
          validPackages.forEach(({ name, version }) =>
            prevVersions.set(name, version),
          );
          props.setSelectedPackages(
            value.map((name) => ({
              name,
              version: prevVersions.get(name) ?? props.packages.get(name)![0]
            })),
          );
        }}
      />

      {invalidSelectedPackages.length > 0 ? (
        <Alert severity="error">
          These packages no longer exist: {invalidSelectedPackages.map(x => x.name).join(", ")}
        </Alert>
      ) : null}

      {
        invalidSelectedVersionPackages.length > 0 ? (
          <Alert severity="warning">
            These package versions no longer exist (the latest has been used): {invalidSelectedVersionPackages.map(x => x.name + "@" + x.version).join(", ")}
          </Alert>
        ) : null
      }
    </Box>
  );
}
