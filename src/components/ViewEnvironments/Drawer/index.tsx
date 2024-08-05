import { useMutation } from "@apollo/client";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Breadcrumbs,
  Button,
  Chip,
  Divider,
  Drawer,
  Icon,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";

import { ADD_TAG, ALL_ENVIRONMENTS, Environment, Package, SET_HIDDEN } from "../../../queries";
import { TagSelect } from "../../TagSelect";
import { EnvironmentTags } from "../EnvironmentTags";
import { useLocalStorage } from "@uidotdev/usehooks";
import { HelpIcon } from "../../HelpIcon";
import { NavLink } from "react-router-dom";
import { parseEnvironmentToNamePathAndVersion } from "../../../strings";
import { Type } from "../../../__generated__/graphql";

type DrawerParams = {
  env?: Environment;
  open: boolean;
  onClose: () => void;
};

export const breadcrumbs = (path: string) => (
  <Breadcrumbs separator="›" aria-label="breadcrumb">
    {(path ?? "").split("/").map((p, i) => (
      <span key={i}>{p}</span>
    ))}
  </Breadcrumbs>
);

const descAddedToPath = "\n\nThe following executables are added to your PATH:"

// EnvironmentDrawer is a right-hand side drawer that displays information about
// the selected environment.
function EnvironmentDrawer({ env, open, onClose }: DrawerParams) {
  const [addTag, addTagMutation] = useMutation(ADD_TAG, {
    refetchQueries: [ALL_ENVIRONMENTS],
    onCompleted: (data) => {
      if (data.addTag.__typename === "AddTagSuccess") {
        setSelectedTag(null);
      }
    },
  });
  const [hideButtonDisable, setHideButtonDisable] = useState(false);
  const [setHidden] = useMutation(SET_HIDDEN, {
    refetchQueries: [ALL_ENVIRONMENTS],
    awaitRefetchQueries: true,
    onCompleted: () => {
      setHideButtonDisable(false)
    }
  })
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const [name, setName] = useLocalStorage<string>("environments-selectedname", "");
  const [description, setDescription] = useLocalStorage<string>("environments-selecteddesc", "");
  const [, setPath] = useLocalStorage<string>("environments-selectedpath", "");
  const [tags, setTags] = useLocalStorage<string[]>("environments-selectedtags", []);
  const [packages, setSelectedPackages] = useLocalStorage<Package[]>("environments-selectedpackages", []);

  function removeExesFromDescription(description: string) {
    const descParts = description.split(descAddedToPath);
    if (descParts.length > 1) {
      descParts.pop();
    }

    return descParts.join(descAddedToPath);
  }

  function cloneEnv(env: Environment) {
    const [name] = parseEnvironmentToNamePathAndVersion(env);

    setName(name);
    setDescription(removeExesFromDescription(env.description));
    setPath(env.path);
    setTags(env.tags);
    setSelectedPackages(env.packages);
  }

  function mergeEnv() {
    const names = new Set((packages ?? []).map(e => e.name));

    for (const pkg of env?.packages ?? []) {
      if (!names.has(pkg.name)) {
        packages.push(pkg);
      }
    };

    if (name) {
      setName(name + "-" + (env?.name ?? ""));
    } else {
      setName(env?.name ?? "");
    }

    if (description) {
      setDescription(description + "\n\n&\n\n" + removeExesFromDescription(env?.description ?? ""));
    } else {
      setDescription(removeExesFromDescription(env?.description ?? ""));
    }

    setTags(Array.from(new Set(tags.concat(env?.tags ?? []))));
    setSelectedPackages(packages);
  }
  return (
    <Drawer
      ModalProps={{ slotProps: { backdrop: { style: { cursor: "pointer" } } } }}
      anchor="right"
      open={open}
      onClose={onClose}
      style={{ zIndex: 1400, position: "relative" }}

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
          {env?.type === Type.Softpack &&
            <Box
              display="flex"
              alignItems="left"
              sx={{ position: "absolute", top: 0, right: 0, backgroundColor: "#eeeeee" }}
            >
              <Button
                style={{ backgroundColor: "#eeeeee" }}
                component={NavLink} to={"/create"}
                variant="text"
                onClick={() => {
                  if (env) {
                    cloneEnv(env);
                  }
                }}
              >
                Clone
                <HelpIcon title="Create a new environment based on this one" />
              </Button>
              {packages.length ? <Button
                style={{ backgroundColor: "#eeeeee", marginLeft: "0.2em" }}
                component={NavLink} to={"/create"}
                variant="text"
                onClick={mergeEnv}
              >
                Merge
                <HelpIcon title="Add packages in this environment to existing selection if they're not already selected.'" />
              </Button> : <></>}
            </Box>
          }
          <Typography variant="h3">{env?.name}</Typography>
          <Typography variant="h4">{breadcrumbs(env?.path ?? "")}</Typography>
          <EnvironmentTags tags={env?.tags ?? []} />
          <Stack mt={1} direction="row" width="100%" spacing={1}>
            <TagSelect
              multiple={false}
              value={selectedTag}
              onChange={setSelectedTag}
            />
            <LoadingButton
              variant="outlined"
              disabled={selectedTag == null}
              loading={addTagMutation.loading}
              onClick={() => {
                if (env) {
                  addTag({
                    variables: {
                      name: env.name,
                      path: env.path,
                      tag: selectedTag!,
                    },
                  });
                }
              }}
            >
              Add tag
            </LoadingButton>
          </Stack>
        </Box>
        {env?.readme ? (
          <>
            <Divider />
            <Box style={{ padding: "0 18px 18px 18px" }}>
              <ReactMarkdown
                components={{
                  code({ inline, className, children, ...props }) {
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
                {env?.readme}
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
            {env?.description}
          </Typography>
        </Box>
        <Divider />
        <Box style={{ padding: "0 18px" }}>
          <h1>Packages</h1>
          {(env?.packages ?? []).map((pkg, i) => {
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
      {env?.type === Type.Softpack &&
        <Button
          variant="outlined"
          color={env?.hidden ? "info" : "error"}
          disabled={hideButtonDisable}
          style={{ width: "calc(100% - 2em)", margin: "0 auto" }}
          onClick={() => {
            if (env) {
              setHidden({
                variables: {
                  path: env.path,
                  name: env.name,
                  hidden: !env.hidden
                }
              });
              setHideButtonDisable(true);
            }
          }}
        >{env?.hidden ? "Unhide" : "Hide"}</Button>
      }
    </Drawer>
  );
}

export default EnvironmentDrawer;
