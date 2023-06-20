import { useQuery } from "@apollo/client";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Autocomplete, Box, Tab, TextField } from "@mui/material";
import { useEffect, useState } from "react";

function EnvSelect(data) {
  const [value, setValue] = useState(null);
  const [pythonPackages, setPythonPackages] = useState([]);

  useEffect(() => {
    //const namesArray = data.packages.packages.map(item => item.name);
    console.log('data', data.data)
    //setPythonPackages(namesArray)
    
    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
      setValue(newValue);
    }
  })
  
  return (
    <Box> 
      Hello
    </Box>
  );
}

export default EnvSelect;