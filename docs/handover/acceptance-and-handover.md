# Acceptance Tests and Handover Record

Status: **client approval and sign-off received on 15 October 2026; operational handover checks remain pending where listed below**.

The client acceptance proof is stored at
[`client-signoff-2026-10-15.png`](client-signoff-2026-10-15.png). Project acceptance
and production handover are recorded separately: client approval does not turn an
unexecuted CMS, booking, email, account-transfer or live production check into a pass.
A checklist describes a test; only a dated result with evidence supports a pass. Use
synthetic content and consenting test addresses. Redact secrets, personal details and
calendar information from shared evidence.

## 1. Test context

| Field                                        | Record                                                                   |
| -------------------------------------------- | ------------------------------------------------------------------------ |
| Date, tester and client representative       | Client sign-off: 15 October 2026; Vibs Agrawal                           |
| Website URL, provider and deployment URL     | Netlify review deployment recorded; final production URL remains pending |
| Exact release SHA/tag                        | Tested release: `cc32b381d35d4791df0e5525380de33152b1cfac`               |
| Device/browser and viewport                  | See verification record; client-role production checks remain pending    |
| Publishing account role and applicable rules | Pending; do not record passwords                                         |
| Booking profile/event owner and test inbox   | Pending; redact private details                                          |

The later `main` commit `a20077cb4867b07f10894d90aa2d0b41697f35da` adds the client
acceptance proof. It is not a substitute for the tested-release CI record.

## 2. Acceptance tests

Rows below remain **Pending unless a dated result and evidence are explicitly recorded**.
Client project sign-off is captured in Section 4 and must not be used as evidence that
these separate operational tests were executed.

| ID  | Task and expected outcome                                                                                                                          | Result / evidence / owner                                                                                |
| --- | -------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| A01 | A new team member follows README: installs, starts site and local CMS without undocumented steps                                                   | Independent setup is described in the final report; retain linked setup evidence before marking Verified |
| A02 | From homepage/navigation, reach services, assessment, blog, booking and Contact; no placeholder or Microsoft Bookings path for Cal.com             | Pending final deployed/client-role check; frontend                                                       |
| A03 | Complete each of four assessment pathways; next/back/restart work; results link to relevant services and the agreed contact path                   | Pending final deployed/client-role check; frontend/client                                                |
| A04 | Client signs into `/admin/`, saves a draft, edits it, and publishes under the agreed review policy; article appears after deployment               | Pending; backend/client                                                                                  |
| A05 | Same client account uploads media and publishes an article containing it; public image loads and other contributors still follow code review rules | Pending; backend/client                                                                                  |
| A06 | Article YouTube link renders an approved playable video; invalid/non-embeddable links are handled understandably                                   | Pending; backend/client                                                                                  |
| A07 | All five appointment cards reach their correct Cal.com event, with correct owner/duration; external fallback works                                 | Pending final client-owned booking check; backend/client                                                 |
| A08 | With a consenting test attendee, book once; confirmation, calendar entry, time zone and meeting link are correct; a busy slot is unavailable       | Pending; backend/client                                                                                  |
| A09 | Reschedule and cancel the test appointment; attendee/organiser notifications and calendar updates are correct                                      | Pending; client                                                                                          |
| A10 | Submit Contact with consent; enquiry reaches the agreed inbox; Reply uses the visitor address; no separate assessment email is sent                | Pending live client-inbox test; backend/client                                                           |
| A11 | Invalid fields/no consent show understandable errors; failed submission preserves inputs; retry and Send another message obtain fresh verification | Pending final deployed check; backend/frontend                                                           |
| A12 | Non-production production-build test: missing secret gives 503; missing/invalid token gives 400; no real email is sent                             | Local/CI evidence exists; retain the linked verification before marking Verified                         |
| A13 | Keyboard, mobile menu, focus and readable error states work; agreed desktop/mobile browsers show no blocking layout defects                        | Browser/accessibility evidence is referenced in final report; client-role check remains separate         |
| A14 | Metadata, sitemap, canonical URL and social preview are checked; analytics and privacy behaviour meet the agreed scope                             | Pending analytics/privacy scope verification; frontend/client                                            |
| A15 | Authorised content publication triggers a successful deployment; maintainer identifies and recovers a failed release in staging                    | Pending; backend/maintainer                                                                              |
| A16 | Client completes the user-guide exercise without the team performing the steps for them; unclear instructions are corrected                        | Pending; client/PM                                                                                       |
| A17 | Client approves service/bio/testimonial/legal content and all visible links; demo articles are removed or explicitly accepted                      | Project sign-off received; specific content approvals/launch checks remain as recorded limitations       |

For each run record: ID, actual actions, actual result, date, release SHA, screenshot/
recording or build link, defects and retest result. Attach evidence under
`docs/handover/evidence/` or link to an accessible approved project location. Do not
publish client emails or recovery codes in a public repository.

## 3. Account and resource transfer

Use **Pending**, **Verified**, or **Not required (with reason)**. A shared password
is not evidence of sustainable client ownership. Client project sign-off does not
change these rows unless the corresponding transfer/access check has actually occurred.

| Resource                       | Owner / URL / plan                    | Client access test and transfer evidence                                   | Status  |
| ------------------------------ | ------------------------------------- | -------------------------------------------------------------------------- | ------- |
| GitHub repository and backup   | Pending                               | Client can access code/content and manage agreed roles                     | Pending |
| GitHub OAuth App               | Pending                               | Client controls app/settings; login tested after transfer                  | Pending |
| Hosting project and billing    | Pending                               | Client accesses deploy/log/settings; final release confirmed               | Pending |
| Domain registrar / DNS         | Existing client domain; confirm       | Client controls DNS/renewal; current mail records preserved                | Pending |
| Cal.com and connected calendar | Pending                               | Client manages availability, events and bookings                           | Pending |
| Resend account/domain/key      | Pending                               | Client accesses delivery status; approved DNS and inbox test               | Pending |
| Turnstile widget               | Pending                               | Client controls hostnames/keys; deployed challenge tested                  | Pending |
| GA4 / Clarity                  | Pending scope/integration             | Client access and data collection/privacy verified, or limitation accepted | Pending |
| YouTube channel                | Only if client-owned uploads are used | Ownership/embedding rights confirmed; otherwise supplied links only        | Pending |
| Secret/recovery-code storage   | Private client-controlled location    | Client retrieves securely; no values in this record                        | Pending |
| Support contact / end date     | Pending agreement                     | Responsibilities and support duration understood                           | Pending |

Rotate/recreate credentials in the final accounts, verify the website, then revoke
old keys and remove temporary student access. Record completion dates, not secret values.

## 4. Client feedback and acceptance

- **Decision:** accepted / approved and signed off by the client on **15 October 2026**.
- **Client representative:** Vibs Agrawal, BITDOT Consulting Services Pty Ltd.
- **Evidence:** [`client-signoff-2026-10-15.png`](client-signoff-2026-10-15.png).
- **Recorded client feedback:** the final group report records the completed project as **“a great outcome”** and records formal approval/sign-off.
- **Operational boundary:** production account transfer, final live CMS/booking/email checks, ongoing maintainer confirmation and support arrangements remain separate handover items where applicable.
- **Acceptance-test boundary:** the sign-off evidence confirms client acceptance of the project outcome; it does not establish that every A01–A17 operational test above was personally executed by the client.

This distinction is intentional so that the repository reflects both the positive
client decision and the remaining production/handover evidence accurately, without
turning unverified operational steps into claimed passes.
