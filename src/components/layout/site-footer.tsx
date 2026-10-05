import Link from "next/link";

import { Container } from "@/components/ui/container";
import { siteConfig } from "@/lib/site-config";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <Container className="site-footer__inner">
        <div className="site-footer__brand">
          <strong>{siteConfig.name}</strong>
          <p>{siteConfig.description}</p>
        </div>

        <div className="site-footer__group">
          <strong>Explore</strong>
          <nav aria-label="Footer navigation">
            <Link href="/services">Services</Link>
            <Link href="/assessment">Assessment</Link>
            <Link href="/resources">Resources</Link>
            <Link href="/about">About</Link>
            <Link href="/legal">Privacy and legal</Link>
          </nav>
        </div>

        <address className="site-footer__group">
          <strong>Contact</strong>
          <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
          <a href={siteConfig.phoneHref}>{siteConfig.phoneDisplay}</a>
          <span>{siteConfig.address}</span>
        </address>
      </Container>
    </footer>
  );
}
