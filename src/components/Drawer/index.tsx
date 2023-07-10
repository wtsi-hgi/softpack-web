import { Box, Breadcrumbs, Chip, Divider, Drawer, Link, Tooltip, Typography } from "@mui/material";

interface Package {
  id: string;
  name: string;
  version: string;
}

function EnvironmentDrawer(props: any) {

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
    <Drawer anchor="right" open={props.isOpen} onClose={props.onClose}>
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
          <Typography variant="h3">{props.name}</Typography>
          <Typography variant='h4'>
            Hello
            {/*<Breadcrumbs separator="›" aria-label="breadcrumb">
              {convertToBreadcrumbs(path)}
  </Breadcrumbs>*/}
          </Typography>
        </Box>
        <Divider />
        <Box
          padding={'18px'}
        >
          <Typography variant={'h4'} style={{paddingBottom:'15px'}}>Description</Typography>
          <Typography variant={'h3'} style={{width:'400px'}}>{props.description}</Typography>
        </Box>
        <Box
          padding={'18px'}
        >
        <Divider />
          <Typography paddingTop={2} variant={'h4'} style={{paddingBottom:'15px'}}>Packages</Typography>
          <Typography>{props.packages}</Typography>
          {props.packages.map((package_: any) => {
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