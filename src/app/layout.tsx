import type { Metadata } from "next";
import type { ReactNode } from "react";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import {
  organizationJsonLd,
  serializeJsonLd,
} from "@/features/seo/structured-data";
import { siteConfig } from "@/lib/site-config";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | AI capability and governance`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  // Pages set their own title, description and url; these are the shared
  // defaults. The social image comes from app/opengraph-image.tsx.
  openGraph: {
    type: "website",
    locale: "en_AU",
    siteName: "BITDOT Consulting Services",
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en-AU">
      <body>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main-content">{children}</main>
        <SiteFooter />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: serializeJsonLd(organizationJsonLd()),
          }}
        />
      </body>
    </html>
  );
}
