import {
  Box,
  FormControl,
  Grid,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useContext, useEffect } from "react";

import { HelpIcon } from "../../HelpIcon";
import { TagSelect } from "../../TagSelect";
import { UserContext } from "../../UserContext";

type EnvironmentSettingsProps = {
  name: string;
  setName: (name: string) => void;
  description: string;
  setDescription: (description: string) => void;
  tags: string[];
  setTags: (tags: string[]) => void;
  path: string;
  setPath: (path: string) => void;
};

// EnvironmentSettings is the card responsible for the environment settings
// available to a user when creating a new environment. E.g. Name, Description,
// etc.
function EnvironmentSettings(props: EnvironmentSettingsProps) {
  const { username, groups } = useContext(UserContext);

  useEffect(() => {
    props.setPath("");
  }, [username]);

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} sm={4} md={3} textAlign={{ sm: "right" }}>
        <Box pr={3} pb={3} display="flex" justifyContent="flex-end">
          Name:
          <HelpIcon title="Choose a name for your environment" />
        </Box>
      </Grid>
      <Grid item xs={12} sm={8} md={9} pb={3}>
        <TextField
          id="name-field"
          variant="standard"
          value={props.name}
          onChange={(e) => props.setName((e.target as HTMLInputElement).value)}
        />
      </Grid>
      <Grid item xs={12} sm={4} md={3} textAlign={{ sm: "right" }}>
        <Box pr={3} pb={3} display="flex" justifyContent="flex-end">
          Description:
          <HelpIcon title="Describe the purpose of your environment" />
        </Box>
      </Grid>
      <Grid item xs={12} sm={8} md={9} pb={3}>
        <TextField
          id="description-field"
          multiline
          sx={{ width: "75%" }}
          value={props.description}
          onChange={(e) =>
            props.setDescription((e.target as HTMLInputElement).value)
          }
          variant="standard"
        />
      </Grid>
      <Grid item xs={12} sm={4} md={3} textAlign={{ sm: "right" }}>
        <Box pr={3} pb={3} display="flex" justifyContent="flex-end">
          Tags:
          <HelpIcon title="Optionally, tag your environment for discoverability" />
        </Box>
      </Grid>
      <Grid item xs={12} sm={8} md={9} pb={3}>
        <Box sx={{ width: "75%" }}>
          <TagSelect multiple value={props.tags} onChange={props.setTags} />
        </Box>
      </Grid>
      <Grid item xs={12} sm={4} md={3} textAlign={{ sm: "right" }}>
        <Box pr={3} pb={3} display="flex" justifyContent="flex-end">
          Folder:
          <HelpIcon title="Select a folder to organise your environment" />
        </Box>
      </Grid>
      <Grid item xs={12} sm={8} md={9} pb={3}>
        <FormControl variant="standard" sx={{ minWidth: 189 }}>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={props.path}
            onChange={(e) => {
              props.setPath(e.target.value);
            }}
          >
            {username ? (
              (groups?.length ?? 0) > 0 ? (
                <MenuItem value={`users/${username}`}>
                  users/{username}
                </MenuItem>
              ) : (
                <MenuItem disabled>Invalid username</MenuItem>
              )
            ) : (
              <MenuItem disabled>Enter your username in the top-right</MenuItem>
            )}
            {groups.map((name) => (
              <MenuItem key={name} value={`groups/${name}`}>
                groups/{name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
}

export default EnvironmentSettings;
