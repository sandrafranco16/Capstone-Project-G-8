import type { CTAContent } from "../services.types";
import { ServiceLink } from "./service-link";
export function CTASection({ content }: { content: CTAContent }) {
  return (
    <section
      className="section tight closing"
      aria-labelledby="services-cta-heading"
    >
      <div className="wrap">
        <div className="band rv">
          <span className="dots" aria-hidden="true" />
          <p className="label on-dark">{content.eyebrow}</p>
          <h2 id="services-cta-heading" className="display big">
            {content.title}
          </h2>
          <p className="lead">{content.description}</p>
          <div className="closing-actions">
            {content.actions.map(({ href, label, variant }) => (
              <ServiceLink key={href} href={href} variant={variant} large>
                {label}
              </ServiceLink>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
