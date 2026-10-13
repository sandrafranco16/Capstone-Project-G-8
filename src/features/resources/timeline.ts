import { SITE_TIMEZONE, todayIn } from "@/lib/dates";

import type { ResourceMilestone } from "./timeline-data";

export type TimelineFilter = "all" | "au" | "eu" | "live" | "next";

/** Today in Perth as `YYYY-MM-DD`; milestones compare against this. */
export function getPerthDate(now = new Date()) {
  return todayIn(SITE_TIMEZONE, now);
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
