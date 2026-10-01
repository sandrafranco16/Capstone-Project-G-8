# Cal.com Client Operations & Configuration Guide

This guide explains how to set up, customize, and operate Cal.com for the BITDOT Marketing & Training Platform. It is written for platform administrators and requires no coding knowledge.

---

## 1. Quick Overview

The BITDOT website uses [Cal.com](https://cal.com) to provide online consultation scheduling. When visitors book a consultation on the website, Cal.com manages:

- Real-time availability checks against your personal or work calendar.
- Timezone conversions for international and interstate clients.
- Automated email invitations, calendar invites, and reminder notifications.
- Meeting links (e.g., Google Meet, Zoom, Microsoft Teams, or Cal Video).

---

## 2. Step-by-Step Account Setup

### Step 1: Create Your Cal.com Account

1. Go to [https://cal.com/signup](https://cal.com/signup) and create an account using your organization email.
2. Choose your organization username during onboarding (e.g., `bitdot`).
3. Your public booking profile URL will become:
   ```text
   https://cal.com/bitdot
   ```

---

### Step 2: Connect Your Calendar (Prevent Double-Booking)

Connecting your existing calendar ensures Cal.com automatically blocks times when you are busy.

1. In the Cal.com dashboard, navigate to **Settings → Calendars**.
2. Click **Add Calendar** and choose your provider:
   - **Google Calendar**
   - **Microsoft Outlook / Office 365**
   - **Apple Calendar**
3. Grant permission for Cal.com to access your calendar.
4. Set:
   - **Check for conflicts**: Select all calendars where you have personal or business appointments.
   - **Add to calendar**: Select the primary calendar where new client bookings should be inserted.

---

### Step 3: Create the 5 Required Appointment Types

> [!IMPORTANT]
> The website links directly to specific URLs. You **must** create these 5 event types and ensure their **URL Slugs** match the table below exactly.

In your Cal.com dashboard, navigate to **Event Types** and click **New**:

| Event Title                | URL Slug _(Must match exactly)_ | Duration | Description for Clients                                                        |
| :------------------------- | :------------------------------ | :------: | :----------------------------------------------------------------------------- |
| **Career Coaching**        | `career-coaching`               |  45 min  | 1-on-1 career guidance for AI practitioners, transitioners, and graduates.     |
| **Discovery Call**         | `discovery-call`                |  30 min  | Initial introductory call to explore alignment and advisory services.          |
| **Executive Consultation** | `executive-consultation`        |  60 min  | Strategic advice for executives and boards on AI governance frameworks.        |
| **Training Discussion**    | `training-discussion`           |  45 min  | Customized discussion to tailor corporate AI and automation training programs. |
| **Workshop Enquiry**       | `workshop-enquiry`              |  45 min  | Planning and scheduling hands-on AI risk and governance workshops.             |

For each event:

1. Click **New Event Type**.
2. Enter the **Title**, **Slug**, and **Duration**.
3. Toggle the event to **Active** so it accepts bookings.

---

### Step 4: Configure Meeting Locations (Video / Call)

You can choose how consultations are conducted for each appointment type.

1. Go to **Event Types**, select an event, and open the **Location** settings.
2. Select your preferred meeting tool from the dropdown:
   - **Cal Video** _(Default)_: Built-in browser video meeting. Requires no external accounts or paid licenses.
   - **Google Meet**: Automatically generates a Google Meet link attached to the Google Calendar invitation.
   - **Zoom**: Go to **Settings → Apps**, install the Zoom app, and select Zoom as the location.
   - **Microsoft Teams**: Go to **Settings → Apps**, install the Microsoft Teams app, and select Teams as the location.
   - **Phone Call**: Requires the client to enter their phone number during booking.
   - **Attendee Choice**: Allows the client to pick between video or phone call.
3. Click **Save**.

---

### Step 5: Set Availability & Working Hours

Control when clients are allowed to book appointments:

1. In the dashboard, navigate to **Availability**.
2. Set your default weekly working hours (e.g., Monday to Friday, 9:00 AM – 5:00 PM).
3. Ensure your **Timezone** is set correctly (e.g., `Australia/Perth` or `Australia/Sydney`).
4. In each Event Type under **Advanced Settings**:
   - **Buffer Time**: Add 10–15 minutes before or after meetings to prevent back-to-back fatigue.
   - **Minimum Notice**: Require at least 24 hours advance notice to avoid surprise same-day bookings.
   - **Booking Window**: Limit how far into the future clients can book (e.g., up to 30 or 60 days).

---

### Step 6: Connect Cal.com to the Live Website (Zero-Code Switch)

Once your Cal.com account and 5 event types are configured, connect them to the live website without writing any code:

1. Log into your **Vercel Dashboard** (or ask your deployment administrator).
2. Open the project and navigate to **Settings → Environment Variables**.
3. Locate or add the variable:
   - **Key**: `NEXT_PUBLIC_CALCOM_URL`
   - **Value**: `https://cal.com/bitdot` _(replace with your actual organization username)_
4. Click **Save** and trigger a **Redeploy**.
5. All buttons and interactive scheduling widgets across the entire website will immediately point to your live Cal.com account.

---

## 3. Daily Operations & Troubleshooting

### Viewing and Managing Bookings

- **Upcoming Meetings**: View all confirmed bookings under the **Bookings** tab in your Cal.com dashboard.
- **Rescheduling & Cancellations**:
  - Both you and the client receive an email confirmation containing secure "Reschedule" and "Cancel" buttons.
  - If a meeting is canceled or moved, your connected calendar updates automatically and frees the time slot.

### Verification Checklist before Handover

- [ ] Logged into Cal.com and verified email address.
- [ ] Primary Google / Outlook calendar is connected and conflict check is enabled.
- [ ] All 5 event types are created with exact matching slugs (`career-coaching`, `discovery-call`, `executive-consultation`, `training-discussion`, `workshop-enquiry`).
- [ ] Meeting location (Cal Video, Google Meet, Zoom, or Teams) is chosen for each event.
- [ ] `NEXT_PUBLIC_CALCOM_URL` is configured in production environment variables.
- [ ] Completed a test booking on the website to confirm calendar invitation and email delivery.
