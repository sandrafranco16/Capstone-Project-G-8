import { Cta, CtaAction } from "@/components/ui/cta";
import { cn } from "@/lib/cn";
import { siteConfig } from "@/lib/site-config";

import { aboutCta } from "../content";

import styles from "../about.module.css";

export function AboutCta() {
  return (
    <div className={cn(styles.section, styles.onPaper, styles.cta)}>
      <div className={styles.wrap}>
        <Cta
          className={styles.ctaPanel}
          title={aboutCta.title}
          description={<p>{aboutCta.description}</p>}
        >
          <CtaAction href={aboutCta.bookingHref}>
            {aboutCta.bookingLabel}
          </CtaAction>
          <CtaAction href={`mailto:${siteConfig.email}`} variant="secondary">
            {siteConfig.email}
          </CtaAction>
        </Cta>
      </div>
    </div>
  );
}
