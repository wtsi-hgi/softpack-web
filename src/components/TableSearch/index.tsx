import { Box } from "@mui/material";

// requestSearch searches and returns the table where all rows, in any column,
// contain the value typed into the search bar. It also validates the input
// to make sure that it is safe, rejecting it if not.
const requestSearch = (rows: {[k: string]: any}[], cols: string[], searchedVal:string) => {
  const invalidInput = !validInput(searchedVal);

  if (validInput(searchedVal)) {
    const filteredRows = rows.filter((row : any) => {
      var includeRow = false;
      
      for (var header of cols) {
        if (row[header] === null || includeRow) {
          continue;
        }
        
        includeRow = row[header].toString().toLowerCase().includes(searchedVal.toLowerCase());
      }

      return includeRow;
    })

    rows = filteredRows; // Renaming to satisfy JS property requirements.
  }

  return {rows, invalidInput}
}

// validInput returns true if its string argument is valid by OWASP definition
// (see documentation for more).
function validInput(input:string) {
  const valid = (input.length < 255) && containsValidChars(input) && !isPathAlteration(input) && (typeof input === "string");
  
  if (valid) {
    console.log("Valid input: ", input);
  } else {
    console.log("Invalid input: ", input);
  }

  return valid;
}

// containsValidChars returns true if the string contains only characters @, ., 0-9, a-z
// and A-Z, false if not.
function containsValidChars(input:string) {
  return /^[\x2E || \x30-\x39 || \x40-\x5A || \x61-\x7A]*$/.test(input);
}

// isPathAlteration returns true if the string represents a path alteration
// character '../', '..\', false if not. This is used as as part of input validation.
function isPathAlteration(input:string) {
  return ((input === "../") || (input === "..\\"));
}

function TableSearch() {
  return (
    <Box>
    </Box>
  );
}

export default TableSearch;
