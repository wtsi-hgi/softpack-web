import type { Environments } from "../../../queries";
import { Container, InputAdornment, TextField, Tooltip } from "@mui/material";
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { useApolloClient, useQuery } from "@apollo/client";
import EnvironmentTable from "../EnvironmentTable";
import { ALL_ENVIRONMENTS } from "../../../queries";
import { useEffect, useState } from "react";

const SECOND = 1000;
const MAX_REFETCH_INTERVAL = 10 * SECOND;

// EnvironmentList displays the 'view environments' page of the program.
const EnvironmentList = () => {
	const { loading, data, error } = useQuery<Environments>(ALL_ENVIRONMENTS),
		[filter, setFilter] = useState<string>("");
	const client = useApolloClient();
	const [refetchInterval, setRefetchInterval] = useState(SECOND);

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
						<Tooltip title={"Filter by space-delineated list of packages"}>
							<HelpOutlineIcon
								sx={{
									color: 'rgba(34, 51, 84, 0.7)',
									padding: '0 0 0 8px',
									fontSize: '25px'
								}}
							/>
						</Tooltip>
					</InputAdornment>
				),
			}}>
		</TextField>
		<Container id="environment_table">
			<EnvironmentTable environments={filteredEnvironments} />
		</Container>
	</>
}

export default EnvironmentList;
