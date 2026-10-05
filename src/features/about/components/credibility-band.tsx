import { aboutCredibility } from "../content";

import styles from "../about.module.css";

export function CredibilityBand() {
  return (
    <section
      id="credibility"
      className={styles.sectionTight}
      aria-labelledby="credibility-heading"
    >
      <div className={styles.wrap}>
        <div className={styles.band}>
          <p className={styles.label}>{aboutCredibility.label}</p>
          <h2 id="credibility-heading" className={styles.title}>
            {aboutCredibility.title}
          </h2>
          <p className={styles.lead}>{aboutCredibility.lead}</p>
          <ul className={styles.specs}>
            {aboutCredibility.items.map((item) => (
              <li key={item.title} className={styles.spec}>
                <span className={styles.specValue}>{item.value}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
