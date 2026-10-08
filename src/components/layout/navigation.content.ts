import { siteConfig } from "@/lib/site-config";

/**
 * Shared header and footer links, matching the design of the prototype
 * pages (`demo/index.html`, `demo/about.html`). Prototype file links are mapped to app routes, and the
 * client feedback is applied: no "from Western Australia" tagline and no
 * AWS / ACS logos.
 */

export type NavItem = {
  href: string;
  label: string;
  /** Short status tag shown next to the label, e.g. "Soon". */
  tag?: string;
};

export const primaryNavigation: readonly NavItem[] = [
  { href: "/services", label: "Services" },
  { href: "/assessment", label: "Assessment" },
  { href: "/automation-lab", label: "Automation Lab", tag: "Soon" },
  { href: "/resources", label: "Resources" },
  { href: "/about", label: "About" },
];

export const headerActions = {
  contact: { href: "/contact", label: "Contact" },
  booking: { href: "/booking", label: "Book a session" },
} as const;

export type FooterItem = {
  /** Omit for plain text, such as the street address. */
  href?: string;
  label: string;
};

export type FooterColumn = {
  title: string;
  links: readonly FooterItem[];
};

export const footerTagline =
  "AI and data governance solutions that fuel business growth.";

export const footerColumns: readonly FooterColumn[] = [
  {
    title: "Pathways",
    links: [
      { href: "/services#career", label: "Launch my AI career" },
      { href: "/services#training", label: "Learn AI & automation" },
      { href: "/services#governance", label: "Govern AI responsibly" },
      { href: "/services#crisis", label: "Prepare for AI risks" },
    ],
  },
  {
    title: "Explore",
    links: [
      { href: "/#flagship", label: "Mastering AI Governance" },
      { href: "/automation-lab", label: "Automation Lab" },
      { href: "/blog", label: "Insights" },
      { href: "/resources", label: "Resource hub" },
      { href: "/about", label: "About us" },
    ],
  },
  {
    title: "Contact",
    links: [
      { href: `mailto:${siteConfig.email}`, label: siteConfig.email },
      { href: siteConfig.phoneHref, label: siteConfig.phoneDisplay },
      { label: siteConfig.address },
      { href: "/booking", label: "Book a session" },
    ],
  },
];

export const legalLinks: readonly NavItem[] = [
  { href: "/legal#privacy", label: "Privacy" },
  { href: "/legal#terms", label: "Terms" },
  { href: "/legal#disclaimer", label: "Disclaimer" },
  { href: "/legal#accessibility", label: "Accessibility" },
];
