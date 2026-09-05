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

  return (
    <div
      className="cal-embed-wrapper"
      style={{
        width: "100%",
        position: "relative",
        borderRadius: "0.75rem",
        overflow: "hidden",
        border: "1px solid rgba(229, 231, 235, 0.8)",
        backgroundColor: "#ffffff",
        boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.05)",
      }}
      role="region"
      aria-label={title}
    >
      {onClose && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0.75rem 1.25rem",
            backgroundColor: "#f9fafb",
            borderBottom: "1px solid #e5e7eb",
          }}
        >
          <span style={{ fontWeight: 600, fontSize: "0.875rem", color: "#374151" }}>
            {title}
          </span>
          <button
            type="button"
            onClick={onClose}
            style={{
              padding: "0.25rem 0.75rem",
              fontSize: "0.875rem",
              borderRadius: "0.375rem",
              border: "1px solid #d1d5db",
              backgroundColor: "#ffffff",
              color: "#4b5563",
              cursor: "pointer",
            }}
            aria-label="Close booking embed"
          >
            Close ✕
          </button>
        </div>
      )}

      {isLoading && (
        <div
          style={{
            height: typeof height === "number" ? `${height}px` : height,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#f9fafb",
            color: "#6b7280",
            gap: "0.75rem",
          }}
        >
          <div
            style={{
              width: "2rem",
              height: "2rem",
              border: "3px solid #e5e7eb",
              borderTopColor: "#2563eb",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
            }}
          />
          <p style={{ fontSize: "0.875rem" }}>Loading booking calendar...</p>
        </div>
      )}

      <iframe
        src={safeUrl}
        title={title}
        width="100%"
        height={typeof height === "number" ? `${height}px` : height}
        style={{
          border: "none",
          display: isLoading ? "none" : "block",
        }}
        onLoad={() => setIsLoading(false)}
        loading="lazy"
        allow="camera; microphone; autoplay; clipboard-write; encrypted-media"
      />

      <div
        style={{
          padding: "0.75rem 1.25rem",
          backgroundColor: "#f9fafb",
          borderTop: "1px solid #e5e7eb",
          fontSize: "0.8125rem",
          color: "#6b7280",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "0.5rem",
        }}
      >
        <span>Having trouble loading the interactive scheduler?</span>
        <a
          href={safeUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: "#2563eb",
            fontWeight: 500,
            textDecoration: "underline",
          }}
        >
          Open directly on Cal.com ↗
        </a>
      </div>
    </div>
  );
}
