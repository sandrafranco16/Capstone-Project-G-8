import { assessmentPathways, type PathwayId } from "./pathways";
import { scoreAssessment, type AssessmentAnswers } from "./scoring";

export type JourneyState = {
  pathway: PathwayId | null;
  step: number;
  answers: AssessmentAnswers;
  complete: boolean;
};
export type JourneyAction =
  | { type: "pathway"; pathway: PathwayId | null }
  | { type: "answer"; value: string }
  | { type: "next" }
  | { type: "back" }
  | { type: "restart" };

export function initialJourney(pathway: PathwayId | null): JourneyState {
  return { pathway, step: 0, answers: {}, complete: false };
}

export function journeyReducer(
  state: JourneyState,
  action: JourneyAction,
): JourneyState {
  if (action.type === "pathway") return initialJourney(action.pathway);
  if (action.type === "restart") return initialJourney(state.pathway);
  if (!state.pathway) return state;
  const questions = assessmentPathways[state.pathway].questions;
  const question = questions[state.step];
  switch (action.type) {
    case "answer":
      if (
        state.complete ||
        !question.options.some((o) => o.value === action.value)
      )
        return state;
      return {
        ...state,
        answers: { ...state.answers, [question.id]: action.value },
      };
    case "back":
      return {
        ...state,
        complete: false,
        step: Math.max(0, state.step - (state.complete ? 0 : 1)),
      };
    case "next":
      if (
        state.complete ||
        !question.options.some((o) => o.value === state.answers[question.id])
      )
        return state;
      if (state.step === questions.length - 1) {
        return scoreAssessment(state.pathway, state.answers)
          ? { ...state, complete: true }
          : state;
      }
      return { ...state, step: state.step + 1 };
  }
}
