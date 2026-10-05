import { existsSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

import { resourcesSection, toolsSection } from "./tools-resources.content";

const routeExists = (href: string) => {
  const path = href.split("#")[0].replace(/^\//, "");
  return existsSync(join(process.cwd(), "src/app", path, "page.tsx"));
};

describe("tools and resources content", () => {
  it("lists only the client-approved tools", () => {
    expect(toolsSection.tools.map((tool) => tool.id)).toEqual([
      "copilot",
      "claude",
      "chatgpt",
      "gemini",
    ]);
    expect(JSON.stringify({ toolsSection, resourcesSection })).not.toMatch(
      /\bAWS\b|\bACS\b|\bUTS\b/,
    );
  });

  it("has a logo file for every tool", () => {
    for (const tool of toolsSection.tools) {
      expect(existsSync(join(process.cwd(), "public", tool.logo.src))).toBe(
        true,
      );
    }
  });

  it("keeps topic chips unique", () => {
    expect(new Set(toolsSection.topics).size).toBe(toolsSection.topics.length);
  });

  it("links every resource card to a route that exists", () => {
    for (const item of resourcesSection.items) {
      expect(item.href.startsWith("/")).toBe(true);
      expect(routeExists(item.href)).toBe(true);
    }
  });
});
