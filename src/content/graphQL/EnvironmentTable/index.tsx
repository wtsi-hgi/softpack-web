import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Grid, Container, Card } from '@mui/material';
import Footer from 'src/components/Footer';

import Environments from './Environments';
import { useQuery } from '@apollo/client';
import { ALL_ENVIRONMENTS } from '../queries';
import { useState } from 'react';
import EnvironmentTable from './EnvironmentTable';

function EnvironmentsTable() {
  const [errorMessage, setErrorMessage] = useState(null)

  const { loading, data, error } = useQuery(ALL_ENVIRONMENTS)
 
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
    <>
      <Helmet>
        <title>Environments</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper>
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
              <EnvironmentTable environments={data.allEnvironments} />
            </Card>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default EnvironmentsTable;