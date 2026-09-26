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
});
