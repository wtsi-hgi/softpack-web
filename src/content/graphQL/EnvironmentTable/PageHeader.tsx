import { Typography, Button, Grid, Link } from '@mui/material';
import { NavLink as RouterLink } from 'react-router-dom';

import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';

function PageHeader() {
  const user = {
    name: 'Username',
    avatar: '/static/images/avatars/1.jpg'
  };
  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Environments
        </Typography>
        <Typography variant="subtitle2">
          {user.name}, these are the environments
        </Typography>
      </Grid>
      <Grid item>
        <Button
          sx={{ mt: { xs: 2, md: 0 } }}
          variant="contained"
          startIcon={<AddTwoToneIcon fontSize="small" />}
          component={RouterLink}
          to='/graphql/create-environment'
        >
          Create environment
        </Button>
      </Grid>
    </Grid>
  );
}

export default PageHeader;