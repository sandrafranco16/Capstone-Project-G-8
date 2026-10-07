import { ServiceLink } from "@/features/services/components/service-link";

import type { ContactDetailsContent, ContactMethod } from "../contact.types";
import { CopyButton } from "./copy-button";
import { SpotlightCard } from "./spotlight-card";

function MethodIcon({ href }: Pick<ContactMethod, "href">) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {href.startsWith("mailto:") ? (
        <>
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <path d="m2 7 10 6 10-6" />
        </>
      ) : (
        <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" />
      )}
    </svg>
  );
}

function ArrowUpRight() {
  return (
    <svg
      className="details-arrow"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

export function ContactDetails({
  content,
}: {
  content: ContactDetailsContent;
}) {
  return (
    <aside className="contact-aside" aria-labelledby="contact-details-heading">
      <SpotlightCard className="details-panel">
        <span className="panel-glow panel-glow-coral" aria-hidden="true" />
        <span className="panel-glow panel-glow-blue" aria-hidden="true" />
        <span className="panel-grid" aria-hidden="true" />

        <div className="panel-body">
          <h2 id="contact-details-heading">{content.title}</h2>
          <p className="details-company">{content.company}</p>

          <ul className="details-list">
            {content.methods.map((method) => (
              <li key={method.href} className="details-card">
                <a className="details-link" href={method.href}>
                  <span className="details-icon">
                    <MethodIcon href={method.href} />
                  </span>
                  <span className="details-text">
                    <span className="details-label">{method.label}</span>
                    <span className="details-value">
                      {method.value}
                      <ArrowUpRight />
                    </span>
                  </span>
                </a>
                <CopyButton value={method.value} label={method.label} />
              </li>
            ))}
          </ul>

          <div className="details-booking">
            <h3>{content.booking.title}</h3>
            <p>{content.booking.description}</p>
            <ServiceLink
              href={content.booking.href}
              variant="coral"
              className="booking-btn"
            >
              {content.booking.label}
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </ServiceLink>
          </div>
        </div>
      </SpotlightCard>
    </aside>
  );
}
