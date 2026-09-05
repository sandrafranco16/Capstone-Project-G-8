import type { BookingConfig } from "./types";

const defaultBaseUrl = process.env.NEXT_PUBLIC_CALCOM_URL || "https://cal.com/bitdot";

export const bookingConfig: BookingConfig & { url: string } = {
  provider: "Cal.com Hosted Booking",
  baseUrl: defaultBaseUrl,
  url: defaultBaseUrl,
  defaultSlug: "discovery-call",
  appointmentTypes: [
    {
      id: "career-coaching",
      title: "Career Coaching",
      description: "1-on-1 career guidance for AI practitioners, transitioners, and students looking to advance their AI governance or engineering career.",
      durationMinutes: 45,
      targetAudience: "Students, Graduates & AI Professionals",
      slug: "career-coaching",
      pathwayId: "launch-ai-career",
      recommendedFor: ["Practitioner", "Explorer"],
    },
    {
      id: "discovery-call",
      title: "Discovery Call",
      description: "Initial introductory call to explore how BITDOT's AI governance, training, and advisory services align with your needs.",
      durationMinutes: 30,
      targetAudience: "General Enquirers & Business Managers",
      slug: "discovery-call",
      recommendedFor: ["Beginner"],
    },
    {
      id: "executive-consultation",
      title: "Executive Consultation",
      description: "Strategic advice for executives and boards on AI governance frameworks, compliance, and responsible AI adoption.",
      durationMinutes: 60,
      targetAudience: "C-Suite, Executives & Board Members",
      slug: "executive-consultation",
      pathwayId: "govern-ai-responsibly",
      recommendedFor: ["Leader"],
    },
    {
      id: "training-discussion",
      title: "Training Discussion",
      description: "Customized discussion to tailor AI & automation training programs for corporate teams and organizations.",
      durationMinutes: 45,
      targetAudience: "Corporate Learning & HR Leads",
      slug: "training-discussion",
      pathwayId: "learn-ai-automation",
      recommendedFor: ["Practitioner", "Leader"],
    },
    {
      id: "workshop-enquiry",
      title: "Workshop Enquiry",
      description: "Planning and scheduling hands-on AI risk, governance, or technical workshops for your organization.",
      durationMinutes: 45,
      targetAudience: "Risk Management & IT Operations Leads",
      slug: "workshop-enquiry",
      pathwayId: "prepare-ai-risks",
      recommendedFor: ["Practitioner", "Leader"],
    },
  ],
};
