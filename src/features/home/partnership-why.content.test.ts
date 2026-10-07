import { describe, expect, it } from "vitest";

import {
  partnershipContent,
  whyBitdotContent,
} from "./partnership-why.content";

describe("partnership and Why BITDOT content", () => {
  it("contains the six approved continued partnership services", () => {
    expect(partnershipContent.services).toHaveLength(6);

    expect(partnershipContent.services.map((service) => service.title)).toEqual(
      [
        "Custom strategy development",
        "Strategic tool selection",
        "Hands-on tool workshops",
        "Vendor introductions",
        "Integration strategies",
        "Fit-for-purpose customisation",
      ],
    );
  });

  it("contains the four approved Why BITDOT points", () => {
    expect(whyBitdotContent.points).toHaveLength(4);

    expect(whyBitdotContent.points.map((point) => point.title)).toEqual([
      "GAICD-qualified leadership",
      "Practitioners, not theorists",
      "Built for Australian rules",
      "A partner after training ends",
    ]);
  });

  it("keeps all card titles unique", () => {
    const partnershipTitles = partnershipContent.services.map(
      (service) => service.title,
    );
    const whyTitles = whyBitdotContent.points.map((point) => point.title);

    expect(new Set(partnershipTitles).size).toBe(partnershipTitles.length);
    expect(new Set(whyTitles).size).toBe(whyTitles.length);
  });

  it("does not reintroduce removed AWS, ACS or UTS references", () => {
    expect(
      JSON.stringify({ partnershipContent, whyBitdotContent }),
    ).not.toMatch(/\bAWS\b|\bACS\b|\bUTS\b/);
  });
});
