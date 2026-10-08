import type {
  AssessmentPathway,
  AssessmentQuestion as Question,
} from "./types";
import { scoreAssessment, type AssessmentAnswers } from "./scoring";
import type { AssessmentViewProps } from "./view-types";
import styles from "./assessment-journey.module.css";

export function AssessmentQuestion({
  headingRef,
  onAction,
  pathway,
  question,
  step,
  answers,
}: AssessmentViewProps & {
  pathway: AssessmentPathway;
  question: Question;
  step: number;
  answers: AssessmentAnswers;
}) {
  const canShowResult = scoreAssessment(pathway.id, answers) !== null;
  const answeredCount = pathway.questions.filter((item) =>
    item.options.some((option) => option.value === answers[item.id]),
  ).length;

  return (
    <form
      className={styles.panel}
      onSubmit={(event) => {
        event.preventDefault();
        onAction({ type: canShowResult ? "finish" : "next" });
      }}
    >
      <p className={styles.eyebrow}>{pathway.label}</p>
      <p id="assessment-progress" role="status">
        Question {step + 1} of {pathway.questions.length}
      </p>
      <progress
        className={styles.progress}
        aria-label="Questions answered"
        value={answeredCount}
        max={pathway.questions.length}
      />
      <h2 id="assessment-question" ref={headingRef} tabIndex={-1}>
        {question.prompt}
      </h2>
      <fieldset
        className={styles.options}
        aria-labelledby="assessment-question"
        aria-describedby="assessment-progress"
      >
        {question.options.map((option) => (
          <label className={styles.option} key={option.value}>
            <input
              type="radio"
              name={question.id}
              value={option.value}
              checked={answers[question.id] === option.value}
              required
              onChange={() => onAction({ type: "answer", value: option.value })}
            />
            <span>{option.label}</span>
          </label>
        ))}
      </fieldset>
      <div className={styles.actions}>
        {step > 0 && (
          <button type="button" onClick={() => onAction({ type: "back" })}>
            Back
          </button>
        )}
        <button
          className={styles.primary}
          type="submit"
          disabled={!answers[question.id]}
        >
          {canShowResult && step < pathway.questions.length - 1
            ? "Save and view result"
            : step === pathway.questions.length - 1
              ? "See my result"
              : "Next question"}
        </button>
        <button
          type="button"
          onClick={() => onAction({ type: "pathway", pathway: null })}
        >
          Change pathway
        </button>
      </div>
    </form>
  );
}
