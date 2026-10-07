import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/ui/container";
import { AssessmentJourney } from "@/features/assessment/assessment-journey";
import { isPathwayId } from "@/features/assessment/pathways";

import styles from "./assessment-page.module.css";

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
    <div className={styles.page}>
      <header className={styles.hero}>
        <Container className={styles.heroInner}>
          <p className={styles.eyebrow}>AI Readiness Assessment</p>

          <h1 className={styles.title}>
            Find your next step <span>with AI.</span>
          </h1>

          <p className={styles.lead}>
            Choose a pathway, answer five focused questions and get a clearer
            next step based on where you are today. Free, with no sign-up.
          </p>

          <div className={styles.steps} aria-label="How the assessment works">
            <span className={styles.step}>
              <strong>1.</strong> Choose your pathway
            </span>
            <span className={styles.step}>
              <strong>2.</strong> Answer five questions
            </span>
            <span className={styles.step}>
              <strong>3.</strong> Get your next step
            </span>
          </div>
        </Container>
      </header>

      <section
        className={styles.assessmentSection}
        aria-label="Readiness assessment"
      >
        <Container>
          <noscript>
            <p className="notice">
              Enable JavaScript to answer the assessment, or{" "}
              <Link href="/services">explore BITDOT services</Link> directly.
            </p>
          </noscript>

          <AssessmentJourney
            key={initialPathway ?? "choose"}
            initialPathway={initialPathway}
          />
        </Container>
      </section>
    </div>
  );
}
