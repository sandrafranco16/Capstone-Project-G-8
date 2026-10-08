# Services

`src/app/services/page.tsx` composes native React sections matching the content inside
`demo/services.html`. The HTML is a design reference only, not a runtime dependency.
The existing shared header, navigation, branding, footer and main landmark are unchanged.

- `services.content.ts`: reference hero, four practices, 16 offers, FAQ and CTA copy.
- `services.types.ts`: typed content contracts.
- `components/`: reusable hero, cards, grid, section, heading, FAQ and CTA.
- `services-theme.module.css`: scoped reference typography, colours, controls and effects.
- `services.module.css`: section layouts and React element adjustments.
- `content.ts`: existing records for service detail pages and pathways.
- `services.content.test.ts`: content integrity checks (`pnpm test`).

Content retains the reference font stack, colours, spacing and responsive breakpoints.
Pixel dimensions use equivalent rem values at the default 16px root. Styles are scoped
to the Services content; they do not modify the document body or shared site shell.

Content is server-rendered. Only `ServicesFrame`, which runs reveal animations, is a
client component. Effects have cleanup and respect reduced motion. Content remains
visible without JavaScript. FAQs use native details/summary, and their structured data
comes from the same answers. Fonts load through `next/font` (self-hosted Inter). Reference homepage fragment destinations are preserved.

`FAQSection` renders the shared BIT-26 `Accordion`, using its optional part classes
to preserve the Services layout and reveal effects. The six records supply both
visible answers and JSON-LD. Stable disclosure IDs (`services-faq-1` through
`services-faq-6`) support direct URL fragments without changing the default
behavior of other Accordion instances. Integration tests check server-rendered
copy/schema agreement, independent disclosures and escaped text.

Run `pnpm dev` and open `/services`. Compare the inner content at equal viewport,
zoom and font availability after animations settle. Header and footer differences
from the demo are intentional and belong to a separate change.
