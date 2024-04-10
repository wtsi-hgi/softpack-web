import * as semver from "semver";
import { Environment } from "./queries";

export function compareStrings(a: string, b: string) {
  return a.localeCompare(b, "en", { sensitivity: "base" });
}

export function stripPackageSearchPunctuation(name: string) {
  return name.toLowerCase().replaceAll(/\p{P}/ug, "")
}

export function splitEnvironmentNameToNameAndVersion(name: string) : [string, string] {
  const envNameParts = name.split("-")
  const version = envNameParts.pop()
  return [envNameParts.join("-") || "", version || ""]
}

export function compareEnvironments(a: Environment, b: Environment) {
  const [nameA, versionA] = splitEnvironmentNameToNameAndVersion(a.name)
  const [nameB, versionB] = splitEnvironmentNameToNameAndVersion(b.name)

  const namePathA = nameA + "." + a.path
  const namePathB = nameB + "." + b.path

  if (namePathA != namePathB) {
    return compareStrings(namePathA, namePathB)
  }

  const zero = semver.coerce("0")!;
  const semVerA = semver.coerce(versionA) ?? zero;
  const semVerB = semver.coerce(versionB) ?? zero;
  
  return semver.compare(semVerA, semVerB)
}
