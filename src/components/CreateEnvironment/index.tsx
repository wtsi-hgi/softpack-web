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

import { gql, useQuery } from '@apollo/client';
import EnvironmentSettings from './EnvironmentSettings';
import AccordionRow from './AccordionRow';
import PackageSettings from './PackageSettings';

const ALL_PACKAGES = gql`
  query {
    packageCollections {
      id
      name
      packages {
        id
        name
        versions
      }
    }
  }
`

const ENV_QUERY = gql`
  query {
    packageCollections {
      id
      name
      packages {
        id
        name
        versions
      }
    }
  }
`

// CreateEnvironment displays the 'create environment' page.
function CreateEnvironment() {
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
    <Grid 
      container 
      direction="row"
      justifyContent="center"
      alignItems="stretch"
      spacing={3}>
      <Grid item xs={11}>
        <EnvironmentSettings />
      </Grid>
      <Grid item xs={11}>
        <PackageSettings data={data.packageCollections}/>
      </Grid>
      <Grid item xs={11}>
        <Typography>Hello</Typography>
      </Grid>
      <Grid item xs={11}>
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
                      <AccordionRow key={index} row={row}/>
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

export default CreateEnvironment;