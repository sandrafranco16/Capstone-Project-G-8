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
responses, catch event-handler exceptions, or handle failures in the root layout
itself; those require their own handling or a `global-error.tsx` document.

## Verification

DOM tests verify heading focus, safe copy, recovery destinations, a failed render
recovering through retry, and repeated retry attempts. Run the existing test,
lint, format, typecheck and build commands before merging.

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
