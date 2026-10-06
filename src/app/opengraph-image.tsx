import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ImageResponse } from "next/og";

import { socialImage } from "@/features/seo/social-image";
import { siteConfig } from "@/lib/site-config";

// Shown when a page link is shared on LinkedIn, Teams, Slack and similar.
// Built once at build time and inherited by every route.
export const alt = socialImage.alt;
export const size = { width: socialImage.width, height: socialImage.height };
export const contentType = "image/png";

const colours = {
  canvas: "#fcfaf5",
  ink: "#0b1526",
  inkSoft: "#23304a",
  coral: "#f0552b",
};

export default async function OpenGraphImage() {
  const mark = await readFile(
    join(process.cwd(), "public/images/brand/bitdot-mark.svg"),
    "base64",
  );
  const domain = new URL(siteConfig.url).host.replace(/^www\./, "");

  return new ImageResponse(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "100%",
        height: "100%",
        padding: "72px 80px",
        background: colours.canvas,
        color: colours.ink,
        borderTop: `14px solid ${colours.coral}`,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
        <img
          src={`data:image/svg+xml;base64,${mark}`}
          width={88}
          height={88}
          alt=""
        />
        <span style={{ fontSize: 46, letterSpacing: -1 }}>BITDOT</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <span style={{ fontSize: 72, lineHeight: 1.05, letterSpacing: -2 }}>
          AI capability and governance
        </span>
        <span style={{ fontSize: 32, color: colours.inkSoft, maxWidth: 920 }}>
          {siteConfig.description}
        </span>
      </div>
      <span style={{ fontSize: 28, color: colours.coral }}>{domain}</span>
    </div>,
    size,
  );
}
