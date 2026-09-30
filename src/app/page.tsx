import type { Metadata } from "next";

import { GovernanceSection } from "@/features/home/governance-section";
import { LeadershipSection } from "@/features/home/leadership-section";
import { TestimonialsSection } from "@/features/home/testimonials-section";

export const metadata: Metadata = {
  title: {
    absolute:
      "BITDOT — AI Career Coaching, Automation Training & Governance Advisory",
  },
  description:
    "BITDOT helps professionals, AI engineers and leaders succeed with AI — career coaching, Copilot & Claude training, board-level AI governance and crisis simulation.",
};

// Only migrated sections render here; the remaining homepage sections are
// added as their tickets land, in the order of the approved demo.
export default function HomePage() {
  return (
    <>
      <GovernanceSection enquiryHref="/contact" />
      <LeadershipSection />
      <TestimonialsSection />
    </>
  );
}
