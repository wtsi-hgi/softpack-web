import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Outlet } from 'react-router-dom';

import Sidebar from '../../components/Sidebar';

const Root = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }} color="inherit">
        <Toolbar>
          <Typography variant="h4">SoftPack</Typography>
        </Toolbar>
      </AppBar>
      <Sidebar />
      <Box component="main" sx={{ mx: 2 }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default Root;
