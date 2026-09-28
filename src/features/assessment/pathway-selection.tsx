import { assessmentPathways, pathwayIds } from "./pathways";
import type { AssessmentViewProps } from "./view-types";
import styles from "./assessment-journey.module.css";

export function PathwaySelection({
  headingRef,
  onAction,
}: AssessmentViewProps) {
  return (
    <>
      <h2 ref={headingRef} tabIndex={-1}>
        Choose your pathway
      </h2>
      <p>
        Five questions about the path that matters to you. Choose the answers
        that best describe your current practice.
      </p>
      <div className={styles.paths}>
        {pathwayIds.map((id) => {
          const path = assessmentPathways[id];
          return (
            <button
              key={id}
              type="button"
              className={styles.path}
              onClick={() => onAction({ type: "pathway", pathway: id })}
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
  );
}
