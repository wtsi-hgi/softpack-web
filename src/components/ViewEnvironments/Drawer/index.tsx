import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Breadcrumbs,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Drawer,
  Icon,
  Stack,
  Typography,
} from "@mui/material";
import { Tooltip } from '../../Tooltip';
import { createContext, useContext, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";

import { addTag, Environment, EnvironmentsContext, Package, setHidden } from "../../../endpoints";
import { TagSelect } from "../../TagSelect";
import { EnvironmentTags } from "../EnvironmentTags";
import { useLocalStorage } from "@uidotdev/usehooks";
import { HelpIcon } from "../../HelpIcon";
import { NavLink } from "react-router-dom";
import { parseEnvironmentToNamePathAndVersion } from "../../../strings";

type DrawerParams = {
  env?: Environment;
  open: boolean;
  onClose: () => void;
  recipeDescriptions: Record<string, string>;
  getRecipeDescription: (recipe: string) => void;
};

export const breadcrumbs = (path: string) => (
  <Breadcrumbs separator="›" aria-label="breadcrumb">
    {(path ?? "").split("/").map((p, i) => (
      <span key={i}>{p}</span>
    ))}
  </Breadcrumbs>
),
  recipeDescriptionContext = createContext<[Record<string, string>, (recipe: string) => void]>([{}, () => { }]);

const descAddedToPath = "\n\nThe following executables are added to your PATH:";

export function isInterpreter(env: Environment, pkg: Package) {
  return pkg.name === "r" && env.interpreters.r || pkg.name === "python" && env.interpreters.python;
}

export function wrapIfInterpreted(env: Environment, pkg: Package, node: JSX.Element, recipeDescriptions: Record<string, string>, getRecipeDescription: (recipe: string) => void) {
  if (isInterpreter(env, pkg)) {
    return <Tooltip title="Not requested: interpreter" placement="top">{node}</Tooltip>
  }

  return wrapRecipe(pkg, node, recipeDescriptions, getRecipeDescription);
}

export function wrapRecipe(pkg: Package, node: JSX.Element, recipeDescriptions: Record<string, string>, getRecipeDescription: (recipe: string) => void) {
  const description = recipeDescriptions[pkg.name];

  if (typeof description === "string") {
    return <Tooltip title={description} placement="top">{node}</Tooltip>
  }

  return <Tooltip title="" onMouseEnter={() => getRecipeDescription(pkg.name)}>{node}</Tooltip>
}


function packagesWithoutInterpreters(env: Environment) {
  return env.packages.filter(pkg => !isInterpreter(env, pkg));
}

// EnvironmentDrawer is a right-hand side drawer that displays information about
// the selected environment.
function EnvironmentDrawer({ env, open, onClose, recipeDescriptions, getRecipeDescription }: DrawerParams) {
  const [hideButtonDisable, setHideButtonDisable] = useState(false);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [alertOpen, setAlertOpen] = useState(false);
  const [addTagLoading, setAddTagLoading] = useState(false);

  const [name, setName] = useLocalStorage<string>("environments-selectedname", "");
  const [description, setDescription] = useLocalStorage<string>("environments-selecteddesc", "");
  const [, setPath] = useLocalStorage<string>("environments-selectedpath", "");
  const [tags, setTags] = useLocalStorage<string[]>("environments-selectedtags", []);
  const [packages, setSelectedPackages] = useLocalStorage<Package[]>("environments-selectedpackages", []);
  const [, updateEnvironments] = useContext(EnvironmentsContext)

  useEffect(() => {
    setAlertOpen(false);
  }, [open]);

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
    setSelectedPackages(packagesWithoutInterpreters(env));
  }

  function mergeEnv() {
    const names = new Set((packages ?? []).map(e => e.name));

    for (const pkg of env ? packagesWithoutInterpreters(env) : []) {
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
  return <>
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
          {env?.type === "softpack" &&
            <Box
              display="flex"
              alignItems="left"
              sx={{ position: "absolute", top: 0, right: 0, backgroundColor: "#dddddd77" }}
            >
              <Button
                style={{ backgroundColor: "transparent" }}
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
                style={{ backgroundColor: "transparent", marginLeft: "0.2em" }}
                component={NavLink} to={"/create"}
                variant="text"
                onClick={mergeEnv}
              >
                Merge
                <HelpIcon title="Add packages in this environment to existing selection if they're not already selected.'" />
              </Button> : <></>}
            </Box>
          }
          <Typography variant="h3" marginTop="0.5em">{env?.name}</Typography>
          <Typography variant="h4">{breadcrumbs(env?.path ?? "")}</Typography>
          {env?.created ? <div style={{ paddingTop: "0.4em", paddingBottom: "1.2em", fontSize: "0.85em", color: "rgba(0, 0, 0, 0.6)" }}>{"Created: " + new Date(env.created * 1000).toLocaleString("en-GB")}</div> : ""}
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
              loading={addTagLoading}
              onClick={() => {
                if (env) {
                  setAddTagLoading(true);
                  addTag(env.name, env.path, selectedTag!)
                    .then(() => updateEnvironments())
                    .finally(() => setAddTagLoading(false));
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
          <ul className="packages">
            {(env?.packages ?? []).map((pkg, i) => wrapIfInterpreted(env!, pkg,
              <li key={i} className={isInterpreter(env!, pkg) ? " interpreter" : ""}>
                {pkg.name + (pkg.version ? `@${pkg.version}` : "")}
              </li>,
              recipeDescriptions, getRecipeDescription
            ))}
          </ul>
        </Box>
      </Box>
      {env?.type === "softpack" &&
        <Button
          variant="outlined"
          color={env?.hidden ? "info" : "error"}
          disabled={hideButtonDisable}
          style={{ width: "calc(100% - 2em)", margin: "1em auto" }}
          onClick={() => {
            if (!env?.hidden) {
              setAlertOpen(true);
            } else {
              setHidden(env.name, env.path, !env.hidden)
                .then(() => updateEnvironments())
		.catch(error => console.error(error))
                .finally(() => setHideButtonDisable(false));
              setHideButtonDisable(true);
              setAlertOpen(false);
            }
          }}
        >{env?.hidden ? "Unhide" : "Hide"}</Button>
      }
    </Drawer>
    <Dialog style={{ zIndex: 1400 }} open={alertOpen && !!env}>
      <DialogTitle fontSize={20}>Confirm Hide</DialogTitle>
      <DialogContent>
        <Typography lineHeight={2}>Are you sure you want to hide this environment?<br />
          This will affect all users and they won't be able to see it in the list.<br />
          You can find it again by clicking 'Show hidden'.</Typography>
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          color="error"
          disabled={hideButtonDisable}
          onClick={() => {
            console.log(env);
            env &&
              setHidden(env.name, env.path, !env.hidden)
                .then(() => updateEnvironments())
		.catch(error => console.error(error))
                .finally(() => setHideButtonDisable(false));
            setHideButtonDisable(true);
            setAlertOpen(false);
          }}
        >
          Hide
        </Button>
        <Button onClick={() => setAlertOpen(false)}>Cancel</Button>
      </DialogActions>
    </Dialog>
  </>
}

export default EnvironmentDrawer;
