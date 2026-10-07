import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { partnershipContent } from "./partnership-why.content";
import { PartnershipSection } from "./partnership-section";

describe("PartnershipSection", () => {
  const html = renderToStaticMarkup(<PartnershipSection />);

  it("keeps the continued partnership homepage anchor", () => {
    expect(html).toContain('id="beyond"');
  });

  it("renders the approved heading and supporting copy", () => {
    expect(html).toContain(partnershipContent.label);
    expect(html).toContain(partnershipContent.heading);
    expect(html).toContain(partnershipContent.lead);
  });

  it("renders every continued partnership service", () => {
    for (const service of partnershipContent.services) {
      expect(html).toContain(service.title);
      expect(html).toContain(service.description);
    }
  });

  it("renders six service cards", () => {
    const articleCount = (html.match(/<article/g) ?? []).length;

    expect(articleCount).toBe(6);
  });
});
