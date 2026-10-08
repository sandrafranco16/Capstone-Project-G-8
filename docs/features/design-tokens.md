# Design tokens

All colours, card shapes and shadows are set once in
`src/styles/tokens.css` and read by every page: the React feature
modules and `globals.css`.

## Colour rules

| Pathway | Colour token    | Card tint      | Used for                                  |
| ------- | --------------- | -------------- | ----------------------------------------- |
| Career  | `--path-career` | `--berry-wash` | Career pathway card, Services practice 01 |
| Learn   | `--path-learn`  | `--green-wash` | Learn pathway card, Services practice 02  |
| Govern  | `--path-govern` | `--blue-wash`  | Govern pathway card, Services practice 03 |
| Risk    | `--path-risk`   | `--coral-wash` | Risk pathway card, Services practice 04   |

- Tints are only for things that belong to a pathway. General content
  grids (partnership services, tools, resources) sit on white cards
  with a hairline.
- Coral is the only call-to-action colour (buttons, booking).
- Forest, maroon and navy stay as the dark bands. The base is warm and
  light, as agreed with the client.
- The old pastel names (`--fill-sky`, `--fill-sand`, ...) still work but
  now point at the four tints. Sand is gone, following client feedback.

## Shape rules

- `--r` (cards) and `--r-lg` (panels) are rounded on three corners with
  a tighter bottom-left corner set by `--r-cut`. Setting `--r-cut` to
  `20px` goes back to plain rounded cards in one line.
- `--r-pill` for buttons, chips and tags. Icons sit in circles.

## Contrast (WCAG 2.1 AA)

An axe scan of every page passes the AA contrast criterion except one
known case:

| Element                                                   | Colours                    | Ratio               | Status                      |
| --------------------------------------------------------- | -------------------------- | ------------------- | --------------------------- |
| Coral CTA buttons (`.btn-coral`, booking, 404, resources) | white on `--coral` #f0552b | 3.5:1 (needs 4.5:1) | Open, waiting on the client |

Both fixes change the brand's main button, so they need Vibs's sign-off
before either goes in:

- dark text (`--ink`) on the same coral, 4.8:1
- white text on `--coral-deep` #b83812, 5.8:1

`--coral-deep` and `--ink-3` were darkened just enough to pass on canvas,
paper, mist and coral-wash. Check new text colours against those
backgrounds before adding them.

## Adding a new section

Use the tokens instead of hex values, for example
`background: var(--paper); border-radius: var(--r);`. If a module needs
a one-off colour, add it to `tokens.css` first so it stays reviewable.
