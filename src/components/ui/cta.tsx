import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

import styles from "./cta.module.css";

const ctaActionVariants = cva(styles.action, {
  variants: {
    variant: { primary: styles.primary, secondary: styles.secondary },
  },
  defaultVariants: { variant: "primary" },
});

type ActionStyle = {
  variant?: NonNullable<VariantProps<typeof ctaActionVariants>["variant"]>;
};
type CtaActionProps = ActionStyle &
  (
    | (Omit<ComponentPropsWithoutRef<"a">, "href"> & { href: string })
    | (ComponentPropsWithoutRef<"button"> & { href?: never })
  );

/** Supply href for navigation; otherwise renders a native button. */
export function CtaAction(props: CtaActionProps) {
  if (typeof props.href === "string") {
    const { variant = "primary", className, rel, ...linkProps } = props;
    return (
      <Link
        {...linkProps}
        rel={
          rel ?? (props.target === "_blank" ? "noopener noreferrer" : undefined)
        }
        className={cn(ctaActionVariants({ variant }), className)}
      />
    );
  }

  const {
    variant = "primary",
    className,
    type = "button",
    ...buttonProps
  } = props;
  return (
    <button
      {...buttonProps}
      type={type}
      className={cn(ctaActionVariants({ variant }), className)}
    />
  );
}

type CtaProps = {
  title: string;
  description?: ReactNode;
  children: ReactNode;
  className?: string;
};

/** Compose one or more CtaAction elements as children. Heading level is h2. */
export function Cta({ title, description, children, className }: CtaProps) {
  return (
    <section className={cn(styles.panel, className)}>
      <h2 className={styles.title}>{title}</h2>
      {description && <div className={styles.description}>{description}</div>}
      <div className={styles.actions}>{children}</div>
    </section>
  );
}
