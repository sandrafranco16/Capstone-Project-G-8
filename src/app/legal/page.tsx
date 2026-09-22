import type { Metadata } from "next";

import { LegacyDemoPage } from "@/components/legacy/legacy-demo-page";

export const metadata: Metadata = {
  title: {
    absolute: "Privacy, Terms & Disclaimer — BITDOT Consulting Services",
  },
  description:
    "BITDOT Consulting Services privacy policy, terms of use, disclaimer and accessibility statement.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function LegalPage() {
  return <LegacyDemoPage file="legal.html" />;
}
