import { Box, Typography, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Button } from "@mui/material"
import AddIcon from '@mui/icons-material/Add';
import MatchingEnv from "../MatchingEnv";
import { ALL_ENVIRONMENTS, Environments, Package } from "../../../queries";
import { useQuery } from "@apollo/client";

type MatchingEnvsParams = {
  selectedPackages: Package[];
  envBuildInFlight: boolean;
  runEnvironmentBuild: () => void;
}

// matchingEnvs is a hardcoded table that shows an illustration of what the
// program should look like, as it informs users in real-time that they
// environment they are trying to create already exists.
export default function matchingEnvs(props: MatchingEnvsParams) {
 	const { loading, data, error } = useQuery<Environments>(ALL_ENVIRONMENTS);

  if (loading) {
    return <div>...</div>
  }
  if (error) {
    return "error"
  }
  
  const matchingEnvironments = data!.environments.filter(e => (
    props.selectedPackages.every(pkg => (
      e.packages.some(envPkg => pkg.name === envPkg.name && (!pkg.version || pkg.version === envPkg.version))
    ))
  ))

  return (
    <>
      {matchingEnvironments.length > 0
        ? <>
          <Box>
            <Typography variant="subtitle1" gutterBottom>
              Use one of these existing, matching, environments:
            </Typography>
          </Box>
          <TableContainer component={Paper}>
            <Table aria-label="collapsible table" size='small'>
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
                    <MatchingEnv key={index} environment={env} selectedPackages={props.selectedPackages} />
                  )
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <Typography variant="subtitle1" gutterBottom align="right">
            Or, create a new environment:
          </Typography>
        </>
        : null}
      <Box>
        <Button
          variant='contained'
          startIcon={<AddIcon />}
          disabled={props.envBuildInFlight}
          onClick={props.runEnvironmentBuild}
          sx={{
            float: 'right',
            mb: '2%'
          }}
        >Create
        </Button>
      </Box>
    </>
  )
}