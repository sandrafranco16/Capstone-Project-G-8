import Image from "next/image";

import { CtaAction } from "@/components/ui/cta";
import { FlipCard } from "@/components/ui/flip-card";
import { cn } from "@/lib/cn";

import {
  directors as defaultDirectors,
  type Director,
} from "./leadership-content";
import styles from "./leadership-section.module.css";

type LeadershipSectionProps = {
  directors?: readonly Director[];
  /** Where the full leadership profiles live; pass null to hide the link. */
  profileHref?: string | null;
};

/** Homepage preview of the two directors; the full profiles live on the About page. */
export function LeadershipSection({
  directors = defaultDirectors,
  profileHref = "/about#leadership",
}: LeadershipSectionProps) {
  return (
    <section
      id="leadership"
      aria-labelledby="leadership-heading"
      className={styles.section}
    >
      <div className={styles.wrap}>
        <div className={styles.header}>
          <p className={styles.label}>Our leadership</p>
          <h2 id="leadership-heading" className={styles.title}>
            Two directors, thirty years of experience.
          </h2>
          <p className={styles.lead}>
            Select a card to read each director&rsquo;s background.
          </p>
        </div>
        <ul className={styles.grid} role="list">
          {directors.map((director) => (
            <li key={director.id}>
              <DirectorCard director={director} />
            </li>
          ))}
        </ul>
        {profileHref && (
          <CtaAction
            href={profileHref}
            variant="secondary"
            className={styles.more}
          >
            More about our leadership
          </CtaAction>
        )}
      </div>
    </section>
  );
}

function DirectorCard({ director }: { director: Director }) {
  const nameId = `${director.id}-name`;

  return (
    <article aria-labelledby={nameId} className={styles.article}>
      <FlipCard
        className={cn(styles.card, styles[director.theme])}
        showBack={{
          text: "View profile",
          label: `Show ${director.name}'s profile`,
        }}
        showFront={{
          text: "Back",
          label: `Show ${director.name}'s photo`,
        }}
        front={
          <div className={styles.front}>
            <Image
              src={director.photo.src}
              alt={director.photo.alt}
              fill
              sizes="(max-width: 65rem) 100vw, 36rem"
              className={styles.photo}
            />
            <div className={styles.overlay}>
              <p className={styles.specialism}>{director.specialism}</p>
              <h3 id={nameId} className={styles.name}>
                {director.name}
              </h3>
              <p className={styles.role}>{director.role}</p>
              <ul className={styles.badges} role="list">
                {director.badges.map((badge) => (
                  <li key={badge}>{badge}</li>
                ))}
              </ul>
            </div>
          </div>
        }
        back={
          <div className={styles.back}>
            <div className={styles.backHeader}>
              <Image
                src={director.photo.src}
                alt=""
                width={64}
                height={64}
                className={styles.avatar}
              />
              <div>
                <p className={styles.backSpecialism}>{director.specialism}</p>
                <p className={styles.backName}>{director.name}</p>
                <p className={styles.backRole}>{director.role}</p>
              </div>
            </div>
            <dl className={styles.details}>
              {director.details.map(({ label, text }) => (
                <div key={label}>
                  <dt>{label}</dt>
                  <dd>{text}</dd>
                </div>
              ))}
            </dl>
          </div>
        }
      />
    </article>
  );
}
