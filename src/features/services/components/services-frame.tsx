"use client";

import { useEffect, useRef, type ReactNode } from "react";
import styles from "../services.module.css";

/** Enhances only Services content; the shared site shell is untouched. */
export function ServicesFrame({ children }: { children: ReactNode }) {
  const frame = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = frame.current;
    if (!root) return;
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.1 },
    );
    root.dataset.enhanced = "true";
    root
      .querySelectorAll(".rv")
      .forEach((element) => observer.observe(element));
    return () => {
      observer.disconnect();
      delete root.dataset.enhanced;
    };
  }, []);
  return (
    <div ref={frame} className={styles.page}>
      {children}
    </div>
  );
}
