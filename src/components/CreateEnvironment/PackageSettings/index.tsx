import { Card, Box, Typography, Divider, CardContent, Grid, Alert, 
  Button } from "@mui/material";
import { useEffect, useState, useContext } from "react";
import AddIcon from '@mui/icons-material/Add';
import PackageSelect from "../PackageSelect";
import { PackageContext } from "../PackageContext";

// PackageSettings is the card responsible for enabling the user to select the
// specific packages to build the environment with.
function PackageSettings(props:any) {  
  const [packages, setPackages] = useState('');

  const packageContext = useContext(PackageContext);

  useEffect(() => {
    console.log('hello from PackageSettings', packageContext?.testPackages);
  }, [])

  const runEnvironmentBuild = () => {
    console.log('executing environment build from PackageSettings.tsx...');
    props.runEnvironmentBuild()
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
        
        {props.envBuildSuccessful && 
          <Alert
            severity="success"
            sx={{m: '2% 0 2% 0'}}
          >
            Your environment was successfully scheduled!
          </Alert>
        }
        <Button
          variant='contained' 
          startIcon={<AddIcon />} 
          onClick={runEnvironmentBuild}
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