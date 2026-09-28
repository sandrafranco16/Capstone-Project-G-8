import { AboutCta } from "./components/about-cta";
import { AboutHero } from "./components/about-hero";
import { AboutStory } from "./components/about-story";
import { CredibilityBand } from "./components/credibility-band";
import { LeadershipSection } from "./components/leadership-section";
import { ValuesSection } from "./components/values-section";

import styles from "./about.module.css";

/** About page body; the shared site header and footer come from the root layout. */
export function AboutPage() {
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
