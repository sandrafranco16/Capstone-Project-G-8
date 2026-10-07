import { Briefcase, Map, Share2, ShieldCheck } from "lucide-react";

import { whyBitdotContent } from "./partnership-why.content";
import styles from "./why-bitdot-section.module.css";

const pointIcons = [ShieldCheck, Briefcase, Map, Share2] as const;

export function WhyBitdotSection() {
  return (
    <section className={styles.section} aria-labelledby="why-bitdot-heading">
      <div className={styles.inner}>
        <div className={styles.band}>
          <p className={styles.label}>{whyBitdotContent.label}</p>

          <h2 className={styles.heading} id="why-bitdot-heading">
            {whyBitdotContent.heading}
          </h2>

          <p className={styles.lead}>{whyBitdotContent.lead}</p>

          <div className={styles.grid}>
            {whyBitdotContent.points.map((point, index) => {
              const Icon = pointIcons[index];

              return (
                <article className={styles.item} key={point.title}>
                  <span className={styles.icon} aria-hidden="true">
                    <Icon size={20} strokeWidth={2.1} />
                  </span>

                  <h3 className={styles.itemTitle}>{point.title}</h3>
                  <p className={styles.itemText}>{point.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
