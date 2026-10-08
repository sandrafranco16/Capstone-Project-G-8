# Delivery Summary and Scope Traceability

Review snapshot: main `149020a`, 7 October 2026. This is a release-preparation
summary, not a statement that the entire MVP has passed client acceptance.
Planned scope is documented in [PROJECT_PLAN](../../PROJECT_PLAN.md). Final customer
changes must be supported by dated meeting/email evidence in the group report.

## System overview

Next.js serves public pages and server endpoints. Decap edits GitHub Markdown/media;
publishing triggers the configured Git deployment. Cal.com owns scheduling. Contact
validates enquiries, verifies Turnstile and calls Resend. No application database is
used. Assessment answers remain in browser memory. Third-party providers still process
account, booking, enquiry and visitor data.

| Planned deliverable                                    | Implemented scope / delivery check                                                                                                                 | Evidence                                                                      |
| ------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| Homepage, four pathways, services, About and resources | Routes and content exist; final entry-point/design/content consistency needs browser/client testing                                                | Source `src/app`, `src/features`; A02/A13/A17                                 |
| Blog + CMS + article video                             | Markdown articles, GitHub OAuth/editorial workflow, media and YouTube support; client permissions and live publishing/upload still need testing    | `src/features/blog`, `src/features/cms`; A04–A06                              |
| Four-pathway readiness assessment                      | Question flow, scoring and recommendations exist; direct enquiry journey remains an integration gate                                               | `src/features/assessment`; A03                                                |
| Contact email                                          | `/contact` and `/api/contact`, validation, Turnstile, mock/Resend adapters; real account/DNS/inbox delivery must be evidenced                      | `src/features/contact`, `src/features/email`; A10–A12                         |
| Booking                                                | Five mapped Cal.com types, inline/external links and optional URL parameters; client calendar and complete site navigation still need verification | `src/features/booking`; A07–A09                                               |
| Testimonials                                           | Latest main includes leadership/testimonial work; confirm approved copy and presentation with client                                               | [PR #33](https://github.com/sandrafranco16/Capstone-Project-G-8/pull/33); A17 |
| SEO / analytics                                        | Metadata, sitemap and robots exist. GA4/Clarity provider loading is not evidenced; social-preview work remains an open PR                          | A14; [known issues](known-issues.md)                                          |
| Deployment and handover                                | Runtime/configuration guides and local baseline checks supplied; final hosting, ownership and client acceptance pending                            | [Verification](verification-record.md), A15/A16 and transfer record           |

## Clarifications against the original plan

- The intended current enquiry flow is assessment → Contact form → BITDOT inbox,
  not a separate assessment email/report. Record the client's confirmation evidence;
  the original plan still describes assessment lead capture.
- Cal.com is the booking integration, not Microsoft Bookings; remaining static copy
  must be corrected at the frontend entry points.
- Vercel is retained. Approve the [commercial service budget](hosting-and-service-costs.md)
  and record the client-owned project, final URL and successful server-endpoint tests.
- Optional booking prefill parameters are a capability, not proof of automatic
  transfer from Assessment or Contact.

## Quality and limitations

The clean baseline passed lint, 151 tests, type checking, production build and HTTP
smoke checks. These do not prove browser usability, third-party configuration or
client acceptance. Refer to the [verification record](verification-record.md) for
conditions, including the local watcher workaround.

Use the [known-issue register](known-issues.md) for remaining integration/configuration
gates and [acceptance record](acceptance-and-handover.md) for actual customer results.
LMS, accounts, certificates, payments, custom video hosting and CRM remain outside
this MVP. Future work needs a new scope, data/security design and operating-cost review.
