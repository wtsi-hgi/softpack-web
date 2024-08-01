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

import { AvailableTagsContext } from "../../components/AvailableTagsContext";
import { EnvironmentsQueryContext } from "../../components/EnvironmentsQueryContext";
import { HelpIcon } from "../../components/HelpIcon";
import Sidebar from "../../components/Sidebar";
import { UserContext } from "../../components/UserContext";
import { ALL_ENVIRONMENTS, Environments, GROUPS } from "../../queries";

// getAvailableTags returns all tags, including duplicates, currently used by
// the passed environments.
function getAvailableTags(environments: Environments): string[] {
  return environments.flatMap((e) => e.tags);
}

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

  const environmentsQuery = useQuery(ALL_ENVIRONMENTS);

  const availableTags = [
    ...new Set(getAvailableTags(environmentsQuery.data?.environments ?? [])),
  ];

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        color="inherit"
      >
        <Toolbar>
          <img
            alt="SoftPack"
            src={"/softpack.svg"}
            style={{ height: "3em", marginRight: "0.5em" }}
          />
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
        <EnvironmentsQueryContext.Provider value={environmentsQuery}>
          <AvailableTagsContext.Provider value={availableTags}>
            <Sidebar />
            <Box component="main" sx={{ mx: 2, width: "100%" }}>
              <Toolbar />
              <Outlet />
            </Box>
          </AvailableTagsContext.Provider>
        </EnvironmentsQueryContext.Provider>
      </UserContext.Provider>
    </Box>
  );
};

export default Root;
