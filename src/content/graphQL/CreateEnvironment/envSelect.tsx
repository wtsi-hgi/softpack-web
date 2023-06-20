import { useQuery } from "@apollo/client";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Autocomplete, Box, Divider, Tab, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";

interface Environment {
  description: string;
  id: string;
  name: string;
  packages: Package[];
  path: string;
  __typename: string;
}

interface Package {
  id: string;
  name: string;
  version: string;
}

function EnvSelect(data) {
  const [value, setValue] = useState(null);
  const [environments, setEnvironments] = useState<Environment[]>([]);

  useEffect(() => {
    const random = [data.data]
    setEnvironments(random);

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
      setValue(newValue);
    }
  }, [])
  
  return (
    <Box> 
      <Typography variant="h2">Environments:</Typography >
      <Divider/>
    
      {environments.map((env) => {
        return (
          <Box key={env.id}>
            <Typography><Typography variant={"h4"}>Name:</Typography> {env.name}</Typography>
            <Typography><Typography variant={"h4"}>Description:</Typography> {env.description}</Typography>            
            {env.packages.map((package_) => {
              return (
                <Box key={package_.id}>
                  <Typography>Package Name: {package_.name}</Typography>
                  {package_.version && <Typography>Package Version: {package_.version}</Typography>}
                </Box>
              );
            })}
            <Typography><Typography variant={"h4"}>Path:</Typography> {env.path}</Typography>
          </Box>
        );
      })}
    </Box>
  );
}

export default EnvSelect;