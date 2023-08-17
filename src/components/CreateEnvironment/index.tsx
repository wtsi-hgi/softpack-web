import { useState } from 'react';
import { Grid } from '@mui/material';
import { PackageContext } from './PackageContext';
import { useMutation, useQuery } from '@apollo/client';

import EnvironmentSettings from './EnvironmentSettings';
import PackageSettings from './PackageSettings';
import MatchingEnvs from './MatchingEnvs';
import ErrorDialog from './ErrorDialog';

import { ALL_PACKAGES, CREATE_ENV } from '../../queries';

// CreateEnvironment displays the 'create environment' page.
export default function CreateEnvironment() {
  const { loading, data, error } = useQuery(ALL_PACKAGES);
  const [envBuildError, setEnvBuildError] = useState(false);
  const [envBuildSuccessful, setEnvBuildSuccessful] = useState(false);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [path, setPath] = useState('');
  const [packages, setPackages] = useState<string[]>([]);

  const runEnvironmentBuild = () => {
    console.log('hello from runEnvironmentBuild');
    console.log("here's all the packages", packages);
    
    //createEnvironmentQuery({ variables: { name, description, path, testPackages } })
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
         methods of passing, in my opinion. */}
        <PackageContext.Provider value={{packages, setPackages}}>
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
