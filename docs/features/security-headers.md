# Security headers

`next.config.ts` sends a baseline set of HTTP security headers on every
public page, API route and static asset. The values live in
`src/lib/security-headers.ts` with a comment on each.

| Header                    | Value                                                                            | Why                                                                                                                |
| ------------------------- | -------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| Content-Security-Policy   | `base-uri 'self'; form-action 'self'; frame-ancestors 'self'; object-src 'none'` | Stops other sites framing the pages (clickjacking), base-tag injection, forms posting off-site and plugin content. |
| X-Frame-Options           | `SAMEORIGIN`                                                                     | Same framing rule for older browsers.                                                                              |
| X-Content-Type-Options    | `nosniff`                                                                        | Browsers use the declared content type instead of guessing.                                                        |
| Referrer-Policy           | `strict-origin-when-cross-origin`                                                | Other sites see only `bitdot.com.au`, never full paths.                                                            |
| Strict-Transport-Security | `max-age=31536000`                                                               | HTTPS only for a year. No `includeSubDomains`, so a future LMS subdomain is not affected.                          |
| Permissions-Policy        | `geolocation=(), browsing-topics=()`                                             | No location access, and visitors are opted out of ad-interest tracking.                                            |

## Deliberate exclusions

- Only `/admin` and `/api/cms/callback` are skipped, because each sends a
  stricter policy of its own and two values for one header can cancel
  each other out:
  - `/admin` sends `X-Frame-Options: DENY` and `Referrer-Policy: same-origin`.
  - `/api/cms/callback` sends a nonce-based CSP and `Referrer-Policy: no-referrer`.
- `/api/cms/auth` and `/api/cms/config` set no security headers of their
  own, so they get the baseline on both success and 503 responses. The
  config route no longer sets `nosniff` itself, since the baseline covers it.
- Camera and microphone are not blocked, because the Cal.com booking
  iframe delegates them.
- The CSP does not restrict scripts or styles yet. Turnstile, Cal.com,
  YouTube embeds and the Decap CMS script all load from other origins,
  so a script policy needs an allowlist or nonces and testing on every
  page. That is the natural next step.

## Checking it

CI starts the production build and runs `scripts/check-security-headers.mjs`,
which requests each kind of route (pages, CMS auth and config on their
success or 503 path, the callback and `/admin`) and fails if a header is
missing, has the wrong value or is sent twice. Locally:
`pnpm build && pnpm start`, then `pnpm check:headers http://localhost:3000`.
After deployment, securityheaders.com gives a graded report.
