import {
  Grid,
  Typography,
  CardContent,
  Card,
  Box,
  Divider,
  TableContainer,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';

import { useQuery } from '@apollo/client';
import EnvironmentSettings from './EnvironmentSettings';
import AccordionRow from './EnvExample';
import PackageSettings from './PackageSettings';
import { useState } from 'react';
import { ALL_PACKAGES } from '../../queries';
import MatchingEnvs from './MatchingEnvs';

// CreateEnvironment displays the 'create environment' page.
export default function CreateEnvironment() {
  const { loading, data, error } = useQuery(ALL_PACKAGES);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [path, setPath] = useState('');

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
      spacing={3}>
      <Grid item xs={11}>
        <EnvironmentSettings 
          setName={setName}
          setDescription={setDescription}
          setPath={setPath}
        />
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
