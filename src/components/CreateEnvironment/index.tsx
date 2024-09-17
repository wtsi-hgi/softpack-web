import { useMutation, useQuery } from "@apollo/client";
import AddIcon from "@mui/icons-material/Add";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { useLocalStorage } from "@uidotdev/usehooks";
import { useContext, useState } from "react";

import type { Package } from "../../queries";
import { ALL_ENVIRONMENTS, ALL_PACKAGES, CREATE_ENV } from "../../queries";
import { EnvironmentsQueryContext } from "../EnvironmentsQueryContext";
import EnvironmentSettings from "./EnvironmentSettings";
import { PackageContext } from "./PackageContext";
import PackageMatcher from "./PackageMatcher";
import { PopUpDialog } from "./PopUpDialog";
import { UserContext } from "../UserContext";
import { validatePackages } from "./packageValidation";
import { useNavigate } from "react-router-dom"

// CreateEnvironment displays the 'create environment' page.
export default function CreateEnvironment() {
  const { loading, data, error } = useQuery(ALL_PACKAGES);
  const environmentsQuery = useContext(EnvironmentsQueryContext);
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
  const [testPackages, setTestPackages] = useState<string[]>([]);
  const { username, groups } = useContext(UserContext);

  const [hideInstructions, setHideInstructions] = useLocalStorage("clone-instructions-viewed", false);

  const navigate = useNavigate()

  function resetEnvironmentSettings() {
    setName("")
    setDescription("")
    setPath("")
    setTags([])
    setSelectedPackages([])
  }

  const [createEnvironment, { loading: envBuildInFlight }] = useMutation(
    CREATE_ENV,
    {
      refetchQueries: [ALL_ENVIRONMENTS],
      // onCompleted will pick up any errors which the backend itself raises, like
      // an environment name already existing.
      onCompleted: (data) => {
        if (
          data.createEnvironment.__typename === "CreateEnvironmentSuccess" ||
          data.createEnvironment.__typename === "BuilderError"
        ) {
          if (
            data.createEnvironment.__typename === "CreateEnvironmentSuccess"
          ) {
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
            message: data.createEnvironment.message,
          });
        }
      },
      // onError looks at GraphQL errors specifically.
      onError: (error) => {
        const messages = error.graphQLErrors[0].message;
        console.log("GraphQL ERROR: ", messages);
        setEnvBuildResult({
          title: "Environment build failed",
          message: messages,
        });
      },
    },
  );

  if (loading || environmentsQuery.loading) {
    return <div>loading...</div>;
  }

  const e = error || environmentsQuery.error;
  if (e) {
    return <div style={{ color: "red" }}>{e.message}</div>;
  }

  const packages = new Map<string, string[]>();

  data?.packageCollections.forEach(({ name, versions }) => {
    packages.set(name, [""].concat(versions));
  });


  const [validPackages] = validatePackages(selectedPackages, packages)

  const runEnvironmentBuild = () => {
    createEnvironment({
      variables: { name, description, path, packages: validPackages, tags },
    });
  };

  const disabled = envBuildInFlight || name.length === 0 || description.length === 0 || path.length === 0 || (path !== "users/" + username && !groups.includes(path.split("/")[1])) || validPackages.length === 0;

  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="stretch"
      spacing={3}
    >
      <Grid item xs={11}>
        <Card>
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
              <PackageContext.Provider
                value={{ testPackages, setTestPackages }}
              >
                <PackageMatcher
                  packages={packages}
                  selectedPackages={selectedPackages}
                  setSelectedPackages={setSelectedPackages}
                  runEnvironmentBuild={runEnvironmentBuild}
                  envBuildInFlight={envBuildInFlight}
                />
              </PackageContext.Provider>
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
        </Card>
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
  );
}
