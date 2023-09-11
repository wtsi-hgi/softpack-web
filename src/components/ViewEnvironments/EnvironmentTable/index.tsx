import type { Environment, Environments } from "../../../queries";
import { Box, Card, Chip, Grid, Tooltip, Typography } from "@mui/material";
import { useState } from "react";
import EnvironmentDrawer, { breadcrumbs } from "../Drawer";


const buildColours = [
  'rgb(87, 202, 34)', 'rgb(87, 202, 34)', 'rgb(255, 25, 67)',
  'rgb(51, 194, 255)', 'rgb(255, 25, 67)'],
  buildMessages = [
    'Successful', 'Successful', 'Failed',
    'Building...', 'Failed'];

function EnvironmentTable({ environments }: Environments) {
  const [drawer, setDrawer] = useState<Environment | null>(null);

  return (
    <>
      {environments.map(env => {
        return (
          <Grid
            item
            xs={1}
            key={env.name}
          >
            <Card>
              <Box
                onClick={e => {
                  if (!(e.target as HTMLElement).classList.contains("MuiBackdrop-root")) {
                    setDrawer(env)
                  }
                }}
                sx={{
                  borderRadius: '10px',
                  backgroundColor: 'rgba(34, 51, 84, 0.02)',
                  padding: '1em',
                  position: 'relative',
                  cursor: "pointer",
                }}>
                <Tooltip title={buildMessages[0]} placement="top">
                  <Box
                    sx={{
                      content: "''",
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '10px',
                      height: '100%',
                      backgroundColor: buildColours[0],
                      borderRadius: '10px'
                    }}
                  />
                </Tooltip>
                <Tooltip title={env.type === "softpack" ? "Built with Softpack" : "Generated from Module (not reproducable)"} placement="left">
                  <div style={{ "width": "1.75em", "height": "1.75em", "textAlign": "center", "float": "right", "border": "1px solid #000", "borderRadius": "1em", "marginTop": "-1em", "marginRight": "-1em" }}>{env.type === "softpack" ? "S" : "M"}</div>
                </Tooltip>
                <Box sx={{
                  display: 'flex',
                  alignItems: 'baseline'
                }}>
                  <Typography
                    variant='h3'
                    sx={{ paddingLeft: '20.7px' }}>{env.name}
                  </Typography>

                  {drawer === env && <EnvironmentDrawer
                    env={env}
                    onClose={() => setDrawer(null)}
                  />}

                  <Typography variant='h4' style={{ whiteSpace: "nowrap" }} className="breadcrumbs">
                    {breadcrumbs(env.path)}
                  </Typography>
                </Box>
                <Typography sx={{ padding: '9px 0 9px 20.7px' }}>{env.description.split("\n")[0]}</Typography>
                <Box sx={{ paddingLeft: '20.7px' }}>
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
              </Box>
            </Card>
          </Grid>
        );
      })}
    </>
  );
}

export default EnvironmentTable;
