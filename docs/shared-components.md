# Shared components — BIT-26, PR 1

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

The homepage, Services overview and About still render through `LegacyDemoPage`.
Import these components when migrating those pages to React; adding React files
alone does not replace content inside the legacy HTML. Card Rail and Profile are
reserved for PR 2.

## Review checklist

- `pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm build`.
- On `/dev/components`, toggle FAQ items with mouse and keyboard; open two answers
  together and check the initially open answer and its link.
- At desktop and mobile widths, check long questions, button wrapping and focus
  outlines; no horizontal page overflow should occur.
- Edit the example input, then use Reset example; the disabled action must not run.
- Follow both CTA links, including from a service detail page.
- With `pnpm start`, `/dev/components` should return 404.
