import { Accordion } from "@/components/ui/accordion";

import type { FAQContent } from "../services.types";
export function FAQSection({ content }: { content: FAQContent }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: content.items.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };
  return (
    <section
      id="faq"
      className="section faq"
      aria-labelledby="services-faq-heading"
    >
      <div className="wrap">
        <div className="sec-head rv">
          <p className="label c-blue">{content.eyebrow}</p>
          <h2 id="services-faq-heading" className="display big">
            {content.title}
          </h2>
        </div>
        <Accordion
          className="services-faq"
          classNames={{ item: "rv", content: "faq-answer", icon: "faq-icon" }}
          items={content.items.map(({ id, question, answer }) => ({
            id,
            anchorId: id,
            title: question,
            content: <p>{answer}</p>,
          }))}
        />
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData)
            .replace(/</g, "\\u003c")
            .replace(/>/g, "\\u003e")
            .replace(/&/g, "\\u0026"),
        }}
      />
    </section>
  );
}
