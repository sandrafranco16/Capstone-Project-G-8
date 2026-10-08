import { describe, expect, it } from "vitest";
import { initialJourney, journeyReducer } from "./journey";
import { assessmentPathways, pathwayIds } from "./pathways";
import { scoreAssessment } from "./scoring";

describe("assessment journey", () => {
  it.each(pathwayIds)(
    "completes %s without skipping unanswered questions",
    (pathway) => {
      let state = initialJourney(pathway);
      for (const question of assessmentPathways[pathway].questions) {
        expect(journeyReducer(state, { type: "next" })).toBe(state);
        expect(
          journeyReducer(state, { type: "answer", value: "unknown" }),
        ).toBe(state);
        state = journeyReducer(state, {
          type: "answer",
          value: question.options[2].value,
        });
        state = journeyReducer(state, { type: "next" });
      }
      expect(state.complete).toBe(true);
      expect(scoreAssessment(pathway, state.answers)).toMatchObject({
        score: 10,
        level: "practitioner",
      });
      expect(journeyReducer(state, { type: "next" })).toBe(state);
    },
  );

  it("preserves answers on Back and replaces a score instead of accumulating it", () => {
    const [first, second] = assessmentPathways.career.questions;
    let state = initialJourney("career");
    state = journeyReducer(state, {
      type: "answer",
      value: first.options[3].value,
    });
    state = journeyReducer(state, { type: "next" });
    state = journeyReducer(state, {
      type: "answer",
      value: second.options[1].value,
    });
    state = journeyReducer(state, { type: "back" });
    expect(state.answers[first.id]).toBe(first.options[3].value);
    state = journeyReducer(state, {
      type: "answer",
      value: first.options[0].value,
    });
    state = journeyReducer(state, { type: "next" });
    expect(state.answers).toEqual({
      [first.id]: first.options[0].value,
      [second.id]: second.options[1].value,
    });
  });

  it("can edit a completed result and clears all answers on retake or change", () => {
    let state = initialJourney("risk");
    const questions = assessmentPathways.risk.questions;
    for (const question of questions) {
      state = journeyReducer(state, {
        type: "answer",
        value: question.options[3].value,
      });
      state = journeyReducer(state, { type: "next" });
    }
    state = journeyReducer(state, { type: "back" });
    expect(state.step).toBe(4);
    expect(state.complete).toBe(false);
    state = journeyReducer(state, {
      type: "answer",
      value: questions[4].options[0].value,
    });
    state = journeyReducer(state, { type: "next" });
    expect(scoreAssessment("risk", state.answers)?.score).toBe(12);
    expect(journeyReducer(state, { type: "restart" })).toEqual(
      initialJourney("risk"),
    );
    expect(
      journeyReducer(state, { type: "pathway", pathway: "learn" }),
    ).toEqual(initialJourney("learn"));
    expect(journeyReducer(state, { type: "pathway", pathway: null })).toEqual(
      initialJourney(null),
    );
  });

  it.each(pathwayIds)(
    "edits any completed %s answer without discarding the others",
    (pathway) => {
      const questions = assessmentPathways[pathway].questions;
      let completed = initialJourney(pathway);
      for (const question of questions) {
        completed = journeyReducer(completed, {
          type: "answer",
          value: question.options[3].value,
        });
        completed = journeyReducer(completed, { type: "next" });
      }

      questions.forEach((question, step) => {
        let edited = journeyReducer(completed, {
          type: "edit",
          questionId: question.id,
        });
        expect(edited.step).toBe(step);
        expect(edited.complete).toBe(false);
        expect(edited.answers).toBe(completed.answers);
        edited = journeyReducer(edited, {
          type: "answer",
          value: question.options[0].value,
        });
        edited = journeyReducer(edited, { type: "finish" });
        expect(edited.complete).toBe(true);
        expect(scoreAssessment(pathway, edited.answers)?.score).toBe(12);
        expect(edited.answers).toEqual({
          ...completed.answers,
          [question.id]: question.options[0].value,
        });
        expect(completed.answers[question.id]).toBe(question.options[3].value);
      });
    },
  );

  it("cannot use finish to bypass missing or invalid answers", () => {
    const state = initialJourney("career");
    expect(journeyReducer(state, { type: "finish" })).toBe(state);
    const questions = assessmentPathways.career.questions;
    const answers = Object.fromEntries(
      questions.map((question) => [question.id, question.options[0].value]),
    );
    for (const invalidAnswers of [
      { ...answers, [questions[0].id]: "unknown" },
      { ...answers, "risk-data": "unknown" },
    ]) {
      const invalid = { ...state, answers: invalidAnswers };
      expect(journeyReducer(invalid, { type: "finish" })).toBe(invalid);
    }
  });

  it("ignores answer editing before completion and for unknown questions", () => {
    const state = initialJourney("career");
    expect(
      journeyReducer(state, {
        type: "edit",
        questionId: assessmentPathways.career.questions[0].id,
      }),
    ).toBe(state);
    const complete = { ...state, complete: true };
    expect(
      journeyReducer(complete, { type: "edit", questionId: "risk-data" }),
    ).toBe(complete);
    expect(journeyReducer(initialJourney(null), { type: "finish" })).toEqual(
      initialJourney(null),
    );
  });
});
