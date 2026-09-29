import Link from "next/link";

import { resourcesSection } from "./tools-resources.content";

import styles from "./tools-resources.module.css";

/** Homepage resources preview; keeps the prototype's #resources anchor. */
export function ResourcesPreview() {
  return (
    <section
      id="resources"
      aria-labelledby="resources-heading"
      className={`${styles.section} ${styles.onPaper}`}
    >
      <div className={styles.wrap}>
        <div className={styles.header}>
          <p className={styles.label}>{resourcesSection.label}</p>
          <h2 id="resources-heading" className={styles.title}>
            {resourcesSection.title}
          </h2>
          <p className={styles.lead}>{resourcesSection.lead}</p>
        </div>

        <ul className={styles.rail} aria-label="Resource highlights">
          {resourcesSection.items.map((item) => (
            <li key={item.id}>
              <Link href={item.href} className={styles.resource}>
                <span className={styles.kicker}>{item.kicker}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <span className={styles.go}>{item.linkLabel}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
