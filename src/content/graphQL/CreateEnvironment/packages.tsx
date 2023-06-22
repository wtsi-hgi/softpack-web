import { useQuery } from "@apollo/client";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Autocomplete, Box, Tab, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import ChipDropdown from "src/components/ChipDropdown";

function Packages(props) {
  const [value, setValue] = useState(null);
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    const packages = props.packages.map(item => item.name);
    setPackages(packages)
    
    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
      setValue(newValue);
    }
  })

  const renderTags = (value) => {
    return value.map((option, index) => (
      <ChipDropdown 
        key={index}
        data={option}
      />
    ))
  }
  
  return (
    <Box> 
      <Autocomplete
        multiple
        options={packages}
        renderTags={renderTags}
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