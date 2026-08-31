import type { MetadataRoute } from "next";

import { listBlogArticles } from "@/features/blog/repository";
import { pathways } from "@/features/pathways/content";
import { services } from "@/features/services/content";
import { siteConfig } from "@/lib/site-config";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = await listBlogArticles();
  const staticRoutes = ["", "/about", "/services", "/blog", "/assessment", "/booking", "/contact", "/legal"];
  const routes = [
    ...staticRoutes,
    ...pathways.map((pathway) => `/pathways/${pathway.slug}`),
    ...services.map((service) => `/services/${service.slug}`),
    ...articles.map((article) => `/blog/${article.slug}`),
  ];

  return routes.map((route) => ({ url: `${siteConfig.url}${route}` }));
}
