import type { PathwayId } from "@/features/assessment/types";

import type { AppointmentTypeId } from "./types";

/**
 * Links into /booking with an appointment type preselected, so a CTA opens
 * the Cal.com event that matches where the visitor is (spec §1.3: "each CTA
 * opens the correct appointment type"). Generic CTAs such as the header's
 * "Book a session" still use plain /booking so people can choose.
 */
export function bookingHref(type?: AppointmentTypeId): string {
  return type ? `/booking?type=${type}` : "/booking";
}

/** Which appointment type fits each of the four audience pathways. */
export const pathwayAppointmentTypes = {
  career: "career-coaching",
  learn: "training-discussion",
  govern: "executive-consultation",
  risk: "workshop-enquiry",
} as const satisfies Record<PathwayId, AppointmentTypeId>;

/** The booking button label shown for each pathway. */
export const pathwayBookingLabels = {
  career: "Book a career coaching session",
  learn: "Book a training discussion",
  govern: "Book an executive consultation",
  risk: "Book a workshop enquiry",
} as const satisfies Record<PathwayId, string>;
