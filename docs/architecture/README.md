# Application Architecture

The MVP is a Next.js and TypeScript modular monolith. The application does not use an application database.

## Directory responsibilities

```text
src/
├── app/                 Next.js routes, layouts, metadata and Route Handlers
├── components/          Shared presentational UI and site layout
├── content/blog/        Markdown articles managed by Decap CMS
├── features/            Business modules and their data or domain rules
└── lib/                 Site-wide configuration and infrastructure helpers
public/
├── admin/               Decap CMS entry point and configuration
├── images/              Static site images
└── uploads/             CMS-managed media
tests/                   Future unit, integration and end-to-end tests
demo/                    Approved static pages used by the high-fidelity migration layer
```

## Demo migration boundary

The homepage, Services, About and Legal routes currently use
`src/components/legacy/legacy-demo-page.tsx`. At build time it reads the approved local
HTML, preserves the page CSS and content, rewrites `.html` links to Next.js routes, and
loads the demo interactions through a client-only runtime. This keeps the approved
visual result stable while the team progressively moves reusable sections and new MVP
logic into typed React components. Remote scripts are not executed by this layer.

## MVP module boundaries

- `pathways`: the four audience entry points and their service mappings.
- `services`: career, AI and automation, governance, executive/board and risk services.
- `blog`: Markdown article metadata and the Decap publishing pipeline (see [`docs/features/cms-integration.md`](../features/cms-integration.md)).
- `assessment`: client-approved questions, scoring and service recommendations.
- `booking`: Cal.com configuration and appointment links.
- `contact`: validation and the future server-side email delivery adapter.
- `analytics`: agreed event names for Google Analytics and Microsoft Clarity.

Route components should compose these modules rather than contain business rules. Third-party integrations stay behind feature or `lib` boundaries so providers can be changed without rewriting pages.

## Deferred decisions

- The email delivery provider and production credentials.
- Final Cal.com event links.
- Client-approved Assessment questions, thresholds and recommendation mapping.
- Decap CMS OAuth configuration and the client publishing proof of concept.
- Final analytics consent and event configuration.
