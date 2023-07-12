import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Outlet } from 'react-router-dom';

import Sidebar from '../../components/Sidebar';

const Root = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <CssBaseline />
      <Box display='flex'>
        <Box>
          <Sidebar />
        </Box>
        <Box component="main" sx={{flexGrow: 1, marginTop: '64px'}}> 
          {/*64px marginTop to match the height of the SoftPack appbar*/}
          <Typography variant='h2'>Hello</Typography>
          {/* <Outlet /> */}
        </Box>
      </Box>
    </Box>
  );
};

export default Root;
