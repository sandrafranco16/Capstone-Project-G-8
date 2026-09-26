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

export type PathwayId = "career" | "learn" | "govern" | "risk";
export type AssessmentPathway = {
  id: PathwayId;
  label: string;
  audience: string;
  description: string;
  questions: AssessmentQuestion[];
};
