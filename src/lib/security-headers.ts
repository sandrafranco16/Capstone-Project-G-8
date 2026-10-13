/**
 * Baseline HTTP security headers for public pages and API routes.
 *
 * Only two routes are left out, because they send a stricter policy of their
 * own and two values for the same header can make browsers ignore both:
 * - /admin (X-Frame-Options: DENY and Referrer-Policy: same-origin)
 * - /api/cms/callback (nonce-based CSP and Referrer-Policy: no-referrer)
 *
 * /api/cms/auth and /api/cms/config do not set these headers themselves, so
 * they get the baseline on both their success and error responses.
 */
export const securityHeadersSource = "/((?!admin|api/cms/callback).*)";

const isDevelopment = process.env.NODE_ENV === "development";

/**
 * Third parties the site loads at runtime. Keep this list short and add to it
 * deliberately (for example when analytics is switched on).
 */
const TURNSTILE = "https://challenges.cloudflare.com";
const EMBED_ORIGINS = [
  TURNSTILE,
  "https://cal.com",
  "https://*.cal.com",
  "https://www.youtube-nocookie.com",
  "https://www.youtube.com",
];

/**
 * Content-Security-Policy.
 *
 * Known limitation: there is no script-src. Next.js inline bootstrap scripts
 * would need 'unsafe-inline' or per-request nonces (which force every page to
 * render dynamically), so this policy does NOT stop an injected script from
 * running. React's escaping and the absence of raw HTML rendering are what
 * prevent injection; the CSP is a second layer that narrows what an injected
 * script could do:
 * - fetch/XHR/WebSocket only to us and Turnstile (connect-src)
 * - images and media only from our own origin (img-src, media-src), so they
 *   cannot be used to leak data to another server
 * - iframes only from the booking, video and Turnstile origins (frame-src)
 * - forms only post back to us (form-action)
 * It does not cover every channel (for example a script could still navigate
 * the page elsewhere), so treat it as defence in depth, not containment.
 */
const contentSecurityPolicy = [
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'self'",
  "object-src 'none'",
  // Data can only go back to us and to Turnstile's verification endpoint.
  // Dev adds the hot-reload websocket.
  `connect-src 'self' ${TURNSTILE}${isDevelopment ? " ws: wss:" : ""}`,
  // Only the booking calendar, video embeds and the Turnstile challenge.
  `frame-src ${EMBED_ORIGINS.join(" ")}`,
  // Images are uploaded through the CMS into /uploads, so nothing external is
  // needed. An image linked from another site in an article will not load.
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  "media-src 'self'",
  "manifest-src 'self'",
  "worker-src 'self' blob:",
  ...(isDevelopment ? [] : ["upgrade-insecure-requests"]),
].join("; ");

export const securityHeaders: { key: string; value: string }[] = [
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
  // Older browsers that ignore frame-ancestors.
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Other sites only see the origin, never full paths or query strings.
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // One year, without includeSubDomains, so future subdomains (such as the
  // planned LMS) are not forced onto HTTPS before they are ready.
  { key: "Strict-Transport-Security", value: "max-age=31536000" },
  {
    // Camera, microphone and payment stay available to the Cal.com booking
    // iframe, and motion sensors to the YouTube embed. browsing-topics opts visitors out of ad-interest
    // tracking, in line with the no-personal-data requirement.
    key: "Permissions-Policy",
    value: "geolocation=(), browsing-topics=(), usb=(), serial=(), hid=()",
  },
  // Stops Flash/PDF-era cross-domain policy files being honoured.
  { key: "X-Permitted-Cross-Domain-Policies", value: "none" },
];
