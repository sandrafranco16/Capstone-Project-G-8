import type {
  AssessmentLevel,
  AssessmentQuestion,
  AssessmentThreshold,
} from "./types";

export const assessmentLevels: Record<AssessmentLevel, string> = {
  beginner: "Beginner",
  explorer: "Explorer",
  practitioner: "Practitioner",
  leader: "Leader",
};

// Populate only after the client approves the questions and wording.
export const assessmentQuestions: AssessmentQuestion[] = [];

// Populate only after the client approves score boundaries and mappings.
export const assessmentThresholds: AssessmentThreshold[] = [];
