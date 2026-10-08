import type { MetadataRoute } from "next";

import { listBlogArticles } from "@/features/blog/repository";
import { siteConfig } from "@/lib/site-config";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = await listBlogArticles();
  // /pathways/[slug] and /services/[slug] redirect to /assessment and
  // /services (see features/seo/detail-page-redirects.ts), so only the
  // destination pages are listed here.
  const staticRoutes = [
    "",
    "/about",
    "/services",
    "/blog",
    "/resources",
    "/assessment",
    "/booking",
    "/contact",
  ];
  const routes = [
    ...staticRoutes,
    ...articles.map((article) => `/blog/${article.slug}`),
  ];

  return routes.map((route) => ({ url: `${siteConfig.url}${route}` }));
}
