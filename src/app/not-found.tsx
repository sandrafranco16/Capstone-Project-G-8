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
              <br className={styles.desktopBreak} /> Let’s get you back on track.
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
              <Link href="/blog">Resources</Link>
              <Link href="/about">About</Link>
            </nav>
          </div>
        </div>

        <aside className={styles.helpCard} aria-label="Finding help">
          <div className={styles.helpIcon} aria-hidden="true">
            <svg viewBox="0 0 48 48" fill="none" focusable="false">
              <circle cx="24" cy="24" r="17" />
              <path d="m30 18-4 8-8 4 4-8 8-4Z" />
            </svg>
          </div>
          <div className={styles.helpCopy}>
            <h2>Need help finding something?</h2>
            <p>
              Browse our services or get in touch and we’ll point you in the
              right direction.
            </p>
          </div>
          <Link className={styles.contactLink} href="/contact">
            Contact us <span aria-hidden="true">→</span>
          </Link>
        </aside>
      </div>
    </section>
  );
}
