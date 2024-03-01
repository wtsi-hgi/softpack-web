export function compareStrings(a: string, b: string) {
  return a.localeCompare(b, "en", { sensitivity: "base" });
}
