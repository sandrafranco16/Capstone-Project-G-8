"use client";

import { useEffect, useRef, useState } from "react";
import type { KeyboardEvent, ReactNode } from "react";

export function useScrollRail(children: ReactNode) {
  const railRef = useRef<HTMLUListElement>(null);
  const [edges, setEdges] = useState({
    overflow: false,
    start: true,
    end: true,
  });

  useEffect(() => {
    const element = railRef.current;
    if (!element) return;
    const sync = () => {
      const max = element.scrollWidth - element.clientWidth;
      const next = {
        overflow: max > 1,
        start: element.scrollLeft <= 1,
        end: element.scrollLeft >= max - 1,
      };
      setEdges((previous) =>
        previous.overflow === next.overflow &&
        previous.start === next.start &&
        previous.end === next.end
          ? previous
          : next,
      );
    };
    const observer = new ResizeObserver(sync);
    observer.observe(element);
    Array.from(element.children).forEach((child) => observer.observe(child));
    element.addEventListener("scroll", sync, { passive: true });
    sync();
    return () => {
      observer.disconnect();
      element.removeEventListener("scroll", sync);
    };
  }, [children]);

  function move(direction: -1 | 1) {
    const element = railRef.current;
    if (!element) return;
    const first = element.firstElementChild;
    const gap = Number.parseFloat(getComputedStyle(element).columnGap) || 0;
    const step =
      (first?.getBoundingClientRect().width ?? element.clientWidth) + gap;
    element.scrollBy({
      left: direction * step,
      behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
  }

  function onKeyDown(event: KeyboardEvent<HTMLUListElement>) {
    // Leave keyboard events from links, inputs and other card controls alone.
    if (event.target !== event.currentTarget) return;
    // Modified keys belong to browser, document and assistive-technology shortcuts.
    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey)
      return;
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      move(event.key === "ArrowLeft" ? -1 : 1);
    } else if (event.key === "Home" || event.key === "End") {
      event.preventDefault();
      event.currentTarget.scrollTo({
        left: event.key === "Home" ? 0 : event.currentTarget.scrollWidth,
        behavior: "instant",
      });
    }
  }

  return { railRef, edges, move, onKeyDown };
}
