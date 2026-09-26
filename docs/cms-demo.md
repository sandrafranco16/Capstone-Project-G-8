# CMS setup

Decap CMS edits the Markdown files rendered by the Next.js website. Local development
uses a file proxy; an online deployment uses GitHub login and pull-request review.

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

## Online test setup

Use a stable Vercel deployment URL for the CMS test. A changing per-deployment URL will
not match the GitHub OAuth callback.

1. Add the dedicated CMS test account as a repository collaborator with **Write**
   access, then accept the invitation from that account.
2. Create a GitHub OAuth App from **Settings → Developer settings → OAuth Apps**.
3. Set its homepage to the stable deployment origin and its callback URL to
   `https://your-deployment.example.com/api/cms/callback`.
4. Add the following Vercel environment variables to the Preview environment:

```dotenv
CMS_REPOSITORY=sandrafranco16/Capstone-Project-G-8
CMS_BRANCH=feature/cms-blog-demo
CMS_OAUTH_BASE_URL=https://your-deployment.example.com
CMS_GITHUB_CLIENT_ID=replace-with-client-id
CMS_GITHUB_CLIENT_SECRET=replace-with-client-secret
CMS_GITHUB_SCOPE=public_repo
```

5. Redeploy, open `/admin`, and sign in with the CMS test account.
6. Create an article and move it through the editorial workflow. Confirm that the
   generated pull request can be published by the dedicated bypass account.

The client secret belongs only in Vercel environment variables. Never prefix it with
`NEXT_PUBLIC_`, commit it, or paste it into the CMS configuration. The current public
repository uses `public_repo`; change the scope to `repo` if the repository becomes
private. Because an OAuth token is not limited to one repository, the dedicated test
account should have access only to repositories required for CMS testing.

Production deployments must explicitly set `CMS_REPOSITORY` and
`CMS_OAUTH_BASE_URL`. The application returns a service-unavailable response for CMS
configuration and authentication routes when either value is missing, instead of
silently targeting a fallback repository or request origin. Local development keeps
safe defaults for the current repository and `http://localhost:3000`.

## Review and deployment

Online CMS changes use Decap's editorial workflow. Configure a GitHub branch rule for
the target branch with one approving review, then add only the dedicated client or test
account as a named bypass actor. That account can publish immediately from the CMS;
other contributors still require review. Do not grant repository administration solely
to obtain bypass access. Merging the content pull request triggers the normal Vercel
deployment. During testing, target the feature branch; after approval and merge of the
CMS implementation, change `CMS_BRANCH` to `main` for production.

## Security boundary

The local Decap proxy is for development only and must never be exposed publicly.
Decap's local backend does not support `editorial_workflow`, so local development uses
direct publishing. Online access is controlled by GitHub: signing in is not sufficient
unless that account also has permission to the configured repository.

If the repository, owner, deployment domain, or visibility changes, update the Vercel
variables and OAuth App callback before handing the CMS to the client.

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
