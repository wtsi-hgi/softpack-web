import { Card, Box, Typography, Divider, CardContent, Grid, Alert, 
  Button } from "@mui/material";
import SimpleDialog from "../Dialog";
import Packages from "../Package";
import { useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import { gql, useQuery } from "@apollo/client";

const CREATE_ENV = gql`
mutation Create {
  createEnvironment(
    env: {
      description: "description of environment",
      name: "TEST-ENV-1", 
      packages: [
        {id: "123", 
        name: "py-zlib", 
        version: "1.2.13"}, 
        {id: "100", 
        name: "py-zlib"}, 
        {id: "3", 
        name: "py-zlib"}
      ],
      path: "groups/hgi"}
  ) {
    ... on Environment {
      id
      name
      description
      packages {
        id
        name
        version
      }
    }
    ... on EnvironmentAlreadyExistsError {
      __typename
      name
      path
    }
  }
}
`

// PackageSettings is the card responsible for enabling the user to select the
// specific packages to build the environment with.
function PackageSettings(props:any) {
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState('');

  console.log('props', props);

  function createEnvTest() {
    console.log(CREATE_ENV);
    //return
    //const { loading, data, error } = useQuery(CREATE_ENV);
    
  }

  // handleClickOpen handles the behaviour for when the user clicks the 'create'
  // button.
  const handleClickOpen = () => {
    setOpen(true);
  };

  // handleClose handles the behaviour for when the user clicks off the
  // 'SimpleDialog' object.
  const handleClose = (value: string) => {
    setOpen(false);
    setSelectedValue(value);
  };

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
      <CardContent sx={{ p: 4 }}>
        <Typography variant="subtitle2">
          {props.data.map((program: any) => {
            return (
              <Grid key={program.id} container spacing={1}>
                <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                  <Box pr={3} pb={4}>
                    {program.name} Packages:
                  </Box>
                </Grid>
                <Grid item xs={12} sm={8} md={7}>
                  <Box pr={3} pb={4}>
                    <Packages packages={program.packages}/>
                  </Box>
                </Grid>
              </Grid>
            );
          })}
        </Typography>
        <Alert severity='warning' sx={{ margin: '2% 0 2% 0' }}>See below: you 
          can use an already existing environment that matches your criteria.
        </Alert>
        <Alert severity='info' sx={{ margin: '2% 0 2% 0' }}>
          Packages come with the latest version by default. If you wish to 
          change to an older version, click the package to select which one.
        </Alert>
        <Button
          variant='contained' 
          startIcon={<AddIcon />} 
          onClick={createEnvTest}
          sx={{ 
            float:'right', 
            width:'10%', 
            marginBottom: '2%' 
          }}
        >Create
        </Button>
        <SimpleDialog
          selectedValue={selectedValue}
          open={open}
          onClose={handleClose}
        />
      </CardContent>
    </Card>
  );
}

export default PackageSettings;