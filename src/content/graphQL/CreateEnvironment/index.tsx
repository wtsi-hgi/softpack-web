import { Helmet } from 'react-helmet-async';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Grid, Container, Card } from '@mui/material';
import Footer from 'src/components/Footer';

import { useQuery } from '@apollo/client';
import { ALL_ENVIRONMENTS, TEST } from '../queries';
import { useState } from 'react';
import Test from './test';

function EnvironmentsTable() {
  const [errorMessage, setErrorMessage] = useState(null)

  const { loading, data, error } = useQuery(TEST);
   
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

  console.log(data.packageCollections[0]);
  
  return (
    <>
      <Helmet>
        <title>Environments</title>
      </Helmet>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <Card>
              <Test packages={data.packageCollections[0]}/>
            </Card>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default EnvironmentsTable;