import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { whyBitdotContent } from "./partnership-why.content";
import { WhyBitdotSection } from "./why-bitdot-section";

describe("WhyBitdotSection", () => {
  const html = renderToStaticMarkup(<WhyBitdotSection />);

  it("uses a labelled heading", () => {
    expect(html).toContain('aria-labelledby="why-bitdot-heading"');
    expect(html).toContain('id="why-bitdot-heading"');
  });

  it("renders the approved heading and supporting copy", () => {
    expect(html).toContain(whyBitdotContent.label);
    expect(html).toContain(whyBitdotContent.heading);
    expect(html).toContain(whyBitdotContent.lead);
  });

  it("renders every Why BITDOT point", () => {
    for (const point of whyBitdotContent.points) {
      expect(html).toContain(point.title);

      const escapedDescription = renderToStaticMarkup(<>{point.description}</>);

      expect(html).toContain(escapedDescription);
    }
  });

  it("renders four value-point cards", () => {
    const articleCount = (html.match(/<article/g) ?? []).length;

    expect(articleCount).toBe(4);
  });
});
