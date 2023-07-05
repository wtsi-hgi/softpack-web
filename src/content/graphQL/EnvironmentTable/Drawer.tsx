import { Box, Breadcrumbs, Button, Chip, Divider, Drawer, Link, Rating, Stack, Tooltip, Typography } from "@mui/material";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useEffect, useState } from "react";

function EnvironmentDrawer({ name, path, description, packages, isOpen, onClose }) {

  function convertToBreadcrumbs(path) {
    const parts = path.split('/').filter((part) => part.trim() !== '');
  
    return parts.map((part, index) => {
      const isLastPart = index === parts.length - 1;
  
      return (
        <Link key={index} color="inherit" href="#" onClick={(e) => (console.log(e))}>
          {part}
        </Link>
      );
    });
  }

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
          <Typography variant='h4'>
            <Breadcrumbs separator="›" aria-label="breadcrumb">
              {convertToBreadcrumbs(path)}
            </Breadcrumbs>
          </Typography>
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