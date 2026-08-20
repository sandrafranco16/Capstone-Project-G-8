import Link from "next/link";

import { Container } from "@/components/ui/container";

export default function NotFound() {
  return (
    <section className="section">
      <Container className="prose">
        <p className="eyebrow">404</p>
        <h1>Page not found.</h1>
        <Link className="button" href="/">
          Return home
        </Link>
      </Container>
    </section>
  );
}
