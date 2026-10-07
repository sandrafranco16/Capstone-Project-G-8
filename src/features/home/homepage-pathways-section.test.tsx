import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { assessmentPathways, pathwayIds } from "@/features/assessment/pathways";

import { HomepagePathwaysSection } from "./homepage-pathways-section";

const renderText = (value: string) => renderToStaticMarkup(<>{value}</>);

describe("HomepagePathwaysSection", () => {
  const html = renderToStaticMarkup(<HomepagePathwaysSection />);

  it("keeps the pathways homepage anchor", () => {
    expect(html).toContain('id="pathways"');
  });

  it("renders all four assessment pathways", () => {
    for (const id of pathwayIds) {
      const pathway = assessmentPathways[id];

      expect(html).toContain(renderText(pathway.audience));
      expect(html).toContain(renderText(pathway.label));
      expect(html).toContain(renderText(pathway.description));
    }
  });

  it("links every pathway to its matching assessment", () => {
    for (const id of pathwayIds) {
      expect(html).toContain(`/assessment?path=${id}`);
    }
  });

  it("renders exactly four pathway cards", () => {
    const linkCount = (
      html.match(/href="\/assessment\?path=(career|learn|govern|risk)"/g) ?? []
    ).length;

    expect(linkCount).toBe(4);
  });
});
