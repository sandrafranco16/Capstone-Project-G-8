import type { Metadata } from "next";

import { Container } from "@/components/ui/container";
import { AssessmentJourney } from "@/features/assessment/assessment-journey";
import { isPathwayId } from "@/features/assessment/pathways";

export const metadata: Metadata = {
  title: "AI Readiness Assessment",
  description:
    "Explore your next step in AI careers, automation, governance or risk preparation with a five-question self-assessment.",
  robots: { index: false, follow: true },
};

export default async function AssessmentPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { path } = await searchParams;
  const initialPathway = isPathwayId(path) ? path : null;

  return (
    <>
      <header className="page-header">
        <Container>
          <p className="eyebrow">AI Readiness Assessment</p>
          <h1>Find your next step with AI.</h1>
          <p className="lead">
            Choose a pathway, reflect on five questions and explore relevant
            BITDOT services. Free, with no sign-up.
          </p>
        </Container>
      </header>
      <section className="section" aria-label="Readiness assessment">
        <Container>
          <AssessmentJourney
            key={initialPathway ?? "choose"}
            initialPathway={initialPathway}
          />
        </Container>
      </section>
    </>
  );
}
