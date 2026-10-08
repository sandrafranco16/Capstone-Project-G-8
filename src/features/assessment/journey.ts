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
  | { type: "edit"; questionId: string }
  | { type: "finish" }
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
  switch (action.type) {
    case "pathway":
      return initialJourney(action.pathway);
    case "restart":
      return initialJourney(state.pathway);
    case "edit": {
      if (!state.pathway || !state.complete) return state;
      const step = assessmentPathways[state.pathway].questions.findIndex(
        (question) => question.id === action.questionId,
      );
      return step === -1 ? state : { ...state, step, complete: false };
    }
    case "finish": {
      if (!state.pathway || state.complete) return state;
      if (!scoreAssessment(state.pathway, state.answers)) return state;
      return {
        ...state,
        step: assessmentPathways[state.pathway].questions.length - 1,
        complete: true,
      };
    }
    case "answer": {
      if (!state.pathway || state.complete) return state;
      const question = assessmentPathways[state.pathway].questions[state.step];
      if (!question.options.some((o) => o.value === action.value)) return state;
      return {
        ...state,
        answers: { ...state.answers, [question.id]: action.value },
      };
    }
    case "back":
      if (!state.pathway) return state;
      return {
        ...state,
        complete: false,
        step: Math.max(0, state.step - (state.complete ? 0 : 1)),
      };
    case "next": {
      if (!state.pathway || state.complete) return state;
      const questions = assessmentPathways[state.pathway].questions;
      const question = questions[state.step];
      if (!question.options.some((o) => o.value === state.answers[question.id]))
        return state;
      if (state.step === questions.length - 1) {
        return scoreAssessment(state.pathway, state.answers)
          ? { ...state, complete: true }
          : state;
      }
      return { ...state, step: state.step + 1 };
    }
    default: {
      const exhaustive: never = action;
      return exhaustive;
    }
  }
}
