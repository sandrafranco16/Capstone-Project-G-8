"use client";

import { useEffect, useReducer, useRef } from "react";
import { initialJourney, journeyReducer } from "./journey";
import { assessmentPathways, type PathwayId } from "./pathways";
import { getRecommendations } from "./recommendations";
import { scoreAssessment } from "./scoring";
import { PathwaySelection } from "./pathway-selection";
import { AssessmentQuestion } from "./assessment-question";
import { AssessmentResult } from "./assessment-result";
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
        <PathwaySelection headingRef={heading} onAction={act} />
      ) : result && recommendations ? (
        <AssessmentResult
          headingRef={heading}
          onAction={act}
          pathway={pathway}
          result={result}
          recommendations={recommendations}
          answers={state.answers}
        />
      ) : question ? (
        <AssessmentQuestion
          headingRef={heading}
          onAction={act}
          pathway={pathway}
          question={question}
          step={state.step}
          answers={state.answers}
        />
      ) : null}
      <p className={styles.privacy}>
        Your answers stay in this page’s memory and are not saved or sent. You
        can choose to copy a result summary to your device’s clipboard.
        Reloading starts a new assessment.
      </p>
    </div>
  );
}
