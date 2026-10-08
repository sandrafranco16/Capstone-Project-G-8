# Deployment, Maintenance and Recovery

For a technical maintainer. Use [account setup](platform-account-setup.md) first and
record the final host, URL, release SHA and owner in the [index](README.md).
The application needs a Next.js runtime with server endpoints; it is not static-only.

## Deployment procedure

1. Use Node 24.x and pnpm 11.19.0. Install from `pnpm-lock.yaml` with
   `pnpm install --frozen-lockfile`.
2. Run `pnpm lint`, `pnpm test`, `pnpm typecheck` and `pnpm build` on the release candidate.
3. Connect the approved GitHub repository/branch to Vercel using the
   [account setup instructions](platform-account-setup.md#3-hosting-account-vercel).
4. Set the environment variables below. Do not upload `.env.local` or expose secrets.
5. Deploy; confirm the deployment SHA and inspect build/function errors.
6. Test the deployed website, CMS publish/media upload, Cal.com and real email using
   the [acceptance checklist](acceptance-and-handover.md). Record evidence before release.

## Environment variables

Set public variables at build time, server variables in the host's server/function
environment. Confirm the [service budget](hosting-and-service-costs.md). Configure
Production and Preview separately; save changes and **redeploy**. A saved setting does
not update an already-built browser bundle.

| Variable                         | Value / requirement                                                             |
| -------------------------------- | ------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`           | Non-empty canonical HTTPS origin; local demo uses `http://localhost:3000`       |
| `NEXT_PUBLIC_CALCOM_URL`         | Client's Cal.com profile URL, e.g. `https://cal.com/<username>`                 |
| `CMS_REPOSITORY`                 | Required in every environment: explicit current `owner/repository`; no fallback |
| `CMS_BRANCH`                     | Existing content target branch, normally `main`; never a deleted feature branch |
| `CMS_OAUTH_BASE_URL`             | Stable HTTPS **origin only**, no `/admin`, query or fragment                    |
| `CMS_GITHUB_CLIENT_ID`           | OAuth App Client ID; required for online CMS                                    |
| `CMS_GITHUB_CLIENT_SECRET`       | **Secret**; required for online CMS                                             |
| `CMS_GITHUB_SCOPE`               | `public_repo` if public; `repo` if private, subject to permission review        |
| `CONTACT_EMAIL_PROVIDER`         | `resend` for real enquiries; `mock` only for a clearly labelled demo            |
| `CONTACT_EMAIL_FROM`             | Approved address on the verified sending domain                                 |
| `CONTACT_EMAIL_TO`               | Approved receiving inbox; server controlled, never visitor input                |
| `CONTACT_EMAIL_API_KEY`          | **Secret**; restricted Resend sending key                                       |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Public site key for the allowed deployed hostname                               |
| `TURNSTILE_SECRET_KEY`           | **Secret**; matching Turnstile secret; required for deployed Contact            |
| `NEXT_PUBLIC_GA_ID`              | Optional GA4 ID; not sufficient until tracking integration is completed         |
| `NEXT_PUBLIC_CLARITY_ID`         | Optional Clarity ID; same integration limitation                                |

Anything named `NEXT_PUBLIC_*` is visible to visitors; never place a secret there.
CMS configuration/authentication routes return 503 when required repository
configuration is missing, or when the production OAuth origin is missing. Development
may use the localhost request origin; production and preview must use the configured
stable origin. `CMS_BRANCH` defaults to `main` when omitted.
The only production API paths required here are `/api/contact`, `/api/cms/config`,
`/api/cms/auth` and `/api/cms/callback`. No application database, object-storage account,
SMTP server or Cal.com API key is required for this MVP.

## Preview and release safety

Use authorised test recipients and a non-production content branch for tests that
create data. A preview targeting `CMS_BRANCH=main` can change production content.
Use a stable staging origin and matching OAuth callback; approve the exact Turnstile
hostname. Do not weaken production spam checks by setting `NODE_ENV=development`.
Do not make a private repository public merely to bypass hosting restrictions.

## Maintenance schedule — agree with the client

| When                 | Maintainer action                                                                  |
| -------------------- | ---------------------------------------------------------------------------------- |
| Each deployment      | Check build, key routes, Contact and any changed CMS/booking behaviour             |
| Weekly initially     | Check failed deliveries, deployment errors and suspicious request/usage increases  |
| Monthly              | Review provider quotas/billing, dependency updates, access and content backups     |
| Owner/domain changes | Recheck Git connection, CMS repository/callback, Turnstile, email DNS and site URL |

Review dependency updates on a branch, run checks and smoke-test before merging.
This is a recommended routine, not an agreed service-level or ongoing student support contract.

## Failure runbook

| Symptom                          | Check / recovery                                                                                           |
| -------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| Build fails with `Invalid URL`   | Set a non-empty valid `NEXT_PUBLIC_SITE_URL`; rebuild                                                      |
| CMS config/login unavailable     | Verify CMS variables, stable callback/origin, accepted repository access and OAuth scope                   |
| CMS media upload blocked         | Inspect GitHub rules for direct writes; apply only the agreed publishing policy                            |
| CMS content merged but not live  | Confirm branch, Git integration, author permissions and failed build; check provider restrictions          |
| Contact unavailable / 503        | Check Turnstile secret and email provider configuration; inspect redacted server errors                    |
| Verification fails / 400         | Check hostname and matching Turnstile keys; retry with a fresh token                                       |
| Contact returns 202 but no email | Check for demo `mock` mode, Resend status, recipient, spam/quarantine; 202 is not inbox proof              |
| Cal.com link unavailable         | Verify profile, exact event slug, visibility, calendar auth and schedule; use external fallback            |
| Analytics empty                  | Confirm script integration first, then correct IDs and privacy settings; env values alone are insufficient |

If a deployment breaks the site, restore the last known-good deployment using the
host's rollback/publish controls. Record its SHA and incident, then fix through a PR.
Rollback changes the served build, **not** GitHub content or third-party settings.
For ongoing stability, revert the offending Git change through a reviewed PR and deploy.
Never force-reset shared history. Confirm provider rollback availability for the chosen plan.

## Backup and recovery

Git tracks source, Markdown and uploaded images. Keep a client-controlled independent
copy of the repository and release SHA. A normal clone includes `main`; a maintainer
can use `git clone --mirror <approved-repository-url>` for all Git refs, storing it
privately. Git cloning does not back up issues, PR discussions, hosting settings or secrets.

Record non-secret platform settings and DNS records separately. Keep secrets/recovery
codes in private client-controlled storage. Retain approved mailbox/calendar data under
the client's policy; the application has no separate lead database to restore.

For a deleted/corrupt article: locate a good version in GitHub history, restore its
Markdown and referenced media on a new branch, review, merge and verify the deployment.
For lost service access: recover through the client's owner/recovery process or recreate
the service, replace relevant keys/origins and retest. Do not expose secrets in a support issue.

Before acceptance, practise one restore in a non-production environment and record
the actual recovery result and elapsed time. An untested backup is not recovery evidence.

## Security and ownership close-out

Rotate/recreate keys in client-controlled accounts, deploy and test, then revoke old
keys and remove temporary student access. Clear CMS sessions on shared devices.
Confirm privacy copy covers Cal.com, Resend, Turnstile and any enabled analytics/video
providers. No application database does not mean no third-party personal-data processing.
See the [account transfer record](acceptance-and-handover.md).
