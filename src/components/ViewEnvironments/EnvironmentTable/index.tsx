import { isInterpreter, recipeDescriptionContext, wrapIfInterpreted } from "../Drawer";
import { useContext } from "react";
import { Masonry } from "@mui/lab";
import { Tooltip } from '../../Tooltip';
import { BuildStatus, Environment, Package } from "../../../endpoints";
import { estimateWaitForEnv, formatTime } from "../utils/build";
import { LinearProgress } from "@mui/material";

type EnvironmentTableProps = {
  environments: Environment[];
  highlightPackages?: Package[];
  setSelectedEnv: (v: Environment) => void;
  buildStatuses: BuildStatus | null;
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
              {props.buildStatuses && (() => {
                const estimate = estimateWaitForEnv(`${env.path}/${env.name}`, props.buildStatuses!, 3);
                if (!estimate) return null;

                return (
                  <>
                    <LinearProgress style={{ borderTopRightRadius: "4px", borderTopLeftRadius: "4px" }} />
                    <div className="queue">
                      {estimate.isBuilding ? (
                        <>
                          <b>Build in progress</b>
                          <br />
                          Running for {formatTime(estimate.elapsedSeconds)}
                        </>
                      ) : (
                        <>
                          <b>Queued</b>
                          <br />
                          {estimate.jobsAhead > 0 && (
                            <>
                              {estimate.jobsAhead} job{estimate.jobsAhead > 1 ? "s" : ""} ahead
                              <br />
                            </>
                          )}
                          Estimated start: {formatTime(estimate.queueSeconds)}
                          <br />
                          Estimated build time: {formatTime(estimate.buildSeconds)}
                        </>
                      )}
                    </div>
                  </>
                );
              })()}
            </li>
          );
        })}
      </Masonry>
    </>
  );
}

export default EnvironmentTable;
