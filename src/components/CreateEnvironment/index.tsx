import { useMutation, useQuery } from "@apollo/client";
import AddIcon from "@mui/icons-material/Add";
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { useLocalStorage } from "@uidotdev/usehooks";
import { useState } from "react";

import type { Environment, Environments, Package } from "../../queries";
import { ALL_ENVIRONMENTS, ALL_PACKAGES, CREATE_ENV } from "../../queries";
import EnvironmentSettings from "./EnvironmentSettings";
import { PackageContext } from "./PackageContext";
import PackageMatcher from "./PackageMatcher";
import { PopUpDialog } from "./PopUpDialog";

// getAvailableTags returns all tags, including duplicates, currently used by
// the passed environments.
function getAvailableTags(environments: Environments): string[] {
  return environments.flatMap((e) => e.tags);
}

// CreateEnvironment displays the 'create environment' page.
export default function CreateEnvironment() {
  const { loading, data, error } = useQuery(ALL_PACKAGES);
  const environmentsQuery = useQuery(ALL_ENVIRONMENTS);
  const [envBuildResult, setEnvBuildResult] = useState({
    title: "",
    message: "",
  });
  const [, setIgnoreReady] = useLocalStorage("environments-ignoreready", false);
  const [, setOnlyMine] = useLocalStorage("environments-mine", false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [path, setPath] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [selectedPackages, setSelectedPackages] = useState<Package[]>([]);
  const [testPackages, setTestPackages] = useState<string[]>([]);

  const runEnvironmentBuild = () => {
    createEnvironment({
      variables: { name, description, path, packages: selectedPackages, tags },
    });
  };

  const [createEnvironment, { loading: envBuildInFlight }] = useMutation(
    CREATE_ENV,
    {
      // onCompleted will pick up any errors which the backend itself raises, like
      // an environment name already existing.
      onCompleted: (data) => {
        if (data.createEnvironment.__typename === "CreateEnvironmentSuccess") {
          setEnvBuildResult({
            title: "Your environment was successfully scheduled!",
            message:
              "It should appear in the environments list shortly, and will be usable once the indicator is green.",
          });
          // when the user next navigates to the Environments page, they should be
          // presented with their currently-building environment.
          setIgnoreReady(true);
          setOnlyMine(true);
        } else if (data.createEnvironment.__typename === "BuilderError") {
          setEnvBuildResult({
            title: "Your environment was queued",
            message:
              "The build service is currently unavailable. The environment will start to build once it returns.",
          });
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
    packages.set(name, versions);
  });

  const availableTags = [
    ...new Set(getAvailableTags(environmentsQuery.data?.environments ?? [])),
  ];

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
            <Typography variant="h4">Environment Settings</Typography>
          </Box>
          <Divider />
          <CardContent sx={{ p: 4 }}>
            <Typography variant="subtitle2">
              <EnvironmentSettings
                name={name}
                setName={setName}
                description={description}
                setDescription={setDescription}
                availableTags={availableTags}
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
                disabled={
                  envBuildInFlight ||
                  name.length === 0 ||
                  description.length === 0 ||
                  path.length === 0 ||
                  selectedPackages.length === 0
                }
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

      {envBuildResult.title !== "" && (
        <PopUpDialog
          title={envBuildResult.title}
          message={envBuildResult.message}
          onClose={() => setEnvBuildResult({ title: "", message: "" })}
        />
      )}
    </Grid>
  );
}
