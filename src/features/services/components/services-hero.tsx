import type { ServicePractice, ServicesHeroContent } from "../services.types";
import { ServiceLink } from "./service-link";

type ServicesHeroProps = {
  content: ServicesHeroContent;
  practices: readonly ServicePractice[];
};
export function ServicesHero({ content, practices }: ServicesHeroProps) {
  return (
    <section className="p-hero">
      <span className="blob hero-blob-blue" aria-hidden="true" />
      <span className="blob hero-blob-coral" aria-hidden="true" />
      <div className="wrap">
        <p className="label rv">{content.eyebrow}</p>
        <h1 className="display rv">
          {content.title} <em>{content.emphasis}</em>.
        </h1>
        <p className="lead rv">{content.description}</p>
        <nav className="jump rv" aria-label="Service areas">
          {practices.map(({ id, navigationLabel }) => (
            <ServiceLink key={id} href={`#${id}`} variant="ghost">
              {navigationLabel}
            </ServiceLink>
          ))}
        </nav>
      </div>
    </section>
  );
}
