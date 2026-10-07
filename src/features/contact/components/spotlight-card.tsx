"use client";

import type { ComponentPropsWithoutRef, PointerEvent } from "react";

import { cn } from "@/lib/cn";

export function SpotlightCard({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<"div">) {
  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
    card.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
  }

  return (
    <div
      {...props}
      className={cn("spotlight", className)}
      onPointerMove={handlePointerMove}
    >
      {children}
    </div>
  );
}
