import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Container } from "@/components/ui/container";
import { CtaAction } from "@/components/ui/cta";
import { getService, services } from "@/features/services/content";

type ServicePageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const service = getService((await params).slug);
  return service
    ? { title: service.title, description: service.summary }
    : { title: "Service not found" };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const service = getService((await params).slug);
  if (!service) notFound();

  return (
    <>
      <header className="page-header">
        <Container>
          <p className="eyebrow">BITDOT service</p>
          <h1>{service.title}</h1>
          <p className="lead">{service.summary}</p>
        </Container>
      </header>
      <section className="section">
        <Container className="prose">
          <h2>Expected outcomes</h2>
          <ul>
            {service.outcomes.map((outcome) => (
              <li key={outcome}>{outcome}</li>
            ))}
          </ul>
          <div className="button-row">
            <CtaAction href="/booking">Book a consultation</CtaAction>
            <CtaAction variant="secondary" href="/contact">
              Contact BITDOT
            </CtaAction>
          </div>
        </Container>
      </section>
    </>
  );
}
