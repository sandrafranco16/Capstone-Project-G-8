# Cal.com Booking Integration

## 1. Overview & Architectural Decision

This module integrates external and embedded consultation booking using [Cal.com](https://cal.com). It allows users to browse 5 appointment types, book directly inline via a sandboxed iframe or externally in a new tab, and automatically pre-fills user details from assessment and contact flows.

### Transition from Microsoft Bookings to Cal.com
The project initially planned to use **Microsoft Bookings**. Following client requirements for a flexible and low-cost solution, the team transitioned to **Cal.com Hosted Booking**. This decision is documented and traceable in the **D1 Project Proposal / Assignment Deliverable**.

### Key Advantages
- **Zero PII Persistence**: User booking details are processed directly by Cal.com. The platform stores no personal booking data, ensuring privacy compliance without an application database.
- **Automated Scheduling**: Calendar synchronization (Google, Outlook, Apple), timezone conversions, and conflict handling are managed natively by Cal.com.
- **Decoupled Architecture**: Provider logic is isolated in `src/features/booking`. If scheduling tools change, site pages remain unaffected.

> [!NOTE]
> The current UI components (`src/components/booking/*` and `/booking/page.tsx`) are **functional prototypes** built for testing data flow and parameter pre-filling. The front-end team will refine the final visual styling and site-wide placement.

---

## 2. Business Logic & Appointment Mapping

The platform defines 5 distinct appointment categories aligned with customer pathways and AI Readiness Assessment results:

| Type ID / Slug | Title | Duration | Target Audience | Pathway | Assessment Tier |
| :--- | :--- | :---: | :--- | :--- | :--- |
| `career-coaching` | Career Coaching | 45 min | Students & AI Professionals | `launch-ai-career` | Practitioner, Explorer |
| `discovery-call` | Discovery Call | 30 min | General & Business Leads *(Default)* | - | Beginner |
| `executive-consultation` | Executive Consultation | 60 min | C-Suite & Board Members | `govern-ai-responsibly` | Leader |
| `training-discussion` | Training Discussion | 45 min | Corporate Learning & HR Leads | `learn-ai-automation` | Practitioner, Leader |
| `workshop-enquiry` | Workshop Enquiry | 45 min | Risk & IT Operations Leads | `prepare-ai-risks` | Practitioner, Leader |

### Data Pre-fill Flow
When users complete an assessment or pathway step, the site directs them to:
```text
/booking?type=career-coaching&name=Jane+Doe&email=jane@example.com&notes=Assessment+Tier:+Practitioner
```
- `/booking` parses query parameters and displays a confirmation banner.
- The matching appointment card is automatically highlighted and selected.
- Parameters are safely encoded and passed into Cal.com form fields.

---

## 3. Implementation Architecture

```text
src/
├── features/booking/               # Domain logic & configuration
│   ├── types.ts                    # Domain models (AppointmentTypeConfig, CalBookingOptions)
│   ├── config.ts                   # Central configuration & appointment definitions
│   ├── utils.ts                    # buildCalComUrl, validateCalComUrl, getAppointmentType
│   ├── utils.test.ts               # Tests for URL generation, escaping & validation
│   └── booking-ui.test.ts          # Tests for configuration integrity
├── components/booking/             # Prototype UI components
│   ├── AppointmentCard.tsx         # Card with duration, recommendation tag & dual CTAs
│   ├── AppointmentList.tsx         # Grid managing active inline embed state
│   └── CalEmbed.tsx                # Sandboxed iframe with spinner & failover link
└── app/booking/page.tsx            # Server route handling async searchParams
```

### Key Utilities (`src/features/booking/utils.ts`)
- **`buildCalComUrl(typeId, options)`**: Resolves target slug (falls back to `discovery-call`) and securely percent-encodes pre-fill parameters (`name`, `email`, `notes`, `theme`, `layout`).
- **`validateCalComUrl(rawUrl)`**: Enforces `https:` (permits `http:` in development only). Disallows `javascript:` or malformed inputs, returning safe fallback base URL.
- **`getAppointmentType(idOrSlug)`**: Case-insensitive and whitespace-trimmed lookup for appointment configurations.

---

## 4. Front-end Integration Guide

### 4.1 Using Booking Utilities
```typescript
import { buildCalComUrl, getAppointmentType } from "@/features/booking/utils";
import { bookingConfig } from "@/features/booking/config";

// Generate booking URL with pre-filled details
const url = buildCalComUrl("executive-consultation", {
  name: "Jane Doe",
  email: "jane@example.com",
  notes: "Governance consultation",
});

// Access all appointment types
const allTypes = bookingConfig.appointmentTypes;
```

### 4.2 Linking from Other Pages
```tsx
import Link from "next/link";

// 1. From Pathway card or Service page
<Link href="/booking?type=career-coaching">
  Book Career Coaching
</Link>

// 2. From AI Readiness Assessment completion
<Link href={`/booking?type=${type}&name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}&notes=${encodeURIComponent(tier)}`}>
  Book Recommended Consultation
</Link>
```

### 4.3 Custom Embeds & Required Iframe Constraints
If embedding the scheduler inside a custom container or modal:
```tsx
<CalEmbed 
  url={buildCalComUrl("discovery-call")}
  title="Discovery Call"
  height="600px"
  onClose={() => setOpen(false)}
/>
```
**Mandatory Security & UX Constraints:**
1. **Sandbox**: `sandbox="allow-scripts allow-same-origin allow-forms allow-popups"`
2. **Permissions**: `allow="camera; microphone; autoplay; clipboard-write; encrypted-media"`
3. **Loading State**: Provide a spinner/skeleton before iframe load to avoid layout shift.
4. **Fallback Link**: Always include a direct `<a href={url} target="_blank" rel="noopener noreferrer">` link for users with ad-blockers or third-party cookie restrictions.

---

## 5. Testing & Verification

### 5.1 Automated Tests
```bash
# Run booking test suite (11 unit tests)
pnpm test src/features/booking

# Run full project tests and TypeScript check
pnpm test
pnpm typecheck
pnpm build
```

**Test Coverage Summary:**
- `utils.test.ts` (9 tests): Validates ID resolution, case-insensitivity, XSS/unsafe protocol blocking, query parameter serialization, and special character encoding (`&`, `+`, `'`, `>`).
- `booking-ui.test.ts` (2 tests): Verifies all 5 appointment types exist, contain required fields with positive durations, and have unique IDs and slugs.

### 5.2 Manual Verification Checklist
- [ ] **Default View**: Visit `/booking` -> 5 cards display, no embed expanded, no pre-fill banner.
- [ ] **Inline Embed**: Click "Book Online" -> Card highlights, loading spinner displays, Cal.com scheduler mounts inside iframe. Click again or "Close ✕" to unmount.
- [ ] **External Booking**: Click "External ↗" -> Opens direct Cal.com link in a new tab with `rel="noopener noreferrer"`.
- [ ] **Pre-fill Parameter Flow**: Visit `/booking?type=career-coaching&name=Jane+Doe&email=jane@example.com&notes=AI+Readiness` -> Confirmation banner displays, card is pre-selected, and form values are passed to Cal.com.
- [ ] **Invalid Slug Fallback**: Visit `/booking?type=unknown` -> Gracefully loads page without errors and defaults to `discovery-call`.
