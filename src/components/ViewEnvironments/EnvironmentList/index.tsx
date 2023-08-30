import type { Environments } from "../../../queries";
import { Card, Container, Grid, InputAdornment, TextField, Tooltip } from "@mui/material";
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { useQuery } from "@apollo/client";
import EnvironmentTable from "../EnvironmentTable";
import { ALL_ENVIRONMENTS } from "../../../queries";
import { useState } from "react";

// EnvironmentList displays the 'view environments' page of the program.
const EnvironmentList = () => {
  const { loading, data, error } = useQuery<Environments>(ALL_ENVIRONMENTS),
    [filter, setFilter] = useState<string>("")

  if (loading) {
    return <div>loading...</div>
  }

  if (error || !data) {
    return (
      <div style={{ color: 'red' }}>
        {error?.message || "Unknown error"}
      </div>
    )
  }

  let filteredEnvironments = data.environments;

  if (filter) {
    const parts = filter.split(" ");

    filteredEnvironments = filteredEnvironments.filter(e => parts.every(part => e.name.includes(part) || e.packages.some(pkg => pkg.name.includes(part))));
  }

  return <>
    <TextField
      id='name-field'
      variant='standard'
      placeholder="Filter Environments By Package"
      style={{ margin: "2em", padding: "0.5em", width: "calc(100% - 4em)" }}
      onChange={e => setFilter(e.target.value)}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <Tooltip title={"Filter by space-delineated list of packages"}>
              <HelpOutlineIcon
                sx={{
                  color: 'rgba(34, 51, 84, 0.7)',
                  padding: '0 0 0 8px',
                  fontSize: '25px'
                }}
              />
            </Tooltip>
          </InputAdornment>
        ),
      }}>
    </TextField>
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
            <EnvironmentTable environments={filteredEnvironments} />
          </Card>
        </Grid>
      </Grid>
    </Container>
  </>
}

export default EnvironmentList;
