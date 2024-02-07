import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { useLocalStorage } from "@uidotdev/usehooks";
import { Outlet } from 'react-router-dom';

import Sidebar from '../../components/Sidebar';
import { InputAdornment, TextField, Tooltip } from '@mui/material';
import { UsernameContext } from '../../components/UsernameContext';

const Root = () => {
  const [username, setUsername] = useLocalStorage("username", "");

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }} color="inherit">
        <Toolbar>
          <Typography variant="h4" sx={{ flexGrow: 1 }}>SoftPack</Typography>
          <Typography pr={1}>Username:</Typography>
          <TextField
            variant='standard'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Tooltip title={"Enter your username"}>
                    <HelpOutlineIcon
                      sx={{
                        color: 'rgba(34, 51, 84, 0.7)',
                        padding: '0 0 0 8px',
                        fontSize: '25px'
                      }}
                    />
                  </Tooltip>
                </InputAdornment>
              ),
            }}>
          </TextField>
        </Toolbar>
      </AppBar>
      <UsernameContext.Provider value={username}>
        <Sidebar />
        <Box component="main" sx={{ mx: 2, width: "100%" }}>
          <Toolbar />
          <Outlet />
        </Box>
      </UsernameContext.Provider>
    </Box>
  );
};

export default Root;
