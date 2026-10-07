import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ImageResponse } from "next/og";

import { ogStyles } from "@/features/seo/opengraph-image.styles";
import { socialImage } from "@/features/seo/social-image";
import { siteConfig } from "@/lib/site-config";

// Shown when a page link is shared on LinkedIn, Teams, Slack and similar.
// Built once at build time and inherited by every route.
export const alt = socialImage.alt;
export const size = { width: socialImage.width, height: socialImage.height };
export const contentType = "image/png";

// The mark is read from disk rather than imported: an `import` of an .svg
// gives a static asset URL, not the file contents, and Satori needs the
// image inline as a data URI. This is the pattern the Next.js OG docs use.
const brandMarkPath = join(
  process.cwd(),
  "public/images/brand/bitdot-mark.svg",
);

export default async function OpenGraphImage() {
  const mark = await readFile(brandMarkPath, "base64");
  const domain = new URL(siteConfig.url).host.replace(/^www\./, "");

  return new ImageResponse(
    <div style={ogStyles.frame}>
      <div style={ogStyles.brandRow}>
        <img
          src={`data:image/svg+xml;base64,${mark}`}
          width={88}
          height={88}
          alt=""
        />
        <span style={ogStyles.wordmark}>BITDOT</span>
      </div>
      <div style={ogStyles.copy}>
        <span style={ogStyles.headline}>AI capability and governance</span>
        <span style={ogStyles.description}>{siteConfig.description}</span>
      </div>
      <span style={ogStyles.domain}>{domain}</span>
    </div>,
    size,
  );
}
