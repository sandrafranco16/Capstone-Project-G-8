import { readFileSync } from "node:fs";

import { describe, expect, it } from "vitest";

import { assessmentPathways, pathwayIds } from "@/features/assessment/pathways";
import { servicePractices } from "@/features/services/services.content";

import { bookingConfig } from "./config";
import {
  bookingHref,
  pathwayAppointmentTypes,
  pathwayBookingLabels,
} from "./links";
import { getAppointmentType } from "./utils";

const typeFromHref = (href: string) =>
  new URL(href, "https://example.test").searchParams.get("type") ?? undefined;

describe("booking links", () => {
  it("preselect a type only when one is given", () => {
    expect(bookingHref()).toBe("/booking");
    expect(bookingHref("career-coaching")).toBe(
      "/booking?type=career-coaching",
    );
  });

  it("map every assessment pathway to a configured appointment type", () => {
    for (const id of pathwayIds) {
      expect(assessmentPathways[id]).toBeDefined();
      expect(getAppointmentType(pathwayAppointmentTypes[id])).toBeDefined();
      expect(pathwayBookingLabels[id]).toMatch(/^Book /);
    }
  });

  it("give every Services practice a booking CTA for a real appointment type", () => {
    for (const practice of servicePractices) {
      const type = typeFromHref(practice.booking.href);
      expect(practice.booking.href.startsWith("/booking?type=")).toBe(true);
      expect(getAppointmentType(type)).toBeDefined();
    }
  });

  it("send each Services practice to a different appointment type", () => {
    const types = servicePractices.map((p) => typeFromHref(p.booking.href));
    expect(new Set(types).size).toBe(servicePractices.length);
  });

  it("keep contextual page CTAs on a configured appointment type", () => {
    const files = [
      "src/app/automation-lab/page.tsx",
      "src/features/resources/resources-main.tsx",
    ];
    const ids = bookingConfig.appointmentTypes.map((type) => type.id);

    for (const file of files) {
      const source = readFileSync(file, "utf8");
      const used = [...source.matchAll(/bookingHref\("([a-z-]+)"\)/g)].map(
        (match) => match[1],
      );
      expect(used.length).toBeGreaterThan(0);
      for (const id of used) expect(ids).toContain(id);
      expect(source).not.toContain('href="/booking"');
    }
  });
});
