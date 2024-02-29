import { Masonry } from "@mui/lab";
import {
  Alert,
  Box,
  Chip,
  LinearProgress,
  Tooltip,
  Typography,
} from "@mui/material";
import { Fragment, useState } from "react";

import { humanize } from "../../../humanize";
import type { Environments, States } from "../../../queries";
import EnvironmentDrawer, { breadcrumbs } from "../Drawer";
import { EnvironmentTags } from "../EnvironmentTags";

type State = {
  colour: string;
  message: string;
};

const states: Record<States, State> = {
  queued: {
    colour: "rgb(51, 194, 255)",
    message: "Queued",
  },
  ready: {
    colour: "rgb(87, 202, 34)",
    message: "Ready",
  },
  failed: {
    colour: "rgb(255, 25, 67)",
    message: "Failed",
  },
};

function EnvironmentTable({ environments }: { environments: Environments }) {
  const [selectedEnv, setSelectedEnv] = useState<string | null>(null);

  return (
    <>
      <Masonry columns={{ sm: 1, md: 2, lg: 2, xl: 3 }} spacing={2}>
        {environments.map((env) => (
          <Fragment key={`${env.path}/${env.name}`}>
            <Box
              onClick={() => setSelectedEnv(`${env.path}/${env.name}`)}
              sx={{
                borderRadius: "10px",
                backgroundColor: "rgba(34, 51, 84, 0.02)",
                padding: "1em",
                position: "relative",
                cursor: "pointer",
                margin: "0 auto 1.5em auto",
                breakInside: "avoid",
                willChange: "opacity",
                boxShadow:
                  "0px 9px 16px rgba(159, 162, 191, .18), 0px 2px 2px rgba(159, 162, 191, 0.32)",
              }}
            >
              <Tooltip
                title={states[env.state ?? "queued"].message}
                placement="top"
              >
                <Box
                  sx={{
                    content: "''",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "10px",
                    bottom: 0,
                    backgroundColor: states[env.state ?? "queued"].colour,
                    borderRadius: "10px",
                  }}
                />
              </Tooltip>
              <Tooltip
                title={
                  env.type === "softpack"
                    ? "Built with Softpack"
                    : "Generated from Module (not reproducable)"
                }
                placement="left"
              >
                <div
                  style={{
                    width: "1.75em",
                    height: "1.75em",
                    textAlign: "center",
                    float: "right",
                    border: "1px solid #000",
                    borderRadius: "1em",
                    marginTop: "-0.95em",
                    marginRight: "-0.95em",
                  }}
                >
                  {env.type === "softpack" ? "S" : "M"}
                </div>
              </Tooltip>
              <Box sx={{ padding: "0 20.7px" }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "baseline",
                  }}
                >
                  <Typography variant="h3" sx={{ wordBreak: "break-all" }}>
                    {env.name}
                  </Typography>

                  <Typography
                    variant="h4"
                    style={{ whiteSpace: "nowrap" }}
                    className="breadcrumbs"
                  >
                    {breadcrumbs(env.path)}
                  </Typography>
                </Box>
                <EnvironmentTags tags={env.tags} />
                <Typography sx={{ padding: "9px 0" }}>
                  {env.description.split("\n")[0]}
                </Typography>
                <Box sx={{ maxHeight: "90px", overflowY: "auto" }}>
                  {env.packages.map((package_) => {
                    return (
                      <Box key={package_.name} sx={{ display: "inline-flex" }}>
                        <Chip
                          label={
                            package_.name +
                            (package_.version ? `@${package_.version}` : "")
                          }
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
                {env.state === "queued" && (
                  <Box sx={{ paddingTop: "8px" }}>
                    <LinearProgress />
                    <Alert severity="info" icon={false}>
                      Queued:{" "}
                      {humanize(
                        (env.buildStart
                          ? Date.parse(env.buildStart)
                          : Date.now()) - Date.parse(env.requested),
                      )}
                      {env.buildStart ? (
                        <>
                          ; Building:{" "}
                          {humanize(
                            (env.buildDone
                              ? Date.parse(env.buildDone)
                              : Date.now()) - Date.parse(env.buildStart),
                          )}
                        </>
                      ) : null}
                    </Alert>
                  </Box>
                )}
              </Box>
            </Box>
            {selectedEnv === `${env.path}/${env.name}` && (
              <EnvironmentDrawer
                env={env}
                onClose={() => setSelectedEnv(null)}
              />
            )}
          </Fragment>
        ))}
      </Masonry>
    </>
  );
}

export default EnvironmentTable;
