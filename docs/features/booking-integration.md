# BITDOT Cal.com Consultation Booking Integration

## Overview

This module provides external and embedded consultation booking functionality for the BITDOT Marketing & Training Platform using [Cal.com](https://cal.com). 

It allows prospective clients, students, executives, and organizations to select from 5 specialized appointment categories, view scheduling availability inline via an embedded widget or external redirection, and pre-fill user details (such as name, email, and assessment notes) when navigating from the AI Readiness Assessment or Contact pages.

---

## Technical Architecture & Personal Attribution

- **Primary Developer & Solution Architect**: Junlong Huang (Back-end Developer / Solution Architect)
- **Module Path**: `src/features/booking` and `src/components/booking`

### Key Components

| Path | Description |
| :--- | :--- |
| `src/features/booking/types.ts` | Strongly typed appointment domain model and options schema. |
| `src/features/booking/config.ts` | Central configuration defining 5 supported appointment types, slugs, and env fallbacks. |
| `src/features/booking/utils.ts` | Cal.com URL generator, query pre-filling logic, and XSS URL validator. |
| `src/components/booking/CalEmbed.tsx` | Client iframe embed widget with loading state, responsive container, and fallback link. |
| `src/components/booking/AppointmentCard.tsx` | Presentational card displaying duration, audience, recommended tier, and CTAs. |
| `src/components/booking/AppointmentList.tsx` | Grid list managing active embedding state and initial URL selection. |
| `src/app/booking/page.tsx` | Next.js App Router route handling URL query parameters (`type`, `email`, `name`, `notes`). |

---

## 5 Supported Appointment Types

1. **Career Coaching** (`career-coaching`, 45 mins)
   - *Target Audience*: Students, Graduates & AI Professionals.
   - *Pathway Mapping*: `launch-ai-career`
2. **Discovery Call** (`discovery-call`, 30 mins)
   - *Target Audience*: General Enquirers & Business Managers.
3. **Executive Consultation** (`executive-consultation`, 60 mins)
   - *Target Audience*: C-Suite, Executives & Board Members.
   - *Pathway Mapping*: `govern-ai-responsibly`
4. **Training Discussion** (`training-discussion`, 45 mins)
   - *Target Audience*: Corporate Learning & HR Leads.
   - *Pathway Mapping*: `learn-ai-automation`
5. **Workshop Enquiry** (`workshop-enquiry`, 45 mins)
   - *Target Audience*: Risk Management & IT Operations Leads.
   - *Pathway Mapping*: `prepare-ai-risks`

---

## Data Pre-filling & Security Considerations

### Safe Parameter Transport
When a user completes an AI Readiness Assessment (e.g. tier: `Practitioner`), the platform directs them to:
```text
/booking?type=career-coaching&name=Jane+Doe&email=jane%40example.com&notes=Assessment+Tier%3A+Practitioner
```

The `buildCalComUrl` utility parses and safely encodes these values into Cal.com search parameters:
- `name` -> pre-populates name field in Cal.com
- `email` -> pre-populates email field
- `notes` -> pre-populates notes/questions field for the consultant

### Security & Privacy Controls
- **No PII Persistence**: The BITDOT platform does NOT store user personal details or booking timestamps on server storage, reducing data protection risk.
- **XSS & Protocol Verification**: `validateCalComUrl()` verifies that destination URLs strictly enforce `http:` or `https:` protocols, preventing `javascript:` or malicious code injection attacks.
- **Accessibility & Sandboxing**: `CalEmbed` sets `title`, `aria-label="region"`, loading skeletons, and an accessible direct link fallback for screen readers and ad-blocker environments.

---

## Verification & Testing

### Automated Quality Checks
```bash
# Unit & domain test suite
CI=true pnpm test --run

# TypeScript static analysis
CI=true pnpm typecheck

# Production build verification
CI=true pnpm build
```

### Test Coverage
- `src/features/booking/utils.test.ts`: Tests URL generation, default slugs, special character encoding, invalid URL fallback, and case-insensitive lookup.
- `src/features/booking/booking-ui.test.ts`: Tests appointment configuration integrity, unique IDs/slugs, and required properties.
