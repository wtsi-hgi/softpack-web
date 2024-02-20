import { useMutation, useQuery } from "@apollo/client";
import { Grid } from "@mui/material";
import { useLocalStorage } from "@uidotdev/usehooks";
import { useState } from "react";

import type { Package } from "../../queries";
import { ALL_PACKAGES, CREATE_ENV } from "../../queries";
import EnvironmentSettings from "./EnvironmentSettings";
import { PackageContext } from "./PackageContext";
import PackageSettings from "./PackageSettings";
import { PopUpDialog } from "./PopUpDialog";

// CreateEnvironment displays the 'create environment' page.
export default function CreateEnvironment() {
  const { loading, data, error } = useQuery(ALL_PACKAGES);
  const [envBuildResult, setEnvBuildResult] = useState({
    title: "",
    message: "",
  });
  const [, setIgnoreReady] = useLocalStorage("environments-ignoreready", false);
  const [, setOnlyMine] = useLocalStorage("environments-mine", false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [path, setPath] = useState("");
  const [selectedPackages, setSelectedPackages] = useState<Package[]>([]);
  const [testPackages, setTestPackages] = useState<string[]>([]);

  const runEnvironmentBuild = () => {
    createEnvironment({
      variables: { name, description, path, packages: selectedPackages },
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

  if (loading) {
    return <div>loading...</div>;
  }

  if (error) {
    return <div style={{ color: "red" }}>{error.message}</div>;
  }

  const packages = new Map<string, string[]>();
  data?.packageCollections.forEach(({ name, versions }) => {
    packages.set(name, versions);
  });

  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="stretch"
      spacing={3}
    >
      <Grid item xs={11}>
        <EnvironmentSettings
          name={name}
          setName={setName}
          description={description}
          setDescription={setDescription}
          path={path}
          setPath={setPath}
        />
      </Grid>
      <Grid item xs={11}>
        {/* Some stuff is being passed as props, even though I am wrapping
         component in context, because the thing in context (selected
         packages) and the props are different; they operate across different
         components and at different levels, therefore, they warrant different
         methods of passing, in my opinion. */}
        <PackageContext.Provider value={{ testPackages, setTestPackages }}>
          <PackageSettings
            packages={packages}
            selectedPackages={selectedPackages}
            setSelectedPackages={setSelectedPackages}
            runEnvironmentBuild={runEnvironmentBuild}
            envBuildInFlight={envBuildInFlight}
          />
        </PackageContext.Provider>
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
