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
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  DialogContent,
  DialogContentText,
  DialogActions,
  TableContainer,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tab,
  styled,
  Checkbox,
  Accordion,
  AccordionSummary,
  Collapse,
  IconButton
} from '@mui/material';

import AddIcon from '@mui/icons-material/Add';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Fragment, useState } from 'react';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import SimpleDialog from './DialogBox';

function AddEnvironment(props: { show: boolean }) {
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState('');
  const [value, setValue] = useState('1');
  const [selectedPackages, setSelectedPackages] = useState([]);

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

  const pythonPackages = ['numpy', 'pandas', 'matplotlib', 'seaborn'];
  const RPackages = ['tidyverse', 'devtools'];
  const otherPackages = ['ant', 'cmake'];
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
                  <TextField required label='Required' id='name-field' variant='standard'></TextField>
                </Grid>
                <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                  <Box pr={3} pb={2}>
                    Description:
                  </Box>
                </Grid>
                <Grid item xs={12} sm={8} md={9}>
                  <TextField 
                    required label='Required'
                    id='description-field' 
                    multiline rows={4} 
                    sx={{ width: '75%' }}
                    variant='standard'></TextField>
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
                <Grid item xs={12} sm={8} md={4}>
                  <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                      <TabList onChange={handleChange} aria-label="lab API tabs example">
                        <Tab label="Python" value="1" />
                        <Tab label="R" value="2" />
                        <Tab label="System" value="3" />
                      </TabList>
                    </Box>
                    <TabPanel value="1" sx={{ paddingLeft: '0', paddingTop: '0' }}>
                      <List dense sx={{ width: '100%', maxWidth: 360, paddingLeft: '0' }}>
                        {pythonPackages.map((pckg, index) => { 
                          var key = pckg + '-' + index

                          return (
                          <ListItem key={key} sx={{ paddingLeft: '0' }}>
                            <ListItemButton>
                              <ListItemText>{pckg}</ListItemText>
                            </ListItemButton>
                            <Checkbox
                              id={key}
                              onChange={(e) => handlePackageChange(pckg)}
                              checked={checkboxActive(pckg)}
                            />
                          </ListItem>)
                        })}
                      </List>
                    </TabPanel>
                    <TabPanel value="2" sx={{ paddingLeft: '0', paddingTop: '0' }}>
                      <List dense sx={{ width: '100%', maxWidth: 360, paddingLeft: '0' }}>
                        {RPackages.map((pckg, index) => { 
                          var key = pckg + '-' + index

                          return (
                          <ListItem key={key} sx={{ paddingLeft: '0' }}>
                            <ListItemButton>
                              <ListItemText>{pckg}</ListItemText>
                            </ListItemButton>
                            <Checkbox
                              id={key}
                              onChange={(e) => handlePackageChange(pckg)}
                              checked={checkboxActive(pckg)}
                            />
                          </ListItem>)
                        })}
                      </List>
                    </TabPanel>
                    <TabPanel value="3" sx={{ paddingLeft: '0', paddingTop: '0' }}>
                      <List dense sx={{ width: '100%', maxWidth: 360, paddingLeft: '0' }}>
                        {otherPackages.map((pckg, index) => { 
                          var key = pckg + '-' + index

                          return (
                          <ListItem key={key} sx={{ paddingLeft: '0' }}>
                          <ListItemButton>
                            <ListItemText>{pckg}</ListItemText>
                          </ListItemButton>
                          <Checkbox
                            id={key}
                            onChange={(e) => handlePackageChange(pckg)}
                            checked={checkboxActive(pckg)}
                          />
                        </ListItem>)
                        })}
                      </List>
                    </TabPanel>
                  </TabContext>
                </Grid>
              </Grid>
              <Grid container spacing={1} sx={{ marginTop:'1%' }}>
                <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                  <Box pr={3} pb={2}>
                    Packages:
                  </Box>
                </Grid>
                <Grid item xs={12} sm={4} md={7}>
                  <Box p={2} sx={{ border: 1, borderRadius: 1, borderColor: 'grey.400' }}>
                    <Grid container rowSpacing={1} columnSpacing={1.5}>
                      {selectedPackages.map((pckg, index) => {
                        var key = index + '-' + pckg 
                        var pckgVariant: "filled" | "outlined" = index % 2 == 0 ? "filled" : "outlined"

                        return (
                          <Grid key={key} item sx={{padding:'0'}}>
                            <Chip label={pckg} variant={pckgVariant} onDelete={(e) => console.log(e)} />
                          </Grid>
                        )
                      })}
                    </Grid>
                  </Box>
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
              <Table aria-label="collapsible table">
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



function CollapseRow(row) {
  const [open, setOpen] = useState(false);

  return (
    <Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.row.Environment}
        </TableCell>
        <TableCell component="th" scope="row">
          {row.row.Description}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Packages
              </Typography>
              <List>
                <ListItem>Package 1</ListItem>
                <ListItem>Pacakge 2</ListItem>
                <ListItem>Pacakge 3</ListItem>
                <ListItem>Pacakge 4</ListItem>
              </List>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  );
}

export default AddEnvironment;