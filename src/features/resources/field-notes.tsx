"use client";

import Link from "next/link";
import { useRef, useState, type CSSProperties, type PointerEvent } from "react";

import { resourceClassNames as rc } from "./resource-class-names";

type FieldNote = {
  title: string;
  category: string;
  excerpt: string;
  /** Two-stop gradient for the card art. */
  art: [string, string];
};

/** BITDOT's own articles, shown as a stacked card carousel. */
const fieldNotes: readonly FieldNote[] = [
  {
    title: "The real hurdle with AI isn't the software, it is us",
    category: "Change leadership",
    excerpt:
      "Psychological and psychosocial safety decide whether adoption succeeds. How to steady a team while the ground moves under it.",
    art: ["#4a2fb8", "#e0479e"],
  },
  {
    title: "The imperative of AI governance for NFPs and SMBs",
    category: "AI governance",
    excerpt:
      "Smaller organisations carry the same AI risks as large enterprises on a fraction of the resources. A practical route through.",
    art: ["#a32a0b", "#ff9a5c"],
  },
  {
    title: "Beyond data governance",
    category: "Data governance",
    excerpt:
      "What one of the country's largest agencies taught us about turning an information framework into organisational excellence.",
    art: ["#0a3d91", "#3fb6e0"],
  },
  {
    title: "Data literacy in the times of AI and data science",
    category: "Data literacy",
    excerpt:
      "Data doesn't make decisions, people do. On setting honest expectations between business users and the models informing them.",
    art: ["#07563f", "#7fdcaa"],
  },
];

const MAX_SLIVERS = 5;

function position(offset: number) {
  if (offset < 0) return "before";
  if (offset > MAX_SLIVERS) return "after";
  return String(offset);
}

function ArrowIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {direction === "left" ? (
        <path d="M19 12H5M11 18l-6-6 6-6" />
      ) : (
        <path d="M5 12h14M13 6l6 6-6 6" />
      )}
    </svg>
  );
}

export function FieldNotes() {
  const [open, setOpen] = useState(0);
  const swipeStart = useRef<number | null>(null);
  const go = (step: number) =>
    setOpen((current) =>
      Math.min(fieldNotes.length - 1, Math.max(0, current + step)),
    );

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse") swipeStart.current = event.clientX;
  };
  const onPointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (swipeStart.current === null) return;
    const distance = event.clientX - swipeStart.current;
    swipeStart.current = null;
    if (Math.abs(distance) > 40) go(distance < 0 ? 1 : -1);
  };

  return (
    <>
      <div className={rc("clock-bar stack-bar")}>
        <div className={rc("stack-nav")}>
          <span className={rc("stack-count")} aria-hidden="true">
            {`${open + 1} / ${fieldNotes.length}`}
          </span>
          <button
            type="button"
            className={rc("stack-arrow")}
            aria-label="Previous article"
            disabled={open === 0}
            onClick={() => go(-1)}
          >
            <ArrowIcon direction="left" />
          </button>
          <button
            type="button"
            className={rc("stack-arrow")}
            aria-label="Next article"
            disabled={open === fieldNotes.length - 1}
            onClick={() => go(1)}
          >
            <ArrowIcon direction="right" />
          </button>
        </div>
      </div>
      <p className="visually-hidden" aria-live="polite">
        {`Showing article ${open + 1} of ${fieldNotes.length}: ${fieldNotes[open].title}`}
      </p>
      <div
        className={rc("stack")}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={() => {
          swipeStart.current = null;
        }}
      >
        {fieldNotes.map((note, index) => {
          const offset = index - open;
          const isOpen = offset === 0;
          return (
            <article
              key={note.title}
              className={rc("ev")}
              data-pos={position(offset)}
              aria-hidden={isOpen ? undefined : true}
            >
              <div
                className={rc("ev-panel art")}
                style={
                  {
                    "--art-a": note.art[0],
                    "--art-b": note.art[1],
                  } as CSSProperties
                }
              >
                <div className={rc("ev-top")}>
                  <span className={rc("tag on-dark")}>BITDOT field note</span>
                </div>
                <span className={rc("ev-date")}>{note.category}</span>
                <span className={rc("ev-spine")}>{note.category}</span>
                {!isOpen && (
                  <button
                    type="button"
                    className={rc("ev-open")}
                    tabIndex={-1}
                    aria-label={`Show ${note.title}`}
                    onClick={() => setOpen(index)}
                  />
                )}
              </div>
              <div className={rc("ev-body")}>
                <div className={rc("ev-copy")}>
                  <h3>{note.title}</h3>
                  <p>{note.excerpt}</p>
                </div>
                <Link
                  className={rc("src ev-cta")}
                  href={{
                    pathname: "/contact",
                    query: { article: note.title },
                  }}
                  tabIndex={isOpen ? undefined : -1}
                >
                  {"Ask us for the article"}
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </>
  );
}
