import Link from "next/link";

import { assessmentPathways, pathwayIds } from "@/features/assessment/pathways";

import styles from "./homepage-pathways-section.module.css";

export function HomepagePathwaysSection() {
  return (
    <section
      id="pathways"
      className={styles.section}
      aria-labelledby="pathways-heading"
    >
      <div className={styles.inner}>
        <div className={styles.headingBlock}>
          <p className={styles.eyebrow}>Start where you are</p>

          <h1 id="pathways-heading" className={styles.heading}>
            Find your next step <span>with AI.</span>
          </h1>

          <p className={styles.lead}>
            Choose the pathway that best matches where you are today. Each one
            opens a five-question assessment and gives you a practical next
            step.
          </p>
        </div>

        <div className={styles.grid}>
          {pathwayIds.map((id) => {
            const pathway = assessmentPathways[id];

            return (
              <Link
                key={id}
                href={`/assessment?path=${id}`}
                className={`${styles.card} ${styles[id]}`}
              >
                <span className={styles.audience}>{pathway.audience}</span>

                <h2 className={styles.cardTitle}>{pathway.label}</h2>

                <p className={styles.description}>{pathway.description}</p>

                <span className={styles.action}>
                  Start this pathway <span aria-hidden="true">→</span>
                </span>
              </Link>
            );
          })}
        </div>

        <p className={styles.note}>
          Five questions · free · no sign-up · nothing is stored.
        </p>
      </div>
    </section>
  );
}
