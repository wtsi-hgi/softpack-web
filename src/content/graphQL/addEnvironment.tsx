import {
  Grid,
  Typography,
  CardContent,
  Card,
  Box,
  Divider,
  Button,
  TextField,
  Chip,
  Alert,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  TableContainer,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tab,
  Checkbox,
  Tooltip,
  Collapse,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Autocomplete,
  InputAdornment,
} from '@mui/material';

import AddIcon from '@mui/icons-material/Add';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { useState } from 'react';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import SimpleDialog from './DialogBox';
import CollapseRow from './CollapseRow';
import { useQuery } from '@apollo/client';
import { ALL_PACKAGES } from './queries';

function AddEnvironment(props: { show: boolean }) {
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState('');
  const [value, setValue] = useState('1');
  const [selectedPackages, setSelectedPackages] = useState([]);
  const [destination, setDestination] = useState();

  const { loading, data, error } = useQuery(ALL_PACKAGES)

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

  const flattenedPackages = (packages) => {
    var flattenedPackages: string[] = [];

    packages.map((library, libraryIndex) => {
      library.packages.map((pckg) => {
        const packageName = pckg.name + ' (' + pckg.version + ')';
        flattenedPackages.push(packageName);
      })
    })

    return flattenedPackages;
  }

  console.log(data.allPackages)

  const handlePackageChange = (packageName: string) => {
    const packageIndex = selectedPackages.indexOf(packageName)

    if (packageIndex != -1 ) {
      const newPackages = selectedPackages.filter(function (pckg) {
        return pckg !== packageName
    })
      setSelectedPackages(newPackages)
    } else {
      setSelectedPackages(selectedPackages.concat(packageName))
    }
  }

  const checkboxActive = (packageName: string) => {
    return selectedPackages.indexOf(packageName) != -1
  }

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value: string) => {
    setOpen(false);
    setSelectedValue(value);
  };

  const matchingEnvs = [
    {'Environment':'tremendous-mandril',
     'Description':'Mauris laoreet blandit odio, vitae mollis enim feugiat sit amet.'}, 
  
    {'Environment':'ubiquitous-clam',
    'Description':'Pellentesque feugiat accumsan consectetur. Nulla vitae portitor purus.'},
  ];

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
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
                    Select:
                  </Box>
                </Grid>
                <Grid item xs={12} sm={4} md={7}>
                  <Autocomplete
                    multiple
                    id="tags-standard"
                    options={flattenedPackages(data.allPackages)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="standard"
                        label="Packages"
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </Typography>
            <Alert severity='info' sx={{ margin: '2% 0 2% 0' }}>See below: you 
              can use an already existing environment that matches your criteria</Alert>  
            <Button
              variant='contained' 
              startIcon={<AddIcon />} 
              onClick={handleClickOpen}
              sx={{ float:'right', width:'10%', marginBottom: '2%' }}>Create</Button>
              <SimpleDialog
                selectedValue={selectedValue}
                open={open}
                onClose={handleClose}
              />   
          </CardContent>
        </Card>
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