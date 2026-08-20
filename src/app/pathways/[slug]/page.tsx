import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Container } from "@/components/ui/container";
import { getPathway, pathways } from "@/features/pathways/content";
import { getService } from "@/features/services/content";

type PathwayPageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return pathways.map((pathway) => ({ slug: pathway.slug }));
}

export async function generateMetadata({ params }: PathwayPageProps): Promise<Metadata> {
  const pathway = getPathway((await params).slug);
  return pathway
    ? { title: pathway.title, description: pathway.summary }
    : { title: "Pathway not found" };
}

export default async function PathwayPage({ params }: PathwayPageProps) {
  const pathway = getPathway((await params).slug);
  if (!pathway) notFound();

  const relevantServices = pathway.serviceSlugs
    .map(getService)
    .filter((service) => service !== undefined);

  return (
    <>
      <header className="page-header">
        <Container>
          <p className="eyebrow">{pathway.audience}</p>
          <h1>{pathway.title}</h1>
          <p className="lead">{pathway.summary}</p>
        </Container>
      </header>
      <section className="section">
        <Container>
          <h2>Relevant services</h2>
          <div className="card-grid">
            {relevantServices.map((service) => (
              <article className="card" key={service.slug}>
                <h3>{service.title}</h3>
                <p>{service.summary}</p>
                <Link href={`/services/${service.slug}`}>View service →</Link>
              </article>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
