# BITDOT Handover Pack

Prepared: 7 October 2026. Updated: **15 October 2026**.

Status: **client approval and sign-off received; production ownership transfer and live operational checks remain pending where applicable**.

The client acceptance proof is stored at
[`client-signoff-2026-10-15.png`](client-signoff-2026-10-15.png). This confirms project
approval, but it does not by itself prove completion of the separate production account,
CMS publishing, booking, email-delivery or ownership-transfer checks below.

## Start here

| Reader                                                                  | Guide                                                                                  |
| ----------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| Client: publish articles, manage bookings and respond to enquiries      | [Client user guide](client-user-guide.md)                                              |
| Client and technical administrator: create or transfer service accounts | [Platform account setup](platform-account-setup.md)                                    |
| Client: configure booking availability and events                       | [Cal.com guide](calcom-client-guide.md)                                                |
| Client and PM: approve recurring service costs                          | [Hosting and service costs](hosting-and-service-costs.md)                              |
| Future maintainer: deploy, troubleshoot, back up and restore            | [Deployment and maintenance](deployment-and-maintenance.md)                            |
| Team and client: review acceptance and remaining handover checks        | [Acceptance and handover](acceptance-and-handover.md)                                  |
| Marker: run and check the project                                       | [Repository README](../../README.md) and [verification record](verification-record.md) |

Also read [known issues](known-issues.md) and [AI use and review](ai-use-and-review.md).
The [delivery summary](delivery-summary.md) maps planned scope to implementation and release checks.

## Release and handover status

The tested application release referenced by the final report is
`cc32b381d35d4791df0e5525380de33152b1cfac`. CI run #120 completed successfully on
that SHA. The later `main` commit `a20077cb4867b07f10894d90aa2d0b41697f35da`
adds the client acceptance proof and does not replace the tested-release evidence.

| Item                                           | Value / status                                                                                                       |
| ---------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| Current repository                             | [sandrafranco16/Capstone-Project-G-8](https://github.com/sandrafranco16/Capstone-Project-G-8)                        |
| Intended production branch                     | `main`; confirm against hosting settings                                                                             |
| Tested application release                     | `cc32b381d35d4791df0e5525380de33152b1cfac`                                                                           |
| Client acceptance evidence                     | [15 October 2026 sign-off](client-signoff-2026-10-15.png)                                                            |
| Current `main` after acceptance evidence       | `a20077cb4867b07f10894d90aa2d0b41697f35da`                                                                           |
| Review hosting                                 | Netlify review deployment recorded for the submission build                                                          |
| Intended production hosting                    | Vercel retained; final client-owned production project and recurring-cost approval remain operational handover items |
| Public website / CMS                           | Production ownership and final live checks pending; CMS route is `<website origin>/admin/`                           |
| Cal.com profile / event owner                  | Pending client-owned account confirmation and live booking verification                                              |
| Sending domain / From / receiving inbox        | Pending client approval/ownership confirmation and live email test                                                   |
| Technical support contact and support end date | Pending agreement; no indefinite student maintenance is promised                                                     |

The guides describe configuration procedures, not proof of completed production
configuration. No passwords, recovery codes, API secrets or attendee details belong
in this pack. Store those in a client-controlled password manager and the hosting
secret settings.

## Recommended remaining handover checks

1. Confirm final production hosting, release details, account owners and accepted limitations.
2. Let the client log in and publish a test article with an image and YouTube link using the real client role.
3. Let the client review a booking, change availability, and complete a consenting test booking.
4. Confirm a live enquiry reaches the agreed inbox and that reply behaviour is correct.
5. Record account transfers, maintainer/support responsibilities and any outstanding production limitations.

This pack supports the final report; it does not replace the report's concise MVP
summary, whole-site quality evidence or the client's own assessment of delivery.
