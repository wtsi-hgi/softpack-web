import type { Environment, Environments, States } from "../../../queries";
import { Box, Chip, LinearProgress, Tooltip, Typography } from "@mui/material";
import { useState } from "react";
import EnvironmentDrawer, { breadcrumbs } from "../Drawer";

type State = {
  colour: string;
  message: string;
}

const states: Record<States, State> = {
  "queued": {
    colour: "rgb(51, 194, 255)",
    message: "Queued"
  },
  "ready": {
    colour: "rgb(87, 202, 34)",
    message: "Ready"
  },
  "failed": {
    colour: "rgb(255, 25, 67)",
    message: "Failed"
  }
};

function EnvironmentTable({ environments }: Environments) {
  const [drawer, setDrawer] = useState<Environment | null>(null);

  return (
    <>
      {environments.map(env => <>
        <Box
          onClick={() => setDrawer(env)}
          sx={{
            borderRadius: '10px',
            backgroundColor: 'rgba(34, 51, 84, 0.02)',
            padding: '1em',
            position: 'relative',
            cursor: "pointer",
          }}>
          <Tooltip title={states[env.state ?? "queued"].message} placement="top">
            <Box
              sx={{
                content: "''",
                position: 'absolute',
                top: 0,
                left: 0,
                width: '10px',
                bottom: 0,
                backgroundColor: states[env.state ?? "queued"].colour,
                borderRadius: '10px'
              }}
            />
          </Tooltip>
          <Tooltip title={env.type === "softpack" ? "Built with Softpack" : "Generated from Module (not reproducable)"} placement="left">
            <div style={{ "width": "1.75em", "height": "1.75em", "textAlign": "center", "float": "right", "border": "1px solid #000", "borderRadius": "1em", "marginTop": "-0.95em", "marginRight": "-0.95em" }}>{env.type === "softpack" ? "S" : "M"}</div>
          </Tooltip>
          <Box sx={{ padding: "0 20.7px" }}>
            <Box sx={{
              display: 'flex',
              alignItems: 'baseline'
            }}>
              <Typography variant='h3'>{env.name}
              </Typography>

              <Typography variant='h4' style={{ whiteSpace: "nowrap" }} className="breadcrumbs">
                {breadcrumbs(env.path)}
              </Typography>
            B</Box>
            <Typography sx={{ padding: '9px 0' }}>{env.description.split("\n")[0]}</Typography>
            <Box sx={{ maxHeight: "90px", overflowY: "auto" }}>
              {env.packages.map((package_) => {
                return (
                  <Box
                    key={package_.name}
                    sx={{ display: "inline-flex" }}
                  >
                    <Chip
                      label={package_.name + (package_.version ? `@${package_.version}` : "")}
                      sx={{
                        m: '4px',
                        color: '#5569ff',
                        border: '1px solid rgba(85, 105, 255, 0.7)',
                        backgroundColor: 'transparent'
                      }}
                    />
                  </Box>
                );
              })}
            </Box>
            {env.state === "queued" && <Box sx={{ paddingTop: "8px" }}>
              <LinearProgress />
              </Box>}
          </Box>
        </Box>
        {
          drawer === env && <EnvironmentDrawer
            env={env}
            onClose={() => setDrawer(null)}
          />
        }
      </>)}
    </>
  );
}

export default EnvironmentTable;
