import { describe, expect, it } from "vitest";

import { aboutLeadership } from "@/features/about/content";
import { siteConfig } from "@/lib/site-config";

import {
  organizationAddress,
  organizationJsonLd,
  serializeJsonLd,
} from "./structured-data";

describe("organizationJsonLd", () => {
  const data = organizationJsonLd();

  it("takes contact details from siteConfig", () => {
    expect(data.url).toBe(siteConfig.url);
    expect(data.email).toBe(siteConfig.email);
    expect(data.telephone).toBe("+61476779285");
  });

  it("keeps the postal address in step with the footer address", () => {
    const { locality, region, postalCode } = organizationAddress;
    expect(`${locality}, ${region} ${postalCode}`).toBe(siteConfig.address);
  });

  it("points the logo at the real brand mark", () => {
    expect(data.logo).toBe(`${siteConfig.url}/images/brand/bitdot-mark.svg`);
  });

  it("names the founders from the About page content", () => {
    expect(data.founder.map((person) => person.name)).toEqual(
      aboutLeadership.founders.map((founder) => founder.name),
    );
  });

  it("lists no social profiles", () => {
    expect(data).not.toHaveProperty("sameAs");
  });
});

describe("serializeJsonLd", () => {
  it("cannot close the surrounding script tag", () => {
    const output = serializeJsonLd({ name: "</script><b>&" });
    expect(output).not.toMatch(/[<>&]/);
    expect(JSON.parse(output)).toEqual({ name: "</script><b>&" });
  });
});
