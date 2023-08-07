import { Grid } from '@mui/material';
import { useQuery } from '@apollo/client';
import EnvironmentSettings from './EnvironmentSettings';
import PackageSettings from './PackageSettings';
import { useState, useContext, createContext } from 'react';
import { ALL_PACKAGES } from '../../queries';
import MatchingEnvs from './MatchingEnvs';
import Test from './Test';
import { PackageContext } from './PackageContext';

// CreateEnvironment displays the 'create environment' page.
export default function CreateEnvironment() {
  const { loading, data, error } = useQuery(ALL_PACKAGES);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [path, setPath] = useState('');
  const [packages, setPackages] = useState<string[] | null>(['']);

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
        <PackageContext.Provider value={{packages, setPackages}}>
          <Test />
        </PackageContext.Provider>
      </Grid>
      <Grid item xs={11}>
        <PackageSettings 
          data={data.packageCollections}
          setName={setName}
          setDescription={setDescription}
          setPath={setPath}
          buildName={name}
          buildDesc={description}
          buildPath={path}
        />
      </Grid>
      <Grid item xs={11}>
        <MatchingEnvs />
      </Grid>
    </Grid>
  );
}
