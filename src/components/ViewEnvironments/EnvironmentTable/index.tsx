import { useState } from "react";

import { compareEnvironments, compareStrings } from "../../../strings";

import type { Environment, Environments, Package } from "../../../queries";
import EnvironmentDrawer from "../Drawer";
import { useSearchParams } from "react-router-dom";


type EnvironmentTableProps = {
  environments: Environments;
  highlightPackages?: Package[];
  modifyUrl?: boolean;
};


function EnvironmentTable(props: EnvironmentTableProps) {
  const [selectedEnv, setSelectedEnv] = useState<Environment | null | undefined>(null);
  const [searchParams, setSearchParams] = useSearchParams();

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
    if (selectedEnv != env)
      setSelectedEnv(env)
  }

  return (
    <>
      <li id="environments">
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
            <li key={`${env.path}/${env.name}`} className={env.type + " " + env.state ?? "queued"}
              onClick={() => {
                setSelectedEnv(env)
                if (modifyUrl) {
                  searchParams.set('envId', `${env.path}/${env.name}`)
                  setSearchParams(searchParams)
                }
              }}
            >
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
                  <li key={pkg.name}>
                    {pkg.name + (pkg.version ? `@${pkg.version}` : "")}
                  </li>
                ))}
                {normalPackages.map((pkg) => (
                  <li key={pkg.name}>
                    {pkg.name + (pkg.version ? `@${pkg.version}` : "")}
                  </li>
                ))}
              </ul>
            </li>
          );
        })}
      </li>
      {(selectedEnv) && (
        <EnvironmentDrawer
          env={selectedEnv}
          onClose={() => {
            setSelectedEnv(null)
            searchParams.delete('envId')
            setSearchParams(searchParams)
          }}
        />
      )}
    </>
  );
}

export default EnvironmentTable;
