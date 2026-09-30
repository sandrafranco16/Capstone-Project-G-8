import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { directors } from "./leadership-content";
import { LeadershipSection } from "./leadership-section";

describe("LeadershipSection", () => {
  const html = renderToStaticMarkup(<LeadershipSection />);

  it("keeps the #leadership anchor and a labelled heading", () => {
    expect(html).toContain('id="leadership"');
    expect(html).toContain('aria-labelledby="leadership-heading"');
    expect(html).toMatch(
      /<h2 id="leadership-heading"[^>]*>Two directors, thirty years of experience\.<\/h2>/,
    );
  });

  it("renders a named card for each director", () => {
    for (const director of directors) {
      expect(html).toContain(`aria-labelledby="${director.id}-name"`);
      expect(html).toMatch(
        new RegExp(`<h3 id="${director.id}-name"[^>]*>${director.name}</h3>`),
      );
      expect(html).toContain(`alt="${director.photo.alt}"`);
    }
  });

  it("labels each card's flip controls with the director's name", () => {
    for (const director of directors) {
      expect(html).toContain(
        `aria-label="Show ${director.name}&#x27;s profile"`,
      );
      expect(html).toContain(`aria-label="Show ${director.name}&#x27;s photo"`);
    }
  });

  it("renders profile rows as a description list", () => {
    expect(html).toContain("<dt>Academic foundation</dt>");
    expect(html).toContain(
      "<dd>GAICD, B.Tech and M.Tech in Data &amp; Analytics. Currently an MBA candidate.</dd>",
    );
  });

  it("links to the full profiles by default", () => {
    expect(html).toMatch(
      /href="\/about#leadership"[^>]*>More about our leadership</,
    );
  });

  it("can hide the profile link and render supplied directors", () => {
    const custom = renderToStaticMarkup(
      <LeadershipSection
        directors={directors.slice(0, 1)}
        profileHref={null}
      />,
    );
    expect(custom).not.toContain("More about our leadership");
    expect(custom).toContain(directors[0].name);
    expect(custom).not.toContain(directors[1].name);
  });
});
