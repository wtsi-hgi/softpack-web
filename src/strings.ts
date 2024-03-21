export function compareStrings(a: string, b: string) {
  return a.localeCompare(b, "en", { sensitivity: "base" });
}

export function stripPackageSearchPunctuation(name: string) {
  return name.toLowerCase().replace(" ", "").replace(".", "").replace("_", "")
}
