/**
 * Baseline HTTP security headers for public pages and API routes.
 *
 * /admin and /api/cms/* are left out because those responses already send
 * stricter headers of their own (a nonce CSP on the OAuth callback, DENY
 * framing on the CMS), and sending two values for the same header can make
 * browsers ignore both.
 */
export const securityHeadersSource = "/((?!admin|api/cms).*)";

export const securityHeaders: { key: string; value: string }[] = [
  {
    // Limits what can embed or redirect the page without restricting
    // scripts, so Turnstile, Cal.com and YouTube embeds keep working.
    key: "Content-Security-Policy",
    value: [
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'self'",
      "object-src 'none'",
    ].join("; "),
  },
  // Older browsers that ignore frame-ancestors.
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Other sites only see the origin, never full paths or query strings.
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // One year, without includeSubDomains, so future subdomains (such as the
  // planned LMS) are not forced onto HTTPS before they are ready.
  { key: "Strict-Transport-Security", value: "max-age=31536000" },
  {
    // Camera and microphone are not blocked: the Cal.com booking iframe
    // delegates them. browsing-topics opts visitors out of ad-interest
    // tracking, in line with the no-personal-data requirement.
    key: "Permissions-Policy",
    value: "geolocation=(), browsing-topics=()",
  },
];
