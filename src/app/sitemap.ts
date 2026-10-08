import type { MetadataRoute } from "next";

import { listBlogArticles } from "@/features/blog/repository";
import { siteConfig } from "@/lib/site-config";

// /pathways/[slug] and /services/[slug] redirect to /assessment and /services
// (see features/seo/detail-page-redirects.ts), so only live pages are listed.
// A test checks every route here has an app/<route>/page.tsx.
export const staticSitemapRoutes = [
  "",
  "/about",
  "/services",
  "/blog",
  "/resources",
  "/assessment",
  "/automation-lab",
  "/booking",
  "/contact",
] as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = await listBlogArticles();
  const routes = [
    ...staticSitemapRoutes,
    ...articles.map((article) => `/blog/${article.slug}`),
  ];

  return routes.map((route) => ({ url: `${siteConfig.url}${route}` }));
}
