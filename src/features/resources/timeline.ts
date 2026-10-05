import type { ResourceMilestone } from "./timeline-data";

export type TimelineFilter = "all" | "au" | "eu" | "live" | "next";

export function getPerthDate(now = new Date()) {
  const parts = new Intl.DateTimeFormat("en-AU", {
    timeZone: "Australia/Perth",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(now);
  const part = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((item) => item.type === type)?.value ?? "";
  return `${part("year")}-${part("month")}-${part("day")}`;
}

export function filterMilestones(
  milestones: readonly ResourceMilestone[],
  filter: TimelineFilter,
  today: string,
) {
  return milestones.filter((item) => {
    if (filter === "all") return true;
    if (filter === "au" || filter === "eu") return item.region === filter;
    return filter === "live" ? item.date <= today : item.date > today;
  });
}

export function findNextMilestoneIndex(
  milestones: readonly ResourceMilestone[],
  today: string,
) {
  return milestones.findIndex((item) => item.date > today);
}
