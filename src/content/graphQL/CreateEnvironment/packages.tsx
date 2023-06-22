import { useQuery } from "@apollo/client";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Autocomplete, Box, Tab, TextField } from "@mui/material";
import { useEffect, useState } from "react";

function Packages(props) {
  const [value, setValue] = useState(null);
  const [pythonPackages, setPythonPackages] = useState([]);  

  useEffect(() => {
    const packages = props.packages.map(item => item.name);
    setPythonPackages(packages)
    
    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
      setValue(newValue);
    }
  })
  
  return (
    <Box> 
      <Autocomplete
        multiple
        options={pythonPackages}
        renderInput={(params) => {
          return (
            <TextField
              {...params}
              variant="standard"
            />
          );
        }}
      />
    </Box>
  );
}

export default Packages;