# AI tools and resources preview — BIT-32

Two homepage sections, delivered as components for homepage assembly (BIT-34):

- `ToolsSection` (`src/features/home/tools-section.tsx`), anchor `#tools`
- `ResourcesPreview` (`src/features/home/resources-preview.tsx`), anchor `#resources`

Copy lives in `src/features/home/tools-resources.content.ts`. Preview both at
`/dev/tools-resources` while running `pnpm dev` (the route 404s in production).

## Client feedback applied

| Feedback                                      | Where                                                                  |
| --------------------------------------------- | ---------------------------------------------------------------------- |
| Only real tool logos; remove AWS and ACS      | Four approved tools only, checked by `tools-resources.content.test.ts` |
| Consistent colour; pastel card fills felt off | White and canvas cards with coral accents instead of rotating pastels  |
| Keep the swipeable rails                      | Rails swipe on mobile and become a grid on desktop                     |

The four tool names were removed from the topic chips because they already
appear as cards directly above.

## Open items

- There is no `/resources` route yet, so all three resource cards link to
  `/blog`. Change `href` in the content file once a resources page exists.
- The compliance dates come from the approved prototype. Re-check the EU AI Act
  high-risk date before launch.
- The prototype's Automation Lab "Notify me" email form is not included: it
  would collect personal data, which conflicts with the no-storage requirement.

## Review checklist

- `/dev/tools-resources` at 1440px and 390px: no sideways page scroll; cards
  swipe on mobile.
- Tab to the tools rail and use the arrow keys to scroll it on mobile widths.
- Each resource card is one link with a visible focus outline.
