import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Bot, ShieldCheck, Sparkles, Workflow } from "lucide-react";

import { bookingHref } from "@/features/booking/links";

import styles from "./automation-lab.module.css";

export const metadata: Metadata = {
  title: "Automation Lab",
  description:
    "BITDOT's Automation Lab is coming soon — practical AI workflows, tool experiments and responsible automation.",
};

const features = [
  {
    icon: Workflow,
    title: "Workflow experiments",
    description:
      "Practical examples that turn repetitive work into useful, repeatable AI-assisted workflows.",
  },
  {
    icon: Bot,
    title: "Tool walkthroughs",
    description:
      "Clear demonstrations of AI tools applied to real work rather than generic demos.",
  },
  {
    icon: ShieldCheck,
    title: "Responsible adoption",
    description:
      "Human checks, governance and sensible controls built into every automation workflow.",
  },
] as const;

export default function AutomationLabPage() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.glowOne} aria-hidden="true" />
        <div className={styles.glowTwo} aria-hidden="true" />

        <div className={styles.inner}>
          <div className={styles.badge}>
            <Sparkles size={16} aria-hidden="true" />
            Automation Lab
            <span>Coming soon</span>
          </div>

          <h1>
            Practical AI workflows
            <span> are on the way.</span>
          </h1>

          <p className={styles.lead}>
            We&apos;re building a hands-on space for experimenting with AI
            tools, workflow automation and repeatable ways of working — grounded
            in real business needs.
          </p>

          <div className={styles.actions}>
            <Link
              className={styles.primaryAction}
              href={bookingHref("training-discussion")}
            >
              Book a session
              <ArrowRight size={18} aria-hidden="true" />
            </Link>

            <Link className={styles.secondaryAction} href="/services">
              Explore our services
            </Link>
          </div>

          <div className={styles.features}>
            {features.map(({ icon: Icon, title, description }) => (
              <article className={styles.feature} key={title}>
                <span className={styles.icon} aria-hidden="true">
                  <Icon size={22} strokeWidth={2} />
                </span>

                <h2>{title}</h2>
                <p>{description}</p>
              </article>
            ))}
          </div>

          <p className={styles.note}>
            No signup required. We&apos;ll launch the Lab once the content is
            ready for public use.
          </p>
        </div>
      </section>
    </div>
  );
}
