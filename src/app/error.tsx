"use client";

import { CircleAlert, RotateCcw } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef } from "react";

import styles from "./error.module.css";

export default function ErrorPage({
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
    <section className={styles.page} aria-labelledby="page-error-heading">
      <div className={styles.panel}>
        <div className={styles.icon} aria-hidden="true">
          <CircleAlert />
        </div>
        <p className={styles.eyebrow}>Let’s get you back on track</p>
        <h1 id="page-error-heading" ref={heading} tabIndex={-1}>
          We couldn’t load this page.
        </h1>
        <p className={styles.description}>
          Something interrupted this page. Try again, or return to the homepage
          to find what you need.
        </p>
        <div className={styles.actions}>
          <button className={styles.retry} type="button" onClick={retry}>
            <RotateCcw aria-hidden="true" /> Try again
          </button>
          <Link className={styles.home} href="/">
            Return home
          </Link>
        </div>
        <p className={styles.help}>
          Still having trouble? <Link href="/contact">Contact us</Link>, or
          explore the <Link href="/resources">Resources hub</Link>.
        </p>
      </div>
    </section>
  );
}
