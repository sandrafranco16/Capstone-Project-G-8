import { detailPageRedirects } from "./src/features/seo/detail-page-redirects";
import type { NextConfig } from "next";

import {
  securityHeaders,
  securityHeadersSource,
} from "./src/lib/security-headers";

const nextConfig: NextConfig = {
  async redirects() {
    return detailPageRedirects;
  },
  agentRules: false,
  poweredByHeader: false,
  async headers() {
    return [{ source: securityHeadersSource, headers: securityHeaders }];
  },
};

export default nextConfig;
