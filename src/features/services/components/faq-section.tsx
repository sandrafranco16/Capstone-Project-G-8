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
        {content.items.map(({ id, question, answer }) => (
          <details key={id} className="rv">
            <summary>{question}</summary>
            <p>{answer}</p>
          </details>
        ))}
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
