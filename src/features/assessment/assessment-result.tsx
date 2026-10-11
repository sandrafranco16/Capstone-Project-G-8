import {
  bookingHref,
  pathwayAppointmentTypes,
  pathwayBookingLabels,
} from "@/features/booking/links";

import { assessmentLevels } from "./config";
import type { AssessmentPathway } from "./types";
import type { AssessmentAnswers, AssessmentResult as Result } from "./scoring";
import type { getRecommendations } from "./recommendations";
import type { AssessmentViewProps } from "./view-types";
import { siteConfig } from "@/lib/site-config";
import { CopyResult } from "./copy-result";
import styles from "./assessment-journey.module.css";

export function AssessmentResult({
  headingRef,
  onAction,
  pathway,
  result,
  recommendations,
  answers,
}: AssessmentViewProps & {
  pathway: AssessmentPathway;
  result: Result;
  recommendations: ReturnType<typeof getRecommendations>;
  answers: AssessmentAnswers;
}) {
  const summary = [
    "BITDOT AI readiness assessment",
    "Preview — questions and scoring are awaiting client confirmation.",
    `${pathway.label}: AI ${assessmentLevels[result.level]}`,
    `Your score: ${result.score} / ${result.maximumScore}`,
    recommendations.message,
    "A reflection on your answers, not a certification or compliance assessment.",
    `Your next step: ${recommendations.nextStep}`,
    "Relevant BITDOT services:",
    ...recommendations.services.map(
      (service) =>
        `${service.label}: ${new URL(service.href, siteConfig.url).href}`,
    ),
  ].join("\n\n");

  return (
    <section aria-labelledby="assessment-result-title" className={styles.panel}>
      <p className={styles.eyebrow}>{pathway.label} · Your result</p>
      <h2 id="assessment-result-title" ref={headingRef} tabIndex={-1}>
        AI {assessmentLevels[result.level]}
      </h2>
      <p>{recommendations.message}</p>
      <p className={styles.score}>
        Your score: {result.score} / {result.maximumScore}
      </p>
      <p className={styles.note}>
        A reflection on your answers, not a certification or compliance
        assessment. A high total can still include areas that need attention.
      </p>
      <h3>Your next step</h3>
      <p>{recommendations.nextStep}</p>
      <h3>Explore relevant BITDOT services</h3>
      <ul className={styles.recommendations}>
        {recommendations.services.map((service) => (
          <li key={service.href}>
            <a href={service.href}>
              {service.label} <span aria-hidden="true">→</span>
            </a>
          </li>
        ))}
      </ul>
      <p className={styles.bookingCta}>
        <a href={bookingHref(pathwayAppointmentTypes[pathway.id])}>
          {pathwayBookingLabels[pathway.id]}
          <span aria-hidden="true"> →</span>
        </a>
      </p>
      <CopyResult summary={summary} />
      <details className={styles.review}>
        <summary>Review your answers</summary>
        <p>Select a question to edit. Your other answers will be kept.</p>
        <ol>
          {pathway.questions.map((q) => (
            <li key={q.id}>
              <strong>{q.prompt}</strong>
              <p>{q.options.find((o) => o.value === answers[q.id])?.label}</p>
              <div className={styles.actions}>
                <button
                  type="button"
                  aria-label={`Edit answer: ${q.prompt}`}
                  onClick={() => onAction({ type: "edit", questionId: q.id })}
                >
                  Edit answer
                </button>
              </div>
            </li>
          ))}
        </ol>
      </details>
      <div className={styles.actions}>
        <button
          className={styles.primary}
          type="button"
          onClick={() => onAction({ type: "restart" })}
        >
          Retake this pathway
        </button>
        <button type="button" onClick={() => onAction({ type: "back" })}>
          Edit answers
        </button>
        <button
          type="button"
          onClick={() => onAction({ type: "pathway", pathway: null })}
        >
          Change pathway
        </button>
      </div>
    </section>
  );
}
