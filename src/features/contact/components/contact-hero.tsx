import { Fragment, type CSSProperties } from "react";

import type { ContactHeroContent } from "../contact.types";

function BlurWords({ text, offset = 0 }: { text: string; offset?: number }) {
  return text.split(" ").map((word, index) => (
    <Fragment key={`${word}-${index}`}>
      <span
        className="blur-word"
        style={{ "--i": offset + index } as CSSProperties}
      >
        {word}
      </span>{" "}
    </Fragment>
  ));
}

export function ContactHero({ content }: { content: ContactHeroContent }) {
  const titleWords = content.title.split(" ").length;

  return (
    <section className="p-hero">
      <span className="blob hero-blob-blue" aria-hidden="true" />
      <span className="blob hero-blob-coral" aria-hidden="true" />
      <div className="wrap">
        <p className="label hero-fade">{content.eyebrow}</p>
        <h1 className="display">
          <BlurWords text={content.title} />
          <em
            className="blur-word shiny-text"
            style={{ "--i": titleWords } as CSSProperties}
          >
            {content.emphasis}
          </em>
          .
        </h1>
        <p className="lead hero-fade hero-fade-late">{content.description}</p>
      </div>
    </section>
  );
}
