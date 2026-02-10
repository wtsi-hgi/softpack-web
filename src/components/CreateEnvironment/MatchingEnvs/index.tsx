import { Box, Typography } from "@mui/material";
import EnvironmentTable from "../../ViewEnvironments/EnvironmentTable";
import { anyPackageVersion } from "../packageValidation";
import { useContext } from "react";
import { BuildStatusContext, Environment, EnvironmentsContext, Package } from "../../../endpoints";

type MatchingEnvsParams = {
  selectedPackages: Package[];
  envBuildInFlight: boolean;
  runEnvironmentBuild: () => void;
  setSelectedEnv: (v: Environment) => void;
};

// matchingEnvs is a hardcoded table that shows an illustration of what the
// program should look like, as it informs users in real-time that they
// environment they are trying to create already exists.
export default function matchingEnvs(props: MatchingEnvsParams) {
  const [data] = useContext(EnvironmentsContext);
  const buildStatuses = useContext(BuildStatusContext);

  if (data.data.length === 0) {
    return <></>;
  }
  if (data.error) {
    return data.error;
  }

  const matchingEnvironments = data.data.filter((e) =>
    props.selectedPackages.every((pkg) =>
      e.packages.some(
        envPkg =>
          pkg.name === envPkg.name &&
          (!pkg.version || pkg.version === envPkg.version || pkg.version === anyPackageVersion)
      )
    )
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
            buildStatuses={buildStatuses}
            environments={matchingEnvironments}
            highlightPackages={props.selectedPackages}
            setSelectedEnv={props.setSelectedEnv}
          />
          <Typography variant="subtitle1" gutterBottom align="right">
            Or, create a new environment:
          </Typography>
        </>
      ) : null}
    </>
  );
}
