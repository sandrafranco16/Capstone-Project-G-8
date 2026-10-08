import { ArrowRight, Compass } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <section className={styles.page} aria-labelledby="not-found-heading">
      <div className={styles.container}>
        <div className={styles.hero}>
          <div className={styles.copy}>
            <p className={styles.eyebrow}>Page not found</p>
            <h1 id="not-found-heading">
              Looks like this page took a wrong turn.
            </h1>
            <p className={styles.description}>
              The page you’re looking for doesn’t exist or may have moved.
              <br className={styles.desktopBreak} /> Let’s get you back on
              track.
            </p>
            <div className={styles.actions}>
              <Link className={styles.primaryAction} href="/">
                Return home
              </Link>
              <Link className={styles.secondaryAction} href="/services">
                Explore services
              </Link>
            </div>
            <nav className={styles.suggestions} aria-label="Other places to go">
              <span>Or try one of these:</span>
              <Link href="/assessment">Assessment</Link>
              <Link href="/resources">Resources</Link>
              <Link href="/about">About</Link>
            </nav>
          </div>

          <div className={styles.artwork} aria-hidden="true">
            <div className={styles.skyPanel}>
              <p>
                Different problems.
                <br />A clearer path.
              </p>
              <span />
            </div>
            <div className={styles.blushPanel}>
              <p>
                Better systems.
                <br />
                Brighter tomorrows.
              </p>
              <span />
            </div>
            <div className={styles.routeCard}>
              <div className={styles.errorCode}>
                4<span>0</span>4
              </div>
              <Image
                alt=""
                aria-hidden="true"
                className={styles.routeLine}
                height={120}
                src="/assets/images/not-found-route.svg"
                width={360}
              />
              <p className={styles.routeCaption}>
                Some paths
                <br />
                lead elsewhere.
                <br />
                Good things still do.
              </p>
            </div>
          </div>
        </div>

        <aside className={styles.helpCard} aria-label="Finding help">
          <div className={styles.helpIcon} aria-hidden="true">
            <Compass />
          </div>
          <div className={styles.helpCopy}>
            <h2>Need help finding something?</h2>
            <p>
              Browse our services or get in touch and we’ll point you in the
              right direction.
            </p>
          </div>
          <Link className={styles.contactLink} href="/contact">
            Contact us <ArrowRight aria-hidden="true" />
          </Link>
        </aside>
      </div>
    </section>
  );
}
