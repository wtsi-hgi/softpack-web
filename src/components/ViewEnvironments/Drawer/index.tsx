import {
  Box,
  Breadcrumbs,
  Chip,
  Divider,
  Drawer,
  Link,
  Tooltip,
  Typography
} from "@mui/material";
import { Environment, Package } from "../../../queries";
import ReactMarkdown from "react-markdown";

type DrawerParams = {
  env: Environment;
  onClose: () => void;
}

// EnvironmentDrawer is a right-hand side drawer that displays information about
// the selected environment.
function EnvironmentDrawer({ env, onClose }: DrawerParams) {
  return (
    <Drawer anchor="right" open={true} onClose={onClose}>
      <Box padding={'27px'}>
        <Box
          role='presentation'

          padding={'0 18px 18px 18px'}
          display={'flex'}
          justifyContent={'center'}
          flexDirection={'column'}
          alignItems={'center'}
        >
          <Typography variant="h3">{env.name}</Typography>
          <Typography variant='h4'>
            <Breadcrumbs separator="›" aria-label="breadcrumb">
              {
                env.path
                  .split("/")
                  .map(p => p.trim())
                  .filter(p => p)
                  .map((p, i) => <Link key={i} color="inherit" href="#">{p}</Link>)
              }
            </Breadcrumbs>
          </Typography>
        </Box>
        <Divider />
        <Box style={{ "padding": "18px" }}>
          <Typography variant={'h4'} style={{ paddingBottom: '15px' }}>Description</Typography>
          <Typography variant={'h3'} style={{ width: '400px' }}>{env.description}</Typography>
        </Box>
        <Box style={{ "padding": "18px", "width": "400px" }}>
          <Divider />
          <Typography paddingTop={2} variant={'h4'} style={{ paddingBottom: '15px' }}>Packages</Typography>
          {env.packages.map((pkg, i) => {
            return (
              <Box key={i} sx={{ display: "inline-flex" }}>
                <Tooltip title="Version here" placement="top">
                  <Chip
                    label={pkg.name}
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
        {env.readme ?
          <Box style={{ "maxWidth": "30em", "padding": "18px" }}>
            <Divider />
            <ReactMarkdown>{env.readme}</ReactMarkdown>
          </Box>
          : <></>
        }
      </Box>
    </Drawer>
  );
}

export default EnvironmentDrawer;