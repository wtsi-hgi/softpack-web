import { createContext, useContext, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import {
	Box,
	Button,
	Divider,
	Grid,
	Stack,
	TextField,
	Typography,
} from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { PopUpDialog } from "../CreateEnvironment/PopUpDialog";
import { HelpIcon } from "../HelpIcon";
import { UserContext } from "../UserContext";
import CoreURL from "../../core";

export type RequestedRecipe = {
	name: string;
	version: string;
	url: string;
	description: string;
	username: string;
}

type RequestResponse = {
	message?: string;
	error?: string;
}

export const RequestedRecipesContext = createContext<readonly [RequestedRecipe[], () => void]>([[], () => {}]);

export default function RequestRecipe() {
	const [requested, updateRequested] = useContext(RequestedRecipesContext),
	      [requestResult, setRequestResult] = useState<[string, string] | null>(null),
	      [name, setName] = useState(""),
	      [version, setVersion] = useState(""),
	      [url, setURL] = useState(""),
	      [description, setDescription] = useState(""),
	      [inFlight, setInFlight] = useState(false),
              { username } = useContext(UserContext),
	      disabled = username === "" || name === "" || version === "" || url === "" || description === "";

	return <>
	  <Grid item xs={11}>
	    <Box p={2}>
	      <Stack mt={1} direction="row" alignItems="center" width="100%" spacing={1}>
	        <Typography variant="h4">Request a Recipe</Typography>
	      </Stack>
	    </Box>
	    <Divider />
	  <Grid container spacing={1}>
	    <Grid item xs={12} sm={4} md={3} textAlign={{ sm: "right" }}>
	      <Box pr={3} pb={3} display="flex" justifyContent="flex-end">
	        Name:
	        <HelpIcon title="Choose a name for your recipe, excluding -version" />
	      </Box>
	    </Grid>
	    <Grid item xs={12} sm={8} md={9} pb={3}>
	      <TextField
	        id="name-field"
	        variant="standard"
	        value={name}
	        onChange={(e) => setName((e.target as HTMLInputElement).value)}
	      />
	    </Grid>
	    <Grid item xs={12} sm={4} md={3} textAlign={{ sm: "right" }}>
	      <Box pr={3} pb={3} display="flex" justifyContent="flex-end">
	        Version:
	        <HelpIcon title="The requested version of the recipe." />
	      </Box>
	    </Grid>
	    <Grid item xs={12} sm={8} md={9} pb={3}>
	      <TextField
	        id="version-field"
	        variant="standard"
	        value={version}
	        onChange={(e) => setVersion((e.target as HTMLInputElement).value)}
	      />
	    </Grid>
	    <Grid item xs={12} sm={4} md={3} textAlign={{ sm: "right" }}>
	      <Box pr={3} pb={3} display="flex" justifyContent="flex-end">
	        URL:
	        <HelpIcon title="A URL for the package." />
	      </Box>
	    </Grid>
	    <Grid item xs={12} sm={8} md={9} pb={3}>
	      <TextField
	        id="url=field"
	        variant="standard"
	        placeholder="http://"
	        value={url}
	        onChange={(e) => setURL((e.target as HTMLInputElement).value)}
	      />
	    </Grid>
	    <Grid item xs={12} sm={4} md={3} textAlign={{ sm: "right" }}>
	      <Box pr={3} pb={3} display="flex" justifyContent="flex-end">
	        Description:
	        <HelpIcon title="Describe the purpose of your recipe" />
	      </Box>
	    </Grid>
	    <Grid item xs={12} sm={8} md={9} pb={3}>
	      <TextField
	        id="description-field"
	        multiline
	        sx={{ width: "75%" }}
	        value={description}
	        onChange={(e) =>
	          setDescription((e.target as HTMLInputElement).value)
	        }
	        variant="standard"
	      />
	    </Grid>
	  </Grid>
	  <Button
	    sx={{float: "right"}}
	    variant="contained"
	    startIcon={<AddIcon />}
	    disabled={inFlight || disabled}
	    data-reason={inFlight ? "" : disabled ? [
	      [username === "", "Username"],
	      [name === "", "Name"],
	      [version === "", "Version"],
	      [url === "", "URL"],
	      [description === "", "Description"],
	    ].reduce((t, v) => t + (v[0] ? "\n• " + v[1] : ""), "The following need completing:") : ""}
	    onClick={() => {
		setInFlight(true);
		fetch(CoreURL + "requestRecipe", {"method": "POST", "body": JSON.stringify({name, version, url, description, username})})
		.then(r => r.json())
		.then((d: RequestResponse) => {
			if (d["error"] !== undefined) {
				setRequestResult(["Error", d["error"]!])
			} else {
				setRequestResult(["Recipe Requested", d["message"]!]);
				requested.push({name, version, url, description, username});
				updateRequested();
			}
		});
	    }}>
	      Request
	    </Button>
	  {requested.length > 0 && <>
	    <Box p={2}>
	      <Stack mt={1} direction="row" alignItems="center" width="100%" spacing={1}>
	        <Typography variant="h4">Existing Requests</Typography>
	      </Stack>
	    </Box>
	    <Divider />
	    <Table>
	      <TableHead>
	        <TableRow>
	          <TableCell>Name</TableCell>
	          <TableCell>Version</TableCell>
	          <TableCell>URL</TableCell>
	          <TableCell>Description</TableCell>
	        </TableRow>
	      </TableHead>
	      <TableBody>
	        {requested.map(r => <TableRow>
			<TableCell>{r.name}</TableCell>
			<TableCell>{r.version}</TableCell>
			<TableCell>{r.url}</TableCell>
			<TableCell>{r.description}</TableCell>
		</TableRow>)}
	      </TableBody>
	    </Table>
	  </>}
	  </Grid>
          {
            requestResult  && (
              <PopUpDialog
                title={requestResult[0]}
                message={requestResult[1]}
                onClose={() => {
			setRequestResult(null);
			setInFlight(false);
		}}
              />
            )
          }
	</>
}
