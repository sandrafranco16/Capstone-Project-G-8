import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Container } from "@/components/ui/container";
import { GovernanceSection } from "@/features/home/governance-section";

export const metadata: Metadata = {
  title: "Governance section preview",
  robots: { index: false, follow: false },
};

export default function GovernancePreviewPage() {
  if (process.env.NODE_ENV !== "development") notFound();

  return (
    <>
      <Container>
        <h1>Mastering AI Governance preview</h1>
        <p>BIT-28 · Homepage program section</p>
      </Container>
      <GovernanceSection />
    </>
  );
}
