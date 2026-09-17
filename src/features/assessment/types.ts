export type AssessmentLevel =
  "beginner" | "explorer" | "practitioner" | "leader";

export type AssessmentOption = {
  label: string;
  value: string;
  score: number;
};

export type AssessmentQuestion = {
  id: string;
  prompt: string;
  options: AssessmentOption[];
};

export type AssessmentThreshold = {
  level: AssessmentLevel;
  minimumScore: number;
};
