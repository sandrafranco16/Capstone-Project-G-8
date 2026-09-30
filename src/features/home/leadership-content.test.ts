import { existsSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

import { directors, testimonials } from "./leadership-content";

const findDirector = (id: string) => {
  const match = directors.find((item) => item.id === id);
  if (!match) throw new Error(`Missing director ${id}`);
  return match;
};

describe("directors", () => {
  it("lists both co-founders with unique ids", () => {
    expect(directors.map((director) => director.name)).toEqual([
      "Hemna Goyal",
      "Vaibhav Agrawal",
    ]);
    expect(new Set(directors.map((director) => director.id)).size).toBe(
      directors.length,
    );
  });

  it.each(directors)(
    "$name has a photo in public/ with alt text",
    (director) => {
      expect(director.photo.src).toMatch(/^\/images\/people\/.+\.jpg$/);
      expect(
        existsSync(join(process.cwd(), "public", director.photo.src)),
      ).toBe(true);
      expect(director.photo.alt).toContain(director.name);
    },
  );

  it("uses management expertise, not leadership, for Hemna", () => {
    const hemna = JSON.stringify(findDirector("hemna-goyal"));
    expect(hemna).toContain("Management expertise");
    expect(hemna).not.toMatch(/leadership/i);
    expect(hemna).not.toMatch(/30\+/);
  });

  it("includes Vibs's senior roles and MBA candidacy", () => {
    const vibs = JSON.stringify(findDirector("vaibhav-agrawal"));
    expect(vibs).toMatch(/senior leadership roles/);
    expect(vibs).toMatch(/MBA candidate/);
  });

  it.each(directors)(
    "$name has badges and complete profile rows",
    (director) => {
      expect(director.badges.length).toBeGreaterThan(0);
      expect(director.details).toHaveLength(3);
      for (const { label, text } of director.details) {
        expect(label.trim()).not.toBe("");
        expect(text.trim()).not.toBe("");
      }
    },
  );
});

describe("testimonials", () => {
  it("have unique ids and attributed, non-empty quotes", () => {
    expect(testimonials.length).toBeGreaterThan(0);
    expect(new Set(testimonials.map((item) => item.id)).size).toBe(
      testimonials.length,
    );
    for (const item of testimonials) {
      expect(item.quote.trim()).not.toBe("");
      expect(item.author.trim()).not.toBe("");
      expect(item.role.trim()).not.toBe("");
    }
  });
});
