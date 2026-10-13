# Security policy

## Reporting a vulnerability

If you find a security problem with the BITDOT website, please email
**info@bitdot.com.au** with "Security" in the subject line rather than opening
a public issue. Include the page or endpoint, what you found and, if you can,
the steps to reproduce it. We aim to acknowledge reports within five working
days.

## What is in place

- **Dependencies:** `pnpm audit` runs on every pull request and fails on high
  or critical advisories; Dependabot opens weekly update PRs.
- **Static analysis:** GitHub CodeQL scans every pull request and runs weekly.
- **HTTP headers:** a Content-Security-Policy limiting where the site can send
  data, frame or load assets from, plus HSTS, `X-Frame-Options`,
  `X-Content-Type-Options`, `Referrer-Policy` and `Permissions-Policy`
  (`src/lib/security-headers.ts`, checked in CI against the built app).
- **Contact form:** JSON-only requests with a 16 KB size cap, per-IP rate
  limiting, a honeypot, Cloudflare Turnstile verification that fails closed in
  production, and HTML-escaped email content. No enquiry data is stored.
- **CMS sign-in:** GitHub OAuth with PKCE and state cookies, an origin-checked
  hand-off, and a nonce-based CSP on the callback.
- **Secrets:** kept in environment variables only (see `.env.example`); never
  committed.

## Before going live

- Set `TURNSTILE_SECRET_KEY`, `NEXT_PUBLIC_TURNSTILE_SITE_KEY` and
  `TURNSTILE_ALLOWED_HOSTNAMES` in the hosting environment.
- Enable branch protection on `main` with required reviews and the CI and
  CodeQL checks.
- Turn on GitHub secret scanning and Dependabot alerts in the repository
  settings.
