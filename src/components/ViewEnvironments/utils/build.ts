import { BuildStatus } from "../../../endpoints";

export type BuildEstimate =
  | {
      isBuilding: true;
      elapsedSeconds: number;
      buildSeconds: number;
    }
  | {
      isBuilding: false;
      queueSeconds: number;
      buildSeconds: number;
      totalSeconds: number;
      jobsAhead: number;
    };

export const estimateWaitForEnv = (
  envName: string,
  status: BuildStatus | null,
  maxParallelBuilds: number = 3,
): BuildEstimate | null => {
  if (!status || status.avgBuildSeconds === null) return null;

  const avgBuild = status.avgBuildSeconds;

  const buildingEntry = status.building.find((b) => b.name === envName);
  if (buildingEntry) {
    const startedAt = Date.parse(buildingEntry.buildStart);
    const elapsed = (Date.now() - startedAt) / 1000;

    return {
      isBuilding: true,
      elapsedSeconds: elapsed,
      buildSeconds: avgBuild,
    };
  }

  const queueIndex = status.queue.findIndex((e) => e.name === envName);
  if (queueIndex === -1) return null;

  const queueSeconds = (queueIndex / maxParallelBuilds + 1) * avgBuild;
  const buildSeconds = avgBuild;
  const totalSeconds = queueSeconds + buildSeconds;

  return {
    isBuilding: false,
    queueSeconds,
    buildSeconds,
    totalSeconds,
    jobsAhead: queueIndex,
  };
};

export const formatTime = (seconds: number) => {
  seconds = Math.round(seconds);
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;

  const parts: string[] = [];
  if (h > 0) parts.push(`${h}h`);
  if (m > 0) parts.push(`${m}m`);
  if (s > 0 || parts.length === 0) parts.push(`${s}s`);

  return parts.join(" ");
};
