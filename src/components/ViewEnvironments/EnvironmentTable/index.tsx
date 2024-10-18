import { compareEnvironments, compareStrings } from "../../../strings";

import type { Environments, Package } from "../../../queries";
import { isInterpreter, wrapIfInterpreted } from "../Drawer";
import { Masonry } from "@mui/lab";
import { useState } from "react";
import { LinearProgress, Tooltip } from "@mui/material";
import { humanize } from "../../../humanize";
import CoreURL from "../../../core";
import type { Environment as EnvironmentType } from "../../../queries";

type EnvironmentTableProps = {
  environments: Environments;
  highlightPackages?: Package[];
  setSelectedEnv: (v: EnvironmentType) => void;
};

function toTitle(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function EnvironmentTable(props: EnvironmentTableProps) {
  const environments = props.environments.toSorted((a, b) => compareEnvironments(a, b)),
	[recipeDescriptions, setRecipeDescriptions] = useState<Record<string, string>>({}),
	getRecipeDescription = (recipe: string) => {
		if (recipe in recipeDescriptions) {
			return;
		}

		fetch(CoreURL + "getRecipeDescription", {"method": "POST", "body": JSON.stringify({recipe})})
		.then(r => r.json())
		.then(desc => {
			recipeDescriptions[recipe] = desc["description"] ?? "";
			setRecipeDescriptions({...recipeDescriptions});
		})
	};

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
              onClick={() => props.setSelectedEnv(env)}
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
                {highlightPackages.map((pkg) => wrapIfInterpreted(env, pkg,
                  <li key={pkg.name} className={"selected" + (isInterpreter(env, pkg) ? " interpreter" : "")}>
                    {pkg.name + (pkg.version ? `@${pkg.version}` : "")}
                  </li>
                , recipeDescriptions, getRecipeDescription))}
                {normalPackages.map((pkg) => wrapIfInterpreted(env, pkg,
                  <li className={isInterpreter(env, pkg) ? "interpreter" : ""} key={pkg.name}>
                    {pkg.name + (pkg.version ? `@${pkg.version}` : "")}
                  </li>
                , recipeDescriptions, getRecipeDescription))}
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
    </>
  );
}

export default EnvironmentTable;
