import { Card, Container, Grid } from "@mui/material";
import { useQuery } from "@apollo/client";
import EnvironmentTable from "../EnvironmentTable";
import { ALL_ENVIRONMENTS } from "../../../queries";
//import data from './data.json'

const EnvironmentList = () => {
  const { loading, data, error } = useQuery(ALL_ENVIRONMENTS);
 
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

  console.log(data);
  
  return (
    <Container>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="stretch"
        spacing={3}
      >
        <Grid item xs={12}>
          <Card>
            <EnvironmentTable environments={data.environments} />
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

export default EnvironmentList;
