# Verification Record

## 1. Executed baseline checks — 7 October 2026

Source: a clean Git archive of `origin/main` **`149020a`**, excluding the user's
uncommitted working-copy changes. Runtime: Node **24.19.0**, pnpm **11.19.0**.
Next.js: **16.3.1**. No live secrets or customer service accounts were used.
Local configuration matched README's explicit localhost/CMS values and mock email.

| Check                                                     | Actual result                                                                                              |
| --------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| `pnpm install --frozen-lockfile`                          | Passed; lockfile unchanged. Husky noted no `.git` in the archive, as expected                              |
| `pnpm lint`                                               | Passed, exit 0                                                                                             |
| `pnpm test`                                               | Passed: **26 test files, 151 tests**, exit 0                                                               |
| `pnpm typecheck`                                          | Passed, exit 0                                                                                             |
| `pnpm build`                                              | Passed; 34 static pages generated and dynamic server routes listed                                         |
| `pnpm format:check` on baseline                           | Passed, exit 0                                                                                             |
| `pnpm start --port 3107`                                  | Started successfully                                                                                       |
| Production HTTP smoke check                               | All 13 checked routes returned 200; listed below                                                           |
| Production Contact, valid synthetic payload but no secret | Returned **503** with an `errors` array; mock mode, no real email                                          |
| Local `pnpm cms`                                          | Started proxy on 8081; `info` request returned 200 with local filesystem/simple publication mode           |
| Local development HTTP check                              | `/`, `/blog`, `/admin/`, `/api/cms/config`, `/contact` returned 200; config included `local_backend: true` |
| Local mock Contact                                        | Returned **202**, `accepted: true`; no real email sent                                                     |

Production routes checked: `/`, `/services`, `/about`, `/resources`, `/assessment`,
`/blog`, `/blog/2026-08-31-image-test`, `/booking`, `/contact`, `/admin/`,
`/api/cms/config`, `/sitemap.xml`, `/robots.txt`.

The image-test route above belongs to the historical `149020a` baseline. This
handover PR removes that test article; use `/blog/2026-08-18-practical-ai-governance-first-step`
for subsequent article smoke checks. The baseline result is not a claim that a
removed test URL remains available.

Local `pnpm dev --port 3108` initially hit **EMFILE watcher errors** in this environment.
Increasing the process file limit did not resolve it. Restarting with
`WATCHPACK_POLLING=true pnpm dev --port 3108` allowed the checks above to complete
without those errors. This is an environment workaround, not a code fix.

These were terminal/HTTP checks, not a visual browser test, full fresh-clone training
test, real CMS publish/upload, real booking, real email or client acceptance. Test
success does not establish those outcomes. Re-run on the final release after all merges.

## 2. Reproduce the baseline

Follow [README](../../README.md), then run its lint/test/typecheck/build commands.
Keep server/function checks separate from local mock checks: `pnpm dev` deliberately
allows unconfigured Turnstile, while `pnpm start` enforces deployed behaviour.
Record the actual SHA and results rather than copying this version's test count.

Detailed test locations: `src/features/**/*.test.ts`,
`src/components/legacy/prepare-homepage-assessment.test.ts`,
`src/app/api/contact/route.test.ts`, and `src/lib/cn.test.ts`.
Unit tests cover content/configuration, assessment logic, blog/YouTube parsing,
booking URLs, OAuth, contact validation, spam policy and email-provider responses.
They do not certify third-party account configuration or complete browser accessibility.

## 3. Final-release evidence still needed

| Evidence                     | Required record                                                                             |
| ---------------------------- | ------------------------------------------------------------------------------------------- |
| Release CI/build             | Final SHA, date, commands, counts and accessible run/deployment link                        |
| Fresh-user README exercise   | Independent tester, setup steps, issues and retest outcome                                  |
| Browser/mobile/accessibility | Devices/browsers, tested journeys and results; do not claim WCAG compliance from unit tests |
| Production service tests     | Real client roles, CMS/image/video, calendar booking and actual inbox delivery              |
| Recovery exercise            | Staging restore actions, version and actual outcome                                         |
| Client training/acceptance   | Client actions, direct feedback, agreed issues and acceptance evidence                      |

Use [acceptance and handover](acceptance-and-handover.md) for the detailed record.
Store redacted logs/screenshots in an accessible project location and link them here.
The baseline was observed during this audit; final CI/client evidence is still pending.

## 4. Handover branch checks — 7 October 2026

Verified a clean archive of `docs/client-handover` at **`a77ecb3`**, after removing
the three CMS test articles and their dedicated screenshot. Documentation-only
follow-up commits record these results. Runtime: Node 24.19.0, pnpm 11.19.0.
The archive excluded `.env.local`, uncommitted `next-env.d.ts` changes and `tmp/`.
Synthetic localhost configuration and mock email were used; no live services were tested.

| Check                                   | Actual result                                                                                            |
| --------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| Frozen-lockfile install                 | Passed; no dependency changes                                                                            |
| `pnpm lint` / `pnpm typecheck`          | Passed                                                                                                   |
| `pnpm test`                             | 26 files, 151 tests passed                                                                               |
| `pnpm build`                            | Passed; 31 static pages generated                                                                        |
| `pnpm format:check`                     | Passed                                                                                                   |
| Local documentation links               | 68 relative file links checked across 17 changed Markdown documents; no missing targets                  |
| Production HTTP smoke checks, port 3127 | Blog index and both remaining articles: 200; three deleted test articles and the deleted screenshot: 404 |
| Sitemap                                 | 200; no removed test-article slugs                                                                       |

The test server was stopped after verification. Client acceptance, real CMS publishing,
calendar bookings, email delivery and account transfer remain pending; do not infer
them from these local checks.
