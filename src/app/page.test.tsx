import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

describe("homepage assembly", () => {
  const source = readFileSync(join(process.cwd(), "src/app/page.tsx"), "utf8");

  it("does not use the legacy prototype homepage", () => {
    expect(source).not.toContain("LegacyDemoPage");
    expect(source).not.toContain("demo/index.html");
  });

  it("assembles migrated homepage sections in the approved order", () => {
    const sections = [
      "<HomepagePathwaysSection",
      "<GovernanceSection",
      "<PartnershipSection",
      "<WhyBitdotSection",
      "<ToolsSection",
      "<ResourcesPreview",
      "<LeadershipSection",
      "<TestimonialsSection",
    ];

    const positions = sections.map((section) => source.indexOf(section));

    expect(positions.every((position) => position >= 0)).toBe(true);

    for (let index = 1; index < positions.length; index += 1) {
      expect(positions[index]).toBeGreaterThan(positions[index - 1]);
    }
  });

  it("routes governance enquiries to the contact page", () => {
    expect(source).toContain('<GovernanceSection enquiryHref="/contact" />');
  });
});
