import Image from "next/image";

import type { Founder } from "../content";

import styles from "../about.module.css";

export function FounderCard({ founder }: { founder: Founder }) {
  const headingId = `${founder.id}-name`;

  return (
    <article className={styles.founder} aria-labelledby={headingId}>
      <div className={styles.founderTop}>
        <div className={styles.founderPhoto}>
          <Image
            src={founder.photo.src}
            alt={founder.photo.alt}
            fill
            sizes="(max-width: 480px) 12rem, 9.5rem"
          />
        </div>
        <div>
          <h3 id={headingId} className={styles.founderName}>
            {founder.name}
          </h3>
          <p className={styles.founderRole}>{founder.role}</p>
          <p className={styles.founderSpecialty}>{founder.specialty}</p>
          <ul className={styles.highlights} aria-label="Highlights">
            {founder.highlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
        </div>
      </div>
      <dl className={styles.details}>
        {founder.details.map((detail) => (
          <div key={detail.label} className={styles.detail}>
            <dt>{detail.label}</dt>
            <dd>{detail.text}</dd>
          </div>
        ))}
      </dl>
    </article>
  );
}
