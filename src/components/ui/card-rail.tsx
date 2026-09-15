"use client";

import { Children, useEffect, useId, useRef, useState } from "react";
import type { KeyboardEvent, ReactNode } from "react";

import styles from "./card-rail.module.css";

export type CardRailProps = {
  title: string;
  children: ReactNode;
  className?: string;
};

/** A left-to-right, independently scrollable list; card content belongs to callers. */
export function CardRail({ title, children, className }: CardRailProps) {
  const id = useId();
  const rail = useRef<HTMLUListElement>(null);
  const [edges, setEdges] = useState({ overflow: false, start: true, end: true });
  const cards = Children.toArray(children);

  useEffect(() => {
    const element = rail.current;
    if (!element) return;
    const sync = () => {
      const max = element.scrollWidth - element.clientWidth;
      const next = { overflow: max > 1, start: element.scrollLeft <= 1, end: element.scrollLeft >= max - 1 };
      setEdges((previous) => previous.overflow === next.overflow && previous.start === next.start && previous.end === next.end ? previous : next);
    };
    const observer = new ResizeObserver(sync);
    observer.observe(element);
    Array.from(element.children).forEach((child) => observer.observe(child));
    element.addEventListener("scroll", sync, { passive: true });
    sync();
    return () => {
      observer.disconnect();
      element.removeEventListener("scroll", sync);
    };
  }, [children]);

  function move(direction: -1 | 1) {
    const element = rail.current;
    if (!element) return;
    const first = element.firstElementChild;
    const gap = Number.parseFloat(getComputedStyle(element).columnGap) || 0;
    const step = (first?.getBoundingClientRect().width ?? element.clientWidth) + gap;
    element.scrollBy({ left: direction * step, behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  }

  function onKeyDown(event: KeyboardEvent<HTMLUListElement>) {
    // Leave keyboard events from links, inputs and other card controls alone.
    if (event.target !== event.currentTarget) return;
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      move(event.key === "ArrowLeft" ? -1 : 1);
    } else if (event.key === "Home" || event.key === "End") {
      event.preventDefault();
      event.currentTarget.scrollTo({ left: event.key === "Home" ? 0 : event.currentTarget.scrollWidth, behavior: "instant" });
    }
  }

  if (!cards.length) return null;

  return (
    <section aria-labelledby={`${id}-title`} className={[styles.section, className].filter(Boolean).join(" ")}>
      <div className={styles.header}>
        <h2 id={`${id}-title`}>{title}</h2>
        <div className={styles.controls} hidden={!edges.overflow}>
          <button type="button" aria-label={`Previous cards: ${title}`} aria-controls={id} disabled={edges.start} onClick={() => move(-1)}>←</button>
          <button type="button" aria-label={`Next cards: ${title}`} aria-controls={id} disabled={edges.end} onClick={() => move(1)}>→</button>
        </div>
      </div>
      <ul id={id} ref={rail} dir="ltr" className={styles.rail} aria-labelledby={`${id}-title`} tabIndex={0} onKeyDown={onKeyDown}>
        {cards.map((card, index) => <li key={typeof card === "object" && "key" in card ? card.key : index} className={styles.item}>{card}</li>)}
      </ul>
    </section>
  );
}
