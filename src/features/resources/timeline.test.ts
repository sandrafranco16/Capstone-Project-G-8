import { describe, expect, it } from "vitest";

import { milestones } from "./timeline-data";
import {
  filterMilestones,
  findNextMilestoneIndex,
  getPerthDate,
} from "./timeline";

describe("Resources timeline", () => {
  it("formats the date in the Perth timezone across a UTC date boundary", () => {
    expect(getPerthDate(new Date("2026-09-29T16:30:00Z"))).toBe("2026-09-30");
  });

  it("filters milestones by region and status", () => {
    const today = "2026-09-29";
    expect(filterMilestones(milestones, "au", today)).toHaveLength(7);
    expect(filterMilestones(milestones, "eu", today)).toHaveLength(7);
    expect(
      filterMilestones(milestones, "live", today).every(
        (item) => item.date <= today,
      ),
    ).toBe(true);
    expect(
      filterMilestones(milestones, "next", today).every(
        (item) => item.date > today,
      ),
    ).toBe(true);
  });

  it("places the today marker before the first future milestone", () => {
    const index = findNextMilestoneIndex(milestones, "2026-09-29");
    expect(milestones[index]?.date).toBe("2026-12-02");
  });

  it("keeps timeline content chronological with valid source links", () => {
    const dates = milestones.map((item) => item.date);
    expect(dates).toEqual([...dates].sort());
    expect(milestones.every((item) => item.href.startsWith("https://"))).toBe(
      true,
    );
  });
});
