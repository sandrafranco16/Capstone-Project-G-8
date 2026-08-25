import type { Metadata } from "next";

import { LegacyDemoPage } from "@/components/legacy/legacy-demo-page";

export const metadata: Metadata = {
  title: {
    absolute: "Services — AI Career, Training, Governance & Crisis Simulation | BITDOT",
  },
  description:
    "BITDOT's four service areas in depth: AI career coaching, applied AI & automation training, AI governance for executives and boards, and AI crisis simulation.",
};

export default function ServicesPage() {
  return <LegacyDemoPage file="services.html" />;
}
