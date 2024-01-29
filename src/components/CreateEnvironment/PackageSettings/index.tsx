import {
  Card, Box, Typography, Divider, CardContent, Grid, Alert,
} from "@mui/material";
import PackageSelect from "../PackageSelect";
import { Package } from "../../../queries";
import MatchingEnvs from "../MatchingEnvs";

type PackageSettingsParams = {
  packages: Map<string, string[]>;
  selectedPackages: Package[];
  setSelectedPackages: (packages: Package[]) => void;
  runEnvironmentBuild: () => void;
  envBuildSuccessful: boolean;
}

// PackageSettings is the card responsible for enabling the user to select the
// specific packages to build the environment with.
function PackageSettings(props: PackageSettingsParams) {
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
          <Grid container spacing={1}>
            <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
              <Box pr={3} pt={2}>
                Packages:
              </Box>
            </Grid>
            <Grid item xs={12} sm={8} md={7}>
              <Box pr={3} pb={4}>
                <PackageSelect
                  packages={props.packages}
                  selectedPackages={props.selectedPackages}
                  setSelectedPackages={props.setSelectedPackages}
                />
              </Box>
            </Grid>
          </Grid>
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
          sx={{ m: '2% 0 2% 0' }}
        >
          Packages come with the latest version by default. If you wish to
          change to an older version, click the package to select which one.
        </Alert>
        {props.selectedPackages.length > 0 && <MatchingEnvs selectedPackages={props.selectedPackages} runEnvironmentBuild={props.runEnvironmentBuild} />}
      </CardContent>
    </Card>
  );
}

export default PackageSettings;
