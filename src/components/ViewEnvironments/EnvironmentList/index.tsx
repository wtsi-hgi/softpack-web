import { useApolloClient } from "@apollo/client";
import {
  Alert,
  Autocomplete,
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  FormGroup,
  Stack,
  TextField,
} from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';
import { useLocalStorage } from "@uidotdev/usehooks";
import { useContext, useEffect, useState } from "react";
import * as semver from "semver";

import { compareStrings, parseEnvironmentToNamePathAndVersion, stripPackageSearchPunctuation } from "../../../strings";
import { humanize } from "../../../humanize";
import { ALL_ENVIRONMENTS, Environment as EnvironmentType, ALL_PACKAGES, Package } from "../../../queries";
import { EnvironmentsQueryContext } from "../../EnvironmentsQueryContext";
import EnvironmentDrawer, { recipeDescriptionContext } from "../Drawer";
import { HelpIcon } from "../../HelpIcon";
import { UserContext } from "../../UserContext";
import EnvironmentTable, { BuildStatusContext } from "../EnvironmentTable";
import { useSearchParams } from "react-router-dom";
import CreateEnvPrompt from "../CreateEnvPrompt";

const SECOND = 1000;
const MAX_REFETCH_INTERVAL = 10 * SECOND;

function arrayEqual<T>(a: T[], b: T[]): boolean {
  return a.length === b.length && a.every((val, idx) => val === b[idx]);
}

