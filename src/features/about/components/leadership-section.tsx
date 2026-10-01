import { aboutLeadership } from "../content";
import { FounderCard } from "./founder-card";

import styles from "../about.module.css";

export function LeadershipSection() {
  return (
    <section
      id="leadership"
      className={styles.section}
      aria-labelledby="leadership-heading"
    >
      <div className={styles.wrap}>
        <div className={styles.sectionHead}>
          <p className={styles.label}>{aboutLeadership.label}</p>
          <h2 id="leadership-heading" className={styles.title}>
            {aboutLeadership.title}
          </h2>
        </div>
        <ul className={styles.founders}>
          {aboutLeadership.founders.map((founder) => (
            <li key={founder.id}>
              <FounderCard founder={founder} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
