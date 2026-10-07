import { existsSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

import {
  footerColumns,
  footerTagline,
  headerActions,
  legalLinks,
  primaryNavigation,
} from "./navigation.content";

const internalHrefs = [
  ...primaryNavigation.map((item) => item.href),
  headerActions.contact.href,
  headerActions.booking.href,
  ...footerColumns.flatMap((column) => column.links.map((link) => link.href)),
  ...legalLinks.map((item) => item.href),
].filter((href): href is string => Boolean(href?.startsWith("/")));

describe("shared navigation content", () => {
  it.each(internalHrefs)("%s points at an existing route", (href) => {
    const path = href.split("#")[0].replace(/^\//, "");
    const page = join(process.cwd(), "src/app", path, "page.tsx");
    expect(existsSync(page)).toBe(true);
  });

  it("follows the client feedback on location and partner wording", () => {
    const copy = JSON.stringify({ footerTagline, footerColumns });
    expect(footerTagline).not.toMatch(/Western Australia|Perth/);
    expect(copy).not.toMatch(/\bAWS\b|\bACS\b|\bUTS\b/);
  });

  it("links the header to the contact page", () => {
    expect(headerActions.contact.href).toBe("/contact");
  });
});
