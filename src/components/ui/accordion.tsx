import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

import styles from "./accordion.module.css";

type AccordionItem = {
  id: string;
  anchorId?: string;
  title: string;
  content: ReactNode;
  defaultOpen?: boolean;
};

type AccordionProps = {
  items: readonly AccordionItem[];
  className?: string;
  classNames?: Partial<Record<"item" | "content" | "icon", string>>;
};

/** Independent disclosures: multiple answers can stay open, including without JS. */
export function Accordion({ items, className, classNames }: AccordionProps) {
  if (items.length === 0) return null;

  return (
    <div className={cn(styles.accordion, className)}>
      {items.map(({ id, anchorId, title, content, defaultOpen }) => (
        <details
          key={id}
          id={anchorId}
          className={cn(styles.item, classNames?.item)}
          open={defaultOpen}
        >
          <summary className={styles.trigger}>
            <span>{title}</span>
            <span
              className={cn(styles.icon, classNames?.icon)}
              aria-hidden="true"
            >
              +
            </span>
          </summary>
          <div className={cn(styles.content, classNames?.content)}>
            {content}
          </div>
        </details>
      ))}
    </div>
  );
}
