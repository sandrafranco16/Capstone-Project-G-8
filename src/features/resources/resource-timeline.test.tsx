// @vitest-environment jsdom
import { readFileSync } from "node:fs";
import { join } from "node:path";

import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { ResourceTimeline } from "./resource-timeline";
import { milestones } from "./timeline-data";

afterEach(cleanup);

/*
 * The compliance-clock bug had two halves: the timeline marks filtered-out
 * milestones with a `hide` class, and the stylesheet has to turn that class
 * into display: none. jsdom does not apply CSS Modules, so this checks both
 * halves separately; removing either one fails a test.
 */

const isHidden = (article: Element) =>
  article.className.split(/\s+/).some((name) => /(^|_)hide(_|$)/.test(name));

function articlesByRegion() {
  const articles = [...document.querySelectorAll("article[data-region]")];
  return {
    hidden: articles.filter(isHidden).map((a) => a.getAttribute("data-region")),
    shown: articles
      .filter((a) => !isHidden(a))
      .map((a) => a.getAttribute("data-region")),
  };
}

describe("compliance clock filters", () => {
  it("shows every milestone under Everything", () => {
    render(<ResourceTimeline />);
    const { hidden, shown } = articlesByRegion();
    expect(hidden).toHaveLength(0);
    expect(shown).toHaveLength(milestones.length);
  });

  it.each([
    ["European Union", "eu", "au"],
    ["Australia", "au", "eu"],
  ] as const)(
    "%s marks only the other region's milestones as hidden",
    (label, kept, removed) => {
      render(<ResourceTimeline />);
      fireEvent.click(screen.getByRole("button", { name: label }));

      const { hidden, shown } = articlesByRegion();
      const keptCount = milestones.filter((m) => m.region === kept).length;
      const removedCount = milestones.filter(
        (m) => m.region === removed,
      ).length;

      expect(shown).toHaveLength(keptCount);
      expect(shown.every((region) => region === kept)).toBe(true);
      expect(hidden).toHaveLength(removedCount);
      expect(hidden.every((region) => region === removed)).toBe(true);
      expect(
        screen.getByText(
          `${keptCount} of ${milestones.length} milestones shown`,
        ),
      ).toBeTruthy();
    },
  );

  it("has a stylesheet rule that hides milestones marked hide", () => {
    const css = readFileSync(
      join(process.cwd(), "src/features/resources/resources.module.css"),
      "utf8",
    );
    // Without this rule the count changes but every milestone stays on screen.
    expect(css).toMatch(/\.ev\.hide\s*\{[^}]*display:\s*none/);
  });
});