// EnvironmentList displays the 'view environments' page of the program.
const EnvironmentList = () => {
  const { loading, data, error } = useContext(EnvironmentsQueryContext);
  const buildStatuses = useContext(BuildStatusContext);
  const [filter, setFilter] = useState("");
  const [filterText, setFilterText] = useState("");
  const client = useApolloClient();
  const [refetchInterval, setRefetchInterval] = useState(SECOND);
  const [filterUserText, setFilterUserText] = useState("");
  const [filterGroupText, setFilterGroupText] = useState("");
  const [filterTagText, setFilterTagText] = useState("");
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
  const [showOldVersions, setShowOldVersions] = useLocalStorage(
    "environments-showoldversions",
    false,
  );
  const [showHidden, setShowHidden] = useLocalStorage(
    "environments-showhidden",
    false,
  );
  const { username, groups } = useContext(UserContext);

  const [searchParams, setSearchParams] = useSearchParams();

  const [packages, setPackages] = useState<string[]>([]);

  const [recipeDescriptions, getRecipeDescription] = useContext(recipeDescriptionContext);

  useEffect(() => {
    const fetchData = async () => {
      const pkgs: string[] = [];
      const result = await client.query({ query: ALL_PACKAGES });
      if (result.error) {
        pkgs.push("errorpackage");
      }
      result.data?.packageCollections.forEach(({ name }: { name: string }) => {
        pkgs.push(name);
      });
      setPackages(pkgs);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
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
    return <Box width="100%" height="300px" lineHeight="300px" textAlign="center"><CircularProgress /></Box>;
  }

  if (error || !data) {
    return (
      <div style={{ color: "red" }}>{error?.message || "Unknown error"}</div>
    );
  }

  const environmentsInProgress = data.environments.reduce((c, e) => c + +(e.state == "queued"), 0);

  let filteredEnvironments = data.environments.slice().map(env => Object.assign(
    Object.assign({}, env),
    {
      "packages": env.packages.toSpliced(0, 0, ...[
        (env.interpreters.python ? { "name": "python", "version": env.interpreters.python } : null) as typeof env.packages[0],
        (env.interpreters.r ? { "name": "r", "version": env.interpreters.r } : null) as typeof env.packages[0]
      ].filter(e => e))
    }));

  // filter by name/package
  const highlightPackagesSet = new Set<Package>();
  if (filter) {
    const parts = filter.toLowerCase().split(" ");

    filteredEnvironments = filteredEnvironments.filter((e) =>
      parts.every(part => {
        const [name, version] = part.split("@");

        let aPackageMatched = false;

        e.packages.forEach(pkg => {
          const match =
            pkg.name
              .toLowerCase()
              .replaceAll("-", "")
              .includes(stripPackageSearchPunctuation(name)) &&
            (!version || pkg.version?.toLowerCase().startsWith(version));
          if (match) {
            highlightPackagesSet.add({
              name: pkg.name,
              version: pkg.version,
            });

            aPackageMatched = true;
          }
        })

        return (
          aPackageMatched || e.name.toLocaleLowerCase().includes(part)
        );
      })
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

  if (!showOldVersions) {
    const envsGroupedOnNamePath = new Map<string, [semver.SemVer, typeof filteredEnvironments[0]]>();

    for (const env of filteredEnvironments) {
      const [, namePath, semVer] = parseEnvironmentToNamePathAndVersion(env);
      const existing = envsGroupedOnNamePath.get(namePath);

      if (!existing || semver.gte(semVer, existing[0])) {
        envsGroupedOnNamePath.set(namePath, [semVer, env]);
      }
    }

    filteredEnvironments = Array.from(envsGroupedOnNamePath.values()).map(e => e[1])
  }

  if (!showHidden) {
    filteredEnvironments = filteredEnvironments.filter(e => !e.hidden);
  }

  const searchEnv = searchParams.get("envId")
  const selectedEnv = data.environments.find((e) => `${e.path}/${e.name}` == searchEnv)
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
        <Stack direction="row" display="flex" alignItems="center">
          <Stack direction="row" id="search" flexGrow={1} mr="10px" height={1} >
            <input
              id="search-bar"
              placeholder="Search for Environments by name or package[@version]"
              style={{ width: "100%", display: "inline-block" }}
              value={filterText}
              onChange={e => (setFilterText(e.target.value), setTimeout(() => setFilter(e.target.value.trim().replaceAll(/\s\s+/g, " "))), 500)}
            />
            <HelpIcon title="Filter by space-delimited list of package@version or environment name" />
          </Stack>
        </Stack>
        <Stack direction="row" spacing={1} py={0.5} alignItems="center">
          <Autocomplete
            openOnFocus
            size="small"
            options={allUsers}
            multiple
            inputValue={filterUserText}
            onInputChange={(e, value) => e && setFilterUserText(value)}
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
            inputValue={filterGroupText}
            onInputChange={(e, value) => e && setFilterGroupText(value)}
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
            inputValue={filterTagText}
            onInputChange={(e, value) => e && setFilterTagText(value)}
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
              onChange={(_, checked) => setIgnoreReady(checked)}
            />
            <FormControlLabel
              control={<Checkbox />}
              label={
                <>
                  All versions{" "}
                  <HelpIcon title="Show all versions of each environment, not just the latest" />
                </>
              }
              disableTypography
              checked={showOldVersions}
              onChange={(_, checked) => setShowOldVersions(checked)}
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
            <FormControlLabel
              control={<Checkbox />}
              label={
                <>
                  Show hidden{" "}
                  <HelpIcon title="Show all hidden environments" />
                </>
              }
              disableTypography
              checked={showHidden}
              onChange={(_, checked) => setShowHidden(checked)}
            />
          </FormGroup>
          <Button disabled={filterUsers.length === 0 && filterGroups.length === 0 && filterTags.length === 0 && filterText.length === 0 && !showOldVersions && !showHidden && !ignoreReady} variant="outlined"
            onClick={() => {
              setFilterUsers([]);
              setFilterGroups([]);
              setFilterTags([]);
              setFilterText("");
              setFilter("");
              setShowOldVersions(false);
              setShowHidden(false);
              setIgnoreReady(false);
            }}>Reset</Button>
        </Stack>
        {filteredEnvironments.some((e) => e.state === "queued") ||
          ignoreReady ? (
          <Alert severity="info">
            There are currently {environmentsInProgress} environments in
            the build queue. Average wait time:{" "}
            {buildStatuses != null ? humanize(buildStatuses.avg * 1000) : "unknown"}.
          </Alert>
        ) : null}
      </Box>
      <Container id="environment_table">
        {filteredEnvironments.length > 0 ? (
          <EnvironmentTable
            buildStatuses={buildStatuses?.statuses ?? null}
            environments={filteredEnvironments}
            highlightPackages={highlightPackages}
            setSelectedEnv={(env: EnvironmentType) => {
              searchParams.set("envId", `${env.path}/${env.name}`);
              setSearchParams(searchParams);
            }}
          />
        ) : (
          <CreateEnvPrompt
            name={filter}
            pkgs={packages}
          />
        )}
        <EnvironmentDrawer
          env={selectedEnv}
          open={!!selectedEnv}
          onClose={() => {
            searchParams.delete('envId');
            setSearchParams(searchParams);
          }}
          recipeDescriptions={recipeDescriptions}
          getRecipeDescription={getRecipeDescription}
        />
      </Container>
    </>
  );
};

export default EnvironmentList;
