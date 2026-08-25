import type { AssessmentLevel, AssessmentThreshold } from "./types";

export function resolveAssessmentLevel(
  score: number,
  thresholds: AssessmentThreshold[],
): AssessmentLevel | null {
  const ordered = [...thresholds].sort(
    (left, right) => right.minimumScore - left.minimumScore,
  );

  return ordered.find((threshold) => score >= threshold.minimumScore)?.level ?? null;
}
