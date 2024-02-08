import { Card, CardContent, Checkbox, Container, FormControlLabel, FormGroup, InputAdornment, TextField, Tooltip, Typography } from "@mui/material";
import { useApolloClient, useQuery } from "@apollo/client";
import EnvironmentTable from "../EnvironmentTable";
import { ALL_ENVIRONMENTS } from "../../../queries";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { HelpIcon } from "../../HelpIcon";
import { UserContext } from "../../UserContext";

const SECOND = 1000;
const MAX_REFETCH_INTERVAL = 10 * SECOND;

// EnvironmentList displays the 'view environments' page of the program.
const EnvironmentList = () => {
	const { loading, data, error } = useQuery(ALL_ENVIRONMENTS);
	const [filter, setFilter] = useState("");
	const client = useApolloClient();
	const [refetchInterval, setRefetchInterval] = useState(SECOND);
	const [onlyMine, setOnlyMine] = useState(false);
	const { username, groups } = useContext(UserContext);

	useEffect(() => {
		let interval = setInterval(() => {
			if (!loading && !error) {
				client.refetchQueries({include: [ALL_ENVIRONMENTS]});
			}
			if (refetchInterval < MAX_REFETCH_INTERVAL) {
				setRefetchInterval(refetchInterval * 2);
			}
		}, refetchInterval);
		return () => clearInterval(interval);
	}, [loading, error, refetchInterval]);

	if (loading) {
		return <div>loading...</div>
	}

	if (error || !data) {
		return (
			<div style={{ color: 'red' }}>
				{error?.message || "Unknown error"}
			</div>
		)
	}

	let filteredEnvironments = data.environments;

	if (filter) {
		const parts = filter.toLowerCase().split(" ");

		filteredEnvironments = filteredEnvironments.filter(e => parts.every(part => {
			const [name, version] = part.split("@");

			return e.name.toLocaleLowerCase().includes(part) ||
				e.path.toLowerCase().split("/").pop()?.includes(part) ||
				e.packages.some(pkg => pkg.name.toLowerCase().includes(name) && (!version || pkg.version?.toLowerCase().startsWith(version)));
		}));
	}

	if (onlyMine) {
		filteredEnvironments = filteredEnvironments.filter(e => e.path === `users/${username}` || groups.some(g => e.path === `groups/${g}`))
	}

	return <>
		<TextField
			id='name-field'
			variant='standard'
			placeholder="Search for Environments"
			style={{ margin: "2em", padding: "0.5em", width: "calc(100% - 4em)" }}
			onChange={e => setFilter(e.target.value)}
			InputProps={{
				endAdornment: (
					<InputAdornment position="end">
						<HelpIcon title={"Filter by space-delineated list of packages"} />
					</InputAdornment>
				),
			}}>
		</TextField>
		<Card variant="outlined">
			<CardContent>
				<Typography variant="h2">Filters</Typography>
				<FormGroup>
					<FormControlLabel
						control={<Checkbox />}
						label={<>Mine <HelpIcon title="Environments owned by you or one of your groups" /></>}
						disableTypography
						checked={onlyMine}
						onChange={e => setOnlyMine((e.target as any).checked)}
					/>
				</FormGroup>
			</CardContent>
		</Card>
		<Container id="environment_table">
			<EnvironmentTable environments={filteredEnvironments} />
		</Container>
	</>
}

export default EnvironmentList;
