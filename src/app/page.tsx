import type { Metadata } from "next";

import { LegacyDemoPage } from "@/components/legacy/legacy-demo-page";

export const metadata: Metadata = {
  title: {
    absolute:
      "BITDOT — AI Career Coaching, Automation Training & Governance Advisory",
  },
  description:
    "BITDOT helps professionals, AI engineers and leaders succeed with AI — career coaching, Copilot & Claude training, board-level AI governance and crisis simulation.",
};

export default function HomePage() {
  return <LegacyDemoPage file="index.html" />;
}
