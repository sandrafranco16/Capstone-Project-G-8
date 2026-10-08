import { cn } from "@/lib/cn";
import type { ServicePractice } from "../services.types";
import { SectionHeading } from "./section-heading";
import { ServicesGrid } from "./services-grid";
import { ServiceLink } from "./service-link";

type ServiceSectionProps = {
  practice: ServicePractice;
  number: number;
  tinted?: boolean;
};
export function ServiceSection({
  practice,
  number,
  tinted,
}: ServiceSectionProps) {
  return (
    <section
      id={practice.id}
      aria-labelledby={`${practice.id}-heading`}
      className={cn("svc-sec", tinted && "bg-mist")}
    >
      <div className="wrap svc-grid2">
        <div className="rv">
          <SectionHeading
            id={`${practice.id}-heading`}
            eyebrow={String(number).padStart(2, "0")}
            title={practice.title}
            description={practice.description}
          />
          <div className="svc-actions">
            <ServiceLink
              href={practice.enquiry.href}
              aria-label={`${practice.enquiry.label}: ${practice.title}`}
            >
              <span>{practice.enquiry.label}</span>
            </ServiceLink>
            <ServiceLink
              href={practice.booking.href}
              variant={practice.booking.variant}
            >
              <span>{practice.booking.label}</span>
            </ServiceLink>
          </div>
        </div>
        <ServicesGrid offers={practice.offers} />
      </div>
    </section>
  );
}
