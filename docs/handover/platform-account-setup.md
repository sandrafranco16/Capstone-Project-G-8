# External Platform Accounts and Configuration

For the client and technical administrator. Prepared 7 October 2026 from the
application and linked official documentation. Steps are not evidence that accounts
have been configured. Complete the [ownership record](acceptance-and-handover.md).

## 1. Before starting

Vercel is retained as the hosting provider. Agree the final website origin (for
example, `https://www.example.com`), repository owner, publishing account, sending
domain and receiving inbox. Approve the [service-cost summary](hosting-and-service-costs.md).
Examples below are placeholders, not confirmed BITDOT production settings.

Use client-controlled accounts and recovery email addresses. Enable MFA where
available and store recovery codes privately. Invite maintainers individually with
only the access needed; do not hand over a student's personal login. If a plan has
no suitable invitation/transfer feature, create a client-owned resource and reconnect
the website rather than sharing credentials. Agree billing and maintenance responsibility
before enabling paid features. Do not send test messages to the client's inbox without permission.

| Service                              | Required for                      | Client provides                             | Administrator configures                                        |
| ------------------------------------ | --------------------------------- | ------------------------------------------- | --------------------------------------------------------------- |
| GitHub + OAuth App                   | Blog publishing, source and media | Account, repository ownership/access        | Permissions, callback and CMS variables                         |
| Vercel                               | Website and server endpoints      | Account, approved plan and domain authority | Git connection, build, environments and deployment              |
| Cal.com                              | Scheduling                        | Account, calendar and working hours         | Five events and profile URL                                     |
| Resend                               | Live enquiry emails               | Account, DNS authority and approved inbox   | Verified sending domain and restricted API key                  |
| Cloudflare Turnstile                 | Contact spam protection           | Account                                     | Widget, hostnames and matching keys                             |
| Existing registrar / DNS provider    | Domain and email verification     | Access to current DNS                       | Only approved website and sending records                       |
| YouTube                              | Optional article video            | Approved video link or channel              | No website API key needed                                       |
| Google Analytics / Microsoft Clarity | Planned analytics                 | Client-owned projects and privacy decisions | IDs and verified tracking integration; currently a release gate |

## 2. GitHub repository and Decap CMS

### Repository access

1. Create/confirm the client's GitHub account and MFA recovery arrangements.
2. The current owner invites the publishing account to the repository with write
   access. The client accepts the invitation while signed into that account.
3. For final ownership, the current owner initiates a repository transfer and the
   client accepts. Record the new `owner/repository`. Ownership transfer does **not**
   automatically transfer hosting, OAuth, calendar or email resources.
4. Reconnect the hosting Git integration if needed; explicitly update `CMS_REPOSITORY`.

