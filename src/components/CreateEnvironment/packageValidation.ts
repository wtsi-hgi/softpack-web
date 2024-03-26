import { Package } from "../../queries"

export function validatePackages(selectedPackages: Package[], allPackages: Map<string, string[]>) {
    const validPackages: Package[] = []
    const invalidSelectedPackages: Package[] = []
    const invalidSelectedVersionPackages: Package[] = []

    selectedPackages.forEach(({ name, version }) => {
        const envPkgVersions = allPackages.get(name)
        const pkg: Package = { name: name, version: version }
        let finalVersion = version

        if (envPkgVersions) {
        if (version && !envPkgVersions.includes(version)) {
            invalidSelectedVersionPackages.push(pkg)
            finalVersion = envPkgVersions[0]
        }
        validPackages.push({ name: name, version: finalVersion })
        } else {
        invalidSelectedPackages.push(pkg)
        }
    })

    return [validPackages, invalidSelectedPackages, invalidSelectedVersionPackages]
}
