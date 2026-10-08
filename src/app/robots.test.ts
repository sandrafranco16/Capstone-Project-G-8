import { describe, expect, it } from "vitest";

import { siteConfig } from "@/lib/site-config";

import robots from "./robots";

describe("robots.txt", () => {
  const config = robots();
  const rules = Array.isArray(config.rules) ? config.rules[0] : config.rules;

  it("keeps the CMS, API routes and dev previews out of search", () => {
    expect(rules.disallow).toEqual(
      expect.arrayContaining(["/admin", "/api/", "/dev/"]),
    );
  });

  it("still allows the public site", () => {
    expect(rules.allow).toBe("/");
  });

  it("points crawlers at the sitemap", () => {
    expect(config.sitemap).toBe(`${siteConfig.url}/sitemap.xml`);
  });
});
