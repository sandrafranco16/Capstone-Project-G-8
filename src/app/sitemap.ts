import type { MetadataRoute } from "next";

import { pathways } from "@/features/pathways/content";
import { services } from "@/features/services/content";
import { siteConfig } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/about", "/services", "/blog", "/assessment", "/booking", "/contact", "/legal"];
  const routes = [
    ...staticRoutes,
    ...pathways.map((pathway) => `/pathways/${pathway.slug}`),
    ...services.map((service) => `/services/${service.slug}`),
  ];

  return routes.map((route) => ({ url: `${siteConfig.url}${route}` }));
}
