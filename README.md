# BITDOT Marketing and Training Platform

Group 8 · CITS5206, Semester 2, 2026 · The University of Western Australia.
Client: BITDOT Consulting Services Pty Ltd; representative: Vibs Agrawal.

A Next.js website for service discovery, educational articles, AI readiness
self-assessment, enquiries and consultation booking. It uses React, TypeScript,
Decap CMS/GitHub, Cal.com, Resend and Cloudflare Turnstile. The MVP has no application
database, learner accounts, payments or LMS.

**Handover status:** documentation prepared for review, not signed-off delivery.
Record the final hosting provider, URL and account owners in the
[handover index](docs/handover/README.md). An old preview link is not the final production site.

## Run the local demonstration

Install **Node.js 24.x** and **pnpm 11.19.0**, matching `package.json`.
Check `node --version` and `pnpm --version` before proceeding.

```bash
git clone https://github.com/sandrafranco16/Capstone-Project-G-8.git
cd Capstone-Project-G-8
pnpm install --frozen-lockfile
cp .env.example .env.local
```

Edit `.env.local` so these values are set explicitly:

```dotenv
NEXT_PUBLIC_SITE_URL=http://localhost:3000
CMS_REPOSITORY=sandrafranco16/Capstone-Project-G-8
CMS_BRANCH=main
CMS_OAUTH_BASE_URL=http://localhost:3000
CONTACT_EMAIL_PROVIDER=mock
```

Leave OAuth credentials, email credentials, Turnstile keys and analytics identifiers
blank for this local demo. Do not leave `NEXT_PUBLIC_SITE_URL` blank. To test booking,
set `NEXT_PUBLIC_CALCOM_URL` to an authorised Cal.com profile; otherwise do not submit
a booking to the built-in example profile.

Start the website:

```bash
pnpm dev
```

In a **second terminal in the same directory**, start the local CMS proxy:

```bash
pnpm cms
```

Open <http://localhost:3000>. Useful demonstration routes:

| Route                                    | What to try                                                                 |
| ---------------------------------------- | --------------------------------------------------------------------------- |
| `/`, `/services`, `/about`, `/resources` | Browse the website and audience pathways                                    |
| `/assessment`                            | Choose a pathway, answer five questions and view recommendations            |
| `/blog`                                  | Read an article, including its optional YouTube video                       |
| `/admin/`                                | Select the local login option; edit an article and publish locally          |
| `/booking`                               | View five appointment types; use an authorised Cal.com account for bookings |
| `/contact`                               | Submit a valid form; **mock mode sends no email**                           |

Local CMS changes write to the working copy; they do not create GitHub PRs or deploy
the website. Stop both servers with `Ctrl+C`. Never expose the local CMS proxy publicly.

If development reports `EMFILE: too many open files, watch`, stop that server and
on macOS/Linux try `WATCHPACK_POLLING=true pnpm dev`. This workaround was checked
in the isolated verification environment; it uses polling instead of native watchers.

## Verify and run a production build

```bash
pnpm lint
pnpm test
pnpm typecheck
pnpm build
pnpm start
```

`pnpm start` uses production behaviour: CMS needs GitHub OAuth, and Contact requires
Turnstile configuration. A build passing does not prove live email, CMS publishing
or booking works. See the [verification record](docs/handover/verification-record.md).
Use `pnpm format:check` to check formatting; `pnpm format` rewrites eligible files.

## Documentation

- [Handover index and release details](docs/handover/README.md)
- [Client user guide](docs/handover/client-user-guide.md)
- [External platform accounts and configuration](docs/handover/platform-account-setup.md)
- [Cal.com setup and daily operations](docs/handover/calcom-client-guide.md)
- [Deployment, maintenance and recovery](docs/handover/deployment-and-maintenance.md)
- [Hosting and service costs](docs/handover/hosting-and-service-costs.md)
- [Acceptance tests and account transfer record](docs/handover/acceptance-and-handover.md)
- [Known issues and release gates](docs/handover/known-issues.md)
- [AI use and review evidence](docs/handover/ai-use-and-review.md)
- [Project plan](PROJECT_PLAN.md) and [architecture](docs/architecture/README.md)

## Repository structure and workflow

`src/app` contains routes and server endpoints; `src/components` contains shared UI;
`src/features` contains domain logic; `src/content/blog` and `public/uploads` contain
CMS content. `demo/` retains the static design reference. Some pages still use a
compatibility layer: check known issues before claiming complete UI integration.

Use feature branches and reviewed PRs for code changes. CMS publishing depends
on GitHub rules and hosting permissions; there is no unconditional auto-publish
guarantee. Tasks and evidence are tracked in Jira and GitHub.

| Member                 | Role                                    |
| ---------------------- | --------------------------------------- |
| Sandra Franco Pynadath | Project Manager / Back-end Support      |
| Shravan Suresh Kumar   | Front-end Developer                     |
| Karthikeya Bezwada     | Front-end Developer                     |
| Lizhou Xiong           | UI/UX Designer                          |
| Junlong Huang          | Back-end Developer / Solution Architect |

GenAI assisted development and documentation. The team must verify outputs, record
review and test evidence, and complete the AI-use record before submission.
