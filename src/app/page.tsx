import type { Metadata } from "next";

import { GovernanceSection } from "@/features/home/governance-section";
import { HomepagePathwaysSection } from "@/features/home/homepage-pathways-section";
import { LeadershipSection } from "@/features/home/leadership-section";
import { PartnershipSection } from "@/features/home/partnership-section";
import { ResourcesPreview } from "@/features/home/resources-preview";
import { TestimonialsSection } from "@/features/home/testimonials-section";
import { ToolsSection } from "@/features/home/tools-section";
import { WhyBitdotSection } from "@/features/home/why-bitdot-section";

export const metadata: Metadata = {
  title: {
    absolute:
      "BITDOT — AI Career Coaching, Automation Training & Governance Advisory",
  },
  description:
    "BITDOT helps professionals, AI engineers and leaders succeed with AI — career coaching, automation training, board-level AI governance and risk preparation.",
};

export default function HomePage() {
  return (
    <>
      <HomepagePathwaysSection />
      <GovernanceSection enquiryHref="/contact" />
      <PartnershipSection />
      <WhyBitdotSection />
      <ToolsSection />
      <ResourcesPreview />
      <LeadershipSection />
      <TestimonialsSection />
    </>
  );
}
