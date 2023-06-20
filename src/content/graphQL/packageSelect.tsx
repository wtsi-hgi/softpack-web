import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Autocomplete from '@mui/lab/Autocomplete';
import { TextField } from '@mui/material';

const TabbedAutocomplete = (packages) => {
  const [tabValue, setTabValue] = useState(0);
  const [selectedValues, setSelectedValues] = useState([]);

  const test = (...packages) => {
    console.log(packages);
    let sum = 0;
    return sum;
  }

  console.log(test);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleAutocompleteChange = (tabId, newValue) => {
    setSelectedValues((prevValues) => {
      const updatedValues = [...prevValues];
      updatedValues[tabId] = newValue;
      return updatedValues;
    });
  };

  const renderTabs = () => {
    return selectedValues.map((value, index) => {
      <Tab label={`Tab ${index + 1}`} key={index} />
    });
  };

  const renderAutocomplete = () => {
    return (
      <Autocomplete
        value={selectedValues[tabValue]}
        onChange={(event, newValue) =>
          handleAutocompleteChange(tabValue, newValue)
        }
        options={[]}
        renderInput={(params) => (
          <TextField {...params} label={`Tab ${tabValue + 1}`} />
        )}
      />
    );
  };

  return (
    <div>
      <Tabs value={tabValue} onChange={handleTabChange} indicatorColor="primary">
        {renderTabs()}
      </Tabs>

      {renderAutocomplete()}
    </div>
  );
};

export default TabbedAutocomplete;
