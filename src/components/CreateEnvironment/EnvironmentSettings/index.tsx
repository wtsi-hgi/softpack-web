import {
  Autocomplete,
  Box,
  FormControl,
  Grid,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";

import { compareStrings } from "../../../compare";
import { HelpIcon } from "../../HelpIcon";
import { UserContext } from "../../UserContext";

type EnvironmentSettingsProps = {
  name: string;
  setName: (name: string) => void;
  description: string;
  setDescription: (description: string) => void;
  availableTags: string[];
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
  const [tagInput, setTagInput] = useState("");

  useEffect(() => {
    props.setPath("");
  }, [username]);

  const allTags = new Set([...props.availableTags, ...props.tags]);
  const tagOptions: (string | { label: string; value: string })[] =
    Array.from(allTags).toSorted(compareStrings);
  if (tagInput && tagOptions.indexOf(tagInput) < 0) {
    tagOptions.unshift({ label: `Add "${tagInput}"`, value: tagInput });
  }

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
          <Autocomplete
            multiple
            freeSolo
            options={tagOptions}
            value={props.tags}
            onChange={(_, value) =>
              props.setTags(
                value.map((elem) =>
                  typeof elem === "string" ? elem : elem.value,
                ),
              )
            }
            inputValue={tagInput}
            onInputChange={(_, value) => setTagInput(value)}
            getOptionLabel={(option) =>
              typeof option === "string" ? option : option.label
            }
            renderInput={(params) => {
              return <TextField {...params} variant="standard" />;
            }}
          />
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
