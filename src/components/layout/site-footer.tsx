import Link from "next/link";

import { Container } from "@/components/ui/container";
import { siteConfig } from "@/lib/site-config";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <Container className="site-footer__inner">
        <div>
          <strong>{siteConfig.name}</strong>
          <p>{siteConfig.description}</p>
        </div>
        <nav aria-label="Footer navigation">
          <Link href="/contact">Contact</Link>
          <Link href="/legal">Privacy and legal</Link>
        </nav>
      </Container>
    </footer>
  );
}
