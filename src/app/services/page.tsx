import type { Metadata } from "next";

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
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
      {/* This reference font is intentionally scoped to the Services design. */}
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
        precedence="services-font"
      />
      <ServicesFrame>
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
    </>
  );
}
