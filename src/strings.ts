import * as semver from "semver";
import { Environment } from "./endpoints";

const zero = semver.coerce("0")!;

export function compareStrings(a: string, b: string) {
  return a.localeCompare(b, "en", { sensitivity: "base" });
}

export function stripPackageSearchPunctuation(name: string) {
  return name.toLowerCase().replaceAll(/[\p{P}\s]/ug, "")
}

export function parseEnvironmentToNamePathAndVersion(env: Environment): [string, string, semver.SemVer] {
  const envNameParts = env.name.split("-")

  const version = envNameParts.length > 1 ? envNameParts.pop() : 0;
  const semVer = semver.coerce(version) ?? zero

  const envName = envNameParts.join("-")
  const namePath = envName + "." + env.path

  return [envName, namePath, semVer]
}

export function compareEnvironments(a: Environment, b: Environment) {
  const [, namePathA, semVerA] = parseEnvironmentToNamePathAndVersion(a)
  const [, namePathB, semVerB] = parseEnvironmentToNamePathAndVersion(b)

  if (namePathA != namePathB) {
    return compareStrings(namePathA, namePathB)
  }

  return semver.compare(semVerA, semVerB)
}
