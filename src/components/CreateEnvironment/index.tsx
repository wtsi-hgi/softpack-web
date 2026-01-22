import AddIcon from "@mui/icons-material/Add";
import {
  Alert,
  Box,
  Button,
  CardContent,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { useLocalStorage } from "@uidotdev/usehooks";
import { useContext, useMemo, useState } from "react";

import type { Package } from "../../endpoints";
import EnvironmentSettings from "./EnvironmentSettings";
import PackageMatcher from "./PackageMatcher";
import { PopUpDialog } from "./PopUpDialog";
import { validatePackages } from "./packageValidation";
import { useNavigate } from "react-router-dom"
import { createEnvironment, EnvironmentsContext, PackagesContext, RequestedRecipesContext, UserContext } from "../../endpoints";

// CreateEnvironment displays the 'create environment' page.
export default function CreateEnvironment() {
  const { data, error } = useContext(PackagesContext);
  const [environmentsQuery] = useContext(EnvironmentsContext);
  const [envBuildResult, setEnvBuildResult] = useState({
    title: "",
    message: "",
  });
  const [, setIgnoreReady] = useLocalStorage("environments-ignoreready", false);
  const [, setFilterUsers] = useLocalStorage<string[]>(
    "environments-filterusers",
    [],
  );
  const [, setFilterGroups] = useLocalStorage<string[]>(
    "environments-filtergroups",
    [],
  );
  const [, setFilterTags] = useLocalStorage<string[]>(
    "environments-filtertags",
    [],
  );

  const [name, setName] = useLocalStorage("environments-selectedname", "");
  const [description, setDescription] = useLocalStorage("environments-selecteddesc", "");
  const [path, setPath] = useLocalStorage("environments-selectedpath", "");
  const [tags, setTags] = useLocalStorage<string[]>("environments-selectedtags", []);
  const [selectedPackages, setSelectedPackages] = useLocalStorage<Package[]>("environments-selectedpackages", []);

  const { username, groups } = useContext(UserContext);
  const [requestedRecipes] = useContext(RequestedRecipesContext);
  const [envBuildInFlight, setEnvBuildInFlight] = useState(false);

  const [hideInstructions, setHideInstructions] = useLocalStorage("clone-instructions-viewed", false);

  const navigate = useNavigate()

  function resetEnvironmentSettings() {
    setName("")
    setDescription("")
    setPath("")
    setTags([])
    setSelectedPackages([])
  }

  const packages = useMemo(() => {
    const packages = new Map<string, string[]>();

    data.forEach(({ name, versions }) => {
      packages.set(name, [""].concat(versions));
    });

    requestedRecipes.forEach(({ name, version }) => {
      const rname = "*" + name,
        rr = packages.get(rname) ?? [];

      rr.push(version);

      packages.set(rname, rr);
    });

    return packages;
  }, [data, requestedRecipes]);

  if (environmentsQuery.data.length === 0) {
    return <div>loading...</div>;
  }

  const e = error || environmentsQuery.error;

  const [validPackages] = validatePackages(selectedPackages, packages)


  const runEnvironmentBuild = () => {
    setEnvBuildInFlight(true);
    createEnvironment(name, path, description, validPackages, username, tags)
      .then(({ message }) => {
        if (message.includes("uccess") || message.includes("build")) {
          if (message.includes("uccess")) {
            setEnvBuildResult({
              title: "Your environment was successfully scheduled!",
              message:
                "It should appear in the environments list shortly, and will be usable once the indicator is green.",
            });
          } else {
            setEnvBuildResult({
              title: "Your environment was queued",
              message:
                "The build service is currently unavailable. The environment will start to build once it returns.",
            });
          }
          // when the user next navigates to the Environments page, they should be
          // presented with their currently-building environment.
          setIgnoreReady(true);
          if (path.startsWith("users/")) {
            setFilterUsers([path.split("/")[1]]);
            setFilterGroups([]);
          } else {
            setFilterUsers([]);
            setFilterGroups([path.split("/")[1]]);
          }
          setFilterTags(tags);
        } else {
          setEnvBuildResult({
            title: "Environment build failed",
            message,
          });
        }
      })
      .catch(() => {
        console.error("Endpoint error");
        setEnvBuildResult({
          title: "Environment build failed",
          message: "some error",
        });
      })
      .finally(() => setEnvBuildInFlight(false));
  };

  const disabled = envBuildInFlight || name.length === 0 || description.length === 0 || path.length === 0 || (path !== "users/" + username && !groups.includes(path.split("/")[1])) || validPackages.length === 0;

  return <>
    {e && <div style={{ color: "red" }}>{e}</div>}
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="stretch"
      spacing={3}
    >
      <Grid item xs={11}>
        <Box p={2}>
          <Stack mt={1} direction="row" alignItems="center" width="100%" spacing={1}>
            <Typography variant="h4">Environment Settings</Typography>
            <Button
              variant="outlined"
              size="small"
              disabled={!(
                name.length > 0 ||
                description.length > 0 ||
                path.length > 0 ||
                selectedPackages.length > 0
              )}
              onClick={resetEnvironmentSettings}
            >
              Reset
            </Button>
          </Stack>
        </Box>
        <Divider />

        {hideInstructions ? null : (
          <Stack justifyContent="center" direction="row">
            <Alert
              severity="info"
              sx={{ maxWidth: "40em" }}
              onClose={() => { setHideInstructions(true) }}
            >
              To create an environment similar to an existing one, find it on
              the environments page, click on it and then click the "clone"
              button in the top right corner, which will fill out the form
              below for you. Then make your desired changes.
            </Alert>
          </Stack>
        )}

        <CardContent sx={{ p: 4 }}>
          <Typography variant="subtitle2">
            <EnvironmentSettings
              name={name}
              setName={setName}
              description={description}
              setDescription={setDescription}
              tags={tags}
              setTags={setTags}
              path={path}
              setPath={setPath}
            />
            <PackageMatcher
              packages={packages}
              selectedPackages={selectedPackages}
              setSelectedPackages={setSelectedPackages}
              runEnvironmentBuild={runEnvironmentBuild}
              envBuildInFlight={envBuildInFlight}
            />
          </Typography>
          <Box>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              data-reason={envBuildInFlight ? "Build is running" : disabled ? [
                [name.length === 0, "Name"],
                [description.length === 0, "Description"],
                [(path !== "users/" + username && !groups.includes(path.split("/")[1])), "Folder"],
                [validPackages.length === 0, "Packages"]
              ].reduce((t, v) => t + (v[0] ? "\n• " + v[1] : ""), "The following need completing:") : ""}
              disabled={disabled}
              onClick={runEnvironmentBuild}
              sx={{
                float: "right",
                mb: "2%",
              }}
            >
              Create
            </Button>
          </Box>
        </CardContent>
      </Grid>
      {
        envBuildResult.title !== "" && (
          <PopUpDialog
            title={envBuildResult.title}
            message={envBuildResult.message}
            onClose={() => {
              setEnvBuildResult({ title: "", message: "" })
              resetEnvironmentSettings()
              navigate("/environments")
            }}
          />
        )
      }
    </Grid>
  </>;
}
