import type { Metadata } from "next";

import { Container } from "@/components/ui/container";
import {
  assessmentLevels,
  assessmentQuestions,
} from "@/features/assessment/config";

export const metadata: Metadata = { title: "AI Readiness Assessment" };

export default function AssessmentPage() {
  const isConfigured = assessmentQuestions.length > 0;

  return (
    <>
      <header className="page-header">
        <Container>
          <p className="eyebrow">AI Readiness Assessment</p>
          <h1>Understand your current AI readiness.</h1>
          <p className="lead">
            The assessment will map responses to one of four levels and
            recommend relevant BITDOT services.
          </p>
        </Container>
      </header>
      <section className="section">
        <Container className="prose">
          <h2>Result levels</h2>
          <ul>
            {Object.values(assessmentLevels).map((level) => (
              <li key={level}>{level}</li>
            ))}
          </ul>
          {!isConfigured ? (
            <p className="notice">
              Client-approved questions, score boundaries and recommendation
              mappings must be added before this journey is enabled.
            </p>
          ) : null}
        </Container>
      </section>
    </>
  );
}
