"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

import { getRailState, getRailStep, type RailState } from "./rail-state";
import styles from "./testimonials-section.module.css";

const initialState: RailState = {
  scrollable: false,
  canScrollBack: false,
  canScrollForward: false,
};

type TestimonialsRailProps = {
  /** Section heading, laid out beside the arrow controls. */
  header: ReactNode;
  label: string;
  children: ReactNode;
};

/** Horizontal scroll-snap rail whose arrows page one card at a time. */
export function TestimonialsRail({
  header,
  label,
  children,
}: TestimonialsRailProps) {
  const railRef = useRef<HTMLUListElement>(null);
  const [state, setState] = useState(initialState);

  const sync = useCallback(() => {
    const rail = railRef.current;
    if (rail) setState(getRailState(rail));
  }, []);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    sync();
    const observer = new ResizeObserver(sync);
    observer.observe(rail);
    rail.addEventListener("scroll", sync, { passive: true });
    return () => {
      observer.disconnect();
      rail.removeEventListener("scroll", sync);
    };
  }, [sync]);

  function move(direction: -1 | 1) {
    const rail = railRef.current;
    const card = rail?.firstElementChild;
    if (!rail || !card) return;

    const gap = parseFloat(getComputedStyle(rail).columnGap) || 0;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    rail.scrollBy({
      left: getRailStep(card.getBoundingClientRect().width, gap) * direction,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  }

  return (
    <>
      <div className={styles.head}>
        {header}
        <div className={styles.nav} hidden={!state.scrollable}>
          <button
            type="button"
            aria-label="Previous testimonial"
            disabled={!state.canScrollBack}
            onClick={() => move(-1)}
          >
            <ArrowIcon path="M15 6l-6 6 6 6" />
          </button>
          <button
            type="button"
            aria-label="Next testimonial"
            disabled={!state.canScrollForward}
            onClick={() => move(1)}
          >
            <ArrowIcon path="M9 6l6 6-6 6" />
          </button>
        </div>
      </div>
      {/* Focusable while it overflows so keyboard users can scroll it with arrow keys. */}
      <ul
        ref={railRef}
        className={styles.rail}
        role="list"
        aria-label={label}
        tabIndex={state.scrollable ? 0 : undefined}
      >
        {children}
      </ul>
    </>
  );
}

function ArrowIcon({ path }: { path: string }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d={path} />
    </svg>
  );
}
