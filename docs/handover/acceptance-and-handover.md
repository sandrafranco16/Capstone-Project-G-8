# Acceptance Tests and Handover Record

Status: **not yet signed off**. Complete on the final deployed release with the
client's actual roles. A checklist describes a test; only a dated result with evidence
supports a pass. Use synthetic content and consenting test addresses. Redact secrets,
personal details and calendar information from shared evidence.

## 1. Test context

| Field                                        | Record                           |
| -------------------------------------------- | -------------------------------- |
| Date, tester and client representative       | Pending                          |
| Website URL, provider and deployment URL     | Pending                          |
| Exact release SHA/tag                        | Pending                          |
| Device/browser and viewport                  | Pending                          |
| Publishing account role and applicable rules | Pending; do not record passwords |
| Booking profile/event owner and test inbox   | Pending; redact private details  |

## 2. Acceptance tests

All rows below are **Pending**, not a record of tests already completed.

| ID  | Task and expected outcome                                                                                                                          | Result / evidence / owner                              |
| --- | -------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------ |
| A01 | A new team member follows README: installs, starts site and local CMS without undocumented steps                                                   | Pending; team tester                                   |
| A02 | From homepage/navigation, reach services, assessment, blog, booking and Contact; no placeholder or Microsoft Bookings path for Cal.com             | Pending; frontend                                      |
| A03 | Complete each of four assessment pathways; next/back/restart work; results link to relevant services and the agreed contact path                   | Pending; frontend/client                               |
| A04 | Client signs into `/admin/`, saves a draft, edits it, and publishes under the agreed review policy; article appears after deployment               | Pending; backend/client                                |
| A05 | Same client account uploads media and publishes an article containing it; public image loads and other contributors still follow code review rules | Pending; backend/client                                |
| A06 | Article YouTube link renders an approved playable video; invalid/non-embeddable links are handled understandably                                   | Pending; backend/client                                |
| A07 | All five appointment cards reach their correct Cal.com event, with correct owner/duration; external fallback works                                 | Pending; backend/client                                |
| A08 | With a consenting test attendee, book once; confirmation, calendar entry, time zone and meeting link are correct; a busy slot is unavailable       | Pending; backend/client                                |
| A09 | Reschedule and cancel the test appointment; attendee/organiser notifications and calendar updates are correct                                      | Pending; client                                        |
| A10 | Submit Contact with consent; enquiry reaches the agreed inbox; Reply uses the visitor address; no separate assessment email is sent                | Pending; backend/client                                |
| A11 | Invalid fields/no consent show understandable errors; failed submission preserves inputs; retry and Send another message obtain fresh verification | Pending; backend/frontend                              |
| A12 | Non-production production-build test: missing secret gives 503; missing/invalid token gives 400; no real email is sent                             | Pending; backend; never remove live keys for this test |
| A13 | Keyboard, mobile menu, focus and readable error states work; agreed desktop/mobile browsers show no blocking layout defects                        | Pending; frontend/UI                                   |
| A14 | Metadata, sitemap, canonical URL and social preview are checked; analytics and privacy behaviour meet the agreed scope                             | Pending; frontend/client                               |
| A15 | Authorised content publication triggers a successful deployment; maintainer identifies and recovers a failed release in staging                    | Pending; backend/maintainer                            |
| A16 | Client completes the user-guide exercise without the team performing the steps for them; unclear instructions are corrected                        | Pending; client/PM                                     |
| A17 | Client approves service/bio/testimonial/legal content and all visible links; demo articles are removed or explicitly accepted                      | Pending; client/PM                                     |

For each run record: ID, actual actions, actual result, date, release SHA, screenshot/
recording or build link, defects and retest result. Attach evidence under
`docs/handover/evidence/` or link to an accessible approved project location. Do not
publish client emails or recovery codes in a public repository.

## 3. Account and resource transfer

Use **Pending**, **Verified**, or **Not required (with reason)**. A shared password
is not evidence of sustainable client ownership.

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

- Features the client personally tried: **Pending**.
- Feedback in the client's own words, with meeting/email evidence: **Pending**.
- Defects raised, action owner/date and retest evidence: **Pending**.
- Remaining limitations explicitly accepted (with evidence): **Pending**.
- Decision: **Pending / accepted / accepted with agreed limitations / not accepted**.
- Client confirmation date and evidence link: **Pending**.

Ask: Can you publish content and manage bookings independently? Did enquiries reach
the correct inbox? Is anything preventing use? What should we improve in the handover?
Request honest feedback, not a particular rating. A team-authored statement that the
client is satisfied is not a substitute for client confirmation.
