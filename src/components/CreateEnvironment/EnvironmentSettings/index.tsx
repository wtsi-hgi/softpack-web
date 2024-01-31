import {
  Card,
  Box,
  Typography,
  Divider,
  CardContent,
  Grid,
  TextField,
  InputAdornment,
  Tooltip,
  FormControl,
  Select,
  MenuItem
} from "@mui/material";

import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { GROUPS } from "../../../queries";

type EnvironmentSettingsProps = {
  name: string;
  setName: (name: string) => void;
  description: string;
  setDescription: (description: string) => void;
  path: string;
  setPath: (path: string) => void;
}

// EnvironmentSettings is the card responsible for the environment settings
// available to a user when creating a new environment. E.g. Name, Description,
// etc.
function EnvironmentSettings(props: EnvironmentSettingsProps) {
  const [username, setUsername] = useState('')

  const { loading, data, error } = useQuery(GROUPS, {
    variables: { username },
  });

  useEffect(() => {
    props.setPath("");
  }, [username]);

  return (
    <Card>
      <Box p={3}>
        <Box>
          <Typography variant="h4" gutterBottom>
            Environment Settings
          </Typography>
          <Typography variant="subtitle2">
            Manage details related to your environment
          </Typography>
        </Box>
      </Box>
      <Divider />
      <CardContent sx={{ p: 4 }}>
        <Typography variant="subtitle2">
          <Grid container spacing={1}>
            <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
              <Box pr={3} pb={3} display='flex' justifyContent='flex-end'>
                Name:
              </Box>
            </Grid>
            <Grid item xs={12} sm={8} md={9} pb={3}>
              <TextField
                id='name-field'
                variant='standard'
                value={props.name}
                onChange={(e) => props.setName((e.target as HTMLInputElement).value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Tooltip title={"Choose a name for your environment"}>
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
            </Grid>
            <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
              <Box pr={3} pb={3} display='flex' justifyContent='flex-end'>
                Description:
              </Box>
            </Grid>
            <Grid item xs={12} sm={8} md={9} pb={3}>
              <TextField
                id='description-field'
                multiline
                sx={{ width: '75%' }}
                value={props.description}
                onChange={(e) => props.setDescription((e.target as HTMLInputElement).value)}
                variant='standard'
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Tooltip title={"Describe the purpose of your environment"}>
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
                }}></TextField>
            </Grid>
            <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
              <Box pr={3} pb={3} display='flex' justifyContent='flex-end'>
                Username:
              </Box>
            </Grid>
            <Grid item xs={12} sm={8} md={9} pb={3}>
              <TextField
                id='username-field'
                variant='standard'
                value={username}
                onChange={(e) => setUsername((e.target as HTMLInputElement).value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Tooltip title={"Enter your username"}>
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
            </Grid>
            <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
              <Box pr={3} pb={3} display='flex' justifyContent='flex-end'>
                Folder:
              </Box>
            </Grid>
            <Grid item xs={12} sm={8} md={9} pb={3}>
              <FormControl>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={props.path}
                  onChange={(e) => {
                    props.setPath(e.target.value);
                  }}
                >
                  {(data?.groups?.length ?? 0) > 0
                    ? <MenuItem value={`users/${username}`}>users/{username}</MenuItem>
                    : <MenuItem disabled>Invalid username</MenuItem>}
                  {loading || error ? null : data?.groups.map(({ name }: { name: string }) =>
                    <MenuItem key={name} value={`groups/${name}`}>groups/{name}</MenuItem>)}
                  {error && <MenuItem disabled>error getting groups: {error.message}</MenuItem>}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Typography>
      </CardContent>
    </Card>
  );
}

export default EnvironmentSettings