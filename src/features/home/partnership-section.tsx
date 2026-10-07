import {
  CirclePlus,
  FileText,
  ListFilter,
  Target,
  UserRound,
  Workflow,
} from "lucide-react";

import { partnershipContent } from "./partnership-why.content";
import styles from "./partnership-section.module.css";

const serviceIcons = [
  CirclePlus,
  ListFilter,
  FileText,
  UserRound,
  Workflow,
  Target,
] as const;

export function PartnershipSection() {
  return (
    <section className={styles.section} id="beyond">
      <div className={styles.inner}>
        <div className={styles.headingBlock}>
          <p className={styles.label}>{partnershipContent.label}</p>
          <h2 className={styles.heading}>{partnershipContent.heading}</h2>
          <p className={styles.lead}>{partnershipContent.lead}</p>
        </div>

        <div className={styles.grid}>
          {partnershipContent.services.map((service, index) => {
            const Icon = serviceIcons[index];

            return (
              <article className={styles.card} key={service.title}>
                <span className={styles.icon} aria-hidden="true">
                  <Icon size={21} strokeWidth={2.1} />
                </span>

                <h3 className={styles.cardTitle}>{service.title}</h3>
                <p className={styles.cardText}>{service.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
