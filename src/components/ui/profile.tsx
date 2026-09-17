import Image from "next/image";
import type { ReactNode } from "react";
import type { ImageSource } from "../../types/image";
import { cn } from "../../lib/cn";
import { getInitials } from "../../lib/get-initials";

import styles from "./profile.module.css";

type ProfileProps = {
  name: string;
  role?: string;
  specialty?: string;
  photo?: ImageSource;
  variant?: "maroon" | "navy" | "forest";
  children?: ReactNode;
  className?: string;
};

/** Person card with an h3; compose under the page or rail's h2. */
export function Profile({
  name,
  role,
  specialty,
  photo,
  variant = "forest",
  children,
  className,
}: ProfileProps) {
  const initials = getInitials(name);

  return (
    <article className={cn(styles.profile, styles[variant], className)}>
      <div className={styles.photo}>
        {photo ? (
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            sizes="(max-width: 480px) 100vw, 340px"
            className={styles.image}
          />
        ) : (
          <span className={styles.initials} aria-hidden="true">
            {initials}
          </span>
        )}
      </div>
      <div className={styles.body}>
        <h3 className={styles.name}>{name}</h3>
        {role && <p className={styles.role}>{role}</p>}
        {specialty && <p className={styles.specialty}>{specialty}</p>}
        {children && <div className={styles.description}>{children}</div>}
      </div>
    </article>
  );
}
