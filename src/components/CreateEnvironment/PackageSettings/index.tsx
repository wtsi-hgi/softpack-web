import { Card, Box, Typography, Divider, CardContent, Grid, Alert, 
  Button } from "@mui/material";
import { useEffect, useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import { useMutation } from "@apollo/client";
import { CREATE_ENV } from "../../../queries";
import ErrorDialog from "../ErrorDialog";
import PackageSelect from "../PackageSelect";

interface Package {
  name: string;
  id?: string;
  version?: string;
}

// PackageSettings is the card responsible for enabling the user to select the
// specific packages to build the environment with.
function PackageSettings(props:any) {  
  const [packages, setPackages] = useState('');

  const [error, setError] = useState(false);
  const [envBuildSuccessful, setEnvBuildSuccessful] = useState(false);

  const [ createEnvironment ] = useMutation(CREATE_ENV, {
    onCompleted: (event) => {
      console.log('completion event', event);

      if (
        event.createEnvironment.__typename === "CreateEnvironmentSuccess"
      ) {
        console.log('build successful')
        setEnvBuildSuccessful(true);
      } else {
        console.log(event)
        setError(true);
      }
    },
    // onError looks at GraphQL errors specifically. onCompleted will pick up
    // any errors which the backend itself raises, like an environment name
    // already existing.
    onError: (error) => {
      const messages = error.graphQLErrors[0].message;
      console.log('GraphQL ERROR: ', messages);
      setError(true);
    },
  });

  // createEnvTest is a temporary function that builds an environment. It
  // simulates what is going to happen in the final product: where the user
  // enters an env name, desc, path and packages.
  const createEnvTest = (event: any) => {
    event.preventDefault()

    console.log('creating an env with the following name, desc and path', props.buildName, props.buildDesc, props.buildPath);
    const name = props.buildName;
    const description = props.buildDesc;
    const path = 'groups/hgi';

    const packages: Package[] = [
      {name: 'py-3to2'},
      {name: 'py-abcpy', id: '56c4909e9c35490e8b2a58e9895159fc'}]
    
    console.log('info', name, description, path, packages)
    console.log('going to try building a test environment...');

    createEnvironment({ variables: { name, description, path, packages } })
  }

  return (
    <Card>
      <Box
        p={3}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Box>
          <Typography variant="h4" gutterBottom>
              Package Settings
            </Typography>
          <Typography variant="subtitle2">
            Manage details related to your environment packages
          </Typography>
        </Box>
      </Box>
      <Divider />
      <CardContent sx={{p: 4}}>
        <Typography variant="subtitle2">
          {props.data.map((program: any) => {
            return (
              <Grid key={program.id} container spacing={1}>
                <Grid item xs={12} sm={4} md={3} textAlign={{sm: 'right'}}>
                  <Box pr={3} pt={2}>
                    {program.name} Packages:
                  </Box>
                </Grid>
                <Grid item xs={12} sm={8} md={7}>
                  <Box pr={3} pb={4}>
                    <PackageSelect 
                      data={program.packages} 
                      packages={packages}
                      setPackages={setPackages} 
                    />
                  </Box>
                </Grid>
              </Grid>
            );
          })}
        </Typography>
        {/*<Alert 
          severity='warning' 
          sx={{m: '2% 0 2% 0'}}
        >
          See below: you can use an already existing environment that matches 
          your criteria.
        </Alert>*/}
        <Alert 
          severity='info' 
          sx={{m: '2% 0 2% 0'}}
        >
          Packages come with the latest version by default. If you wish to 
          change to an older version, click the package to select which one.
        </Alert>

        {error && <ErrorDialog name={props.name} setError={setError} />}
        
        {envBuildSuccessful && 
          <Alert
            severity="success"
            sx={{m: '2% 0 2% 0'}}
          >
            Your environment, {props.buildName} was successfully scheduled!
          </Alert>
        }
        <Button
          variant='contained' 
          startIcon={<AddIcon />} 
          onClick={createEnvTest}
          sx={{ 
            float:'right', 
            width:'10%', 
            mb:'2%' 
          }}
        >Create
        </Button>
      </CardContent>
    </Card>
  );
}

export default PackageSettings;