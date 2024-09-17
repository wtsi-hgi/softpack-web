import { Box, Chip, Typography } from "@mui/material"
import { useLocalStorage } from "@uidotdev/usehooks";
import { NavLink } from "react-router-dom";
import { Package } from "../../../queries";

export default function CreateEnvPrompt({ name, pkgs }: { name: string, pkgs: string[] }) {
	const [packages, setSelectedPackages] = useLocalStorage<Package[]>("environments-selectedpackages", []);
	const packageMatch = name ? pkgs.filter(p => p.includes(name)).slice(0, 50) : [];

	const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
		const p = packages;
		const names = new Set((packages ?? []).map(e => e.name));
		const newPackage: Package = { name: e.currentTarget.textContent as string };
		if (!names.has(newPackage.name)) {
			p.push(newPackage);
		}
		setSelectedPackages(p);
	};

	return (
		<Box textAlign="center">
			<Typography variant="h2">No environments found...</Typography>
			{packageMatch.length > 0 &&
				<>
					<Typography variant="body1">Create one by selecting from the following packages:</Typography>
					{packageMatch.map((val: string) =>
						<>
							<Chip
								key={val}
								label={val}
								style={{ margin: "4px" }}
								onClick={handleClick}
								component={NavLink as React.ElementType}
								to={"/create"}
							/>
						</>
					)}
				</>
			}
		</Box>
	)
}