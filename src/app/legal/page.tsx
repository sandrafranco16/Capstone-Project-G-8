import type { Metadata } from "next";
import type { ReactNode } from "react";

import { Container } from "@/components/ui/container";

import styles from "./legal.module.css";

export const metadata: Metadata = {
  title: {
    absolute: "Privacy, Terms & Disclaimer — BITDOT Consulting Services",
  },
  description:
    "BITDOT Consulting Services privacy policy, terms of use, disclaimer and accessibility statement.",
  robots: {
    index: false,
    follow: false,
  },
};

const legalSections = [
  { id: "privacy", label: "Privacy" },
  { id: "terms", label: "Terms of use" },
  { id: "disclaimer", label: "Disclaimer" },
  { id: "accessibility", label: "Accessibility" },
] as const;

function LegalSection({
  children,
  id,
  title,
}: {
  children: ReactNode;
  id: string;
  title: string;
}) {
  return (
    <section id={id} className={styles.section} aria-labelledby={`${id}-title`}>
      <h2 id={`${id}-title`}>{title}</h2>
      {children}
    </section>
  );
}

export default function LegalPage() {
  return (
    <>
      <header className="page-header">
        <Container className={styles.header}>
          <p className="eyebrow">Legal</p>
          <h1>Privacy, terms &amp; accessibility.</h1>
          <p className="lead">
            Find out how this site handles your information, the terms for using
            it, the limits of its content and how to report an accessibility
            issue.
          </p>
          <nav className={styles.navigation} aria-label="On this page">
            {legalSections.map(({ id, label }) => (
              <a key={id} href={`#${id}`}>
                {label}
              </a>
            ))}
          </nav>
          <aside className={styles.draftNotice} role="note">
            <strong>Draft — awaiting BITDOT approval</strong>
            <span>
              This page is a working draft. BITDOT must confirm its data
              handling practices, service terms and accessibility status before
              this copy is published as an approved policy.
            </span>
          </aside>
        </Container>
      </header>

      <Container className={styles.content}>
        <LegalSection id="privacy" title="Privacy Policy">
          <p>
            BITDOT Consulting Services Pty Ltd (&quot;BITDOT&quot;,
            &quot;we&quot;) respects your privacy. This draft explains how the
            website is designed to handle personal information. The final policy
            must be checked against BITDOT&apos;s actual practices and any
            obligations under the Privacy Act 1988 (Cth).
          </p>

          <h3>What we collect</h3>
          <ul>
            <li>
              Your name, email address and message when you submit the contact
              form.
            </li>
            <li>
              Details you provide to the booking service when you schedule a
              consultation.
            </li>
            <li>
              Technical information needed to operate and protect the site,
              including information processed by our hosting and spam protection
              providers.
            </li>
            <li>
              Website usage information if analytics tools are enabled in the
              future. Any such tools and choices about their use must be
              documented here before activation.
            </li>
          </ul>

          <h3>How we use it</h3>
          <ul>
            <li>
              To respond to enquiries and arrange appointments you request.
            </li>
            <li>
              To operate, secure and improve the website and its services.
            </li>
          </ul>

          <h3>Service providers and overseas processing</h3>
          <p>
            The contact form sends your details through our website and email
            delivery provider. Booking is handled by a separate booking
            provider. Spam protection may be provided by Cloudflare Turnstile
            when configured. These providers may process information outside
            Australia. BITDOT must confirm the providers, their locations and
            any overseas disclosures before approving this policy.
          </p>

          <h3>The AI readiness assessment</h3>
          <p>
            The homepage assessment calculates its result in your browser.
            Individual answers are not sent to the BITDOT server through the
            assessment. Its code can send the selected pathway, score and result
            category to analytics if analytics are later enabled; the privacy
            policy must be updated before that happens.
          </p>

          <h3>Access, correction and complaints</h3>
          <p>
            To ask about the information BITDOT holds about you, request access
            or correction, or raise a privacy concern, email{" "}
            <a href="mailto:info@bitdot.com.au">info@bitdot.com.au</a>. Please
            describe your request so BITDOT can investigate and respond. If you
            are unsatisfied with the response and the Privacy Act applies, you
            may also contact the{" "}
            <a
              href="https://www.oaic.gov.au/privacy/privacy-complaints"
              rel="external"
            >
              Office of the Australian Information Commissioner
            </a>
            .
          </p>
          <p className={styles.note}>
            Before approval, BITDOT must confirm retention periods, security
            measures, all third-party recipients, any overseas disclosures and
            its complaint handling process.
          </p>
        </LegalSection>

        <LegalSection id="terms" title="Terms of Use">
          <p>
            This website provides information about BITDOT&apos;s services.
            Please use it lawfully and respect the rights of other visitors and
            content owners.
          </p>
          <ul>
            <li>
              Content is general information and does not replace advice
              tailored to your circumstances.
            </li>
            <li>
              Consulting, coaching, training and advisory work is subject to a
              separate written engagement. Using this site or sending an enquiry
              does not create a client relationship.
            </li>
            <li>
              BITDOT&apos;s original site content, branding and design may not
              be reproduced without permission. Third-party names and marks
              belong to their respective owners.
            </li>
            <li>
              External services and websites, including the booking service,
              have their own terms and privacy practices.
            </li>
            <li>
              BITDOT may update this website and these terms. Check this page
              for the current version.
            </li>
          </ul>
          <p className={styles.note}>
            BITDOT must approve the final terms, including governing law and any
            liability clauses, before publication.
          </p>
        </LegalSection>

        <LegalSection id="disclaimer" title="Disclaimer">
          <p>
            Information on this website, including articles and the AI readiness
            assessment, is for general educational purposes. It is not legal,
            financial or other professional advice for your circumstances. Rules
            and guidance about AI can change; check primary sources and seek
            tailored advice before acting.
          </p>
          <p>
            The AI readiness assessment provides an indicative self-evaluation.
            Its result is not a certification, audit or assurance of compliance.
          </p>
          <p>
            Links to third-party websites are provided for convenience. BITDOT
            does not control their content or availability.
          </p>
        </LegalSection>

        <LegalSection id="accessibility" title="Accessibility">
          <p>
            BITDOT aims to make this website usable by as many people as
            possible and uses the{" "}
            <a href="https://www.w3.org/TR/WCAG22/" rel="external">
              Web Content Accessibility Guidelines (WCAG) 2.2
            </a>{" "}
            Level AA as a design target. The site has not yet completed a formal
            accessibility audit, so we do not claim full conformance.
          </p>
          <p>
            We are working to support keyboard navigation, visible focus,
            readable text and reduced-motion preferences. Some embedded or
            third-party services may have accessibility limits outside our
            control.
          </p>
          <p>
            If you encounter a barrier or need information in another format,
            email <a href="mailto:info@bitdot.com.au">info@bitdot.com.au</a>.
            Please include the page address and a description of the issue so
            BITDOT can investigate and offer another way to access the
            information.
          </p>
        </LegalSection>
      </Container>
    </>
  );
}
