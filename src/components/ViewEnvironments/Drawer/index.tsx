import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import {
  Box,
  Breadcrumbs,
  Chip,
  Divider,
  Drawer,
  Icon,
  Typography,
} from "@mui/material";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";

import { Environment } from "../../../queries";

type DrawerParams = {
  env: Environment;
  onClose: () => void;
};

export const breadcrumbs = (path: string) => (
  <Breadcrumbs separator="›" aria-label="breadcrumb">
    {path.split("/").map((p, i) => (
      <span key={i}>{p}</span>
    ))}
  </Breadcrumbs>
);

// EnvironmentDrawer is a right-hand side drawer that displays information about
// the selected environment.
function EnvironmentDrawer({ env, onClose }: DrawerParams) {
  return (
    <Drawer
      ModalProps={{ slotProps: { backdrop: { style: { cursor: "pointer" } } } }}
      anchor="right"
      open={true}
      onClose={onClose}
      style={{ zIndex: 2000 }}
    >
      <Box padding={"27px"} style={{ width: "40em" }}>
        <Box
          role="presentation"
          padding={"0 18px 18px 18px"}
          display={"flex"}
          justifyContent={"center"}
          flexDirection={"column"}
          alignItems={"center"}
        >
          <Typography variant="h3">{env.name}</Typography>
          <Typography variant="h4">{breadcrumbs(env.path)}</Typography>
        </Box>
        {env.readme ? (
          <>
            <Divider />
            <Box style={{ padding: "0 18px 18px 18px" }}>
              <ReactMarkdown
                components={{
                  code({ node, inline, className, children, ...props }) {
                    return !inline ? (
                      <div className="readme_copy">
                        <SyntaxHighlighter
                          {...props}
                          language="bash"
                          style={dark}
                          PreTag="div"
                        >
                          {String(children).replace(/\n$/, "")}
                        </SyntaxHighlighter>
                        <button
                          title="Copy"
                          onClick={() =>
                            (navigator.clipboard
                              ? navigator.clipboard.writeText(String(children))
                              : Promise.reject()
                            ).catch(() => {
                              const i = document.createElement("div"),
                                range = document.createRange(),
                                selection = document.getSelection();

                              i.textContent = String(children);
                              i.setAttribute(
                                "style",
                                "position: fixed; top: 0; left: 0",
                              );
                              document.body.append(i);

                              range.selectNodeContents(i);
                              selection?.removeAllRanges();
                              selection?.addRange(range);

                              document.execCommand("copy");

                              i.remove();
                            })
                          }
                        >
                          <Icon component={ContentCopyIcon} />
                        </button>
                      </div>
                    ) : (
                      <code {...props} className={className}>
                        {children}
                      </code>
                    );
                  },
                }}
              >
                {env.readme}
              </ReactMarkdown>
            </Box>
          </>
        ) : (
          <></>
        )}
        <Divider />
        <Box style={{ padding: "0 18px 18px 18px" }}>
          <h1>Description</h1>
          <Typography
            style={{ whiteSpace: "pre-wrap", overflowWrap: "anywhere" }}
          >
            {env.description}
          </Typography>
        </Box>
        <Divider />
        <Box style={{ padding: "0 18px" }}>
          <h1>Packages</h1>
          {env.packages.map((pkg, i) => {
            return (
              <Box key={i} sx={{ float: "left" }}>
                <Chip
                  label={pkg.name + (pkg.version ? `@${pkg.version}` : "")}
                  sx={{
                    m: "4px",
                    color: "#5569ff",
                    border: "1px solid rgba(85, 105, 255, 0.7)",
                    backgroundColor: "transparent",
                  }}
                />
              </Box>
            );
          })}
        </Box>
      </Box>
    </Drawer>
  );
}

export default EnvironmentDrawer;
