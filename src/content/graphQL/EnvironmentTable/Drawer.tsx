import { Box, Button, Chip, Divider, Drawer, Rating, Stack, Tooltip, Typography } from "@mui/material";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useEffect, useState } from "react";

function EnvironmentDrawer({ name, description, packages, isOpen, onClose }) {
  console.log('packages', packages);
 
  return (
    <Drawer anchor="right" open={isOpen} onClose={onClose}>
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
          <Typography variant="h3">{name}</Typography>
          <Typography variant="subtitle2">km34</Typography>
        </Box>
        <Divider />
        <Box
          padding={'18px'}
        >
          <Typography variant={'h4'} style={{paddingBottom:'15px'}}>Description</Typography>
          <Typography variant={'h3'} style={{width:'400px'}}>{description}</Typography>
        </Box>
        <Box
          padding={'18px'}
        >
          <Typography variant={'h4'} style={{paddingBottom:'15px'}}>Packages</Typography>
          {packages.map((package_) => {
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
  );
}

export default EnvironmentDrawer;