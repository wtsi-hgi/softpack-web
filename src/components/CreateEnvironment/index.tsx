import type { Package } from '../../queries';
import { Grid } from '@mui/material';
import { useMutation, useQuery } from '@apollo/client';
import EnvironmentSettings from './EnvironmentSettings';
import PackageSettings from './PackageSettings';
import { useState } from 'react';
import { ALL_PACKAGES, CREATE_ENV } from '../../queries';
import { PackageContext } from './PackageContext';
import { PopUpDialog } from './PopUpDialog';
import { useLocalStorage } from '@uidotdev/usehooks';

// CreateEnvironment displays the 'create environment' page.
export default function CreateEnvironment() {
  const { loading, data, error } = useQuery(ALL_PACKAGES);
  const [envBuildError, setEnvBuildError] = useState("");
  const [envBuildSuccessful, setEnvBuildSuccessful] = useState(false);
  const [, setIgnoreReady] = useLocalStorage("environments-ignoreready", false);
	const [, setOnlyMine] = useLocalStorage("environments-mine", false);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [path, setPath] = useState('');
  const [selectedPackages, setSelectedPackages] = useState<Package[]>([]);
  const [testPackages, setTestPackages] = useState<string[]>([]);

  const runEnvironmentBuild = () => {
    createEnvironment({ variables: { name, description, path, packages: selectedPackages } })
  }

  const [createEnvironment, { loading: envBuildInFlight }] = useMutation(CREATE_ENV, {
    // onCompleted will pick up any errors which the backend itself raises, like
    // an environment name already existing.
    onCompleted: data => {
      if (data.createEnvironment.__typename === "CreateEnvironmentSuccess") {
        setEnvBuildSuccessful(true);
        // when the user next navigates to the Environments page, they should be
        // presented with their currently-building environment.
        setIgnoreReady(true);
        setOnlyMine(true);
      } else {
        setEnvBuildError(data.createEnvironment.message);
      }
    },
    // onError looks at GraphQL errors specifically.
    onError: error => {
      const messages = error.graphQLErrors[0].message;
      console.log('GraphQL ERROR: ', messages);
      setEnvBuildError(messages);
    },
  });

  if (loading) {
    return <div>loading...</div>
  }

  if (error) {
    return (
      <div style={{ color: 'red' }}>
        {error.message}
      </div>
    )
  }

  const packages = new Map<string, string[]>()
  data?.packageCollections.forEach(({ name, versions }) => {
    packages.set(name, versions)
  })

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
            envBuildSuccessful={envBuildSuccessful}
          />
        </PackageContext.Provider>
      </Grid>
      
        {envBuildSuccessful &&
          <PopUpDialog
          title="Your environment was successfully scheduled!"
          message="It should appear in the environments list shortly, and will be usable once the indicator is green."
          onClose={() => setEnvBuildSuccessful(false)}
        />}
      
      {envBuildError &&
        <PopUpDialog title="Environment build failed" message={envBuildError} onClose={() => setEnvBuildError("")} />}
    </Grid>
  );
}
