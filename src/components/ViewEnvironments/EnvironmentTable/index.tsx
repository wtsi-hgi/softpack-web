import { isInterpreter, recipeDescriptionContext, wrapIfInterpreted } from "../Drawer";
import { useContext } from "react";

import { Masonry } from "@mui/lab";
import { LinearProgress } from "@mui/material";
import { Tooltip } from '../../Tooltip';
import { humanize } from "../../../humanize";
import { Environment, Package } from "../../../endpoints";

type EnvironmentTableProps = {
  environments: Environment[];
  highlightPackages?: Package[];
  setSelectedEnv: (v: Environment) => void;
  buildStatuses: Record<string, string> | null;
};

function toTitle(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function EnvironmentTable(props: EnvironmentTableProps) {
  const environments = props.environments,
    [recipeDescriptions, getRecipeDescription] = useContext(recipeDescriptionContext);

  const allHighlightedPackages = new Set<string>();
  props.highlightPackages?.forEach(({ name, version }) => {
    allHighlightedPackages.add(version ? `${name}@${version}` : name);
  });

  return (
    <>
      <Masonry id="environments" columns={{ sm: 1, md: 2, lg: 2, xl: 3 }} spacing={2}>
        {environments.map((env) => {
          const highlightPackages: Package[] = [];
          const normalPackages: Package[] = [];
          env.packages
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
              className={env.type + " " + (env.state ?? "queued")}
              onClick={() => props.setSelectedEnv(env)}
            >
              <Tooltip title={toTitle(String(env.state)) ?? "Queued"} placement="top">
                <span className={"colourBar " + (env.state ?? "queued")} />
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
                {highlightPackages.map((pkg) => wrapIfInterpreted(env, pkg,
                  <li key={pkg.name + "@" + pkg.version} className={"selected" + (isInterpreter(env, pkg) ? " interpreter" : "")}>
                    {pkg.name + (pkg.version ? `@${pkg.version}` : "")}
                  </li>
                  , recipeDescriptions, getRecipeDescription))}
                {normalPackages.map((pkg) => wrapIfInterpreted(env, pkg,
                  <li key={pkg.name + "@" + pkg.version} className={isInterpreter(env, pkg) ? "interpreter" : ""}>
                    {pkg.name + (pkg.version ? `@${pkg.version}` : "")}
                  </li>
                  , recipeDescriptions, getRecipeDescription))}
              </ul>
              {(env.state === "failed") &&
                <div style={{ fontSize: "1.1em", fontWeight: "bold", backgroundColor: env.failure_reason === "concretization" ? "#fd0" : "#faa", borderRadius: "1em", textAlign: "center", "padding": "0.5em 0" }}>{env.failure_reason === "concretization" ?
                  "Version Conflict: Try relaxing which versions you've specified." :
                  "Build Error: Contact your softpack administrator."}</div>
              }
              {env.state === "queued" && (
                <>
                  <LinearProgress style={{ borderTopRightRadius: "4px", borderTopLeftRadius: "4px" }} />
                  <div className="queue">
                    Queued:{" "}
                    {humanize(
                      (props.buildStatuses?.[env.name]
                        ? Date.parse(props.buildStatuses[env.name])
                        : Date.now()) - env.created * 1000,
                    )}
                    {props.buildStatuses?.[env.name] ? (
                      <>
                        ; Building:{" "}
                        {humanize(
                          Date.now() - Date.parse(props.buildStatuses[env.name])
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
    </>
  );
}

export default EnvironmentTable;
