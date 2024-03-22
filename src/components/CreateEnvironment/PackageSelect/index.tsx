import { Alert, Autocomplete, Box, TextField } from "@mui/material";
import { ReactNode, useMemo, useState } from "react";

import { Package } from "../../../queries";
import DropdownChip from "../../PackageChip";
import { Listbox } from "./Listbox";
import { stripPackageSearchPunctuation } from "../../../strings";
import { useLocalStorage } from "@uidotdev/usehooks";

type PackageSelectParams = {
  packages: Map<string, string[]>;
  selectedPackages: Package[];
  setSelectedPackages: (packages: Package[]) => void;
  invalidSelectedPackages: Package[];
  invalidSelectedVersionPackages: Package[];
};

// Displays an autocomplete box, where the option(s) selected are MUI chips,
// each with their own dropdown to display package versions.
export default function PackageSelect(props: PackageSelectParams) {
  console.log("PackageSelect started")
  // const validSelectedPackages: Package[] = []
  // const invalidSelectedPackages: Package[] = []
  // const invalidSelectedVersionPackages: Package[] = []

  // // const [validSelectedPackages, setValidSelectedPackages] = useState<Package[]>([]);
  // // const [invalidSelectedPackages, setInvalidSelectedPackages] = useState<Package[]>([]);
  // // const [invalidSelectedVersionPackages, setInvalidSelectedVersionPackages] = useState<Package[]>([]);

  // useMemo(
  //   () => {
  //     const vsp: Package[] = []
  //     const isp: Package[] = []
  //     const isvp: Package[] = []

  //     props.clonedPackages.forEach((pkg) => {
  //       const envPkgVersions = props.packages.get(pkg.name)
  //       const validPkg: Package = { name: pkg.name, version: pkg.version }

  //       // TODO move to function with docstring
  //       if (envPkgVersions) {
  //         if (pkg.version && !(pkg.version in envPkgVersions)) {
  //           isvp.push(pkg)
  //           validPkg.version = envPkgVersions[0]
  //         }
  //         vsp.push(validPkg)
  //       } else {
  //         isp.push(pkg)
  //       }
  //     })

  //     // props.setSelectedPackages(vsp)
  //     // setValidSelectedPackages(vsp)
  //     // setInvalidSelectedPackages(isp)
  //     // setInvalidSelectedVersionPackages(isvp)
  //     console.log("set to vsp")
  //     props.setSelectedPackages(vsp)
  //   }, [props.clonedPackages],
  // );


  const selectedPackageNames = useMemo(
    () => props.selectedPackages.map(({ name }) => name),
    [props.selectedPackages],
  );
  const selectedPackageVersions = useMemo(
    () => props.selectedPackages.map(({ version }) => version),
    [props.selectedPackages],
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
            props.selectedPackages.toSpliced(index, 1, {
              name: packageName,
              version,
            }),
          )
        }
        onDelete={() =>
          props.setSelectedPackages(props.selectedPackages.toSpliced(index, 1))
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
          props.selectedPackages.forEach(({ name, version }) =>
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

      {props.invalidSelectedPackages.length > 0 ? (
        <Alert severity="error">
          These packages no longer exist: {props.invalidSelectedPackages.map(x => x.name).join(", ")}
        </Alert>
      ) : null}

      {
        props.invalidSelectedVersionPackages.length > 0 ? (
          <Alert severity="warning">
            These package versions no longer exist (the latest has been used): {props.invalidSelectedVersionPackages.map(x => x.name + "@" + x.version).join(", ")}
          </Alert>
        ) : null
      }
    </Box>
  );
}
