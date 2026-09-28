import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

type ServiceLinkProps = ComponentPropsWithoutRef<"a"> & {
  href: string;
  variant?: "primary" | "coral" | "ghost" | "on-dark";
  large?: boolean;
};
/** Native navigation also clears styles/scripts when leaving older demo routes. */
export function ServiceLink({
  variant = "coral",
  large,
  className,
  children,
  ...props
}: ServiceLinkProps) {
  return (
    <a
      {...props}
      className={cn("btn", `btn-${variant}`, large && "btn-lg", className)}
    >
      {children}
    </a>
  );
}
