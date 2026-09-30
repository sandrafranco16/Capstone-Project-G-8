import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";
import type { ServiceLinkVariant } from "../services.types";

type ServiceLinkProps = ComponentPropsWithoutRef<typeof Link> & {
  href: string;
  variant?: ServiceLinkVariant;
  large?: boolean;
};
export function ServiceLink({
  variant = "coral",
  large,
  className,
  children,
  ...props
}: ServiceLinkProps) {
  return (
    <Link
      {...props}
      className={cn("btn", `btn-${variant}`, large && "btn-lg", className)}
    >
      {children}
    </Link>
  );
}
