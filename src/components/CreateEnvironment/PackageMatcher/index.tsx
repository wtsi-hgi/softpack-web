import { useState } from 'react';
import { Box, Button, Grid } from "@mui/material";

import { Package } from "../../../queries";
import { HelpIcon } from "../../HelpIcon";
import MatchingEnvs from "../MatchingEnvs";
import PackageSelect from "../PackageSelect";
import EnvironmentDrawer from "../../ViewEnvironments/Drawer";
import type { Environment as EnvironmentType } from "../../../queries";

type PackageMatcherParams = {
  packages: Map<string, string[]>;
  selectedPackages: Package[];
  setSelectedPackages: (packages: Package[]) => void;
  runEnvironmentBuild: () => void;
  envBuildInFlight: boolean;
};

// PackageMatcher is the component responsible for letting the user select
// packages to build the environment with, and suggesting existing environments
// that they may be able to use instead.
function PackageMatcher(props: PackageMatcherParams) {
  const [selectedEnv, setSelectedEnv] = useState<EnvironmentType | null>(null)

  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={4} md={3} textAlign={{ sm: "right" }}>
          <Box pr={3} pt={1} pb={3} display="flex" justifyContent="flex-end">
            Packages:
            <HelpIcon title="Search for packages to include in your environment. Packages come with the latest version by default. If you wish to change to an older version, click the package to select which one." />
          </Box>
        </Grid>
        <Grid item xs={12} sm={8} md={9}>
          <Box sx={{ width: "75%" }}>
            <PackageSelect
              packages={props.packages}
              selectedPackages={props.selectedPackages}
              setSelectedPackages={props.setSelectedPackages}
            />
          </Box>
          <Button disabled={!props.selectedPackages.some(p => p.version)} onClick={() => props.setSelectedPackages(props.selectedPackages.map(p => {
		if (!p.name.startsWith("*")) {
			p.version = null;
		}

		return  p;
	  }))}>Reset Versions</Button>
        </Grid>
      </Grid>
      {props.selectedPackages.length > 0 && <>
        <MatchingEnvs
          selectedPackages={props.selectedPackages}
          runEnvironmentBuild={props.runEnvironmentBuild}
          envBuildInFlight={props.envBuildInFlight}
	  setSelectedEnv={setSelectedEnv}
        />
        <EnvironmentDrawer
          env={selectedEnv!}
          open={!!selectedEnv}
          onClose={() => setSelectedEnv(null)}
        />
      </>}
    </>
  );
}

export default PackageMatcher;
