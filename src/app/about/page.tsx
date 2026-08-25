import type { Metadata } from "next";

import { LegacyDemoPage } from "@/components/legacy/legacy-demo-page";

export const metadata: Metadata = {
  title: { absolute: "About BITDOT — Mission, the Mark & the Founders" },
  description:
    "BITDOT Consulting Services brings world-class AI, data and governance expertise within everyone's reach. Meet founders Hemna Goyal and Vibs Agrawal — and the thinking behind the mark.",
};

export default function AboutPage() {
  return <LegacyDemoPage file="about.html" />;
}
