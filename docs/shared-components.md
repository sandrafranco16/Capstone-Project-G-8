# Shared components — BIT-26

Run `pnpm dev` and open `/dev/components` to review the examples. This route
returns 404 outside development and is excluded from indexing. Service detail
pages (`/services/[slug]`) use the new CTA actions in production.

## Accordion

```tsx
import { Accordion } from "@/components/ui/accordion";

<Accordion
  items={[
    {
      id: "audience",
      title: "Who is this for?",
      content: <p>Individuals and teams.</p>,
    },
  ]}
/>;
```

- `items`: readonly array of `{ id: string, title: string, content: ReactNode,
defaultOpen?: boolean }`. IDs must be unique within each array; they are React
  keys, so multiple instances may reuse the same data.
- `className`: optional wrapper class. An empty array renders nothing.
- Native `details`/`summary` works without JavaScript. Enter or Space toggles a
  focused summary. Multiple answers may remain open. `defaultOpen` specifies the
  initial state; this is not a controlled accordion API.
- Add a heading on the containing page. Keep interactive content inside the
  answer, rather than inside the summary.

## CTA

```tsx
import { Cta, CtaAction } from "@/components/ui/cta";

<Cta title="Let's talk" description="Find the right support.">
  <CtaAction href="/booking">Book a consultation</CtaAction>
  <CtaAction href="/contact" variant="secondary">
    Contact us
  </CtaAction>
</Cta>;
```

- `Cta`: required `title` and `children`, optional `description` (ReactNode) and
  `className`. It renders a section with an h2; place it at the appropriate level.
- `CtaAction`: `href` renders a Next.js link; omit `href` for a native button.
  Buttons default to `type="button"` to avoid accidental form submission.
  Native attributes such as `disabled`, `type`, `aria-label`, `target` and `rel`
  are supported on their respective element types.
- `variant`: `primary` (default) or `secondary`. Actions can also stand alone.
- For event handlers such as `onClick`, compose the action in a client component.
  Link-only usage and both shared components work as server components.
- New-tab links default to `noopener noreferrer`. Choose meaningful link text
  and disclose new-tab behaviour in the visible label if using it.

## Design and scope

Use `cn` from `@/lib/cn` to combine optional or conditional class names. CTA action
variants are defined with `class-variance-authority`; their TypeScript values are
derived from that definition. Component-only prop types stay private until a
shared use case requires them. Run `pnpm format` and `pnpm format:check` to maintain
consistent formatting across the project.

CSS Modules isolate component styles. Rounded FAQ cards and forest/coral CTA
colours follow `demo/`. Coral buttons use dark text for readable contrast.
Mobile wrapping, focus indicators and reduced-motion preferences are included.
No global CSS or demo HTML changes are required.

All pages, including the homepage, now render React components directly, so
these components can be imported anywhere without touching `demo/`.

## Card Rail (PR 2)

Scroll boundaries, resize tracking, reduced-motion handling and keyboard controls
live in `useScrollRail` (`src/hooks/use-scroll-rail.ts`). The hook returns
`railRef`, `edges`, `move` and `onKeyDown` for use with a horizontal list.

```tsx
import { CardRail } from "@/components/ui/card-rail";

<CardRail title="Explore services">
  {services.map((service) => (
    <article key={service.slug}>
      <h3>{service.title}</h3>
      <p>{service.summary}</p>
    </article>
  ))}
</CardRail>;
```

- Required `title` labels the section and scrollable list; `children` supplies
  cards. Use stable React keys for changing arrays. Optional `className` styles
  the section. Each direct child is one card; pass arrays rather than a Fragment.
- Cards are 340px wide, capped at the available width. Native touch/trackpad
  scrolling and CSS scroll snap remain available without JavaScript.
- Previous/next buttons move one card including its gap. Buttons hide without
  overflow and disable at the respective edge. ResizeObserver updates boundaries
  when list/card geometry changes; listeners and observers clean up on unmount.
- Focus the list and use Left/Right, Home/End. Keyboard events originating from
  links or inputs inside cards are left alone. Scrolling honours reduced motion.
- This is a left-to-right list for the English site; no autoplay or looping.
- The client boundary is limited to CardRail. Server components may pass card
  markup as children. Empty lists render nothing; a single fitting card has no
  arrow controls.

## Profile (PR 2)

Photo data uses the shared `ImageSource` type from `src/types/image.ts`.
The `getInitials` helper in `src/lib/get-initials.ts` handles missing-photo labels,
including whitespace and Unicode names. The preview maps founder data into
`Profile` components so adding a person does not duplicate the card markup.

```tsx
import { Profile } from "@/components/ui/profile";

<Profile
  name="Hemna Goyal"
  role="Co-Founder & Managing Director"
  specialty="Management Specialist"
  variant="maroon"
  photo={{ src: "/images/people/hemna-goyal.jpg", alt: "Hemna Goyal" }}
>
  <p>Governance and strategic decision-making.</p>
</Profile>;
```

- `name` is required. `role`, `specialty`, `photo`, `children` and `className` are
  optional. `variant` accepts `forest` (default), `maroon` or `navy`.
- Renders an article with an h3; compose below an h2. Children provide biography
  paragraphs, lists or links. With no photo, decorative initials fill the image
  area. Omit absent fields instead of supplying empty placeholder labels.
- `photo` requires `src` and `alt`. Next Image reserves a 16:11 region and crops
  with object-fit: cover. Use existing local images; remote sources require the
  project's Next.js image configuration. A supplied but broken URL is not the
  same as an omitted photo and should be fixed by the page author.
- The two preview portraits were extracted unchanged from `demo/about.html`.
  Names stay below the image so long names do not overlap portraits on mobile.

### PR 2 verification

- `pnpm test src/components/ui/card-rail.test.tsx` checks boundaries, resize,
  independent instances, reduced motion, keyboard handling, empty/single lists
  and observer cleanup. DOM geometry is mocked; browser review checks real layout.
- On `/dev/components`, compare services and founder rails. At 390px both should
  scroll; on a wide desktop, two founders fit and their arrows disappear.
- Scroll to both ends, resize, and use Tab then Left/Right and Home/End. Confirm
  the other rail stays put, portrait images load, and long names wrap.

## Review checklist

- `pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm build`.
- On `/dev/components`, toggle FAQ items with mouse and keyboard; open two answers
  together and check the initially open answer and its link.
- At desktop and mobile widths, check long questions, button wrapping and focus
  outlines; no horizontal page overflow should occur.
- Edit the example input, then use Reset example; the disabled action must not run.
- Follow both CTA links, including from a service detail page.
- With `pnpm start`, `/dev/components` should return 404.
