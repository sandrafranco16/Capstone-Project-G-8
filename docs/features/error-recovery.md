# BIT-38 — Error recovery

## Missing pages

`src/app/not-found.tsx` keeps the branded 404 page and its recovery links.
The Resources link now points to the Resources hub at `/resources`; the
separate Insights blog remains at `/blog`.

## Page rendering errors

`src/app/error.tsx` supplies the App Router error boundary with a BITDOT-styled
fallback. It focuses its heading and offers **Try again**, **Return home**,
**Contact us** and the **Resources hub**. It renders general recovery guidance,
without displaying the error message, stack or diagnostic digest.

The retry button uses the `retry` prop supported by the installed Next.js
16.3.1. This re-fetches and re-renders the failed segment, so a temporary failure
can recover without a full-page reload. See the
[Next.js error convention](https://nextjs.org/docs/app/api-reference/file-conventions/error).
Existing root-layout header, footer and navigation remain around the fallback.

This boundary covers page/child rendering errors. It does not replace API error
responses or catch event-handler exceptions.

## Root layout errors

`src/app/global-error.tsx` covers failures in the root layout. It provides its own
`html`/`body`, title, noindex metadata, design tokens and styles, with a system
font so recovery does not rely on the failed site's font setup. It focuses the
heading, offers the installed framework's `retry` callback, and uses ordinary
home links to request a fresh document. A direct email link remains useful if
other site routes cannot load. The failed header and footer are not imported.
Error messages, stacks and digests are excluded from the displayed copy.

This follows the [Next.js global-error convention](https://nextjs.org/docs/app/api-reference/file-conventions/error#global-error).
It does not handle API responses or event-handler/async callback errors. No
automatic reporting, diagnostic submission or production failure switch is added.

## Verification

DOM tests verify heading focus, safe copy, recovery destinations, a failed render
recovering through retry, and repeated retry attempts. Run the existing test,
lint, format, typecheck and build commands before merging.

Global-error tests separately check the complete server-rendered document,
metadata, safe copy, email/home links, heading focus and repeated retry calls.
For end-to-end review, temporarily trigger a root layout failure locally and
verify retry, full-document navigation and 320px/390px layout. Remove any fixture
before publishing; browser verification is still pending for this follow-up.

For browser verification, use a local-only page fixture that throws during render
and then permits rendering on retry. Verify keyboard activation, the recovery
links, and 320px/390px layouts. Remove the fixture before publishing. Also request
an unknown URL and verify HTTP 404, then follow its Resources link and verify
that `/resources` loads. No production error-trigger route is included.

Verification for this change: the local production fixture recovered after
keyboard activation of **Try again**, and the heading received focus when the
fallback appeared. Desktop, 390px and 320px layouts were checked; both phone
widths had no horizontal overflow. The internal error message was absent from
the rendered copy. The 404 Resources link opened `/resources`, an unknown URL
returned HTTP 404, and `/resources`, `/contact` and `/` returned HTTP 200.
The temporary fixture was removed before the final production build.
