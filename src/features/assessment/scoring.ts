import type { AssessmentLevel, AssessmentThreshold } from "./types";
import { assessmentPathways, type PathwayId } from "./pathways";

// Proposed thresholds from the existing five-question prototype (0–15).
export const proposedThresholds: AssessmentThreshold[] = [
  { level: "beginner", minimumScore: 0 },
  { level: "explorer", minimumScore: 4 },
  { level: "practitioner", minimumScore: 8 },
  { level: "leader", minimumScore: 12 },
];

export type AssessmentAnswers = Record<string, string>;
export type AssessmentResult = {
  score: number;
  maximumScore: number;
  level: AssessmentLevel;
};

/** Derive scores from known options, never from caller-supplied numeric values. */
export function scoreAssessment(
  pathway: PathwayId,
  answers: AssessmentAnswers,
): AssessmentResult | null {
  const questions = assessmentPathways[pathway].questions;
  if (Object.keys(answers).length !== questions.length) return null;

  let score = 0;
  for (const question of questions) {
    if (!Object.hasOwn(answers, question.id)) return null;
    const option = question.options.find(
      (candidate) => candidate.value === answers[question.id],
    );
    if (!option) return null;
    score += option.score;
  }

  const level = resolveAssessmentLevel(score, proposedThresholds);
  return level
    ? {
        score,
        maximumScore: questions.reduce(
          (total, question) =>
            total + Math.max(...question.options.map((option) => option.score)),
          0,
        ),
        level,
      }
    : null;
}

export function resolveAssessmentLevel(
  score: number,
  thresholds: AssessmentThreshold[],
): AssessmentLevel | null {
  if (!Number.isFinite(score) || score < 0) return null;
  const ordered = [...thresholds].sort(
    (left, right) => right.minimumScore - left.minimumScore,
  );

  return (
    ordered.find((threshold) => score >= threshold.minimumScore)?.level ?? null
  );
}
