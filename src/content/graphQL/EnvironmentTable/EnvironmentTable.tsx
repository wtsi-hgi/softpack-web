import { Box, Chip, Divider, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import CustomChip from "./CustomChip";

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
    const random = data.environments
    setEnvironments(random);
  }, [])
  
  return (
    <Box>     
      {environments.map((env) => {
        return (
          <Box key={env.id} pb={4}>
            <Typography><Typography variant={"h4"}>Name:</Typography> {env.name}</Typography>
            <Typography><Typography variant={"h4"}>Path:</Typography> {env.path}</Typography>
            <Typography><Typography variant={"h4"}>Description:</Typography> {env.description}</Typography>            
            {env.packages.map((package_) => {
              return (
                <Box key={package_.id} sx={{display:"inline-flex"}}>
                  <CustomChip name={package_.name}/>
                  {package_.version && <Typography>Package Version: {package_.version}</Typography>}
                </Box>
              );
            })}
          </Box>
        );
      })}
    </Box>
  );
}

export default EnvSelect;