Follow [GitHub repository transfer instructions](https://docs.github.com/en/repositories/creating-and-managing-repositories/transferring-a-repository).

### Create or transfer the OAuth App

This code expects a **GitHub OAuth App**, not a GitHub App registration.

1. In the owning GitHub account: **Settings → Developer settings → OAuth Apps**.
2. Register an application named `BITDOT CMS` (or transfer the existing OAuth App).
3. Set Homepage URL to the stable website origin.
4. Set Authorization callback URL to `<stable origin>/api/cms/callback`.
5. Copy the Client ID and generate a client secret. Put the secret only in the
   hosting project's server-side environment variables, not GitHub content or chat.
6. Configure `CMS_GITHUB_CLIENT_ID`, `CMS_GITHUB_CLIENT_SECRET`, `CMS_OAUTH_BASE_URL`,
   `CMS_REPOSITORY`, `CMS_BRANCH` and `CMS_GITHUB_SCOPE` using the
   [environment table](deployment-and-maintenance.md#environment-variables).
7. Redeploy and test login from `/admin/` with the client's actual account.

Use `public_repo` for a public repository, `repo` only if private access is required.
These OAuth scopes are broader than a single repository: avoid giving the publishing
account access to unrelated repositories. If expiring tokens are enabled, verify the
CMS re-login/session behaviour: this implementation does not implement token refresh.
Do not enable device flow or wildcard callbacks just to make preview URLs work.
Prefer a separate OAuth App and stable origin for staging.
See [creating OAuth Apps](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/creating-an-oauth-app)
and [OAuth security guidance](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/best-practices-for-creating-an-oauth-app).

### Agree the publishing policy

Production uses Decap's editorial workflow. Developer code changes should retain
PR review. Decide whether the client publishes after review, or whether a narrowly
authorised publisher can bypass specified rules for immediate content publication.
An administrator must confirm which bypass actors are supported by the repository's
plan/rules; **write access alone does not bypass protection**.

Test both article publication **and Media-library upload**: media may write to the
target branch independently. PR-only bypass may not permit that direct write. Do not
disable protection globally or grant admin solely to solve uploading. If the approved
policy cannot safely support media upload, record a blocker and an agreed upload process.
See [GitHub rulesets](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/available-rules-for-rulesets).

## 3. Hosting account: Vercel

The deployment needs Next.js server endpoints. Do **not** deploy only `demo/`,
`public/` or a static export: Contact and CMS OAuth would not work.

### Vercel

1. Create a client-owned account/team, connect GitHub and import the repository.
2. Use the Next.js preset, repository root, Node `24.x`, install command
   `pnpm install --frozen-lockfile` and build command `pnpm build`. Keep the preset output.
3. Confirm the production branch; configure Production and Preview separately.
4. Add the environment values, deploy and record the stable URL/project link.
5. Test a CMS commit created by the actual publisher, not only a developer's commit.

Vercel Hobby is limited to non-commercial personal use and must not be assumed to be
the plan for BITDOT's commercial website. Private-repository collaboration can also
block deployment based on commit author and account permissions. Confirm the applicable
plan and workflow, rather than assuming the person who clicks Merge is sufficient.
Sources: [fair use](https://vercel.com/docs/limits/fair-use-guidelines),
[Git deployment permissions](https://vercel.com/docs/git).

### Domain connection

Add the approved domain in the selected host, then copy its displayed DNS records
into the **existing** DNS provider. Preserve existing mailbox MX/TXT records; do not
replace nameservers or email settings without a migration plan. Wait for domain/TLS
verification, choose the canonical domain, and update `NEXT_PUBLIC_SITE_URL`, the
CMS origin/callback and Turnstile hostnames. Redeploy and repeat acceptance tests.
No domain transfer or Cloudflare DNS migration is required just to use Turnstile.

## 4. Cal.com account

Follow the [Cal.com guide](calcom-client-guide.md): connect a client calendar, configure
availability and meeting location, and create the five exact event slugs. Set the
real profile URL in `NEXT_PUBLIC_CALCOM_URL`, then redeploy. No Cal.com API key or
booking webhook is required by this implementation. Do not use a student's calendar
for final bookings. Test confirmations, conflict handling, cancellation and rescheduling.

## 5. Resend email account and DNS

1. Create the client-controlled Resend account. Agree the sending domain and recipient.
2. In **Domains**, add an approved domain/subdomain. A separate sending subdomain
   (for example, `notifications.example.com`) helps isolate website email configuration.
3. The DNS administrator adds **exactly the records Resend displays** for sending
   verification, including its DKIM/SPF-related records. Record names/types, not guessed
   values. Do not overwrite the business mailbox's MX records or enable receiving
   mail in Resend unless separately required. Review DMARC with the domain administrator.
4. Wait for verified status. Create a named API key with **Sending access**, restricted
   to the sending domain where possible. Save its value directly in hosting secrets.
5. Configure `CONTACT_EMAIL_PROVIDER=resend`, the approved `CONTACT_EMAIL_FROM`,
   `CONTACT_EMAIL_TO` and `CONTACT_EMAIL_API_KEY`; redeploy.
6. With permission, send one labelled enquiry. Confirm delivery in Resend **and the
   receiving inbox**, then Reply to check the visitor's address is used.

For developer testing, `mock` sends nothing. Resend's `onboarding@resend.dev` test
sender can deliver only to the email associated with that Resend account; a verified
domain is needed for other recipients. Check current account quotas and billing rather
than assuming unlimited free email. No separate inbound-mail integration is needed.
Sources: [verified domains](https://resend.com/docs/dashboard/domains/introduction),
[API keys](https://resend.com/docs/dashboard/api-keys/introduction),
[test sender restriction](https://resend.com/docs/knowledge-base/403-error-resend-dev-domain).

## 6. Cloudflare Turnstile

1. In the client-controlled Cloudflare dashboard, open **Turnstile → Add widget**.
2. Name it `BITDOT Contact`; select **Managed** mode.
3. Allow only the intended website hostnames, without protocol or path. Use a
   separate test widget/approved stable hostname for preview testing.
4. Store the site key in `NEXT_PUBLIC_TURNSTILE_SITE_KEY` and the matching secret in
   `TURNSTILE_SECRET_KEY` in the hosting environment. Redeploy.
5. Confirm Contact works with verification; test failure/retry and **Send another
   message**. Missing production secret must not permit email delivery.

Both keys are required for deployed Contact. `pnpm dev` with blank keys intentionally
skips verification; it does not prove production protection. Official dummy test keys
are for non-production tests only. Source:
[widget setup](https://developers.cloudflare.com/turnstile/get-started/widget-management/dashboard/).

## 7. Optional video and planned analytics

**YouTube:** the client supplies an approved embeddable video URL. Public or suitable
unlisted videos can be used; unlisted is not access control. No YouTube API account
integration is required. Blog publishing does not upload videos to YouTube.

**GA4:** create a client-owned Analytics account/property and Web data stream for the
website; copy the Measurement ID into `NEXT_PUBLIC_GA_ID`.
[Official setup](https://support.google.com/analytics/answer/14183469?hl=en).

**Clarity:** create a client-owned project for the website; copy its project ID from
Settings into `NEXT_PUBLIC_CLARITY_ID`.
[Official setup](https://learn.microsoft.com/en-us/clarity/setup-and-installation/getting-started).

**Important:** the inspected code defines analytics events but does not load these
provider scripts from those environment variables. IDs alone will not enable tracking.
The frontend must complete/verify script integration, privacy/consent behaviour and
sensitive-field masking before analytics is claimed as delivered. Do not send names,
emails, messages or personal-data query strings to analytics. Leave IDs blank until approved.

## 8. Completion check

For each required service, record owner, resource URL, approved plan, access test,
configuration date and evidence in the [handover record](acceptance-and-handover.md).
Then complete the live tests. Remove student access and revoke old keys only **after**
the client can independently operate the replacement setup.
