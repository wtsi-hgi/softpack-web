import { createContext } from "react";

import CoreURL from "./core";

export type EnvironmentType = "softpack" | "module";

export type Environment = {
  name: string;
  path: string;
  description: string;
  readme: string;
  type: EnvironmentType;
  packages: Package[];
  state: "queued" | "waiting" | "failed" | "ready";
  tags: string[];
  username?: string;
  failure_reason?: string;
  hidden: boolean;
  created: number;
  interpreters: Interpreters;
};

export type Interpreters = {
  r?: string;
  python?: string;
};

export type Package = {
  name: string;
  version?: string | null;
};

export type PackageVersions = {
  name: string;
  versions: string[];
};

export type RequestedRecipe = {
  name: string;
  version: string;
  url: string;
  description: string;
  username: string;
};

export type BuildStatus = {
  avgBuildSeconds: number | null;
  queue: {
    name: string;
    requested: string;
  }[];
  building: {
    name: string;
    buildStart: string;
  }[];
};

export const PackagesContext = createContext<PackageVersions[]>([]);

export const EnvironmentsContext = createContext<[Environment[], () => void]>([
  [],
  () => {},
]);

export const UserContext = createContext<{
  username: string;
  groups: string[];
}>({ username: "", groups: [] });

export const RequestedRecipesContext = createContext<
  readonly [RequestedRecipe[], () => void]
>([[], () => {}]);

export const BuildStatusContext = createContext<BuildStatus | null>(null);

const handle = (r: Response) =>
    r.json().then((o) => {
      if ("error" in o) {
        throw o["error"];
      }

      return o;
    }),
  sendData = (path: string, params: unknown) =>
    fetch(CoreURL + path, {
      method: "post",
      body: JSON.stringify(params),
      headers: { "Content-Type": "application/json" },
    }).then(handle);

export function getEnvironments(): Promise<Environment[]> {
  return fetch(CoreURL + "get-environments").then(handle);
}

export function createEnvironment(
  name: string,
  path: string,
  description: string,
  packages: Package[],
  username: string,
  tags?: string[],
): Promise<{ message: string }> {
  return sendData("create-environment", {
    name,
    path,
    description,
    packages,
    username,
    tags,
  });
}

export function addTag(
  name: string,
  path: string,
  tag: string,
): Promise<unknown> {
  return sendData("add-tag", { name, path, tag });
}

export function setHidden(
  name: string,
  path: string,
  hidden: boolean,
): Promise<unknown> {
  return sendData("set-hidden", { name, path, hidden });
}

export function getPackages(): Promise<PackageVersions[]> {
  return fetch(CoreURL + "package-collection").then(handle);
}

export function getGroups(username: string): Promise<string[]> {
  return sendData("groups", username);
}

export function getRequestedRecipes(): Promise<RequestedRecipe[]> {
  return fetch(CoreURL + "requested-recipes").then(handle);
}

export function getBuildStatus(): Promise<BuildStatus> {
  return fetch(CoreURL + "build-status", { method: "post" }).then((j) =>
    j.json(),
  );
}

export function getPackageDescription(
  recipe: string,
): Promise<{ description: string }> {
  return sendData("get-recipe-description", { recipe });
}

export function requestRecipe(
  name: string,
  version: string,
  url: string,
  description: string,
  username: string,
): Promise<{ message: string }> {
  return sendData("request-recipe", {
    name,
    version,
    url,
    description,
    username,
  });
}
