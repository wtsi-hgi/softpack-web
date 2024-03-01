import { useApolloClient } from "@apollo/client";
import {
  Alert,
  Autocomplete,
  Box,
  Checkbox,
  Container,
  FormControlLabel,
  FormGroup,
  InputAdornment,
  Stack,
  TextField,
} from "@mui/material";
import { useLocalStorage } from "@uidotdev/usehooks";
import { useContext, useEffect, useState } from "react";

import { compareStrings } from "../../../compare";
import { humanize } from "../../../humanize";
import { ALL_ENVIRONMENTS, Package } from "../../../queries";
import { EnvironmentsQueryContext } from "../../EnvironmentsQueryContext";
import { HelpIcon } from "../../HelpIcon";
import { UserContext } from "../../UserContext";
import EnvironmentTable from "../EnvironmentTable";

const SECOND = 1000;
const MAX_REFETCH_INTERVAL = 10 * SECOND;

function arrayEqual<T>(a: T[], b: T[]): boolean {
  return a.length === b.length && a.every((val, idx) => val === b[idx]);
}

// EnvironmentList displays the 'view environments' page of the program.
const EnvironmentList = () => {
  const { loading, data, error } = useContext(EnvironmentsQueryContext);
  const [filter, setFilter] = useState("");
  const client = useApolloClient();
  const [refetchInterval, setRefetchInterval] = useState(SECOND);
  const [filterUsers, setFilterUsers] = useLocalStorage<string[]>(
    "environments-filterusers",
    [],
  );
  const [filterGroups, setFilterGroups] = useLocalStorage<string[]>(
    "environments-filtergroups",
    [],
  );
  const [filterTags, setFilterTags] = useLocalStorage<string[]>(
    "environments-filtertags",
    [],
  );
  const [ignoreReady, setIgnoreReady] = useLocalStorage(
    "environments-ignoreready",
    false,
  );
  const { username, groups } = useContext(UserContext);

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

  let filteredEnvironments = [...data.environments];

  // filter by name/package
  const highlightPackagesSet = new Set<Package>();
  if (filter) {
    const parts = filter.toLowerCase().split(" ");

    filteredEnvironments = filteredEnvironments.filter((e) =>
      parts.every((part) => {
        const [name, version] = part.split("@");

        return (
          e.packages.some((pkg) => {
            const match =
              pkg.name.toLowerCase().includes(name) &&
              (!version || pkg.version?.toLowerCase().startsWith(version));
            if (match) {
              highlightPackagesSet.add({
                name: pkg.name,
                version: pkg.version,
              });
            }
            return match;
          }) || e.name.toLocaleLowerCase().includes(part)
        );
      }),
    );
  }
  const highlightPackages = [...highlightPackagesSet];

  // filter by owner
  if (filterUsers.length > 0 || filterGroups.length > 0) {
    filteredEnvironments = filteredEnvironments.filter(
      (e) =>
        filterUsers.some((user) => e.path === `users/${user}`) ||
        filterGroups.some((group) => e.path === `groups/${group}`),
    );
  }

  // filter by tag
  if (filterTags.length > 0) {
    filteredEnvironments = filteredEnvironments.filter((e) =>
      filterTags.some((tag) => e.tags.includes(tag)),
    );
  }

  if (ignoreReady) {
    filteredEnvironments = filteredEnvironments.filter(
      (e) => e.state !== "ready",
    );
  }

  const allGroupsSet = new Set<string>();
  const allUsersSet = new Set<string>();
  const allTagsSet = new Set<string>();
  data.environments.map((env) => {
    if (env.path.startsWith("users/")) {
      allUsersSet.add(env.path.split("/")[1]);
    } else {
      allGroupsSet.add(env.path.split("/")[1]);
    }
    env.tags.forEach((tag) => allTagsSet.add(tag));
  });
  const allGroups = [...allGroupsSet].sort(compareStrings);
  const allUsers = [...allUsersSet].sort(compareStrings);
  const allTags = [...allTagsSet].sort(compareStrings);

  return (
    <>
      <Box
        style={{ margin: "2em", padding: "0.5em", width: "calc(100% - 4em)" }}
      >
        <TextField
          id="name-field"
          variant="standard"
          placeholder="Search for Environments by name or package[@version]"
          style={{ width: "100%" }}
          onChange={(e) => setFilter(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <HelpIcon title="Filter by space-delimited list of package@version or environment name" />
              </InputAdornment>
            ),
          }}
        ></TextField>
        <Stack direction="row" spacing={1} py={0.5} alignItems="center">
          <Autocomplete
            openOnFocus
            size="small"
            options={allUsers}
            multiple
            value={filterUsers}
            onChange={(_, value) => setFilterUsers(value)}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                placeholder="Filter by user"
              />
            )}
            sx={{ minWidth: 160 }}
          />
          <Autocomplete
            openOnFocus
            size="small"
            options={allGroups}
            multiple
            value={filterGroups}
            onChange={(_, value) => setFilterGroups(value)}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                placeholder="Filter by group"
              />
            )}
            sx={{ minWidth: 160 }}
          />
          <Autocomplete
            openOnFocus
            size="small"
            options={allTags}
            multiple
            value={filterTags}
            onChange={(_, value) => setFilterTags(value)}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                placeholder="Filter by tag"
              />
            )}
            sx={{ minWidth: 160 }}
          />
          <FormGroup row>
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
                checked={
                  arrayEqual(filterUsers, [username]) &&
                  arrayEqual(
                    filterGroups,
                    groups.filter((group) => allGroups.includes(group)),
                  )
                }
                onChange={(_, checked) => {
                  if (checked) {
                    setFilterUsers([username]);
                    setFilterGroups(
                      groups.filter((group) => allGroups.includes(group)),
                    );
                  } else {
                    setFilterUsers([]);
                    setFilterGroups([]);
                  }
                }}
              />
            )}
          </FormGroup>
        </Stack>
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
        <EnvironmentTable
          environments={filteredEnvironments}
          highlightPackages={highlightPackages}
        />
      </Container>
    </>
  );
};

export default EnvironmentList;
