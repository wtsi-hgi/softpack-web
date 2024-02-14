import { useQuery } from "@apollo/client";
import ErrorIcon from "@mui/icons-material/Error";
import { InputAdornment, TextField, Tooltip } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useLocalStorage } from "@uidotdev/usehooks";
import { Outlet } from "react-router-dom";

import { HelpIcon } from "../../components/HelpIcon";
import Sidebar from "../../components/Sidebar";
import { UserContext } from "../../components/UserContext";
import { GROUPS } from "../../queries";

const Root = () => {
  const [username, setUsername] = useLocalStorage("username", "");
  const { data, error: rawError } = useQuery(GROUPS, {
    variables: { username },
  });
  const groups = data?.groups.map((g) => g.name) ?? [];
  const error = rawError
    ? `Error: ${rawError}`
    : (data?.groups ?? []).length == 0
      ? "Invalid username"
      : null;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        color="inherit"
      >
        <Toolbar>
          <Typography variant="h4" sx={{ flexGrow: 1 }}>
            SoftPack
          </Typography>
          <Typography pr={1}>Username:</Typography>
          <TextField
            variant="standard"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {error && username.length > 0 ? (
                    <Tooltip title={error}>
                      <ErrorIcon
                        sx={{
                          color: "rgba(255, 51, 84, 0.7)",
                          padding: "0 0 0 8px",
                          fontSize: "25px",
                        }}
                      />
                    </Tooltip>
                  ) : (
                    <HelpIcon title={"Enter your username"} />
                  )}
                </InputAdornment>
              ),
            }}
          ></TextField>
        </Toolbar>
      </AppBar>
      <UserContext.Provider value={{ username, groups }}>
        <Sidebar />
        <Box component="main" sx={{ mx: 2, width: "100%" }}>
          <Toolbar />
          <Outlet />
        </Box>
      </UserContext.Provider>
    </Box>
  );
};

export default Root;
