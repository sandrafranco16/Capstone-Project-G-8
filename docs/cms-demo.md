# CMS demo

The local CMS demo edits the same Markdown files that the Next.js website renders. It
does not require a GitHub login or production OAuth credentials.

## Run locally

Install dependencies, then open two terminals in the repository root:

```bash
pnpm dev
```

```bash
pnpm cms
```

Open `http://localhost:3000/admin/`, select **Blog**, and create or edit an article.
Publishing writes the Markdown file to `src/content/blog`. Visit
`http://localhost:3000/blog` to review the result.

## Demo flow

1. Open an existing article in the Content Manager.
2. Change its summary or add a short section in the Markdown editor.
3. Publish the change and refresh the public article page.
4. Show the generated Markdown file and its Git diff.

## Production boundary

The local Decap proxy is for development only and must never be exposed publicly.
Production publishing still requires a GitHub OAuth proxy, approved repository access
and a decision on the editorial review workflow. Decap's local backend does not support
`editorial_workflow`, so the demo uses direct local publishing.

## Content format

Decap stores each article in `src/content/blog` using YAML front matter followed by
Markdown:

```yaml
---
title: Example article
excerpt: Short article summary
category: AI Governance
publishedAt: 2026-08-20T00:00:00.000Z
youtubeUrl: https://www.youtube.com/watch?v=example
---
```

The filename becomes the public article slug. Raw HTML is intentionally not rendered,
and required front matter is validated during tests and production builds.
