import { TableRow, TableCell, IconButton, Collapse, Box, Typography, } from "@mui/material";
import { useState, Fragment } from "react";

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Environment, Package } from "../../../queries";

type EnvRowParams = {
  environment: Environment;
  selectedPackages: Package[];
}

// MatchingEnv displays a single row of the "matching environments" table.
function MatchingEnv(props: EnvRowParams) {
  const [open, setOpen] = useState(false);

  const matchingPackages: Package[] = [];
  const nonmatchingPackages: Package[] = [];
  props.environment.packages.forEach(envPkg => {
    if (props.selectedPackages.some(pkg => pkg.name === envPkg.name && (!pkg.version || pkg.version === envPkg.version))) {
      matchingPackages.push(envPkg);
    } else {
      nonmatchingPackages.push(envPkg);
    }
  })

  return (
    <Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {props.environment.path}/{props.environment.name}
        </TableCell>
        <TableCell component="th" scope="row" sx={{ "white-space": "pre-line" }}>
          {props.environment.description.split("The following executables are added to your PATH")[0]}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            {nonmatchingPackages.length > 0 && <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Non-matching Packages
              </Typography>
              {nonmatchingPackages.map(pkg => `${pkg.name} (${pkg.version ?? "latest"})`).join(", ")}
            </Box>}
            {matchingPackages.length > 0 && <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Matching Packages
              </Typography>
              {matchingPackages.map(pkg => `${pkg.name} (${pkg.version ?? "latest"})`).join(", ")}
            </Box>}
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  );
}

export default MatchingEnv