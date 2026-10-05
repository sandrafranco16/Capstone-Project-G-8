"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Container } from "@/components/ui/container";

const navigation = [
  { href: "/services", label: "Services" },
  { href: "/assessment", label: "Assessment" },
  { href: "/blog", label: "Insights" },
  { href: "/resources", label: "Resources" },
  { href: "/about", label: "About" },
] as const;

function isCurrentPage(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const menuPanel = useRef<HTMLElement>(null);

  const closeMenu = (returnFocus = false) => {
    setMenuOpen(false);

    if (returnFocus) {
      window.requestAnimationFrame(() => menuButton.current?.focus());
    }
  };

  useEffect(() => {
    if (!menuOpen) return;

    const panel = menuPanel.current;
    const button = menuButton.current;

    if (!panel || !button) return;

    const links = Array.from(
      panel.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      ),
    );

    links[0]?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeMenu(true);
        return;
      }

      if (event.key !== "Tab") return;

      const focusableElements = [button, ...links];
      const firstElement = focusableElements[0];
      const lastElement = focusableElements.at(-1);

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement?.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  return (
    <header className="site-header">
      <Container className="site-header__inner">
        <Link
          className="brand"
          href="/"
          aria-label="BITDOT home"
          aria-current={pathname === "/" ? "page" : undefined}
          onClick={() => closeMenu()}
        >
          <span className="brand__mark" aria-hidden="true" />
          BITDOT
        </Link>

        <button
          ref={menuButton}
          className="menu-toggle"
          type="button"
          aria-label={
            menuOpen ? "Close navigation menu" : "Open navigation menu"
          }
          aria-controls="primary-navigation"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((current) => !current)}
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </button>

        <nav
          ref={menuPanel}
          id="primary-navigation"
          className="primary-navigation"
          data-open={menuOpen}
          aria-label="Primary navigation"
        >
          <ul className="nav-list">
            {navigation.map((item) => {
              const current = isCurrentPage(pathname, item.href);

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={current ? "page" : undefined}
                    onClick={() => closeMenu()}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <Link
            className="button button--small mobile-booking"
            href="/booking"
            aria-current={
              isCurrentPage(pathname, "/booking") ? "page" : undefined
            }
            onClick={() => closeMenu()}
          >
            Book a session
          </Link>
        </nav>

        <Link
          className="button button--small desktop-booking"
          href="/booking"
          aria-current={
            isCurrentPage(pathname, "/booking") ? "page" : undefined
          }
        >
          Book a session
        </Link>
      </Container>
    </header>
  );
}
