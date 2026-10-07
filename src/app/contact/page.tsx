import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { ContactDetails } from "@/features/contact/components/contact-details";
import { ContactForm } from "@/features/contact/components/contact-form";
import { ContactHero } from "@/features/contact/components/contact-hero";
import { SpotlightCard } from "@/features/contact/components/spotlight-card";
import {
  contactDetails,
  contactHero,
} from "@/features/contact/contact.content";
import styles from "@/features/contact/contact.module.css";
import { cn } from "@/lib/cn";

/** Self-hosted via next/font; scoped to the Contact design through a CSS variable. */
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with BITDOT to discuss AI governance, career coaching, training, or advisory services.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div className={cn(styles.page, inter.variable)}>
      <ContactHero content={contactHero} />
      <section className="section contact-sec">
        <div className="wrap contact-grid">
          <SpotlightCard className="form-card">
            <ContactForm />
          </SpotlightCard>
          <ContactDetails content={contactDetails} />
        </div>
      </section>
    </div>
  );
}
