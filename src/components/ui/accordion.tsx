import type { ReactNode } from "react";

import styles from "./accordion.module.css";

export type AccordionItem = {
  id: string;
  title: string;
  content: ReactNode;
  defaultOpen?: boolean;
};

export type AccordionProps = {
  items: readonly AccordionItem[];
  className?: string;
};

/** Independent disclosures: multiple answers can stay open, including without JS. */
export function Accordion({ items, className }: AccordionProps) {
  if (items.length === 0) return null;

  return (
    <div className={[styles.accordion, className].filter(Boolean).join(" ")}>
      {items.map(({ id, title, content, defaultOpen }) => (
        <details key={id} className={styles.item} open={defaultOpen}>
          <summary className={styles.trigger}>
            <span>{title}</span>
            <span className={styles.icon} aria-hidden="true">+</span>
          </summary>
          <div className={styles.content}>{content}</div>
        </details>
      ))}
    </div>
  );
}
