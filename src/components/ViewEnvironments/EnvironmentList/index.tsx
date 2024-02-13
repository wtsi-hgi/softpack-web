import { useApolloClient, useQuery } from "@apollo/client";
import {
  Alert,
  Box,
  Checkbox,
  Container,
  FormControlLabel,
  FormGroup,
  InputAdornment,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { useLocalStorage } from "@uidotdev/usehooks";
import { useContext, useEffect, useState } from "react";

import { humanize } from "../../../humanize";
import { ALL_ENVIRONMENTS } from "../../../queries";
import { HelpIcon } from "../../HelpIcon";
import { UserContext } from "../../UserContext";
import EnvironmentTable from "../EnvironmentTable";

const SECOND = 1000;
const MAX_REFETCH_INTERVAL = 10 * SECOND;

function compareStrings(a: string, b: string) {
  return a.localeCompare(b, "en", { sensitivity: "base" });
}

// EnvironmentList displays the 'view environments' page of the program.
const EnvironmentList = () => {
  const { loading, data, error } = useQuery(ALL_ENVIRONMENTS);
  const [filter, setFilter] = useState("");
  const client = useApolloClient();
  const [refetchInterval, setRefetchInterval] = useState(SECOND);
  const [byUserGroup, setByUserGroup] = useLocalStorage(
    "environments-byusergroup",
    false,
  );
  const [ignoreReady, setIgnoreReady] = useLocalStorage(
    "environments-ignoreready",
    false,
  );
  const [onlyMine, setOnlyMine] = useLocalStorage("environments-mine", false);
  const { username, groups } = useContext(UserContext);
  const [sectionExpanded, setSectionExpanded] = useState<
    Record<string, boolean>
  >({});

  useEffect(() => {
    let interval = setInterval(() => {
      if (!loading && !error) {
        client.refetchQueries({ include: [ALL_ENVIRONMENTS] });
      }
      if (refetchInterval < MAX_REFETCH_INTERVAL) {
        setRefetchInterval(refetchInterval * 2);
      }
    }, refetchInterval);
    return () => clearInterval(interval);
  }, [loading, error, refetchInterval]);

  if (loading) {
    return <div>loading...</div>;
  }

  if (error || !data) {
    return (
      <div style={{ color: "red" }}>{error?.message || "Unknown error"}</div>
    );
  }

  const environmentsInProgress = data.environments.filter(
    (e) => e.state == "queued",
  );

  const avgWaitSecs = data.environments.find((e) => e.avgWaitSecs != null)
    ?.avgWaitSecs;

  let filteredEnvironments = data.environments.toSorted((a, b) =>
    compareStrings(a.name, b.name),
  );

  if (filter) {
    const parts = filter.toLowerCase().split(" ");

    filteredEnvironments = filteredEnvironments.filter((e) =>
      parts.every((part) => {
        const [name, version] = part.split("@");

        return (
          e.name.toLocaleLowerCase().includes(part) ||
          e.path.toLowerCase().split("/").pop()?.includes(part) ||
          e.packages.some(
            (pkg) =>
              pkg.name.toLowerCase().includes(name) &&
              (!version || pkg.version?.toLowerCase().startsWith(version)),
          )
        );
      }),
    );
  }

  if (ignoreReady) {
    filteredEnvironments = filteredEnvironments.filter(
      (e) => e.state !== "ready",
    );
  }

  if (onlyMine && groups.length > 0) {
    filteredEnvironments = filteredEnvironments.filter(
      (e) =>
        e.path === `users/${username}` ||
        groups.some((g) => e.path === `groups/${g}`),
    );
  }

  const environmentsByOwner = Object.entries(
    filteredEnvironments.reduce(
      (acc, env) => {
        acc[env.path] = [...(acc[env.path] ?? []), env];
        return acc;
      },
      {} as Record<string, typeof filteredEnvironments>,
    ),
  );

  const allExpanded = Object.values(sectionExpanded).every((x) => x === true);
  const allCollapsed = Object.values(sectionExpanded).every((x) => x === false);

  return (
    <>
      <Box
        style={{ margin: "2em", padding: "0.5em", width: "calc(100% - 4em)" }}
      >
        <TextField
          id="name-field"
          variant="standard"
          placeholder="Search for Environments"
          style={{ width: "100%" }}
          onChange={(e) => setFilter(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <HelpIcon
                  title={"Filter by space-delineated list of packages"}
                />
              </InputAdornment>
            ),
          }}
        ></TextField>
        <FormGroup row>
          <FormControlLabel
            control={<Checkbox />}
            label={
              <>
                By user/group{" "}
                <HelpIcon title="List each user/group's environments separately" />
              </>
            }
            disableTypography
            checked={byUserGroup}
            onChange={(e) => setByUserGroup((e.target as any).checked)}
          />
          <FormControlLabel
            control={<Checkbox />}
            label={
              <>
                Building{" "}
                <HelpIcon title="Only show queued/failed environments" />
              </>
            }
            disableTypography
            checked={ignoreReady}
            onChange={(e) => setIgnoreReady((e.target as any).checked)}
          />
          {groups.length > 0 && (
            <FormControlLabel
              control={<Checkbox />}
              label={
                <>
                  Mine{" "}
                  <HelpIcon title="Environments owned by you or one of your groups" />
                </>
              }
              disableTypography
              checked={onlyMine}
              onChange={(e) => setOnlyMine((e.target as any).checked)}
            />
          )}
        </FormGroup>
        {filteredEnvironments.some((e) => e.state === "queued") ||
        ignoreReady ? (
          <Alert severity="info">
            There are currently {environmentsInProgress.length} environments in
            the build queue. Average wait time:{" "}
            {avgWaitSecs != null ? humanize(avgWaitSecs * 1000) : "unknown"}.
          </Alert>
        ) : null}
      </Box>
      <Container id="environment_table">
        {byUserGroup && (
          <>
            {allCollapsed ? (
              "Collapse"
            ) : (
              <Link
                component="button"
                variant="body2"
                sx={{ verticalAlign: "baseline" }}
                onClick={() => {
                  setSectionExpanded(
                    Object.fromEntries(
                      Object.keys(sectionExpanded).map((k) => [k, false]),
                    ),
                  );
                }}
              >
                Collapse
              </Link>
            )}{" "}
            /{" "}
            {allExpanded ? (
              "Expand"
            ) : (
              <Link
                component="button"
                variant="body2"
                sx={{ verticalAlign: "baseline" }}
                onClick={() => {
                  setSectionExpanded(
                    Object.fromEntries(
                      Object.keys(sectionExpanded).map((k) => [k, true]),
                    ),
                  );
                }}
              >
                Expand
              </Link>
            )}{" "}
            all
          </>
        )}
        {byUserGroup ? (
          environmentsByOwner
            .toSorted(([a], [b]) => compareStrings(a, b))
            .map(([name, envs]) => (
              <details
                key={name}
                open={sectionExpanded[name] ?? (sectionExpanded[name] = false)}
                onToggle={(e) =>
                  setSectionExpanded({
                    ...sectionExpanded,
                    [name]: (e.target as any).open,
                  })
                }
              >
                <summary>
                  <Typography
                    variant="h4"
                    pl={1}
                    pb={1}
                    sx={{ display: "inline-block" }}
                  >
                    {name}
                  </Typography>
                </summary>
                <EnvironmentTable environments={envs} />
              </details>
            ))
        ) : (
          <EnvironmentTable environments={filteredEnvironments} />
        )}
      </Container>
    </>
  );
};

export default EnvironmentList;
