"use client";

import { useEffect, useRef, type MouseEvent } from "react";

import { trackClientEvent } from "@/features/analytics/client";

import { resourceClassNames as rc } from "./resource-class-names";
import { ResourcesMain } from "./resources-main";

/** Adds progressive reveal and analytics to the Resources content. */
export function ResourcesContent() {
  const frame = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = frame.current;
    if (!root) return;

    const reveal = root.querySelectorAll(`.${rc("rv")}`);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      reveal.forEach((element) => element.classList.add(rc("in")));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(rc("in"));
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.1 },
    );

    reveal.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    const link = target.closest("a");
    if (
      !link ||
      !link.matches(`.${rc("src")}, .${rc("fw")}, .${rc("rd")}[href]`)
    ) {
      return;
    }

    trackClientEvent("resource_clicked", {
      href: link.getAttribute("href") ?? "internal",
    });
  };

  return (
    <div ref={frame} className={rc("page")} onClick={handleClick}>
      <ResourcesMain />
    </div>
  );
}
