# Cal.com Client Configuration and Operations

The website opens Cal.com inline or externally. Cal.com manages booking availability,
attendee details and its notifications; the website does not run a scheduling backend.
Record the final profile and account owner in the [handover index](README.md).

## 1. Create the client-owned account

Sign up at [Cal.com](https://cal.com/signup) using a client-controlled email/login.
Verify the address and choose an available username. The public profile is
`https://cal.com/<username>`; `bitdot` is an example, not a guaranteed username.

The Individual plan is the proposed starting point for one organiser. Multiple
organisers, shared scheduling, custom reminders or workflow features need a separate
plan/feature check. Do not assume a reminder option is included simply because basic
booking works. Check [current Cal.com plans](https://cal.com/pricing) and the actual
account before enabling paid features; record the chosen plan and billing owner.

## 2. Connect the calendar

1. Open the dashboard's calendar settings and connect the client's chosen calendar.
2. Authorise the provider using the client's account, not a student account.
3. Select all calendars to check for conflicts and the calendar that receives bookings.
4. Verify an existing busy appointment is unavailable on the public booking page.

Workplace accounts may require administrator approval. Record any restriction before
promising automated meeting links. Cal.com's [scheduling FAQ](https://cal.com/scheduling/frequently-asked-questions)
explains event, calendar and availability settings.

## 3. Configure the five event types

In **Event Types**, create/edit and save each entry. Make it available for booking.
These slugs match `src/features/booking/config.ts`:

| Title                  | Exact URL slug           | Current website duration |
| ---------------------- | ------------------------ | ------------------------ |
| Career Coaching        | `career-coaching`        | 45 minutes               |
| Discovery Call         | `discovery-call`         | 30 minutes               |
| Executive Consultation | `executive-consultation` | 60 minutes               |
| Training Discussion    | `training-discussion`    | 45 minutes               |
| Workshop Enquiry       | `workshop-enquiry`       | 45 minutes               |

Confirm durations and descriptions with the client; if they change, update website
card text too. Do not change slugs without updating the website mapping. Event settings
should not request payments or unnecessary sensitive details for this MVP.

Choose a supported meeting location for each event. Cal Video is an option; other
conferencing tools may require installing an app and a suitable provider account.
Test the generated invitation/link rather than assuming a connected calendar also
enables video conferencing.
[Cal.com location instructions](https://cal.com/help/event-types/how-to-add-location).

## 4. Set availability

Open **Availability** and set the actual working hours, time zone and date overrides.
Attach the correct schedule to each event. Agree buffers, minimum notice and booking
window with the client; these are business choices, not fixed project requirements.
Check the time shown for a test attendee in another Australian time zone.

## 5. Connect the website

The deployment administrator sets:

```dotenv
NEXT_PUBLIC_CALCOM_URL=https://cal.com/<actual-client-username>
```

Save it in the correct hosting environment and redeploy. Test `/booking` and every
event card. This updates components using that setting; old static buttons are not
automatically rewired. Final navigation is checked separately.

No Cal.com API key, webhook, custom database or paid booking SDK is used by this
integration. Optional URL prefill is supported by code but is not an automatic
Assessment/Contact data transfer. Avoid placing real names/emails in shared URLs.

## 6. Daily use

Use **Bookings** to review upcoming appointments and available reschedule/cancel
actions. Use **Availability** for leave and schedule changes. Keep calendar and
conferencing authorisation current. Check your account's notification settings.

Before handover, book with a consenting test attendee and confirm the actual organiser
and attendee emails, calendar entry, time zone and meeting link. Reschedule and cancel,
then confirm both notification and calendar updates. If reminders are required, test
the specific reminder feature on the chosen plan. Clean up the test appointment.

## 7. Troubleshooting

| Problem                            | Check                                                                                |
| ---------------------------------- | ------------------------------------------------------------------------------------ |
| No available slots                 | Event visibility, assigned schedule, time zone, notice/window and calendar conflicts |
| Wrong event / 404                  | Username and exact event slug                                                        |
| Missing invitation or meeting link | Calendar/conferencing authorisation, location, notifications and email spam folder   |
| Embedded page fails                | Use **Open directly on Cal.com**                                                     |
| Changed account URL not reflected  | Correct hosting environment and successful redeployment                              |

Record actual outcomes in the [acceptance record](acceptance-and-handover.md).
No checkbox in this guide constitutes a completed test or client acceptance.
