import { Card, Box, Typography, Divider, CardContent, Grid, Alert, 
  Button } from "@mui/material";
import SimpleDialog from "../Dialog";
import Packages from "../Package";
import { useState } from "react";
import AddIcon from '@mui/icons-material/Add';

// PackageSettings is the card responsible for enabling the user to select the
// specific packages to build the environment with.
function PackageSettings(props:any) {
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState('');

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
          onClick={handleClickOpen}
          sx={{ 
            float:'right', 
            width:'10%', 
            marginBottom: '2%' 
          }}>Create
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