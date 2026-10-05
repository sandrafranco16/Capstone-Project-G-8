# About page — BIT-39

`/about` is now built from Next.js components in `src/features/about/` and no
longer renders `demo/about.html`. It uses the shared site header and footer.

All copy lives in `src/features/about/content.ts`. Edit wording there, not in
the components.

## Client feedback applied

| Feedback                                                              | Where                                                                                     |
| --------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| Remove Perth / Western Australia wording (keep the address elsewhere) | Hero lead, metadata                                                                       |
| Change Hemna's leadership wording to management expertise             | Hemna's highlights and detail rows                                                        |
| Add Vibs's senior roles and MBA candidacy                             | Vibs's academic foundation and industry rows                                              |
| No AWS, ACS or UTS references                                         | Whole page                                                                                |
| Founder cards in a dark, cinematic (Bugatti-inspired) treatment       | `founder-card.tsx`                                                                        |
| Consistent colour; dark forest preferred over pastel fills            | Credibility band and CTA use forest; values use plain coral rules instead of pastel cards |

`content.test.ts` checks each of these so they are not reverted by accident.

## Pending from the client

- Vibs's committee contribution: exact committee name and wording.
- Higher-resolution founder headshots. Replace the files in
  `public/images/people/` with the same names; no code change is needed.

## Review checklist

- Check 1440px, 820px and 390px widths; the page must not scroll sideways.
- Tab through the page: the two CTA buttons show a visible focus outline.
- Confirm the founder portraits read the same (both monochrome).
- `/about#credibility` and `/about#leadership` anchors still work.
