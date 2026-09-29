import type { Metadata } from "next";

import { ResourcesContent } from "@/features/resources/resources-content";

import "@/features/resources/resources.css";

export const metadata: Metadata = {
  title: {
    absolute:
      "Resources — AI Governance Frameworks, Deadlines & Reading | BITDOT",
  },
  description:
    "A working reference for Australian leaders: the AI compliance dates that are already fixed, the frameworks that matter, and reading worth your time.",
};

export default function ResourcesPage() {
  return <ResourcesContent />;
}
