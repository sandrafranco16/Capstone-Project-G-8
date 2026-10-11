"use client";

/* eslint-disable @next/next/no-html-link-for-pages -- Recovery links must load a fresh document after a root layout failure. */

import { useEffect, useRef } from "react";

import { siteConfig } from "@/lib/site-config";
import "@/styles/tokens.css";
import styles from "./global-error.module.css";

/** Own document and recovery links remain available when the root layout fails. */
export default function GlobalError({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  const heading = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    heading.current?.focus();
  }, [error]);

  return (
    <html lang="en-AU">
      <head>
        <title>Temporarily unavailable | BITDOT</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={styles.document}>
        <main className={styles.main} aria-labelledby="global-error-heading">
          <div className={styles.panel}>
            <a className={styles.brand} href="/" aria-label="BITDOT home">
              BITDOT
            </a>
            <p className={styles.eyebrow}>Let’s get you back on track</p>
            <h1 id="global-error-heading" ref={heading} tabIndex={-1}>
              We couldn’t load BITDOT.
            </h1>
            <p>
              Something interrupted the site. Try again, or return to the
              homepage to load it afresh.
            </p>
            <div className={styles.actions}>
              <button type="button" onClick={retry}>
                Try again
              </button>
              <a href="/">Return home</a>
            </div>
            <p className={styles.help}>
              Still having trouble? Email{" "}
              <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.
            </p>
          </div>
        </main>
      </body>
    </html>
  );
}
