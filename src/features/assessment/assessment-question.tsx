import type {
  AssessmentPathway,
  AssessmentQuestion as Question,
} from "./types";
import type { AssessmentAnswers } from "./scoring";
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
  return (
    <form
      className={styles.panel}
      onSubmit={(event) => {
        event.preventDefault();
        onAction({ type: "next" });
      }}
    >
      <p className={styles.eyebrow}>{pathway.label}</p>
      <p id="assessment-progress" role="status">
        Question {step + 1} of {pathway.questions.length}
      </p>
      <progress
        className={styles.progress}
        aria-label="Questions completed"
        value={step}
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
          {step === pathway.questions.length - 1
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
