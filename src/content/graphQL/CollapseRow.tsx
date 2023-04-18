import { TableRow, TableCell, IconButton, Collapse, Box, Typography, List, ListItem } from "@mui/material";
import { useState, Fragment } from "react";

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

function CollapseRow(row) {
    const [open, setOpen] = useState(false);
  
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
            {row.row.Environment}
          </TableCell>
          <TableCell component="th" scope="row">
            {row.row.Description}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  Packages
                </Typography>
                <List>
                  <ListItem>Package 1</ListItem>
                  <ListItem>Pacakge 2</ListItem>
                  <ListItem>Pacakge 3</ListItem>
                  <ListItem>Pacakge 4</ListItem>
                </List>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </Fragment>
    );
  }

export default CollapseRow