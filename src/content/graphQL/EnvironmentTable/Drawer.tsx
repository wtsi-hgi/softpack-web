import { Box, Button, Chip, Divider, Drawer, Rating, Stack, Tooltip, Typography } from "@mui/material";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useEffect, useState } from "react";

function EnvironmentDrawer({ name, description, packages, isOpen, onClose }) {
  console.log('packages', packages);
 
  return (
    <Drawer anchor="right" open={isOpen} onClose={onClose}>
      <Box padding={'27px'}>
        <Box
          role='presentation'
          width={400}
          padding={'0 18px 18px 18px'}
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
        <Divider />
          <Typography paddingTop={2} variant={'h4'} style={{paddingBottom:'15px'}}>Packages</Typography>
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
      </Box>
    </Drawer>
  );
}

export default EnvironmentDrawer;