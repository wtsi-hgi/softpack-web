import { useContext, useState } from "react";
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
import { RequestedRecipesContext, requestRecipe, UserContext } from "../../endpoints";

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
						Details:
						<HelpIcon title="Please let us know as much as you can about this including any test data you're aware of, the command you expect to be able to run, and anything else you think might be useful." />
					</Box>
				</Grid>
				<Grid item xs={12} sm={8} md={9} pb={3}>
					<TextField
						id="description-field"
						multiline
						rows={3}
						value={description}
						onChange={(e) =>
							setDescription((e.target as HTMLInputElement).value)
						}
						variant="standard"
					/>
				</Grid>
			</Grid>
			<Button
				sx={{ float: "right" }}
				variant="contained"
				startIcon={<AddIcon />}
				disabled={inFlight || disabled}
				data-reason={inFlight ? "" : disabled ? [
					[username.trim() === "", "Username"],
					[name.trim() === "", "Name"],
					[version.trim() === "", "Version"],
					[url.trim() === "", "URL"],
					[description.trim() === "", "Details"],
				].reduce((t, v) => t + (v[0] ? "\n• " + v[1] : ""), "The following need completing:") : ""}
				onClick={() => {
					setInFlight(true);
					requestRecipe(name.trim(), version.trim(), url.trim(), description.trim(), username.trim())
						.then(d => {
							setRequestResult(["Recipe Requested", d["message"]]);
							requested.push({ name, version, url, description, username });
							updateRequested();
						})
						.catch(error => {
							setRequestResult(["Error", error])
						})
						.finally(() => {
							setInFlight(false);
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
				<p>The following recipes have been requested, but can still be used to create an environment. They will be at the bottom of the Packages list and begin with an asterisk (*). Any environment that requires one of the recipes below will be put on hold until the recipe is created, at which time the environment will start building.</p>
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
						{requested.map(r => <TableRow key={r.name + "@" + r.version}>
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
			requestResult && (
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
