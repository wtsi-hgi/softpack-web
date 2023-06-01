import { useQuery } from "@apollo/client";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Autocomplete, Box, Tab, TextField } from "@mui/material";
import { useEffect, useState } from "react";

function Test(data) {
  const [value, setValue] = useState(null);
  const [pythonPackages, setPythonPackages] = useState([]);

  useEffect(() => {
    const namesArray = data.packages.packages.map(item => item.name);
    setPythonPackages(namesArray)
    
    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
      setValue(newValue);
    }
  })
  
  
  return (
    <Box> 
      <Autocomplete
        options={pythonPackages}
        renderInput={(params) => <TextField {...params} label="10,000 options" />}
        />
    </Box>
  );
}

export default Test;