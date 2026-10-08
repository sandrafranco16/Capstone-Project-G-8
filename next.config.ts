import { detailPageRedirects } from "./src/features/seo/detail-page-redirects";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return detailPageRedirects;
  },
  agentRules: false,
  poweredByHeader: false,
};

export default nextConfig;
