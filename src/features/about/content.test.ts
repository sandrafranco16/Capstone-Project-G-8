import { existsSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

import {
  aboutCredibility,
  aboutCta,
  aboutHero,
  aboutLeadership,
  aboutStory,
  aboutValues,
} from "./content";

const allCopy = JSON.stringify({
  aboutHero,
  aboutStory,
  aboutCredibility,
  aboutLeadership,
  aboutValues,
  aboutCta,
});

const founder = (id: string) => {
  const match = aboutLeadership.founders.find((item) => item.id === id);
  if (!match) throw new Error(`Missing founder ${id}`);
  return match;
};

describe("About content — client feedback", () => {
  it("does not describe BITDOT by Perth or Western Australia location", () => {
    expect(allCopy).not.toMatch(/Western Australia|Perth|Osborne Park|\bWA\b/);
  });

  it("does not reference AWS, ACS or UTS", () => {
    expect(allCopy).not.toMatch(/\bAWS\b|\bACS\b|\bUTS\b/);
  });

  it("uses management expertise, not leadership, for Hemna", () => {
    const hemna = JSON.stringify(founder("hemna-goyal"));
    expect(hemna).toContain("Management expertise");
    expect(hemna).not.toMatch(/leadership/i);
  });

  it("includes Vibs's senior roles and MBA candidacy", () => {
    const vibs = JSON.stringify(founder("vaibhav-agrawal"));
    expect(vibs).toMatch(/senior leadership roles/);
    expect(vibs).toMatch(/MBA candidate/);
  });
});

describe("About content — integrity", () => {
  it("has a photo file with alt text for every founder", () => {
    for (const { photo, name } of aboutLeadership.founders) {
      expect(existsSync(join(process.cwd(), "public", photo.src))).toBe(true);
      expect(photo.alt).toContain(name);
    }
  });

  it("points the call to action at a real route", () => {
    const route = aboutCta.bookingHref.replace(/^\//, "");
    expect(existsSync(join(process.cwd(), "src/app", route, "page.tsx"))).toBe(
      true,
    );
  });

  it("keeps founder and credential titles unique", () => {
    const ids = aboutLeadership.founders.map((item) => item.id);
    const titles = aboutCredibility.items.map((item) => item.title);
    expect(new Set(ids).size).toBe(ids.length);
    expect(new Set(titles).size).toBe(titles.length);
  });
});
