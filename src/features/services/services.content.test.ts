import { describe, expect, it } from "vitest";
import { servicePractices, servicesCTA, servicesFAQ } from "./services.content";
import type { ServiceAction } from "./services.types";

const variants = ["primary", "coral", "ghost", "on-dark"];

describe("services content integrity", () => {
  it("has uniquely identified practices usable as jump-link anchors", () => {
    const ids = servicePractices.map((practice) => practice.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const id of ids) expect(id).toMatch(/^[a-z][a-z0-9-]*$/);
  });

  it("gives every practice offers with unique titles (used as React keys)", () => {
    for (const practice of servicePractices) {
      expect(practice.offers.length).toBeGreaterThan(0);
      const titles = practice.offers.map((offer) => offer.title);
      expect(new Set(titles).size).toBe(titles.length);
    }
  });

  it("points every action at an internal route with a supported variant", () => {
    const actions: ServiceAction[] = [
      ...servicePractices.map((practice) => practice.enquiry),
      ...servicesCTA.actions,
    ];
    for (const action of actions) {
      expect(action.href).toMatch(/^\/[^/]/);
      expect(action.label.trim()).not.toBe("");
      if (action.variant) expect(variants).toContain(action.variant);
    }
    const hrefs = servicesCTA.actions.map((action) => action.href);
    expect(new Set(hrefs).size).toBe(hrefs.length);
  });

  it("has unique FAQ entries with non-empty answers", () => {
    const ids = servicesFAQ.items.map((item) => item.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const item of servicesFAQ.items) {
      expect(item.question.trim()).not.toBe("");
      expect(item.answer.trim()).not.toBe("");
    }
  });
});
