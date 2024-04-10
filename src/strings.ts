import * as semver from "semver";

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

export function compareEnvironmentNames(a: string, b: string) {
  const [nameA, versionA] = splitEnvironmentNameToNameAndVersion(a)
  const [nameB, versionB] = splitEnvironmentNameToNameAndVersion(b)

  if (nameA != nameB) {
    return compareStrings(nameA, nameB)
  }

  const zero = semver.coerce("0")!;
  const semVerA = semver.coerce(versionA) ?? zero;
  const semVerB = semver.coerce(versionB) ?? zero;
  
  return semver.compare(semVerA, semVerB)
}
