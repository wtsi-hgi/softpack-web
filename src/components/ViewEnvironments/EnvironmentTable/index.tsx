import { useState } from "react";

import { compareEnvironments, compareStrings } from "../../../strings";

import type { Environment, Environments, Package } from "../../../queries";
import EnvironmentDrawer from "../Drawer";
import { useSearchParams } from "react-router-dom";
import { Masonry } from "@mui/lab";
import { LinearProgress, Tooltip } from "@mui/material";
import { humanize } from "../../../humanize";


type EnvironmentTableProps = {
  environments: Environments;
  highlightPackages?: Package[];
  modifyUrl?: boolean;
};

function toTitle(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function EnvironmentTable(props: EnvironmentTableProps) {
  const [selectedEnv, setSelectedEnv] = useState<Environment | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [open, setOpen] = useState(false);

  const modifyUrl = props.modifyUrl ?? false
  const environments = props.environments.toSorted((a, b) =>
    compareEnvironments(a, b),
  );

  const allHighlightedPackages = new Set<string>();
  props.highlightPackages?.forEach(({ name, version }) => {
    allHighlightedPackages.add(version ? `${name}@${version}` : name);
  });

  if (modifyUrl) {
    const searchEnv = searchParams.get("envId")
    const env = environments.find((e) => `${e.path}/${e.name}` == searchEnv)
    if (selectedEnv != env && env != undefined) {
      setSelectedEnv(env)
      setOpen(true)
    } else if (env == undefined && open) {
      setSelectedEnv(null)
      setOpen(false)
    }
  }

  return (
    <>
      <Masonry id="environments" columns={{ sm: 1, md: 2, lg: 2, xl: 3 }} spacing={2}>
        {environments.map((env) => {
          const highlightPackages: Package[] = [];
          const normalPackages: Package[] = [];
          env.packages
            .toSorted((a, b) => compareStrings(a.name, b.name))
            .forEach((pkg) => {
              // const matchCandidate = highlightedPackageVersions.get(pkg.name);
              // if (matchCandidate === null || pkg.version === matchCandidate) {
              const highlight =
                allHighlightedPackages.has(pkg.name) ||
                allHighlightedPackages.has(`${pkg.name}@${pkg.version}`);
              if (highlight) {
                highlightPackages.push(pkg);
              } else {
                normalPackages.push(pkg);
              }
            });
          return (
            <li
              key={`${env.path}/${env.name}`}
              className={env.type + " " + env.state ?? "queued"}
              onClick={() => {
                setSelectedEnv(env)
                setOpen(true)
                if (modifyUrl) {
                  searchParams.set('envId', `${env.path}/${env.name}`)
                  setSearchParams(searchParams)
                }
              }}
            >
              <Tooltip title={toTitle(String(env.state)) ?? "Queued"} placement="top">
                <span className={"colourBar " + env.state ?? "queued"} />
              </Tooltip>
              <Tooltip title={
                env.type === "softpack"
                  ? "Built with SoftPack"
                  : "Generated from module (not reproducible)"
              }
                placement="left">
                <span className="type">{env.type === "softpack" ? "S" : "M"}</span>
              </Tooltip>
              <h2>{env.name}</h2>
              <ul>
                {env.path.split("/").map((p, i) => (
                  <li key={i}>{p}</li>
                ))}
              </ul>
              <ul>
                {env.tags.map((tag, i) => (
                  <li key={i}>{tag}</li>
                ))}
              </ul>
              <div>{env.description.split("\n")[0]}</div>
              <ul>
                {highlightPackages.map((pkg) => (
                  <li key={pkg.name} className="selected">
                    {pkg.name + (pkg.version ? `@${pkg.version}` : "")}
                  </li>
                ))}
                {normalPackages.map((pkg) => (
                  <li key={pkg.name}>
                    {pkg.name + (pkg.version ? `@${pkg.version}` : "")}
                  </li>
                ))}
              </ul>
              {env.state === "queued" && (
                <>
                  <LinearProgress style={{ borderTopRightRadius: "4px", borderTopLeftRadius: "4px" }} />
                  <div className="queue">
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
                  </div>
                </>
              )}
            </li>
          );
        })}
      </Masonry>
      <EnvironmentDrawer
        env={selectedEnv!}
        open={open}
        onClose={() => {
          setSelectedEnv(null)
          setOpen(false)
          searchParams.delete('envId')
          setSearchParams(searchParams)
        }}
      />
    </>
  );
}

export default EnvironmentTable;
