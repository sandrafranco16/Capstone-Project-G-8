# SEO and social previews

Covers the Sprint 4 SEO task: metadata, sitemap, social preview and
semantic structure.

## What is in place

| Area                                  | Where                                 | Notes                                                                                                                                                                                |
| ------------------------------------- | ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Page titles, descriptions, canonicals | each `page.tsx`                       | Root layout sets the title template and description fallback.                                                                                                                        |
| Open Graph / X defaults               | `src/app/layout.tsx`                  | `siteName`, `en_AU` locale and a large-image card. Pages still set their own title, description and url.                                                                             |
| Social preview image                  | `src/app/opengraph-image.tsx`         | 1200×630 PNG built at build time from the real brand mark and `siteConfig.description`. Inherited by every route.                                                                    |
| Organisation structured data          | `src/features/seo/structured-data.ts` | `ProfessionalService` JSON-LD in the root layout: name, logo, email, phone, address and founders (taken from the About content). No `sameAs`, since the site has no social profiles. |
| Sitemap                               | `src/app/sitemap.ts`                  | Static pages, pathways, services and blog posts.                                                                                                                                     |
| robots.txt                            | `src/app/robots.ts`                   | Blocks `/admin`, `/api/` and `/dev/`.                                                                                                                                                |

A page that defines its own `openGraph` block loses the inherited image
(Next.js behaviour), so it has to list `socialImage` from
`src/features/seo/social-image.ts` in `openGraph.images`, as
`app/about/page.tsx` does.

## Checking it

- Run `pnpm build && pnpm start`, then open `/opengraph-image` and `/robots.txt`.
- Paste a deployed URL into Google's Rich Results Test to check the
  structured data, and into LinkedIn Post Inspector to check the preview.

## Known gaps

- The homepage still renders the legacy prototype, which embeds its own
  copy of the organisation JSON-LD. It goes away when the homepage is ported.
- Analytics (Google Analytics, Microsoft Clarity) from the project plan is
  not added: it needs the client's account IDs and a decision on consent,
  given the requirement not to store personal data.
