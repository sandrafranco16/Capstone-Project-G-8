import { aboutValues } from "../content";

import styles from "../about.module.css";

export function ValuesSection() {
  return (
    <section
      className={`${styles.section} ${styles.onPaper}`}
      aria-labelledby="values-heading"
    >
      <div className={styles.wrap}>
        <div className={styles.sectionHead}>
          <p className={styles.label}>{aboutValues.label}</p>
          <h2 id="values-heading" className={styles.title}>
            {aboutValues.title}
          </h2>
        </div>
        <ul className={styles.values}>
          {aboutValues.items.map((value) => (
            <li key={value.title} className={styles.value}>
              <h3>{value.title}</h3>
              <p>{value.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
