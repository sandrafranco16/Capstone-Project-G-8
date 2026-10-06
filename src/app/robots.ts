import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/site-config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // "/admin" (no trailing slash) also covers the CMS page itself.
      disallow: ["/admin", "/api/", "/dev/"],
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
