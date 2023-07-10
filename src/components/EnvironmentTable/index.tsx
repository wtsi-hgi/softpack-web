import { Box, Breadcrumbs, Chip, Link, Tooltip, Typography } from "@mui/material";
import { useEffect, useState } from "react";
//import EnvironmentDrawer from "../Drawer";

interface Environment {
  description: string;
  id: string;
  name: string;
  packages: Package[];
  path: string;
  __typename: string;
}

interface Package {
  id: string;
  name: string;
  version: string;
}

function EnvironmentTable(data: any) {
  const [environments, setEnvironments] = useState<Environment[]>([]);
  const [drawerEnvName, setDrawerEnvName] = useState('');
  const [drawerPathName, setDrawerPathName] = useState('');
  const [drawerEnvDesc, setDrawerEnvDesc] = useState('');
  const [drawerEnvPckgs, setDrawerEnvPckgs] = useState<Package[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleOpenDrawer = (
    name: string, path: string, description: string, packages: Package[]) => {
    setDrawerEnvName(name);
    setDrawerPathName(path);
    setDrawerEnvDesc(description);
    setDrawerEnvPckgs(packages);
    setIsDrawerOpen(true);
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
  
  useEffect(() => {
    const environments = data.environments
    setEnvironments(environments);
  }, [])
  
  return (
    <Box>     
      {environments.map((env, i) => {
        return (
          <Box key={env.id} 
            sx={{
              borderRadius:'10px', 
              backgroundColor:'rgba(34, 51, 84, 0.02)', 
              padding:'18px', 
              margin:'0 0 18px 0', 
              position:'relative'
            }}>
            <Tooltip title={buildMessages[i]} placement="top">
              <Box
                sx={{
                  content: "''",
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '10px',
                  height: '100%',
                  backgroundColor: buildColours[i],
                  borderRadius:'10px'
                }}
              />
            </Tooltip>
            <Box sx={{
              display:'flex', 
              alignItems:'baseline'
            }}>
              <Typography 
                component={Link} 
                variant='h3' 
                onClick={() => {
                  console.log(env)
                  handleOpenDrawer(env.name, env.path, env.description, env.packages)}
                } 
                sx={{paddingLeft:'20.7px'}}>{env.name}
              </Typography>
              
              {/*isDrawerOpen && <EnvironmentDrawer 
                name={drawerEnvName}
                path={drawerPathName}
                description={drawerEnvDesc}
                packages={drawerEnvPckgs}
                isOpen={isDrawerOpen} 
                onClose={handleDrawerClose} 
              />*/}
              
              <Typography variant='h4' sx={{margin:'0 5px 0 5px'}}>-</Typography>
              <Typography variant='h4'>
                <Breadcrumbs separator="›" aria-label="breadcrumb">
                  {convertToBreadcrumbs(env.path)}
                </Breadcrumbs>
              </Typography>
            </Box>
            <Typography sx={{padding:'9px 0 9px 20.7px'}}>{env.description}</Typography>
            <Box sx={{paddingLeft:'20.7px'}}>
              {env.packages.map((package_) => {
                return (
                  <Box key={package_.id} sx={{display:"inline-flex"}}>
                    <Tooltip title="Version here" placement="top">
                      <Chip 
                        label={package_.name} 
                        sx={{
                          m:'4px', 
                          color:'#5569ff', 
                          border:'1px solid rgba(85, 105, 255, 0.7)', 
                          backgroundColor:'transparent'
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
