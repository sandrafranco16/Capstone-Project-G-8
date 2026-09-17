# Mastering AI Governance — BIT-28

`GovernanceSection` in `src/features/home/governance-section.tsx` implements the
approved `demo/index.html#flagship` content as a server component with CSS Modules.
It uses `CtaAction` from BIT-26 / PR #18; CardRail and Profile from PR #19 are not
required. No client state or new dependencies are needed.

Run `pnpm dev` and visit `/dev/governance` for independent review. This preview is
excluded from the sitemap, marked noindex, and returns 404 outside development.

Render the section once per page: its `flagship` and `governance-heading` IDs are
stable. `enquiryHref` defaults to `/#contact` for the standalone preview; the
homepage can pass `#contact` to preserve the original same-page enquiry flow.

## Review checklist

- Compare the copy and sand/forest layout against the approved flagship section.
- At desktop widths above 1040px, confirm two equal columns; below that, confirm
  learning outcomes precede training delivery in a single column.
- Check 390px and 320px widths for wrapping, readable badges and button text.
- Tab to the enquiry action: the white focus outline must be visible on forest.
- Activate the link and confirm it reaches the homepage contact section.
- Content must be readable without JavaScript or animation; the component does
  not use the legacy reveal classes. The CTA retains the shared accessible dark
  label on coral, and the small program label uses darker coral for contrast.

## Homepage integration

`src/app/page.tsx` supplies the component through `LegacyDemoPage`'s homepage-only
`flagship` slot. The migration bridge splits the processed homepage at complete
main/section boundaries, replaces the old flagship markup, and leaves the approved
source HTML unchanged. The remaining page still uses the existing styles, link
rewrites and demo runtime. The slot is rendered on the server, so the section is
present in the initial HTML and does not depend on a client-side replacement.

The bridge is intentionally limited to the current prototype. Missing, duplicate
or nested flagship boundaries throw during build instead of silently showing two
sections or losing surrounding content. Tests use the actual prototype as well as
malformed fixtures. If the prototype's main/flagship structure changes, update the
bridge and its tests together.

For integration review, open `/#flagship`, follow the hero's board-program link,
and activate the enquiry action to reach `#contact`. Confirm a single program
heading, then check navigation, pathway selection and the readiness assessment for
regressions.
