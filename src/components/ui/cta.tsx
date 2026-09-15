import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

import styles from "./cta.module.css";

type ActionStyle = { variant?: "primary" | "secondary" };
export type CtaActionProps = ActionStyle & (
  | (Omit<ComponentPropsWithoutRef<"a">, "href"> & { href: string })
  | (ComponentPropsWithoutRef<"button"> & { href?: never })
);

/** Supply href for navigation; otherwise renders a native button. */
export function CtaAction(props: CtaActionProps) {
  if (typeof props.href === "string") {
    const { variant = "primary", className, rel, ...linkProps } = props;
    return <Link {...linkProps} rel={rel ?? (props.target === "_blank" ? "noopener noreferrer" : undefined)}
      className={[styles.action, styles[variant], className].filter(Boolean).join(" ")} />;
  }

  const { variant = "primary", className, type = "button", ...buttonProps } = props;
  return <button {...buttonProps} type={type}
    className={[styles.action, styles[variant], className].filter(Boolean).join(" ")} />;
}

export type CtaProps = {
  title: string;
  description?: ReactNode;
  children: ReactNode;
  className?: string;
};

/** Compose one or more CtaAction elements as children. Heading level is h2. */
export function Cta({ title, description, children, className }: CtaProps) {
  return (
    <section className={[styles.panel, className].filter(Boolean).join(" ")}>
      <h2 className={styles.title}>{title}</h2>
      {description && <div className={styles.description}>{description}</div>}
      <div className={styles.actions}>{children}</div>
    </section>
  );
}
