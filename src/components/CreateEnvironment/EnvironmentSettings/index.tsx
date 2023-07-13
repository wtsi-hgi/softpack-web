import { 
  Card, 
  Box, 
  Typography, 
  Divider, 
  CardContent, 
  Grid, 
  TextField, 
  InputAdornment, 
  Tooltip, 
  FormControl, 
  Select, 
  MenuItem 
} from "@mui/material";

import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

// EnvironmentSettings is the card responsible for the environment settings
// available to a user when creating a new environment. E.g. Name, Description,
// etc.
function EnvironmentSettings() {

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
                Name:
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
                        <HelpOutlineIcon sx={{color:'rgba(34, 51, 84, 0.7)', padding:'0 0 0 8px', fontSize:'25px'}}/>
                      </Tooltip>
                    </InputAdornment>
                  ),
                }}>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
              <Box pr={3} pb={2} display='flex' justifyContent='flex-end'>
                Description:
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
                        <HelpOutlineIcon sx={{color:'rgba(34, 51, 84, 0.7)', padding:'0 0 0 8px', fontSize:'25px'}}/>
                      </Tooltip>
                    </InputAdornment>
                  ),
                }}></TextField>
            </Grid>
            <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
              <Box pr={3} pb={2} display='flex' justifyContent='flex-end'>
                Folder:
              </Box>
            </Grid>
            <Grid item xs={12} sm={8} md={9}>
              <FormControl>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={'destination'}
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