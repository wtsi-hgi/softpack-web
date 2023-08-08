import { Grid } from '@mui/material';
import { useMutation, useQuery } from '@apollo/client';
import EnvironmentSettings from './EnvironmentSettings';
import PackageSettings from './PackageSettings';
import { useState } from 'react';
import { ALL_PACKAGES, CREATE_ENV } from '../../queries';
import MatchingEnvs from './MatchingEnvs';
import { PackageContext } from './PackageContext';
import ErrorDialog from './ErrorDialog';

// CreateEnvironment displays the 'create environment' page.
export default function CreateEnvironment() {
  const { loading, data, error } = useQuery(ALL_PACKAGES);
  const [envBuildError, setEnvBuildError] = useState(false);
  const [envBuildSuccessful, setEnvBuildSuccessful] = useState(false);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [path, setPath] = useState('');
  const [testPackages, setTestPackages] = useState<string[] | null>(['']);

  const runEnvironmentBuild = () => {
    console.log('hello from runEnvironmentBuild');
    //createEnvironment({ variables: { name, description, path, packages } })
  }

  const [ createEnvironmentQuery ] = useMutation(CREATE_ENV, {
    // onCompleted will pick up any errors which the backend itself raises, like
    // an environment name already existing.
    onCompleted: (event: any) => {
      console.log('completion event', event);

      if (
        event.createEnvironment.__typename === "CreateEnvironmentSuccess"
      ) {
        console.log('build successful')
        setEnvBuildSuccessful(true);
      } else {
        // Regardless of error, error message says 'env with that name already
        // exists'. More specific error messages are a job for the future.
        console.log(event)
        setEnvBuildError(true);
      }
    },
    // onError looks at GraphQL errors specifically.
    onError: (error: any) => {
      const messages = error.graphQLErrors[0].message;
      console.log('GraphQL ERROR: ', messages);
      setEnvBuildError(true);
    },
  });

  if (loading) {
    return <div>loading...</div>
  }

  if (error) {
    return (
      <div style={{color:'red'}}>
        {error.message}
      </div>
    )
  }

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
          setName={setName}
          setDescription={setDescription}
          setPath={setPath}
        />
      </Grid>
      <Grid item xs={11}>
        {/* Some stuff is being passed as props, even though I am wrapping
         component in context, because the thing in context (selected 
         packages) and the props are different; they operate across different 
         components and at different levels, therefore, they warrant different
         methods of passing. */}
        <PackageContext.Provider value={{testPackages, setTestPackages}}>
          <PackageSettings 
            data={data.packageCollections}
            runEnvironmentBuild={runEnvironmentBuild}
            envBuildSuccessful={envBuildSuccessful}
          />
        </PackageContext.Provider>
      </Grid>
      <Grid item xs={11}>
        <MatchingEnvs />
      </Grid>
      {envBuildError && 
        <ErrorDialog name={name} setError={setEnvBuildError} />}
    </Grid>
  );
}
