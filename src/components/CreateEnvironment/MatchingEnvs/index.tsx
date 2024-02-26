import { useQuery } from "@apollo/client";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import { ALL_ENVIRONMENTS, Package } from "../../../queries";
import MatchingEnv from "../MatchingEnv";

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
          (!pkg.version || pkg.version === envPkg.version),
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
          <TableContainer component={Paper}>
            <Table aria-label="collapsible table" size="small">
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell>Environment</TableCell>
                  <TableCell align="left">Description</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {matchingEnvironments.map((env, index) => {
                  return (
                    <MatchingEnv
                      key={index}
                      environment={env}
                      selectedPackages={props.selectedPackages}
                    />
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <Typography variant="subtitle1" gutterBottom align="right">
            Or, create a new environment:
          </Typography>
        </>
      ) : null}
    </>
  );
}
