# Design tokens

All colours, card shapes and shadows are set once in
`src/styles/tokens.css` and read by every page: the React feature
modules, `globals.css`, and the prototype-backed pages (home, about,
legal), which already used the same variable names.

## Colour rules

| Pathway | Colour token    | Card tint      | Used for                                  |
| ------- | --------------- | -------------- | ----------------------------------------- |
| Career  | `--path-career` | `--berry-wash` | Career pathway card, Services practice 01 |
| Learn   | `--path-learn`  | `--green-wash` | Learn pathway card, Services practice 02  |
| Govern  | `--path-govern` | `--blue-wash`  | Govern pathway card, Services practice 03 |
| Risk    | `--path-risk`   | `--coral-wash` | Risk pathway card, Services practice 04   |

- Tints are only for things that belong to a pathway. General content
  grids (partnership services, tools, resources) sit on white cards
  with a hairline (`src/styles/surfaces.css`).
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

## Adding a new section

Use the tokens instead of hex values, for example
`background: var(--paper); border-radius: var(--r);`. If a module needs
a one-off colour, add it to `tokens.css` first so it stays reviewable.
