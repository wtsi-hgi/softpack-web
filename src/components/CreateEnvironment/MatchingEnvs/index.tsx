import { useQuery } from "@apollo/client";
import { Box, Typography } from "@mui/material";

import { ALL_ENVIRONMENTS, Package } from "../../../queries";
import EnvironmentTable from "../../ViewEnvironments/EnvironmentTable";
import { anyPackageVersion } from "../packageValidation";

type MatchingEnvsParams = {
  selectedPackages: Package[];
  envBuildInFlight: boolean;
  runEnvironmentBuild: () => void;
};

// matchingEnvs is a hardcoded table that shows an illustration of what the
// program should look like, as it informs users in real-time that they
// environment they are trying to create already exists.
export default function matchingEnvs(props: MatchingEnvsParams) {
  const { loading, data, error } = useQuery(ALL_ENVIRONMENTS);

  if (loading) {
    return <div>...</div>;
  }
  if (error) {
    return "error";
  }

  const matchingEnvironments = data!.environments.filter((e) =>
    props.selectedPackages.every((pkg) =>
      e.packages.some(
        (envPkg) =>
          pkg.name === envPkg.name &&
          (!pkg.version || pkg.version === envPkg.version || pkg.version === anyPackageVersion),
      ),
    ),
  );

  return (
    <>
      {matchingEnvironments.length > 0 ? (
        <>
          <Box>
            <Typography variant="subtitle1" gutterBottom>
              Use one of these existing, matching, environments:
            </Typography>
          </Box>
          <EnvironmentTable
            environments={matchingEnvironments}
            highlightPackages={props.selectedPackages}
          />
          <Typography variant="subtitle1" gutterBottom align="right">
            Or, create a new environment:
          </Typography>
        </>
      ) : null}
    </>
  );
}
