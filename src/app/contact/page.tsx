import type { Metadata } from "next";

import { Container } from "@/components/ui/container";
import { ContactForm } from "@/components/contact/contact-form";

export const metadata: Metadata = {
  title: "Contact | BITDOT",
  description:
    "Get in touch with BITDOT to discuss AI governance, career coaching, training, or advisory services.",
};

export default function ContactPage() {
  return (
    <>
      <header className="page-header">
        <Container>
          <p className="eyebrow">Contact BITDOT</p>
          <h1>Tell us what you want to achieve.</h1>
          <p className="lead">
            Fill in the form below and we will get back to you as soon as
            possible.
          </p>
        </Container>
      </header>
      <section className="section">
        <Container className="prose">
          <ContactForm />
        </Container>
      </section>
    </>
  );
}
