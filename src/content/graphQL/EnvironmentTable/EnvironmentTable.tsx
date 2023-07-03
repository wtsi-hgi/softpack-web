import { Box, Breadcrumbs, Button, Chip, Divider, Drawer, Link, Rating, Stack, Tooltip, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import EnvironmentDrawer from "./EnvironmentDrawer";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

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

function EnvSelect(data) {
  const [environments, setEnvironments] = useState<Environment[]>([]);
  const [selectedEnvName, setSelectedEnvName] = useState(null);

  const handleLinkClick = (linkId) => {
    setSelectedEnvName(linkId);
  };

  const handleDrawerClose = () => {
    setSelectedEnvName(null);
  };

  const buildColours = [
    'rgb(87, 202, 34)', 'rgb(87, 202, 34)', 'rgb(255, 25, 67)', 
    'rgb(51, 194, 255)', 'rgb(255, 25, 67)'];

  const buildMessages = [
    'Successful', 'Successful', 'Failed', 
    'Building...', 'Failed'];

  function convertToBreadcrumbs(path) {
    const parts = path.split('/').filter((part) => part.trim() !== '');
    console.log(parts);
  
    return parts.map((part, index) => {
      const isLastPart = index === parts.length - 1;
  
      return (
        <Link key={index} color="inherit" href="#" onClick={(e) => (console.log(e))}>
          {part}
        </Link>
      );
    });
  }
  
  useEffect(() => {
    const random = data.environments
    setEnvironments(random);
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
              <Link onClick={(e) => handleLinkClick(e.target.textContent)}>
                <Typography variant='h3' sx={{paddingLeft:'20.7px'}}>{env.name}</Typography>
              </Link>
              <Drawer anchor="right" open={selectedEnvName !== null} onClose={handleDrawerClose}>
                <Box padding={'27px'}>
                  <Box
                    display={'flex'}
                    justifyContent={'center'}
                    alignItems={'center'}
                  >
                    <Button
                      fullWidth
                      sx={{backgroundColor:'#5569ff'}}
                    >
                      <Typography color={'white'} variant='h4'>View User Profile</Typography>
                      <ArrowForwardIcon style={{color:'white'}} />
                    </Button>
                  </Box>
                  <Box
                    role='presentation'
                    width={400}
                    p={2}
                    display={'flex'}
                    justifyContent={'center'}
                    flexDirection={'column'}
                    alignItems={'center'}
                  >
                    <Typography variant="h3">{selectedEnvName}</Typography>
                    <Typography variant="subtitle2">km34</Typography>
                  </Box>
                  <Divider />
                  <Box
                    padding={'18px'}
                  >
                    <Typography variant={'h4'}>Overall Rating</Typography>
                    <Typography variant={'h2'}>4.5</Typography>
                    <Stack>
                      <Rating name="read-only" value={4.5} precision={0.5} readOnly />
                    </Stack>
                  </Box>
                  <Box
                    padding={'18px'}
                  >
                    <Typography variant={'h4'}>Total Installs</Typography>
                    <Typography variant={'h2'}>275</Typography>
                  </Box>
                  <Divider />
                </Box>
              </Drawer>
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

export default EnvSelect;
