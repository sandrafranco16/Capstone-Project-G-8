import { describe, expect, it } from "vitest";

import { assessmentPathways, pathwayIds } from "./pathways";
import {
  proposedThresholds,
  resolveAssessmentLevel,
  scoreAssessment,
} from "./scoring";

describe("assessment scoring", () => {
  it.each([
    [0, "beginner"],
    [3, "beginner"],
    [4, "explorer"],
    [7, "explorer"],
    [8, "practitioner"],
    [11, "practitioner"],
    [12, "leader"],
    [15, "leader"],
  ])("maps score %s to %s at every boundary", (score, level) => {
    expect(resolveAssessmentLevel(score as number, proposedThresholds)).toBe(
      level,
    );
  });

  it.each([-1, NaN, Infinity])("rejects invalid score %s", (score) => {
    expect(resolveAssessmentLevel(score, proposedThresholds)).toBeNull();
  });

  it.each(pathwayIds)(
    "scores every possible complete answer set for %s",
    (pathway) => {
      const questions = assessmentPathways[pathway].questions;
      for (let code = 0; code < 4 ** questions.length; code++) {
        let remainder = code;
        let expected = 0;
        const answers: Record<string, string> = {};
        for (const question of questions) {
          const choice = remainder % 4;
          remainder = Math.floor(remainder / 4);
          answers[question.id] = question.options[choice].value;
          expected += choice;
        }
        expect(scoreAssessment(pathway, answers)).toEqual({
          score: expected,
          maximumScore: 15,
          level:
            expected <= 3
              ? "beginner"
              : expected <= 7
                ? "explorer"
                : expected <= 11
                  ? "practitioner"
                  : "leader",
        });
      }
    },
  );

  it("rejects partial, unknown, extra and cross-pathway answers", () => {
    const answers = Object.fromEntries(
      assessmentPathways.career.questions.map((q) => [
        q.id,
        q.options[0].value,
      ]),
    );
    expect(scoreAssessment("career", {})).toBeNull();
    expect(scoreAssessment("career", { ...answers, extra: "3" })).toBeNull();
    expect(
      scoreAssessment("career", { ...answers, "career-tools": "999" }),
    ).toBeNull();
    expect(scoreAssessment("learn", answers)).toBeNull();
    const changed = {
      ...answers,
      "career-tools": assessmentPathways.career.questions[1].options[3].value,
    };
    expect(scoreAssessment("career", changed)?.score).toBe(3);
    expect(scoreAssessment("career", answers)?.score).toBe(0);
  });

  it("does not mutate the threshold configuration", () => {
    const original = structuredClone(proposedThresholds);
    resolveAssessmentLevel(7, proposedThresholds);
    expect(proposedThresholds).toEqual(original);
  });
});
