# Production 404 recovery checks

After `pnpm build` and `pnpm start`, run:

```sh
pnpm check:recovery http://localhost:3000
```

The check requests an unknown root URL and an unknown service URL. Both must
return HTTP 404 and supply noindex metadata. The root 404 must contain the
labelled BITDOT recovery region with an h1 and expose links for home, services,
assessment, resources, about and contact. Each of those six destinations must return 200 directly;
redirects are not followed. Checks use a ten-second request timeout, make no
submissions and return a failing exit code for any mismatch.

CI runs this against the same production server used for security-header checks.
Six regression tests check valid responses, soft 404s, the Resources-to-blog
regression, a generic unlabelled root page, redirecting recovery destinations
and a dynamic service 404 that defers its UI to browser hydration.
HTML is parsed with the existing jsdom development dependency; scripts and
external page assets are not executed. These HTTP checks do not replace the
browser interaction and layout coverage tracked in issue #67. A dynamic
`notFound()` response can defer its fallback markup, so the HTTP check does not
assert that the service-route recovery region is already present in that HTML.
