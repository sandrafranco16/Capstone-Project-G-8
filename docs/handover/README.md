# BITDOT Handover Pack

Prepared: 7 October 2026. Status: **review draft; live acceptance and ownership transfer pending**.

## Start here

| Reader                                                                  | Guide                                                                                  |
| ----------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| Client: publish articles, manage bookings and respond to enquiries      | [Client user guide](client-user-guide.md)                                              |
| Client and technical administrator: create or transfer service accounts | [Platform account setup](platform-account-setup.md)                                    |
| Client: configure booking availability and events                       | [Cal.com guide](calcom-client-guide.md)                                                |
| Client and PM: approve recurring service costs                          | [Hosting and service costs](hosting-and-service-costs.md)                              |
| Future maintainer: deploy, troubleshoot, back up and restore            | [Deployment and maintenance](deployment-and-maintenance.md)                            |
| Team and client: test and accept delivery                               | [Acceptance and handover](acceptance-and-handover.md)                                  |
| Marker: run and check the project                                       | [Repository README](../../README.md) and [verification record](verification-record.md) |

Also read [AI use and review](ai-use-and-review.md).
The [delivery summary](delivery-summary.md) maps planned scope to implementation and release checks.
Track actionable defects in [GitHub Issues](https://github.com/sandrafranco16/Capstone-Project-G-8/issues)
or the team's Jira board; record acceptance outcomes and client-agreed limitations in
the [acceptance record](acceptance-and-handover.md).

## Release details — complete before delivery

| Item                                           | Value / status                                                                                |
| ---------------------------------------------- | --------------------------------------------------------------------------------------------- |
| Current repository                             | [sandrafranco16/Capstone-Project-G-8](https://github.com/sandrafranco16/Capstone-Project-G-8) |
| Intended production branch                     | `main`; confirm against hosting settings                                                      |
| Final release commit / tag                     | Pending; record exact SHA and approved tag                                                    |
| Client-review demo URL / SHA / deployment date | [Netlify review demo](https://bitdot-review.netlify.app); deployed SHA/date to be recorded    |
| Final hosting provider / project URL           | Vercel retained; Pro proposed for commercial launch. Client-owned project URL pending         |
| Public website / CMS                           | Pending; CMS is `<website origin>/admin/`                                                     |
| Cal.com profile / event owner                  | Pending client-owned account confirmation                                                     |
| Sending domain / From / receiving inbox        | Pending client approval and live email test                                                   |
| Technical support contact and support end date | Pending agreement; no indefinite student maintenance is promised                              |

Netlify is used only to let the client review the current demo. Vercel remains the
final hosting plan. Production launch awaits BITDOT's selection between the two
independently developed group versions and approval of recurring hosting costs.
Record the deployed version for each environment and any functional differences.

The guides describe configuration procedures, not proof of completed configuration.
No passwords, recovery codes, API secrets or attendee details belong in this pack.
Store those in a client-controlled password manager and the hosting secret settings.

## Recommended handover session

1. Confirm release details, account owners and any accepted limitations.
2. Let the client log in and publish a test article with an image and YouTube link.
3. Let the client review a booking, change availability, and reply to a test enquiry.
4. Let the maintainer show deployment status and a safe content recovery example.
5. Save feedback, agreed actions and acceptance evidence in the handover record.

This pack supports the final report; it does not replace the report's concise MVP
summary, whole-site quality evidence or the client's own assessment of delivery.
