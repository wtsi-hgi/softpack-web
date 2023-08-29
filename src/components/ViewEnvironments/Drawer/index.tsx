import {
  Box,
  Breadcrumbs,
  Chip,
  Divider,
  Drawer,
  Link,
  type ModalProps,
  Tooltip,
  Typography
} from "@mui/material";

type DrawerParams = {
  name: string;
  path: string;
  description: string;
  packages: string[];
  isOpen: boolean;
  onClose: ModalProps['onClose']
}

// EnvironmentDrawer is a right-hand side drawer that displays information about
// the selected environment.
function EnvironmentDrawer(props: DrawerParams) {

  // convertToBreadcrumbs takes a path string as input, and converts each root
  // into its own Breadcrumb element.
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

          padding={'0 18px 18px 18px'}
          display={'flex'}
          justifyContent={'center'}
          flexDirection={'column'}
          alignItems={'center'}
        >
          <Typography variant="h3">{props.name}</Typography>
          <Typography variant='h4'>
            <Breadcrumbs separator="›" aria-label="breadcrumb">
              {convertToBreadcrumbs(props.path)}
            </Breadcrumbs>
          </Typography>
        </Box>
        <Divider />
        <Box
          padding={'18px'}
        >
          <Typography variant={'h4'} style={{ paddingBottom: '15px' }}>Description</Typography>
          <Typography variant={'h3'} style={{ width: '400px' }}>{props.description}</Typography>
        </Box>
        <Box
          padding={'18px'}
          width='400px'
        >
          <Divider />
          <Typography paddingTop={2} variant={'h4'} style={{ paddingBottom: '15px' }}>Packages</Typography>
          {props.packages.map((name, i) => {
            return (
              <Box key={i} sx={{ display: "inline-flex" }}>
                <Tooltip title="Version here" placement="top">
                  <Chip
                    label={name}
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
    </Drawer>
  );
}

export default EnvironmentDrawer;