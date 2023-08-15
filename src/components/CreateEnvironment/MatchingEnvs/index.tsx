import { Card, Box, Typography, Divider, CardContent, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material"
import EnvExample from "../EnvExample";

// matchingEnvs is a hardcoded table that shows an illustration of what the
// program should look like, as it informs users in real-time that they
// environment they are trying to create already exists.
export default function matchingEnvs() {
  
  const envs = [
    {'Environment':'tremendous-mandril',
     'Description':'Mauris laoreet blandit odio, vitae mollis enim.'}, 
  
    {'Environment':'ubiquitous-clam',
    'Description':'Pellentesque feugiat accumsan consectetur.'},
  ];

  return (
    <Card>
      <Box p={3}>
        <Box>
          <Typography variant="h4" gutterBottom>
            Environments Matching Your Criteria
          </Typography>
          <Typography variant="subtitle2">
            Save time and space by selecting one of the options
            below
          </Typography>
        </Box>
      </Box>
      <Divider />
      <CardContent sx={{p: 4}}>
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table" size='small'>
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>Environment</TableCell>
                <TableCell align="left">Description</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {envs.map((row, index) => {
                return (
                  <EnvExample key={index} row={row} />
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  )
}