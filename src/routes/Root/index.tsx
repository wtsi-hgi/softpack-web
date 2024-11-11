import { useEffect, useState } from "react";
import ErrorIcon from "@mui/icons-material/Error";
import { InputAdornment, TextField, Tooltip } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useLocalStorage } from "@uidotdev/usehooks";
import { NavLink, Outlet } from "react-router-dom";
import Logo from '../../../softpack.svg';
import CoreURL from "../../core";

import { AvailableTagsContext } from "../../components/AvailableTagsContext";
import { recipeDescriptionContext } from "../../components/ViewEnvironments/Drawer";
import { HelpIcon } from "../../components/HelpIcon";
import Menu from "../../components/Menu";
import { BuildStatusContext } from "../../components/ViewEnvironments/EnvironmentTable";
import { Environment, EnvironmentsContext, getEnvironments, getGroups, getPackages, getRequestedRecipes, PackagesContext, PackageVersions, RequestedRecipe, RequestedRecipesContext, UserContext } from "../../endpoints";

export type BuildStatus = {
  avg: number;
  statuses: Record<string, string>;
}

// getAvailableTags returns all tags, including duplicates, currently used by
// the passed environments.
function getAvailableTags(environments: Environment[]): string[] {
  return environments.flatMap((e) => e.tags);
}

let recipesTimer = -1 as unknown as NodeJS.Timeout,
  environmentsTimer = -1 as unknown as NodeJS.Timeout;

const Root = () => {
  const [username, setUsername] = useLocalStorage("username", "");
  const [groups, setGroups] = useState<string[]>([]);
  useEffect(() => {
    getGroups(username)
      .then(setGroups)
      .catch(() => setGroups([]));
  }, [username])

  const error = groups.length == 0
    ? "Invalid username"
    : null;

  const [requested, setRequested] = useState<RequestedRecipe[]>([]),
    [loadRequestedRecipes, setLoadRequestRecipes] = useState({}),
    [refetchEnvironments, setRefetchEnvironments] = useState({}),
    updateRequestedRecipes = () => setLoadRequestRecipes({}),
    updateEnvironments = () => setRefetchEnvironments({}),
    [recipeDescriptions, setRecipeDescriptions] = useState<Record<string, string>>({}),
    getRecipeDescription = (recipe: string) => {
      if (recipe in recipeDescriptions) {
        return;
      }

      fetch(CoreURL + "getRecipeDescription", { "method": "POST", "body": JSON.stringify({ recipe }) })
        .then(r => r.json())
        .then(desc => {
          recipeDescriptions[recipe] = desc["description"] ?? "Unknown Module Package";
          setRecipeDescriptions({ ...recipeDescriptions });
        })
    };


  const [buildStatuses, setBuildStatuses] = useState<BuildStatus | null>(null);
  useEffect(() => {
    fetch(CoreURL + "buildStatus", { "method": "post" }).then(j => j.json()).then(setBuildStatuses);
  }, []);

  const [packageList, setPackageList] = useState<{ data: PackageVersions[], error: string }>({ data: [], error: "" });
  useEffect(() => {
    getPackages()
      .then(data => setPackageList({ data, error: "" }))
      .catch(error => setPackageList({ data: [], error }));
  }, []);


  const [environmentsList, setEnvironmentsList] = useState<{ data: Environment[], error: string }>({ data: [], error: "" });

  useEffect(() => {
    clearTimeout(environmentsTimer);

    getEnvironments()
      .then(data => setEnvironmentsList({ data, error: "" }))
      .catch(error => setEnvironmentsList({ data: [], error }))
      .finally(() => environmentsTimer = setTimeout(updateEnvironments, 30000));
  }, [refetchEnvironments]);

  const availableTags = [
    ...new Set(getAvailableTags(environmentsList.data)),
  ];

  useEffect(() => {
    clearTimeout(recipesTimer);

    getRequestedRecipes()
      .then(r => setRequested(r))
      .finally(() => recipesTimer = setTimeout(updateRequestedRecipes, 10000));
  }, [loadRequestedRecipes]);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        color="inherit"
      >
        <Toolbar style={{ paddingLeft: "20px" }}>
          <Box display="contents" component={NavLink} to="/">
            <img
              alt="SoftPack"
              src={Logo}
              style={{ height: "3em", paddingRight: "1em" }}
            />
            <Typography variant="h3">
              SoftPack
            </Typography>
          </Box>
          <Menu />
          <Typography pr={1} ml={2}>Username:</Typography>
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
      <recipeDescriptionContext.Provider value={[recipeDescriptions, getRecipeDescription]}>
        <PackagesContext.Provider value={packageList}>
          <EnvironmentsContext.Provider value={[environmentsList, updateEnvironments]}>
            <BuildStatusContext.Provider value={buildStatuses}>
              <UserContext.Provider value={{ username, groups }}>
                <RequestedRecipesContext.Provider value={[requested, updateRequestedRecipes]}>
                  <AvailableTagsContext.Provider value={availableTags}>
                    <Box component="main" sx={{ mx: 2, width: "100%" }}>
                      <Toolbar />
                      <Outlet />
                    </Box>
                  </AvailableTagsContext.Provider>
                </RequestedRecipesContext.Provider>
              </UserContext.Provider>
            </BuildStatusContext.Provider>
          </EnvironmentsContext.Provider>
        </PackagesContext.Provider>
      </recipeDescriptionContext.Provider>
    </Box>
  );
};

export default Root;
