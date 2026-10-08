import { describe, expect, it, vi } from "vitest";

import nextConfig from "../../../next.config";
import { pathways } from "@/features/pathways/content";
import { services } from "@/features/services/content";
import { servicePractices } from "@/features/services/services.content";

import {
  detailPageRedirects,
  pathwayDestinations,
  serviceDestinations,
} from "./detail-page-redirects";

vi.mock("@/features/blog/repository", () => ({
  listBlogArticles: async () => [{ slug: "sample-article" }],
}));

describe("detail page redirects", () => {
  it("are registered in next.config", async () => {
    expect(await nextConfig.redirects?.()).toEqual(detailPageRedirects);
  });

  it("cover every pathway and service detail page", () => {
    const sources = detailPageRedirects.map((redirect) => redirect.source);
    for (const pathway of pathways) {
      expect(sources).toContain(`/pathways/${pathway.slug}`);
    }
    for (const service of services) {
      expect(sources).toContain(`/services/${service.slug}`);
    }
  });

  it("send pathways to a valid assessment path", () => {
    for (const destination of Object.values(pathwayDestinations)) {
      expect(destination).toMatch(
        /^\/assessment\?path=(career|learn|govern|risk)$/,
      );
    }
  });

  it("send services to a section that exists on /services", () => {
    const sectionIds = servicePractices.map((practice) => practice.id);
    for (const destination of Object.values(serviceDestinations)) {
      const [path, section] = destination.split("#");
      expect(path).toBe("/services");
      expect(sectionIds).toContain(section);
    }
  });
});

describe("sitemap", () => {
  it("lists only live pages, not the redirected detail pages", async () => {
    const { default: sitemap } = await import("@/app/sitemap");
    const urls = (await sitemap()).map((entry) => new URL(entry.url).pathname);

    expect(urls).toContain("/assessment");
    expect(urls).toContain("/services");
    expect(urls).toContain("/blog/sample-article");
    expect(urls.some((url) => url.startsWith("/pathways/"))).toBe(false);
    expect(urls.some((url) => url.startsWith("/services/"))).toBe(false);
  });
});
