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

Homepage replacement and legacy integration are delivered separately.
