import type { Environments } from "../../../queries";
import { Box, Breadcrumbs, Chip, Link, Tooltip, Typography } from "@mui/material";
import { useState } from "react";
import EnvironmentDrawer from "../Drawer";
import { Package } from "../../../queries";

function EnvironmentTable({ environments }: Environments) {
  const [drawerEnvName, setDrawerEnvName] = useState('');
  const [drawerPathName, setDrawerPathName] = useState('');
  const [drawerEnvDesc, setDrawerEnvDesc] = useState('');
  const [drawerEnvPckgs, setDrawerEnvPckgs] = useState<string[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleOpenDrawer = (
    name: string, path: string, description: string, packages: Package[]) => {
    const packageNames = returnPackageNames(packages);

    setDrawerEnvName(name);
    setDrawerPathName(path);
    setDrawerEnvDesc(description);
    setDrawerEnvPckgs(packageNames);
    setIsDrawerOpen(true);
  }

  // returnPackageNames takes an array of Package objects, and returns an array
  // of the corresponding name of each Package.
  const returnPackageNames = (packages: Package[]) => {
    var packageNames = [];

    for (let i = 0; i < packages.length; i++) {
      packageNames.push(packages[i].name);
    }

    return packageNames;
  }

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };

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
                onClick={() => {
                  console.log(env)
                  handleOpenDrawer(env.name, env.path, env.description, env.packages)
                }}
                sx={{ paddingLeft: '20.7px' }}>{env.name}
              </Typography>

              {isDrawerOpen && <EnvironmentDrawer
                name={drawerEnvName}
                path={drawerPathName}
                description={drawerEnvDesc}
                packages={drawerEnvPckgs}
                isOpen={isDrawerOpen}
                onClose={handleDrawerClose}
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
