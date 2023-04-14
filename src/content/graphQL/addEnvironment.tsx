import {
  Grid,
  Typography,
  CardContent,
  Card,
  Box,
  Divider,
  Button,
  TextField,
  MenuItem,
  InputLabel,
  FormHelperText,
  FormControl,
  Chip
} from '@mui/material';

import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DoneTwoToneIcon from '@mui/icons-material/DoneTwoTone';
import Text from 'src/components/Text';
import Label from 'src/components/Label';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useState } from 'react';


function AddEnvironment(props: { show: boolean }) {
  const [pythonVersion, setPython] = useState('');
  const [rVersion, setRVersion] = useState('');
  const [otherVersion, setOtherVersion] = useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setPython(event.target.value as string);
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Card>
          <Box
            p={3}
          >
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
                  <Box pr={3} pb={2}>
                    Name:
                  </Box>
                </Grid>
                <Grid item xs={12} sm={8} md={9}>
                  <TextField id='name-field'></TextField>
                </Grid>
                <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                  <Box pr={3} pb={2}>
                    Description:
                  </Box>
                </Grid>
                <Grid item xs={12} sm={8} md={9}>
                  <TextField id='description-field' multiline rows={4} sx={{ width: '75%' }}></TextField>
                </Grid>
              </Grid>
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
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
                  <Box pr={3} pb={2}>
                    Version:
                  </Box>
                </Grid>
                <Grid item xs={12} sm={8} md={4} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Box sx={{ width:'100px' }}>
                    <FormControl fullWidth>
                      <InputLabel id="python-select-label">Python</InputLabel>
                      <Select
                        labelId="python-select-label"
                        id="select"
                        value={pythonVersion}
                        label="Python"
                        onChange={(e) => console.log(e)}
                        >
                        <MenuItem value={"3.11"}>3.11</MenuItem>
                        <MenuItem value={"3.10"}>3.10</MenuItem>
                        <MenuItem value={"3.9"}>3.9</MenuItem>
                      </Select>
                    </FormControl>             
                  </Box>
                  <Box sx={{ width:'100px' }}>
                    <FormControl fullWidth>
                      <InputLabel id="R-select-label">R</InputLabel>
                      <Select
                        labelId="R-select-label"
                        id="select"
                        value={rVersion}
                        label="Python"
                        onChange={(e) => console.log(e)}
                        >
                        <MenuItem value={"3.11"}>3.11</MenuItem>
                        <MenuItem value={"3.10"}>3.10</MenuItem>
                        <MenuItem value={"3.9"}>3.9</MenuItem>
                      </Select>
                    </FormControl>             
                  </Box>
                  <Box sx={{ width:'100px' }}>
                    <FormControl fullWidth>
                      <InputLabel id="other-select-label">Other</InputLabel>
                      <Select
                        labelId="other-select-label"
                        id="select"
                        value={otherVersion}
                        label="Python"
                        onChange={(e) => console.log(e)}
                        >
                        <MenuItem value={"3.11"}>3.11</MenuItem>
                        <MenuItem value={"3.10"}>3.10</MenuItem>
                        <MenuItem value={"3.9"}>3.9</MenuItem>
                      </Select>
                    </FormControl>             
                  </Box>
                </Grid>
              
              </Grid>
              <Grid container spacing={1} sx={{ marginTop:'2%' }}>
                <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                  <Box pr={3} pb={2}>
                    Packages:
                  </Box>
                </Grid>
                <Grid item xs={12} sm={4} md={7}>
                  <Box>
                    <Grid container rowSpacing={1} columnSpacing={1.5} sx={{ paddingBottom: '1%', border: 1, borderRadius: 1, borderColor: 'grey.500' }}>
                      <Grid item sx={{padding:'0'}}>
                        <Chip label="pandas" onDelete={(e) => console.log(e)} />
                      </Grid>
                      <Grid item sx={{padding:'0'}}>
                        <Chip label="numpy" variant="outlined" onDelete={(e) => console.log(e)} />
                      </Grid>
                      <Grid item sx={{padding:'0'}}>
                        <Chip label="matplotlib" onDelete={(e) => console.log(e)} />
                      </Grid>
                      <Grid item sx={{padding:'0'}}>
                        <Chip label="keras" variant="outlined" onDelete={(e) => console.log(e)} />
                      </Grid>
                      <Grid item sx={{padding:'0'}}>
                        <Chip label="seaborn" onDelete={(e) => console.log(e)} />
                      </Grid>
                      <Grid item sx={{padding:'0'}}>
                        <Chip label="h5py == 3.8.0" variant="outlined" onDelete={(e) => console.log(e)} />
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
              </Grid>
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <Box
            p={3}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box>
              <Typography variant="h4" gutterBottom>
                Email Addresses
              </Typography>
              <Typography variant="subtitle2">
                Manage details related to your associated email addresses
              </Typography>
            </Box>
            <Button variant="text" startIcon={<EditTwoToneIcon />}>
              Edit
            </Button>
          </Box>
          <Divider />
          <CardContent sx={{ p: 4 }}>
            <Typography variant="subtitle2">
              <Grid container spacing={0}>
                <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                  <Box pr={3} pb={2}>
                    Email ID:
                  </Box>
                </Grid>
                <Grid item xs={12} sm={8} md={9}>
                  <Text color="black">
                    <b>example@demo.com</b>
                  </Text>
                  <Box pl={1} component="span">
                    <Label color="success">Primary</Label>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                  <Box pr={3} pb={2}>
                    Email ID:
                  </Box>
                </Grid>
                <Grid item xs={12} sm={8} md={9}>
                  <Text color="black">
                    <b>demo@example.com</b>
                  </Text>
                </Grid>
              </Grid>
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default AddEnvironment;
