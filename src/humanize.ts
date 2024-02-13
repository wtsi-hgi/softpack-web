import humanizeDuration from "humanize-duration";

export const humanize = humanizeDuration.humanizer({
  units: ["d", "h", "m"],
  round: true,
});
