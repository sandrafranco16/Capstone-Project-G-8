"use client";

import { useEffect, useReducer, useRef } from "react";
import { assessmentLevels } from "./config";
import { initialJourney, journeyReducer } from "./journey";
import { assessmentPathways, pathwayIds, type PathwayId } from "./pathways";
import { getRecommendations } from "./recommendations";
import { scoreAssessment } from "./scoring";
import styles from "./assessment-journey.module.css";

export function AssessmentJourney({
  initialPathway = null,
}: {
  initialPathway?: PathwayId | null;
}) {
  const [state, dispatch] = useReducer(
    journeyReducer,
    initialPathway,
    initialJourney,
  );
  const heading = useRef<HTMLHeadingElement>(null);
  const interacted = useRef(false);

  useEffect(() => {
    if (interacted.current) heading.current?.focus();
  }, [state.pathway, state.step, state.complete]);

  function act(action: Parameters<typeof journeyReducer>[1]) {
    interacted.current = true;
    dispatch(action);
  }

  const pathway = state.pathway ? assessmentPathways[state.pathway] : null;
  const result =
    state.pathway && state.complete
      ? scoreAssessment(state.pathway, state.answers)
      : null;
  const recommendations =
    result && state.pathway
      ? getRecommendations(state.pathway, result.level)
      : null;
  const question = pathway?.questions[state.step];

  return (
    <div className={styles.journey}>
      <p className={styles.notice}>
        Preview for feedback — questions and scoring are awaiting client
        confirmation.
      </p>
      {!pathway ? (
        <>
          <h2 ref={heading} tabIndex={-1}>
            Choose your pathway
          </h2>
          <p>
            Five questions about the path that matters to you. Choose the
            answers that best describe your current practice.
          </p>
          <div className={styles.paths}>
            {pathwayIds.map((id) => {
              const path = assessmentPathways[id];
              return (
                <button
                  key={id}
                  type="button"
                  className={styles.path}
                  onClick={() => act({ type: "pathway", pathway: id })}
                >
                  <span className={styles.audience}>{path.audience}</span>
                  <span className={styles.pathTitle}>{path.label}</span>
                  <span>{path.description}</span>
                  <span className={styles.start}>Start this pathway →</span>
                </button>
              );
            })}
          </div>
        </>
      ) : result && recommendations ? (
        <section
          aria-labelledby="assessment-result-title"
          className={styles.panel}
        >
          <p className={styles.eyebrow}>{pathway.label} · Your result</p>
          <h2 id="assessment-result-title" ref={heading} tabIndex={-1}>
            AI {assessmentLevels[result.level]}
          </h2>
          <p>{recommendations.message}</p>
          <p className={styles.score}>
            Your score: {result.score} / {result.maximumScore}
          </p>
          <p className={styles.note}>
            A reflection on your answers, not a certification or compliance
            assessment. A high total can still include areas that need
            attention.
          </p>
          <h3>Your next step</h3>
          <p>{recommendations.nextStep}</p>
          <h3>Explore relevant BITDOT services</h3>
          <ul className={styles.recommendations}>
            {recommendations.services.map((service) => (
              <li key={service.href}>
                <a href={service.href}>
                  {service.label} <span aria-hidden="true">→</span>
                </a>
              </li>
            ))}
          </ul>
          <details className={styles.review}>
            <summary>Review your answers</summary>
            <ol>
              {pathway.questions.map((q) => (
                <li key={q.id}>
                  <strong>{q.prompt}</strong>
                  <p>
                    {
                      q.options.find((o) => o.value === state.answers[q.id])
                        ?.label
                    }
                  </p>
                </li>
              ))}
            </ol>
          </details>
          <div className={styles.actions}>
            <button
              className={styles.primary}
              type="button"
              onClick={() => act({ type: "restart" })}
            >
              Retake this pathway
            </button>
            <button type="button" onClick={() => act({ type: "back" })}>
              Edit answers
            </button>
            <button
              type="button"
              onClick={() => act({ type: "pathway", pathway: null })}
            >
              Change pathway
            </button>
          </div>
        </section>
      ) : question ? (
        <form
          className={styles.panel}
          onSubmit={(event) => {
            event.preventDefault();
            act({ type: "next" });
          }}
        >
          <p className={styles.eyebrow}>{pathway.label}</p>
          <p id="assessment-progress" role="status">
            Question {state.step + 1} of {pathway.questions.length}
          </p>
          <progress
            className={styles.progress}
            aria-label="Questions completed"
            value={state.step}
            max={pathway.questions.length}
          />
          <h2 id="assessment-question" ref={heading} tabIndex={-1}>
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
                  checked={state.answers[question.id] === option.value}
                  required
                  onChange={() => act({ type: "answer", value: option.value })}
                />
                <span>{option.label}</span>
              </label>
            ))}
          </fieldset>
          <div className={styles.actions}>
            {state.step > 0 && (
              <button type="button" onClick={() => act({ type: "back" })}>
                Back
              </button>
            )}
            <button
              className={styles.primary}
              type="submit"
              disabled={!state.answers[question.id]}
            >
              {state.step === pathway.questions.length - 1
                ? "See my result"
                : "Next question"}
            </button>
            <button
              type="button"
              onClick={() => act({ type: "pathway", pathway: null })}
            >
              Change pathway
            </button>
          </div>
        </form>
      ) : null}
      <p className={styles.privacy}>
        Your answers and result stay in this page’s memory. They are not saved
        or sent. Reloading or leaving starts a new assessment.
      </p>
    </div>
  );
}
