import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

import styles from "./accordion.module.css";

type AccordionItem = {
  id: string;
  title: string;
  content: ReactNode;
  defaultOpen?: boolean;
};

type AccordionProps = {
  items: readonly AccordionItem[];
  className?: string;
};

/** Independent disclosures: multiple answers can stay open, including without JS. */
export function Accordion({ items, className }: AccordionProps) {
  if (items.length === 0) return null;

  return (
    <div className={cn(styles.accordion, className)}>
      {items.map(({ id, title, content, defaultOpen }) => (
        <details key={id} className={styles.item} open={defaultOpen}>
          <summary className={styles.trigger}>
            <span>{title}</span>
            <span className={styles.icon} aria-hidden="true">
              +
            </span>
          </summary>
          <div className={styles.content}>{content}</div>
        </details>
      ))}
    </div>
  );
}
