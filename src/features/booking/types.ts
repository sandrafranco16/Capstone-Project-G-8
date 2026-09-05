export type AppointmentTypeId =
  | "career-coaching"
  | "discovery-call"
  | "executive-consultation"
  | "training-discussion"
  | "workshop-enquiry";

export interface AppointmentTypeConfig {
  id: AppointmentTypeId;
  title: string;
  description: string;
  durationMinutes: number;
  targetAudience: string;
  slug: string;
  pathwayId?: string;
  recommendedFor?: string[];
}

export interface CalBookingOptions {
  name?: string;
  email?: string;
  notes?: string;
  theme?: "light" | "dark" | "auto";
  layout?: "month_view" | "week_view" | "column_view";
  hideEventTypeDetails?: boolean;
}

export interface BookingConfig {
  provider: string;
  baseUrl: string;
  defaultSlug: string;
  appointmentTypes: AppointmentTypeConfig[];
}
