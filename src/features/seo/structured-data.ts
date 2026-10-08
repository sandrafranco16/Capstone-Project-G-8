import { aboutLeadership } from "@/features/about/content";
import { siteConfig } from "@/lib/site-config";

/**
 * Postal address for structured data. Kept next to the builder so the
 * test can check it still matches siteConfig.address if that changes.
 */
export const organizationAddress = {
  locality: "Osborne Park",
  region: "WA",
  postalCode: "6017",
  country: "AU",
} as const;

/**
 * schema.org description of the business, rendered once in the root
 * layout so search engines can show the name, logo and contact details.
 * No sameAs links: the client asked for no social profiles on the site.
 */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${siteConfig.url}/#organization`,
    name: "BITDOT Consulting Services",
    legalName: "BITDOT Consulting Services Pty Ltd",
    alternateName: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/images/brand/bitdot-mark.svg`,
    description: siteConfig.description,
    email: siteConfig.email,
    telephone: siteConfig.phoneHref.replace(/^tel:/, ""),
    address: {
      "@type": "PostalAddress",
      addressLocality: organizationAddress.locality,
      addressRegion: organizationAddress.region,
      postalCode: organizationAddress.postalCode,
      addressCountry: organizationAddress.country,
    },
    areaServed: organizationAddress.country,
    founder: aboutLeadership.founders.map((founder) => ({
      "@type": "Person",
      name: founder.name,
      jobTitle: founder.role,
    })),
  };
}

/**
 * JSON for a <script type="application/ld+json"> tag. Escapes the same
 * characters as the Services FAQ so content can never close the tag early.
 */
export function serializeJsonLd(data: unknown) {
  return JSON.stringify(data)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026");
}
