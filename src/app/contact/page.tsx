import type { Metadata } from "next";

import { Container } from "@/components/ui/container";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <>
      <header className="page-header">
        <Container>
          <p className="eyebrow">Contact BITDOT</p>
          <h1>Tell us what you want to achieve.</h1>
        </Container>
      </header>
      <section className="section">
        <Container className="prose">
          <p className="notice">
            The server-side validation boundary is ready. Enable the form after the
            client confirms the email provider, recipient, consent text and retention
            process.
          </p>
        </Container>
      </section>
    </>
  );
}
