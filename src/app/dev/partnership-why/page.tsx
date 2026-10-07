import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PartnershipSection } from "@/features/home/partnership-section";
import { WhyBitdotSection } from "@/features/home/why-bitdot-section";

export const metadata: Metadata = {
  title: "Partnership and Why BITDOT preview",
  robots: { index: false, follow: false },
};

export default function PartnershipWhyPreviewPage() {
  if (process.env.NODE_ENV !== "development") notFound();

  return (
    <>
      <style>{`
        .site-header,
        .site-footer,
        .skip-link {
          display: none !important;
        }
      `}</style>

      <PartnershipSection />
      <WhyBitdotSection />
    </>
  );
}
