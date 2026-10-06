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

- `/admin` and `/api/cms/*` are skipped. They already send stricter
  headers (a nonce CSP on the OAuth callback, `DENY` framing on the CMS),
  and duplicate values for the same header can cancel each other out.
- Camera and microphone are not blocked, because the Cal.com booking
  iframe delegates them.
- The CSP does not restrict scripts or styles yet. Turnstile, Cal.com,
  YouTube embeds and the Decap CMS script all load from other origins,
  so a script policy needs an allowlist or nonces and testing on every
  page. That is the natural next step.

## Checking it

Run `pnpm build && pnpm start`, then `curl -I http://localhost:3000/about`.
After deployment, securityheaders.com gives a graded report.
