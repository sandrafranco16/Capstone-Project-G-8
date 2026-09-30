"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import styles from "../services.module.css";

type ServicesFrameProps = {
  children: ReactNode;
  className?: string;
};

/** Enhances only Services content; the shared site shell is untouched. */
export function ServicesFrame({ children, className }: ServicesFrameProps) {
  const frame = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = frame.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      root.querySelectorAll(".rv").forEach((el) => el.classList.add("in"));
      return;
    }
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
    <div ref={frame} className={cn(styles.page, className)}>
      {children}
    </div>
  );
}
