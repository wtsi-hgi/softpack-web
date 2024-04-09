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
