import { Box, Button, Divider, Drawer, Rating, Stack, Typography } from "@mui/material";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

function EnvironmentDrawer(props) {
  console.log("we're in the drawer");

  
  return (
    <Drawer anchor="right" open={props.name !== null}>
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
          <Typography variant="h3">{props.name}</Typography>
          <Typography variant="subtitle2">km34</Typography>
        </Box>
        <Divider />
        <Box
          padding={'18px'}
        >
          <Typography variant={'h4'}>Description</Typography>
          <Typography variant={'h2'}>An environment</Typography>
        </Box>
        <Box
          padding={'18px'}
        >
          <Typography variant={'h4'}>Packages</Typography>
          <Typography variant={'h2'}>Pandas</Typography>
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