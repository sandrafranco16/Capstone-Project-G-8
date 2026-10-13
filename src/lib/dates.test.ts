import { describe, expect, it } from "vitest";

import { formatLongDate, formatShortDate, todayIn } from "./dates";

describe("date helpers", () => {
  it("formats ISO dates as calendar days", () => {
    expect(formatLongDate("2026-08-20")).toBe("20 August 2026");
    expect(formatShortDate("2026-08-20")).toBe("20 Aug 2026");
  });

  it("ignores the time part of a timestamp", () => {
    expect(formatLongDate("2026-08-20T23:30:00Z")).toBe("20 August 2026");
  });

  it("reads today in Perth, not UTC", () => {
    expect(todayIn("Australia/Perth", new Date("2026-09-29T16:30:00Z"))).toBe(
      "2026-09-30",
    );
  });
});
