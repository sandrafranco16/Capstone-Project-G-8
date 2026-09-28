import { aboutHero } from "../content";

import styles from "../about.module.css";

/** BITDOT ring-and-dot mark, drawn from the original brand geometry. */
function BrandMark({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 64 64"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id="about-mark-gradient" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#0057B8" />
          <stop offset="1" stopColor="#2E96FF" />
        </linearGradient>
      </defs>
      <circle
        cx="30"
        cy="36"
        r="19"
        fill="none"
        stroke="url(#about-mark-gradient)"
        strokeWidth="9"
      />
      <circle cx="48" cy="14" r="9" fill="#2E96FF" />
    </svg>
  );
}

export function AboutHero() {
  return (
    <section className={styles.hero} aria-labelledby="about-heading">
      <BrandMark className={styles.heroMark} />
      <div className={`${styles.wrap} ${styles.heroInner}`}>
        <p className={styles.label}>{aboutHero.label}</p>
        <h1 id="about-heading" className={styles.heroTitle}>
          {aboutHero.title}
        </h1>
        <p className={styles.heroLead}>{aboutHero.lead}</p>
      </div>
    </section>
  );
}
