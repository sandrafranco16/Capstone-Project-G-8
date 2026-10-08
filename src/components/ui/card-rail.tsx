"use client";

import { Children, useId } from "react";
import type { ReactNode } from "react";

import { useScrollRail } from "../../hooks/use-scroll-rail";
import { cn } from "../../lib/cn";

import styles from "./card-rail.module.css";

type CardRailProps = {
  title: string;
  children: ReactNode;
  className?: string;
};

/** A left-to-right, independently scrollable list; card content belongs to callers. */
export function CardRail({ title, children, className }: CardRailProps) {
  const id = useId();
  const cards = Children.toArray(children);
  const { railRef, edges, move, onKeyDown } = useScrollRail(children);

  if (!cards.length) return null;

  return (
    <section
      aria-labelledby={`${id}-title`}
      className={cn(styles.section, className)}
    >
      <div className={styles.header}>
        <h2 id={`${id}-title`}>{title}</h2>
        <div className={styles.controls} hidden={!edges.overflow}>
          <button
            type="button"
            aria-label={`Previous cards: ${title}`}
            aria-controls={id}
            disabled={edges.start}
            onClick={() => move(-1)}
          >
            ←
          </button>
          <button
            type="button"
            aria-label={`Next cards: ${title}`}
            aria-controls={id}
            disabled={edges.end}
            onClick={() => move(1)}
          >
            →
          </button>
        </div>
      </div>
      <ul
        id={id}
        ref={railRef}
        dir="ltr"
        className={styles.rail}
        aria-labelledby={`${id}-title`}
        tabIndex={0}
        onKeyDown={onKeyDown}
      >
        {cards.map((card, index) => (
          <li
            key={typeof card === "object" && "key" in card ? card.key : index}
            className={styles.item}
          >
            {card}
          </li>
        ))}
      </ul>
    </section>
  );
}
