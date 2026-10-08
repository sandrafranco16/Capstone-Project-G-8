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
demo/                    Approved static prototype, kept as the design reference
```

## Demo prototype

Every route now renders typed React components. The homepage was the last page
on the prototype loader and moved to React in #51, so `src/components/legacy/`
was removed. `demo/` stays in the repository as the client-approved design
reference and is not read at build or run time.

## MVP module boundaries

- `pathways`: the four audience entry points and their service mappings.
- `services`: career, AI and automation, governance, executive/board and risk services.
- `blog`: Markdown article metadata and the Decap publishing pipeline (see [`docs/features/cms-integration.md`](../features/cms-integration.md)).
- `assessment`: client-approved questions, scoring and service recommendations.
- `booking`: Cal.com configuration and appointment links (see [`docs/features/booking-integration.md`](../features/booking-integration.md)).
- `contact`: validation and the future server-side email delivery adapter.
- `analytics`: agreed event names for Google Analytics and Microsoft Clarity.

Route components should compose these modules rather than contain business rules. Third-party integrations stay behind feature or `lib` boundaries so providers can be changed without rewriting pages.

## Deferred decisions

- The email delivery provider and production credentials.
- Final Cal.com event links.
- Client-approved Assessment questions, thresholds and recommendation mapping.
- Decap CMS OAuth configuration and the client publishing proof of concept.
- Final analytics consent and event configuration.
