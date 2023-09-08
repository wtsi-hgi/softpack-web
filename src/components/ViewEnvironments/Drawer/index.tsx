import {
  Box,
  Breadcrumbs,
  Chip,
  Divider,
  Drawer,
  Icon,
  Link,
  Tooltip,
  Typography
} from "@mui/material";
import { Environment } from "../../../queries";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import ReactMarkdown from "react-markdown";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

type DrawerParams = {
  env: Environment;
  onClose: () => void;
}

// EnvironmentDrawer is a right-hand side drawer that displays information about
// the selected environment.
function EnvironmentDrawer({ env, onClose }: DrawerParams) {
  return (
    <Drawer ModalProps={{ slotProps: { backdrop: { style: { cursor: "pointer" } } } }} anchor="right" open={true} onClose={onClose} style={{ "zIndex": 2000 }}>
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
                  .map((p, i) => <span key={i} color="inherit">{p}</span>)
              }
            </Breadcrumbs>
          </Typography>
        </Box>
        <Divider />
        <Box style={{ "padding": "18px" }}>
          <Typography variant={'h4'} style={{ paddingBottom: '15px' }}>Description</Typography>
          <Typography style={{ width: '400px', "whiteSpace": "pre-wrap", "overflowWrap": "anywhere" }}>{env.description}</Typography>
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
            <ReactMarkdown
              components={{
                code({ node, inline, className, children, ...props }) {
                  return !inline ? <div className="readme_copy">
                    <SyntaxHighlighter
                      {...props}
                      children={String(children).replace(/\n$/, '')}
                      language="bash"
                      style={dark}
                      PreTag="div"
                    />
                    <button title="Copy" onClick={
                      () => navigator.clipboard.writeText(String(children))
                    }><Icon component={ContentCopyIcon} /></button>
                  </div> : (
                    <code {...props} className={className}>
                      {children}
                    </code>
                  )
                }
              }}
            >{env.readme}</ReactMarkdown>
          </Box>
          : <></>
        }
      </Box>
    </Drawer>
  );
}

export default EnvironmentDrawer;