import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { CTASection } from "@/features/services/components/cta-section";
import { FAQSection } from "@/features/services/components/faq-section";
import { ServiceSection } from "@/features/services/components/service-section";
import { ServicesHero } from "@/features/services/components/services-hero";
import { ServicesFrame } from "@/features/services/components/services-frame";
import {
  servicePractices,
  servicesCTA,
  servicesFAQ,
  servicesHero,
} from "@/features/services/services.content";

/** Self-hosted via next/font; scoped to the Services design through a CSS variable. */
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    absolute:
      "Services — Board Training, AI Governance, Training & Career Coaching | BITDOT",
  },
  description:
    "AI governance board training, applied AI and automation workshops, career coaching and risk readiness from BITDOT Consulting Services, Western Australia.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <ServicesFrame className={inter.variable}>
      <ServicesHero content={servicesHero} practices={servicePractices} />
      {servicePractices.map((practice, index) => (
        <ServiceSection
          key={practice.id}
          practice={practice}
          number={index + 1}
          tinted={index % 2 === 1}
        />
      ))}
      <FAQSection content={servicesFAQ} />
      <CTASection content={servicesCTA} />
    </ServicesFrame>
  );
}
