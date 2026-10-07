# Contact Enquiry Email — Implementation & Integration Guide

Client operations: [user guide](../handover/client-user-guide.md). Canonical account/DNS setup:
[platform guide](../handover/platform-account-setup.md). Live results must be recorded in
[acceptance and handover](../handover/acceptance-and-handover.md).

## Table of Contents

- [Feature Overview](#feature-overview)
- [Architecture](#architecture)
- [File Reference](#file-reference)
- [User Flow](#user-flow)
- [Frontend Integration & Styling](#frontend-integration--styling)
- [Resend Setup Guide](#resend-setup-guide)
- [Cloudflare Turnstile Setup](#cloudflare-turnstile-setup)
- [Environment Variables](#environment-variables)
- [Testing](#testing)
- [Security Notes](#security-notes)
- [FAQ](#faq)

---

## Feature Overview

The `/contact` page provides an enquiry form that sends an email to BITDOT's designated inbox via [Resend](https://resend.com). No data is stored in a database or CRM. The form includes spam protection via a honeypot hidden field and Cloudflare Turnstile challenge.

**What this feature does:**

- Accepts name, email, message, and consent from the user.
- Validates input on both client and server side.
- Blocks spam via honeypot and Turnstile.
- Sends the enquiry email to a configured inbox using Resend.
- Shows a success confirmation to the user.

**What this feature does NOT do:**

- Does not send a confirmation email to the user.
- Does not persist leads in an application database; Resend and mailbox providers may store messages.
- Does not handle booking (Cal.com handles that separately).
- Does not send assessment results via email.

---

## Architecture

```
Browser                          Server
───────                          ──────
ContactForm                      POST /api/contact
  ├─ client-side validation        ├─ parse JSON body
  ├─ honeypot hidden field         ├─ check honeypot → silent 202 if triggered
  ├─ Turnstile widget              ├─ validate payload (name, email, message, consent)
  └─ POST /api/contact             ├─ enforce deployed configuration and verify token
                                   ├─ resolve email provider (mock / resend)
                                   ├─ send email via provider
                                   └─ return 202 { accepted: true }
```

### Email Provider Abstraction

The system uses an adapter pattern so the email provider can be swapped without changing application code:

```
EmailProvider (interface)
  ├─ MockProvider     → returns fake ID, sends nothing (for local dev)
  └─ ResendProvider   → calls Resend API to deliver real email
```

The provider is selected by the `CONTACT_EMAIL_PROVIDER` environment variable.

---

## File Reference

### Domain Layer (`src/features/`)

| File                                              | Purpose                                                                    |
| :------------------------------------------------ | :------------------------------------------------------------------------- |
| `features/contact/validation.ts`                  | Payload validation, honeypot detection, Turnstile server-side verification |
| `features/contact/server/deliver-contact-lead.ts` | Resolves provider (mock/resend) and delivers email                         |
| `features/email/server/email-provider.ts`         | `EmailProvider` interface and `LeadEmailInput` type                        |
| `features/email/server/resend-provider.ts`        | Resend API integration with HTML escaping                                  |
| `features/email/server/mock-provider.ts`          | Mock provider for local development                                        |
| `features/email/server/email-errors.ts`           | `EmailNotConfiguredError`, `EmailDeliveryError`                            |

### UI Layer (`src/components/`, `src/app/`)

| File                                      | Purpose                                                                   |
| :---------------------------------------- | :------------------------------------------------------------------------ |
| `components/contact/contact-form.tsx`     | Client component: form fields, validation, submit handling, success state |
| `components/contact/turnstile-widget.tsx` | Explicit Turnstile rendering, token callbacks, reset and cleanup          |
| `app/contact/page.tsx`                    | Server component: renders the contact page and form                       |
| `app/api/contact/route.ts`                | API route: validates, checks spam, delivers email                         |
| `app/globals.css`                         | Contact form CSS classes (`.contact-form`, `.contact-form__field`, etc.)  |

### Tests

| File                                            | Coverage                                                         |
| :---------------------------------------------- | :--------------------------------------------------------------- |
| `features/contact/validation.test.ts`           | 12 tests — payload validation edge cases                         |
| `features/contact/spam.test.ts`                 | 13 tests — honeypot, policy and Turnstile verification           |
| `app/api/contact/route.test.ts`                 | Error response format, unavailable service and delivery failures |
| `features/email/server/resend-provider.test.ts` | 8 tests — API call, security, escaping                           |

---

## User Flow

```
1. User visits /contact
2. Fills in Name, Email, Message
3. Checks "I consent to BITDOT using my details to respond to this enquiry"
4. Completes the Turnstile challenge in deployed environments
5. Clicks "Send Enquiry"
6. Button changes to "Sending..."
7. On success → "Thank you for your enquiry" confirmation
   On error  → Error messages displayed above the form
```

The agreed business direction is Assessment → Contact enquiry, with no separate
assessment email. The inspected result component currently links to services, not
directly to Contact. Frontend integration and its acceptance test remain necessary.

---

## Frontend Integration & Styling

### Customizing the Form

The contact form component is at `src/components/contact/contact-form.tsx`. It is a `"use client"` component that manages its own state.

**To add new fields:**

1. Add the `<input>` or `<select>` inside the `<form>` in `contact-form.tsx`.
2. Read the value in `handleSubmit` via `FormData`.
3. Include it in the JSON body sent to `/api/contact`.
4. Update `ContactPayload` type in `features/contact/validation.ts`.
5. Update `validateContactPayload()` to validate the new field.
6. Update the email body builders in `resend-provider.ts`.

**To change the consent wording:**

Edit the text inside the `<label>` in the consent checkbox section of `contact-form.tsx`:

```tsx
I consent to BITDOT using my details to respond to this enquiry.
```

### Styling

All contact form styles are in `src/app/globals.css` under the `/* ── Contact form */` section. The project uses plain CSS with CSS custom properties — **not Tailwind**.

Key CSS classes:

| Class                    | Element                                       |
| :----------------------- | :-------------------------------------------- |
| `.contact-form`          | Form container (flex column, max-width 36rem) |
| `.contact-form__field`   | Each field wrapper (label + input)            |
| `.contact-form__consent` | Consent checkbox row                          |
| `.contact-form__errors`  | Error message container (red background)      |
| `.contact-success`       | Success confirmation card                     |

Available CSS variables from the design system:

| Variable    | Usage                |
| :---------- | :------------------- |
| `--ink`     | Primary text color   |
| `--slate`   | Secondary text color |
| `--azure`   | Accent / focus color |
| `--line`    | Border color         |
| `--surface` | Input background     |
| `--mist`    | Section background   |
| `--radius`  | Border radius        |

To override styles, edit the corresponding classes in `globals.css`. No inline styles are used in the components.

### Integrating with Other Pages

To link any CTA button to the contact form:

```tsx
<a href="/contact">Get in touch</a>
```

To pre-fill the form in the future (not currently implemented but the API route is ready), you could add query parameter support similar to the booking page.

---

## Resend Setup Guide

### Step 1: Create a Resend Account

1. Go to [https://resend.com/signup](https://resend.com/signup)
2. Sign up with a client-controlled email and check current plan quotas in the dashboard
3. Verify your email address

### Step 2: Get an API Key

1. Go to [https://resend.com/api-keys](https://resend.com/api-keys)
2. Click **"Create API Key"**
3. Name it (e.g., `bitdot-contact-form`)
4. Select permission: **"Sending access"** (not full access)
5. Optionally restrict to a specific domain
6. Copy the key — it starts with `re_` and is shown only once

### Step 3: Configure a Sending Domain (Production Only)

For production use, verify a sending domain. Verification is required but does not guarantee inbox placement.

1. Go to [https://resend.com/domains](https://resend.com/domains)
2. Click **"Add Domain"**
3. Enter the client-approved sending domain/subdomain; `notifications.bitdot.com.au` is an example, not a confirmed setting.
4. Copy the exact record types, names and values displayed by Resend for sending verification; do not assume a fixed DKIM record count/type.
5. Ask the DNS administrator to add them without replacing existing business-mail MX records. Review DMARC separately.
6. Verify in Resend after DNS propagation, then test actual inbox delivery. See the [canonical setup guide](../handover/platform-account-setup.md#5-resend-email-account-and-dns).

> **Note:** For testing, you can skip this step and use Resend's test domain `onboarding@resend.dev`. This only delivers to the Resend account owner's own email address.

### Step 4: Set Environment Variables

In `.env.local` (or your deployment platform's environment settings):

```env
CONTACT_EMAIL_PROVIDER=resend
CONTACT_EMAIL_FROM=BITDOT Website <website@notifications.bitdot.com.au>
CONTACT_EMAIL_TO=info@bitdot.com.au
CONTACT_EMAIL_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

| Variable                 | Description                                              |
| :----------------------- | :------------------------------------------------------- |
| `CONTACT_EMAIL_PROVIDER` | Set to `resend` for real delivery, `mock` for local dev  |
| `CONTACT_EMAIL_FROM`     | The sender address (must match a verified Resend domain) |
| `CONTACT_EMAIL_TO`       | The recipient inbox for all enquiries                    |
| `CONTACT_EMAIL_API_KEY`  | Your Resend API key (starts with `re_`)                  |

### Email Format

Each enquiry email is sent with:

- **From:** `CONTACT_EMAIL_FROM` (fixed, never the user's email)
- **To:** `CONTACT_EMAIL_TO` (fixed)
- **Reply-To:** The user's email (so you can reply directly)
- **Subject:** `New website enquiry`
- **Body:** Contains the user's name, email, and message (HTML-escaped)

---

## Cloudflare Turnstile Setup

Turnstile is optional during local development and required in deployed
environments. Production and Vercel Preview runtimes fail closed when the
server secret is missing, so a configuration error cannot silently bypass spam
protection.

### Step 1: Create a Turnstile Widget

1. Go to [https://dash.cloudflare.com/](https://dash.cloudflare.com/) → **Turnstile**
2. Click **"Add site"**
3. Enter the site name and domain (e.g., `www.bitdot.com.au`)
4. Choose widget mode: **"Managed"** (recommended)
5. Copy the **Site Key** and **Secret Key**

### Step 2: Set Environment Variables

```env
NEXT_PUBLIC_TURNSTILE_SITE_KEY=0x4AAAAAAA...
TURNSTILE_SECRET_KEY=0x4AAAAAAA...
```

- `NEXT_PUBLIC_TURNSTILE_SITE_KEY` — exposed to the browser (this is safe)
- `TURNSTILE_SECRET_KEY` — server-only, never exposed to the client

### Behavior

- If both keys are set, the widget appears and the server verifies every token.
- If both keys are blank during local development, Turnstile is intentionally skipped.
- If the secret is missing from a deployed runtime, the API returns `503` and does not send an email.
- If the secret exists but a token is missing or invalid, the API returns `400`.
- Tokens are single-use. A failed submission resets the widget, and **Send another message** mounts a fresh widget.

The contact form uses Turnstile's explicit rendering API so React controls the
widget lifecycle. Expired or errored challenges clear the current token, and
the submit button remains disabled until a fresh token is available.

---

## Environment Variables

### Local Development

```env
CONTACT_EMAIL_PROVIDER=mock
```

That's all you need. No real emails are sent.

### Preview / Staging (Using Resend Test Domain)

```env
CONTACT_EMAIL_PROVIDER=resend
CONTACT_EMAIL_FROM=onboarding@resend.dev
CONTACT_EMAIL_TO=<your-resend-account-email>
CONTACT_EMAIL_API_KEY=re_<your-test-key>
NEXT_PUBLIC_TURNSTILE_SITE_KEY=<test-site-key>
TURNSTILE_SECRET_KEY=<test-secret-key>
```

> With Resend's test domain, emails can only be delivered to the Resend account owner's email. Do NOT use `info@bitdot.com.au` for testing.
> Use Cloudflare's published Turnstile test keys in Preview rather than production credentials.

### Production

```env
CONTACT_EMAIL_PROVIDER=resend
CONTACT_EMAIL_FROM=BITDOT Website <website@notifications.bitdot.com.au>
CONTACT_EMAIL_TO=info@bitdot.com.au
CONTACT_EMAIL_API_KEY=re_<production-key>
NEXT_PUBLIC_TURNSTILE_SITE_KEY=<site-key>
TURNSTILE_SECRET_KEY=<secret-key>
```

---

## Testing

### API Error Messages

All unsuccessful contact API responses use an `errors` array, which the form displays to the visitor. Missing production Turnstile or email configuration returns `503` with **The contact service is temporarily unavailable. Please try again later.** Delivery failures return `502` with **Unable to send your enquiry. Please try again later.** Internal configuration and provider details are not exposed.

### Automated Tests

```bash
CI=true pnpm test --run     # Full automated test suite
CI=true pnpm typecheck      # TypeScript check
CI=true pnpm lint           # ESLint
CI=true pnpm build          # Production build
```

### Manual Testing — Local (Mock Mode)

1. Set `CONTACT_EMAIL_PROVIDER=mock` in `.env.local`
2. Run `pnpm dev`
3. Open `http://localhost:3000/contact`

| Test          | Steps                                      | Expected                                 |
| :------------ | :----------------------------------------- | :--------------------------------------- |
| Valid submit  | Fill all fields, check consent, submit     | "Thank you" confirmation                 |
| Empty fields  | Submit without filling anything            | Client-side error list                   |
| Bad email     | Enter `abc` as email                       | "Please enter a valid email address"     |
| Short message | Enter 2-character message                  | "Message must be at least 10 characters" |
| No consent    | Fill everything, don't check consent       | "You must consent to being contacted"    |
| Submit again  | Click "Send another message" after success | Form reappears                           |

### Manual Testing — Turnstile Lifecycle

Use Cloudflare test keys in `.env.local`, then restart `pnpm dev`.

| Test                    | Steps                                                               | Expected                                                  |
| :---------------------- | :------------------------------------------------------------------ | :-------------------------------------------------------- |
| Initial verification    | Open `/contact`                                                     | Widget renders and enables submit after producing a token |
| Failed submission       | Force the API to return an error, then retry                        | Widget resets and produces a fresh token                  |
| Submit again            | Complete a successful submission and click **Send another message** | A new working widget is rendered                          |
| Missing deployed secret | Remove `TURNSTILE_SECRET_KEY` from a Preview deployment and submit  | API returns `503`; no email is sent                       |
| Invalid token           | Submit an invalid or reused token                                   | API returns `400`; no email is sent                       |

### Manual Testing — With Resend

1. Create a free Resend account at [resend.com](https://resend.com)
2. Get an API key
3. Set in `.env.local`:
   ```env
   CONTACT_EMAIL_PROVIDER=resend
   CONTACT_EMAIL_FROM=onboarding@resend.dev
   CONTACT_EMAIL_TO=<your-own-email>
   CONTACT_EMAIL_API_KEY=re_<your-key>
   ```
4. Run `pnpm dev`, submit the form
5. Check your inbox (and spam folder) for the email
6. Verify: subject is "New website enquiry", reply-to is the form email, body contains the message

### API Testing with curl

```bash
# Success
curl -s -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Jane","email":"jane@test.com","message":"Tell me about AI governance services.","consent":true}'
# → 202 {"accepted":true}

# Missing consent
curl -s -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Jane","email":"jane@test.com","message":"Tell me about services.","consent":false}'
# → 400 {"errors":["Consent is required."]}

# Honeypot triggered (bot)
curl -s -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Bot","email":"bot@spam.com","message":"Buy my stuff please now.","consent":true,"website":"http://spam.com"}'
# → 202 {"accepted":true}  (silently accepted, no email sent)
```

### Assessment Link Testing

1. Complete a pathway on `/assessment`.
2. Verify the agreed result-to-Contact path after frontend integration; do not assume an old static-demo button exists in the current result component.
3. Open `/contact` directly for isolated form tests and record site-wide navigation separately.

---

## Security Notes

| Concern                           | How it's handled                                                              |
| :-------------------------------- | :---------------------------------------------------------------------------- |
| User email as From address        | Blocked — user email is only used as `Reply-To`                               |
| HTML injection in email body      | All user input is HTML-escaped before embedding                               |
| API key exposure                  | Key is only in server-side `process.env`, never in responses or client bundle |
| Bot spam                          | Honeypot field + Turnstile challenge + field length limits                    |
| Honeypot detection                | Bots that fill the hidden `website` field get a silent 202 (not a 400)        |
| Turnstile secret exposure         | Uses `TURNSTILE_SECRET_KEY` (no `NEXT_PUBLIC_` prefix)                        |
| Missing deployed Turnstile secret | API fails closed with `503`; email delivery is not attempted                  |
| Reused or expired Turnstile token | Server rejects it and the client resets the widget before retry               |
| Error message leakage             | Server errors return generic messages, never stack traces or config details   |

---

## FAQ

**Q: Can I test without a Resend account?**
Yes. Set `CONTACT_EMAIL_PROVIDER=mock`. The form will work normally but no real email is sent.

**Q: Why does the honeypot return 202 instead of 400?**
To avoid revealing to bots that they've been detected. A 400 would tell them to remove the honeypot field.

**Q: Do I need Turnstile for local development?**
No. If both keys are blank in `pnpm dev`, the widget and server verification
are skipped. Deployed builds do not allow this bypass and must be configured
with matching keys.

**Q: Where do I change the email subject line?**
In `src/features/email/server/resend-provider.ts`, the `subject` field in the `sendContactLead` method.

**Q: Can I add CC or BCC recipients?**
Yes, modify the request body in `resend-provider.ts`. Resend supports `cc` and `bcc` fields. See [Resend API docs](https://resend.com/docs/api-reference/emails/send-email).
