import {
  Grid,
  Typography,
  CardContent,
  Card,
  Box,
  Divider,
  TableContainer,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';

import CollapseRow from '../CollapseRow';
import { useQuery } from '@apollo/client';
import { ALL_PACKAGES } from '../queries';
import EnvironmentSettings from './EnvironmentSettings';
import PackageSettings from './PackageSettings';

function AddEnvironment(props: { show: boolean }) {
  const { loading, data, error } = useQuery(ALL_PACKAGES);

  if (loading) {
    return <div>loading...</div>
  }

  if (error) {
    return (
      <div style={{color:'red'}}>
        {error.message}
      </div>
    )
  }

  const matchingEnvs = [
    {'Environment':'tremendous-mandril',
     'Description':'Mauris laoreet blandit odio, vitae mollis enim feugiat sit amet.'}, 
  
    {'Environment':'ubiquitous-clam',
    'Description':'Pellentesque feugiat accumsan consectetur. Nulla vitae portitor purus.'},
  ];

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <EnvironmentSettings />
      </Grid>
      <Grid item xs={12}>
        <PackageSettings data={data.packageCollections}/>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <Box
            p={3}
          >
            <Box>
              <Typography variant="h4" gutterBottom>
                Environments Matching Your Criteria
              </Typography>
              <Typography variant="subtitle2">
                Save time and space by selecting one of the options below
              </Typography>
            </Box>
          </Box>
          <Divider />
          <CardContent sx={{ p: 4 }}>
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
                  {matchingEnvs.map((row, index) => {
                    return (
                      <CollapseRow key={index} row={row}/>
                    )
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default AddEnvironment;