import { Card, Box, Typography, Divider, CardContent, Grid, TextField, InputAdornment, Tooltip, FormControl, Select, MenuItem } from "@mui/material";
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { useState } from "react";

function EnvironmentSettings() {
  const [destination, setDestination] = useState();

  return (
    <Card>
      <Box p={3}>
        <Box>
          <Typography variant="h4" gutterBottom>
            Environment Settings
          </Typography>
          <Typography variant="subtitle2">
            Manage details related to your environment
          </Typography>
        </Box>
      </Box>
      <Divider />
      <CardContent sx={{ p: 4 }}>
        <Typography variant="subtitle2">
          <Grid container spacing={1}>
            <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
              <Box pr={3} pb={2} display='flex' justifyContent='flex-end'>
                <Typography variant='h5'>Name:</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={8} md={9}>
              <TextField 
                id='name-field' 
                variant='standard' 
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Tooltip title={"Choose a name for your environment"}>
                        <HelpOutlineIcon sx={{color:'rgba(34, 51, 84, 0.7)', padding:'0 0 0 8px', fontSize:'20px'}}/>
                      </Tooltip>
                    </InputAdornment>
                  ),
                }}>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
              <Box pr={3} pb={2} display='flex' justifyContent='flex-end'>
                <Typography variant='h5'>Description:</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={8} md={9}>
              <TextField 
                id='description-field' 
                multiline rows={4} 
                sx={{ width: '75%' }}
                variant='standard'
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Tooltip title={"What is the purpose of your environment?"}>
                        <HelpOutlineIcon sx={{color:'rgba(34, 51, 84, 0.7)', padding:'0 0 0 8px', fontSize:'20px'}}/>
                      </Tooltip>
                    </InputAdornment>
                  ),
                }}></TextField>
            </Grid>
            <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
              <Box pr={3} pb={2} display='flex' justifyContent='flex-end'>
                <Typography variant='h5'>Folder:</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={8} md={9}>
              <FormControl>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={destination}
                >
                  <MenuItem value={10}>users/kj789</MenuItem>
                  <MenuItem value={20}>hgi/projects</MenuItem>
                  <MenuItem value={30}>humgen/projects</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Typography>
      </CardContent>
    </Card>
  );
}

export default EnvironmentSettings