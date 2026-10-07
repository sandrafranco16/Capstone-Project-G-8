import type { CSSProperties } from "react";

/**
 * Styles for app/opengraph-image.tsx.
 *
 * The preview is rendered by next/og (Satori), which only understands inline
 * style objects. Class names from globals.css or a CSS module are ignored, and
 * CSS custom properties are not resolved, so the brand values are repeated
 * here as plain hex instead of var(--...). Keep them in sync with the theme.
 */
export const ogColours = {
  canvas: "#fcfaf5",
  ink: "#0b1526",
  inkSoft: "#23304a",
  coral: "#f0552b",
} as const;

export const ogStyles = {
  frame: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    width: "100%",
    height: "100%",
    padding: "72px 80px",
    background: ogColours.canvas,
    color: ogColours.ink,
    borderTop: `14px solid ${ogColours.coral}`,
  },
  brandRow: { display: "flex", alignItems: "center", gap: 24 },
  wordmark: { fontSize: 46, letterSpacing: -1 },
  copy: { display: "flex", flexDirection: "column", gap: 24 },
  headline: { fontSize: 72, lineHeight: 1.05, letterSpacing: -2 },
  description: { fontSize: 32, color: ogColours.inkSoft, maxWidth: 920 },
  domain: { fontSize: 28, color: ogColours.coral },
} satisfies Record<string, CSSProperties>;
