import type { Metadata } from "next";

import styles from "@/features/about/about.module.css";
import { AboutCta } from "@/features/about/components/about-cta";
import { AboutHero } from "@/features/about/components/about-hero";
import { AboutStory } from "@/features/about/components/about-story";
import { CredibilityBand } from "@/features/about/components/credibility-band";
import { LeadershipSection } from "@/features/about/components/leadership-section";
import { ValuesSection } from "@/features/about/components/values-section";

const description =
  "BITDOT Consulting Services brings world-class AI, data and governance expertise within everyone's reach. Meet co-founders Hemna Goyal and Vaibhav Agrawal GAICD.";

export const metadata: Metadata = {
  title: { absolute: "About BITDOT — Our Mission and Leadership" },
  description,
  alternates: { canonical: "/about" },
  openGraph: {
    type: "website",
    url: "/about",
    title: "About BITDOT — Our Mission and Leadership",
    description,
  },
};

/** The shared site header and footer come from the root layout. */
export default function AboutPage() {
  return (
    <div className={styles.page}>
      <AboutHero />
      <AboutStory />
      <CredibilityBand />
      <LeadershipSection />
      <ValuesSection />
      <AboutCta />
    </div>
  );
}
