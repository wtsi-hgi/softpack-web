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
  TableRow
} from '@mui/material';

import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DoneTwoToneIcon from '@mui/icons-material/DoneTwoTone';
import Text from 'src/components/Text';
import Label from 'src/components/Label';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useState } from 'react';

const emails = ['username@gmail.com', 'user02@gmail.com'];

export interface SimpleDialogProps {
  open: boolean;
  selectedValue: string;
  onClose: (value: string) => void;
}

function SimpleDialog(props: SimpleDialogProps) {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value: string) => {
    onClose(value);
  };

  return (
    <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Hold on!
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Your environment closely matches *three others*, are you sure you would not like to use any of these?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Create my own environment</Button>
          <Button onClick={handleClose} autoFocus>
            Use already existing environment
          </Button>
        </DialogActions>
      </Dialog>
  );
}

function AddEnvironment(props: { show: boolean }) {
  const [pythonVersion, setPython] = useState('');
  const [rVersion, setRVersion] = useState('');
  const [otherVersion, setOtherVersion] = useState('');
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(emails[1]);

  const handleChange = (event: SelectChangeEvent) => {
    setPython(event.target.value as string);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value: string) => {
    setOpen(false);
    setSelectedValue(value);
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
              <Grid container spacing={1} sx={{ marginTop:'1%' }}>
                <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                  <Box pr={3} pb={2}>
                    Search:
                  </Box>
                </Grid>
                <Grid item xs={12} sm={8} md={9}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    { /* <SearchIcon/> */ }
                    <TextField id='name-field'></TextField>
                  </Box>
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
            <Box sx={{ display: 'flex', flexDirection: 'column', margin: '2% 0 2% 0'}}>
              <Alert severity='info'>See below: you can use an already existing environment
               that matches your criteria</Alert>   
              <Button 
              variant='contained' 
              startIcon={<AddIcon />} 
              onClick={handleClickOpen}
              sx={{ marginLeft:'auto', width:'10%' }}>Create</Button>
              <SimpleDialog
                selectedValue={selectedValue}
                open={open}
                onClose={handleClose}
              />           
            </Box>
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
              <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead>
                  <TableRow>
                    <TableCell>Environment</TableCell>
                    <TableCell align="left">Description</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>tremendous-mandrill</TableCell>
                    <TableCell align="left">Mauris laoreet blandit odio, 
                    vitae mollis enim feugiat sit amet.</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>ubiquitous-clam</TableCell>
                    <TableCell align="left">Pellentesque feugiat accumsan 
                    consectetur. Nulla vitae portitor purus.</TableCell>
                  </TableRow>
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
