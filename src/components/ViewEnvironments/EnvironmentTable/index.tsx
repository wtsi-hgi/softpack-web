import type { Environment, Environments } from "../../../queries";
import { Box, Breadcrumbs, Chip, Link, Tooltip, Typography } from "@mui/material";
import { useState } from "react";
import EnvironmentDrawer from "../Drawer";
import { Package } from "../../../queries";

function EnvironmentTable({ environments }: Environments) {
  const [drawer, setDrawer] = useState<Environment | null>(null);

  const buildColours = [
    'rgb(87, 202, 34)', 'rgb(87, 202, 34)', 'rgb(255, 25, 67)',
    'rgb(51, 194, 255)', 'rgb(255, 25, 67)'];

  const buildMessages = [
    'Successful', 'Successful', 'Failed',
    'Building...', 'Failed'];

  // convertToBreadcrumbs takes a path string as input, and converts it into JSX
  // which can be rendered as breadcrumbs.
  function convertToBreadcrumbs(path: string) {
    const parts = path.split('/').filter((part) => part.trim() !== '');

    return parts.map((part, index) => {
      return (
        <Link key={index} color="inherit" href="#" onClick={(e) => (console.log(e))}>
          {part}
        </Link>
      );
    });
  }

  return (
    <Box>
      {environments.map((env, i) => {
        return (
          <Box
            key={env.name}
            sx={{
              borderRadius: '10px',
              backgroundColor: 'rgba(34, 51, 84, 0.02)',
              padding: '18px',
              margin: '0 0 18px 0',
              position: 'relative'
            }}>
            <Tooltip title={buildMessages[i]} placement="top">
              {/* This is displaying some hardcoded colours to indicate the 
                  pretend 'status' of the environment build. */}
              <Box
                sx={{
                  content: "''",
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '10px',
                  height: '100%',
                  backgroundColor: buildColours[i],
                  borderRadius: '10px'
                }}
              />
            </Tooltip>
            <Box sx={{
              display: 'flex',
              alignItems: 'baseline'
            }}>
              <Typography
                component={Link}
                variant='h3'
                onClick={() => setDrawer(env)}
                sx={{ paddingLeft: '20.7px' }}>{env.name}
              </Typography>

              {drawer === env && <EnvironmentDrawer
                env={env}
                onClose={() => setDrawer(null)}
              />}

              <Typography variant='h4' sx={{ margin: '0 5px 0 5px' }}>-</Typography>
              <Typography variant='h4'>
                <Breadcrumbs separator="›" aria-label="breadcrumb">
                  {convertToBreadcrumbs(env.path)}
                </Breadcrumbs>
              </Typography>
            </Box>
            <Typography sx={{ padding: '9px 0 9px 20.7px' }}>{env.description}</Typography>
            <Box sx={{ paddingLeft: '20.7px' }}>
              {env.packages.map((package_) => {
                return (
                  <Box key={package_.name} sx={{ display: "inline-flex" }}>
                    <Tooltip title="Version here" placement="top">
                      <Chip
                        label={package_.name}
                        sx={{
                          m: '4px',
                          color: '#5569ff',
                          border: '1px solid rgba(85, 105, 255, 0.7)',
                          backgroundColor: 'transparent'
                        }}
                      />
                    </Tooltip>
                  </Box>
                );
              })}
            </Box>
          </Box>
        );
      })}
    </Box>
  );
}

export default EnvironmentTable;
