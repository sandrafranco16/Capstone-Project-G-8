export const bookingConfig = {
  provider: "Cal.com Hosted Booking",
  url: process.env.NEXT_PUBLIC_CALCOM_URL ?? "",
  appointmentTypes: [
    "Career Coaching",
    "Discovery Call",
    "Executive Consultation",
    "Training Discussion",
    "Workshop Enquiry",
  ],
} as const;
