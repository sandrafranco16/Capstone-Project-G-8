import { aboutStory } from "../content";

import styles from "../about.module.css";

export function AboutStory() {
  return (
    <section
      className={`${styles.section} ${styles.onPaper}`}
      aria-labelledby="about-story-heading"
    >
      <div className={`${styles.wrap} ${styles.story}`}>
        <div>
          <p className={styles.label}>{aboutStory.label}</p>
          <h2 id="about-story-heading" className={styles.title}>
            {aboutStory.title}
          </h2>
        </div>
        <div className={styles.storyBody}>
          {aboutStory.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
