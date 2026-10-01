import Link from "next/link";

import { Container } from "@/components/ui/container";

const navigation = [
  { href: "/services", label: "Services" },
  { href: "/assessment", label: "Assessment" },
  { href: "/blog", label: "Insights" },
  { href: "/resources", label: "Resources" },
  { href: "/about", label: "About" },
] as const;

export function SiteHeader() {
  return (
    <header className="site-header">
      <Container className="site-header__inner">
        <Link className="brand" href="/" aria-label="BITDOT home">
          <span className="brand__mark" aria-hidden="true" />
          BITDOT
        </Link>
        <nav aria-label="Primary navigation">
          <ul className="nav-list">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <Link className="button button--small" href="/booking">
          Book a session
        </Link>
      </Container>
    </header>
  );
}
