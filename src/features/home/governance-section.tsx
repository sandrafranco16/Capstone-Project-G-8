import { CtaAction } from "@/components/ui/cta";

import styles from "./governance-section.module.css";

const gains = [
  [
    "Enhanced understanding of AI",
    "Clarity on the fundamental concepts and potential of artificial intelligence relevant to your organisation.",
  ],
  [
    "Strategic decision-making",
    "The competence to make informed strategic decisions regarding AI adoption and implementation.",
  ],
  [
    "Insights into AI governance",
    "Understanding of the key principles and frameworks for effective AI governance.",
  ],
  [
    "Real-world applications",
    "The various applications of AI, explored through relevant case studies.",
  ],
] as const;

const delivery = [
  [
    "Immersive four-hour training",
    "Delivered over a focused four-hour period to ensure comprehensive coverage.",
  ],
  [
    "In-person delivery",
    "Ideally conducted in person, divided into three sessions for optimal engagement and retention.",
  ],
  [
    "Online option",
    "A flexible online delivery option via staggered sessions, to accommodate your team's schedule and location.",
  ],
] as const;

/** Homepage flagship program; the stable anchor is also used by navigation and assessment results. */
export function GovernanceSection({
  enquiryHref = "/#contact",
}: {
  enquiryHref?: string;
}) {
  return (
    <section
      id="flagship"
      aria-labelledby="governance-heading"
      className={styles.section}
    >
      <div className={styles.wrap}>
        <div className={styles.header}>
          <p className={styles.label}>Our flagship program</p>
          <h2 id="governance-heading" className={styles.title}>
            Mastering AI Governance.
          </h2>
          <p className={styles.lead}>
            A comprehensive training initiative tailored for board members and
            organisational leaders. It introduces the capabilities of AI and
            covers the essential aspects of AI governance.
          </p>
        </div>
        <div className={styles.card}>
          <div className={styles.gainsPanel}>
            <p className={styles.badge}>Building board competence in AI</p>
            <h3 className={styles.subtitle}>What you will gain</h3>
            <ol className={styles.gains} role="list">
              {gains.map(([title, description], index) => (
                <li key={title}>
                  <span className={styles.number} aria-hidden="true">
                    {index + 1}
                  </span>
                  <div>
                    <strong>{title}</strong>
                    <p>{description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div className={styles.deliveryPanel}>
            <p className={styles.badge}>Training delivery</p>
            <h3 className={styles.subtitle}>
              Designed for impact and flexibility
            </h3>
            <ul className={styles.steps} role="list">
              {delivery.map(([title, description]) => (
                <li key={title}>
                  <strong>{title}</strong>
                  <p>{description}</p>
                </li>
              ))}
            </ul>
            <p className={styles.audience}>
              <strong>Who should attend —</strong> board members, non-executive
              directors, executive leadership teams and senior management
              involved in strategy and risk.
            </p>
            <CtaAction href={enquiryHref} className={styles.enquiry}>
              Enquire about the program
            </CtaAction>
          </div>
        </div>
      </div>
    </section>
  );
}
