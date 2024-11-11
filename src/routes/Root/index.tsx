import type { RequestedRecipe } from "../../components/RequestRecipe";
import { useQuery } from "@apollo/client";
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
import { EnvironmentsQueryContext } from "../../components/EnvironmentsQueryContext";
import { RequestedRecipesContext } from "../../components/RequestRecipe";
import { recipeDescriptionContext } from "../../components/ViewEnvironments/Drawer";
import { HelpIcon } from "../../components/HelpIcon";
import Menu from "../../components/Menu";
import { UserContext } from "../../components/UserContext";
import { ALL_ENVIRONMENTS, Environments, GROUPS } from "../../queries";
import { BuildStatusContext } from "../../components/ViewEnvironments/EnvironmentTable";

export type BuildStatus = {
  avg: number;
  statuses: Record<string, string>;
}

// getAvailableTags returns all tags, including duplicates, currently used by
// the passed environments.
function getAvailableTags(environments: Environments): string[] {
  return environments.flatMap((e) => e.tags);
}

let recipesTimer = -1 as unknown as NodeJS.Timeout;

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

  const [requested, setRequested] = useState<RequestedRecipe[]>([]),
    [getRequestedRecipes, setGetRequestRecipes] = useState({}),
    updateRequestedRecipes = () => setGetRequestRecipes({}),
    requestedRecipes = () => [requested, updateRequestedRecipes] as const,
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

  useEffect(() => {
    clearTimeout(recipesTimer);

    fetch(CoreURL + "requestedRecipes")
      .then(r => r.json())
      .then(rr => {
        setRequested(rr);
        recipesTimer = setTimeout(updateRequestedRecipes, 10000);
      });
  }, [getRequestedRecipes]);

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
        <BuildStatusContext.Provider value={buildStatuses}>
          <UserContext.Provider value={{ username, groups }}>
            <EnvironmentsQueryContext.Provider value={environmentsQuery}>
              <RequestedRecipesContext.Provider value={requestedRecipes()}>
                <AvailableTagsContext.Provider value={availableTags}>
                  <Box component="main" sx={{ mx: 2, width: "100%" }}>
                    <Toolbar />
                    <Outlet />
                  </Box>
                </AvailableTagsContext.Provider>
              </RequestedRecipesContext.Provider>
            </EnvironmentsQueryContext.Provider>
          </UserContext.Provider>
        </BuildStatusContext.Provider>
      </recipeDescriptionContext.Provider>
    </Box>
  );
};

export default Root;
