"use client";

import { useState } from "react";
import { validateCalComUrl } from "@/features/booking/utils";

export interface CalEmbedProps {
  url: string;
  title?: string;
  height?: number | string;
  onClose?: () => void;
}

export function CalEmbed({
  url,
  title = "Cal.com Consultation Booking Widget",
  height = "680px",
  onClose,
}: CalEmbedProps) {
  const [isLoading, setIsLoading] = useState(true);
  const safeUrl = validateCalComUrl(url);
  const resolvedHeight = typeof height === "number" ? `${height}px` : height;

  return (
    <div className="cal-embed-wrapper" role="region" aria-label={title}>
      {onClose && (
        <div className="cal-embed__bar">
          <span className="cal-embed__bar-title">{title}</span>
          <button
            type="button"
            onClick={onClose}
            className="cal-embed__close"
            aria-label="Close booking embed"
          >
            Close ✕
          </button>
        </div>
      )}

      <div className="cal-embed__viewport" style={{ height: resolvedHeight }}>
        {isLoading && (
          <div className="cal-embed__loader">
            <div className="cal-embed__spinner" />
            <p>Loading booking calendar...</p>
          </div>
        )}

        <iframe
          src={safeUrl}
          title={title}
          width="100%"
          height="100%"
          style={{ border: "none", display: "block" }}
          onLoad={() => setIsLoading(false)}
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
          allow="camera; microphone; autoplay; clipboard-write; encrypted-media"
        />
      </div>

      <div className="cal-embed__fallback">
        <span>Having trouble loading the interactive scheduler?</span>
        <a href={safeUrl} target="_blank" rel="noopener noreferrer">
          Open directly on Cal.com ↗
        </a>
      </div>
    </div>
  );
}
