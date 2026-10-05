import Image from "next/image";

import { cn } from "@/lib/cn";

import { aboutHero } from "../content";

import styles from "../about.module.css";

export function AboutHero() {
  return (
    <section className={styles.hero} aria-labelledby="about-heading">
      <Image
        src={aboutHero.mark}
        alt=""
        aria-hidden="true"
        width={64}
        height={64}
        className={styles.heroMark}
      />
      <div className={cn(styles.wrap, styles.heroInner)}>
        <p className={styles.label}>{aboutHero.label}</p>
        <h1 id="about-heading" className={styles.heroTitle}>
          {aboutHero.title}
        </h1>
        <p className={styles.heroLead}>{aboutHero.lead}</p>
      </div>
    </section>
  );
}
