import { Alert, Autocomplete, Box, TextField } from "@mui/material";
import { ReactNode, useMemo } from "react";

import { Package } from "../../../queries";
import DropdownChip from "../../PackageChip";
import { Listbox } from "./Listbox";
import { stripPackageSearchPunctuation } from "../../../strings";
import { useLocalStorage } from "@uidotdev/usehooks";
import { validatePackages } from "../packageValidation";

type PackageSelectParams = {
  packages: Map<string, string[]>;
  selectedPackages: Package[];
  setSelectedPackages: (packages: Package[]) => void;
};

// Displays an autocomplete box, where the option(s) selected are MUI chips,
// each with their own dropdown to display package versions.
export default function PackageSelect(props: PackageSelectParams) {
  const validPackages: Package[] = []
  const invalidSelectedPackages: Package[] = []
  const invalidSelectedVersionPackages: Package[] = []

  useMemo(
    () => {
      validPackages.length = 0;
      const validated = validatePackages(props.selectedPackages, props.packages)
      validPackages.push(...validated[0])
      invalidSelectedPackages.push(...validated[1])
      invalidSelectedVersionPackages.push(...validated[2])
    },
    [props.selectedPackages],
  );

  const selectedPackageNames = useMemo(
    () => validPackages.map(({ name }) => name),
    [validPackages],
  );
  const selectedPackageVersions = useMemo(
    () => validPackages.map(({ version }) => version),
    [validPackages],
  );

  // renderTags displays each selected autocomplete option as an MUI chip which
  // contains a dropdown, hence the custom name, DropdownChip.
  const renderTags = (tags: string[]) => {
    return tags.map((packageName, index) => (
      <DropdownChip
        key={packageName}
        name={packageName}
        versions={props.packages.get(packageName) ?? []}
        selectedVersion={selectedPackageVersions[index]}
        onChange={(version) =>
          props.setSelectedPackages(
            validPackages.toSpliced(index, 1, {
              name: packageName,
              version,
            }),
          )
        }
        onDelete={() =>
          props.setSelectedPackages(validPackages.toSpliced(index, 1))
        }
      />
    ));
  };

  return (
    <Box>
      <Autocomplete
        multiple
        openOnFocus
        disableCloseOnSelect
        disableListWrap
        options={[...props.packages.keys()]}
        filterOptions={(options, state) => {
          let newOptions: string[] = [];
          options.forEach((element) => {
            if (
              element
                .toLowerCase()
                .replace("-", "")
                .includes(stripPackageSearchPunctuation(state.inputValue))
            )
              newOptions.push(element);
          });
          return newOptions;
        }}
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
        renderOption={(props, option, state) =>
          // this gets passed to Listbox's renderRow, but we have to lie about the type...
          ({ props, option, state }) as unknown as ReactNode
        }
        value={selectedPackageNames}
        onChange={(_, value) => {
          const prevVersions = new Map<string, string | null | undefined>();
          validPackages.forEach(({ name, version }) =>
            prevVersions.set(name, version),
          );
          props.setSelectedPackages(
            value.map((name) => ({
              name,
              version: prevVersions.get(name) ?? null,
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
