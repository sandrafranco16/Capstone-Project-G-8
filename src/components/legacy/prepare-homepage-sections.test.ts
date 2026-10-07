import { readFileSync } from "node:fs";

import { describe, expect, it } from "vitest";

import { prepareHomepageAssessment } from "./prepare-homepage-assessment";
import {
  LEADERSHIP_SLOT,
  prepareHomepageSections,
  replaceLeadershipAndTestimonials,
  slotMarker,
} from "./prepare-homepage-sections";

const source = prepareHomepageAssessment(
  readFileSync("demo/index.html", "utf8"),
);
const html = replaceLeadershipAndTestimonials(source);

describe("homepage leadership and testimonials slot", () => {
  it("replaces the prototype leadership and testimonials with one slot", () => {
    expect(html).not.toContain('id="leadership"');
    expect(html).not.toContain('id="quoteRail"');
    expect(html).not.toContain("Client testimonials");
    expect(html.split(slotMarker(LEADERSHIP_SLOT))).toHaveLength(2);
  });

  it("keeps the slot between the resources and contact sections", () => {
    const slot = html.indexOf(slotMarker(LEADERSHIP_SLOT));
    expect(html.indexOf('id="resources"')).toBeLessThan(slot);
    expect(html.indexOf('id="contact"')).toBeGreaterThan(slot);
  });

  it("leaves everything outside the two sections unchanged", () => {
    const start = source.indexOf(
      '<section class="section bg-mist" id="leadership">',
    );
    const contact = source.indexOf(
      '<section class="section bg-mist" id="contact">',
    );
    expect(html.startsWith(source.slice(0, start))).toBe(true);
    expect(html.endsWith(source.slice(contact))).toBe(true);
  });

  it("leaves no element open across the slot", () => {
    const prepared = prepareHomepageSections(source);
    expect(prepared).not.toMatch(/<\/?main\b/);
    expect(prepared).toContain('<div id="main"></div>');
    const before = prepared.slice(
      0,
      prepared.indexOf(slotMarker(LEADERSHIP_SLOT)),
    );
    const body = before.slice(before.indexOf("<body"));
    for (const tag of ["div", "section"]) {
      const opened = body.match(new RegExp(`<${tag}\\b`, "g"))?.length ?? 0;
      const closed = body.match(new RegExp(`</${tag}>`, "g"))?.length ?? 0;
      expect(opened).toBe(closed);
    }
  });

  it("fails loudly when the prototype no longer matches", () => {
    expect(() => replaceLeadershipAndTestimonials("<body></body>")).toThrow(
      /Homepage migration expects/,
    );
  });
});
