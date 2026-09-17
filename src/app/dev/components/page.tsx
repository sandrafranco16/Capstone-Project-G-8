import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Accordion } from "@/components/ui/accordion";
import { Container } from "@/components/ui/container";
import { Cta, CtaAction } from "@/components/ui/cta";
import { CardRail } from "@/components/ui/card-rail";
import { Profile } from "@/components/ui/profile";
import { services } from "@/features/services/content";

export const metadata: Metadata = {
  title: "Component preview",
  robots: { index: false, follow: false },
};

export default function ComponentPreviewPage() {
  if (process.env.NODE_ENV !== "development") notFound();

  return (
    <Container>
      <header className="section">
        <p className="eyebrow">BIT-26 · Development preview</p>
        <h1>Shared components</h1>
        <p>Accordion, call-to-action, card rail and profile examples for page authors.</p>
      </header>
      <div className="section">
        <CardRail title="Explore our services">
          {services.map((service) => (
            <article key={service.slug} className="card">
              <h3>{service.title}</h3>
              <p>{service.summary}</p>
              <Link href={`/services/${service.slug}`}>Explore {service.title}</Link>
            </article>
          ))}
        </CardRail>
      </div>
      <div className="section">
        <CardRail title="Meet the founders">
          <Profile name="Hemna Goyal" role="Co-Founder & Managing Director" specialty="Management Specialist" variant="maroon" photo={{ src: "/images/people/hemna-goyal.jpg", alt: "Hemna Goyal" }}>
            <p>B.Arch. and Master of Project &amp; Program Management.</p>
            <p>Governance and strategic decision-making.</p>
          </Profile>
          <Profile name="Vaibhav Agrawal" role="Co-Founder & Director" specialty="Data & AI Specialist" variant="navy" photo={{ src: "/images/people/vaibhav-agrawal.jpg", alt: "Vaibhav Agrawal" }}>
            <p>GAICD, B.Tech, and M.Tech in Data &amp; Analytics.</p>
            <p>AI governance and strategic decision-making.</p>
          </Profile>
        </CardRail>
      </div>
      <div className="section">
        <CardRail title="Single card and missing photo example">
          <Profile name="Example team member with a longer name" role="Example role with a longer description to verify mobile wrapping">
            <p>Preview fixture: optional photo and specialty are omitted.</p>
          </Profile>
        </CardRail>
        <CardRail title="Empty list example">{[]}</CardRail>
      </div>
      <section aria-labelledby="faq-heading">
        <h2 id="faq-heading">Frequently asked questions</h2>
        <Accordion
          items={[
            {
              id: "audience",
              title: "Do you work with individuals or organisations?",
              content: (
                <p>
                  Both. Individuals usually start with career coaching or the
                  free readiness assessment. Organisations engage us for board
                  training, team workshops, governance advisory and AI strategy.
                </p>
              ),
            },
            {
              id: "training",
              title: "Who is BITDOT's board training for?",
              content: (
                <p>
                  Board members, non-executive directors, executive leadership
                  teams and senior management involved in strategy and risk. The
                  program assumes no technical background.
                </p>
              ),
            },
            {
              id: "follow-up",
              title: "What happens after the training?",
              content: (
                <p>
                  We stay involved. Custom strategy development, tool selection,
                  hands-on workshops, vendor introductions, integration planning
                  and fit-for-purpose customisation are all available as
                  continued partnership.
                </p>
              ),
            },
          ]}
        />
      </section>
      <div className="section">
        <Cta
          title="Let's talk about your next step"
          description="Get in touch to discuss tailored support for you or your organisation."
        >
          <CtaAction href="/booking">Book a consultation</CtaAction>
          <CtaAction href="/contact" variant="secondary">
            Contact BITDOT
          </CtaAction>
        </Cta>
      </div>
      <section aria-labelledby="states-heading" className="section">
        <h2 id="states-heading">Additional states</h2>
        <Accordion
          items={[
            {
              id: "open",
              title: "Initially open answer with a link",
              defaultOpen: true,
              content: (
                <p>
                  Read more about <Link href="/services">our services</Link>.
                </p>
              ),
            },
            {
              id: "long",
              title:
                "A longer question that should wrap comfortably on a narrow screen without pushing the expand control off the page",
              content: (
                <ul>
                  <li>Rich content can include lists.</li>
                  <li>Each answer opens independently.</li>
                </ul>
              ),
            },
          ]}
        />
        <form className="button-row">
          <label>
            Example text{" "}
            <input name="example" defaultValue="Edit me, then reset" />
          </label>
          <CtaAction type="reset" variant="secondary">
            Reset example
          </CtaAction>
          <CtaAction disabled>Unavailable action</CtaAction>
        </form>
      </section>
    </Container>
  );
}
