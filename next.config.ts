import type { NextConfig } from "next";

import {
  securityHeaders,
  securityHeadersSource,
} from "./src/lib/security-headers";

const nextConfig: NextConfig = {
  agentRules: false,
  poweredByHeader: false,
  async headers() {
    return [{ source: securityHeadersSource, headers: securityHeaders }];
  },
};

export default nextConfig;
