import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Container } from "@/components/ui/container";
import { LeadershipSection } from "@/features/home/leadership-section";
import { TestimonialsSection } from "@/features/home/testimonials-section";

export const metadata: Metadata = {
  title: "Leadership and testimonials preview",
  robots: { index: false, follow: false },
};

export default function LeadershipPreviewPage() {
  if (process.env.NODE_ENV !== "development") notFound();

  return (
    <>
      <Container>
        <h1>Leadership and testimonials preview</h1>
        <p>BIT-33 · Homepage leadership and testimonials sections</p>
      </Container>
      <LeadershipSection />
      <TestimonialsSection />
    </>
  );
}
