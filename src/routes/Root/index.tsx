import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
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
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default Root;
