"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/cn";

import { BrandMark } from "./brand-mark";
import { headerActions, primaryNavigation } from "./navigation.content";
import styles from "./site-header.module.css";

/** Hash links (e.g. "/#lab") point into a page section, never a current page. */
function isCurrentPage(pathname: string, href: string) {
  if (href.includes("#")) return false;
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const progress = useRef<HTMLDivElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const menuPanel = useRef<HTMLElement>(null);

  const current = (href: string) =>
    isCurrentPage(pathname, href) ? ("page" as const) : undefined;

  const closeMenu = (returnFocus = false) => {
    setMenuOpen(false);

    if (returnFocus) {
      window.requestAnimationFrame(() => menuButton.current?.focus());
    }
  };

  // Scroll progress bar and the header's scrolled shadow.
  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;
      const max = scrollHeight - clientHeight;
      if (progress.current) {
        progress.current.style.transform = `scaleX(${max > 0 ? scrollTop / max : 0})`;
      }
      setScrolled(scrollTop > 8);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Mobile menu: focus the first link, trap Tab inside, close on Escape.
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
    <>
      <div ref={progress} className={styles.progress} aria-hidden="true" />
      <header className={cn(styles.header, scrolled && styles.scrolled)}>
        <div className={styles.nav}>
          <Link
            className={styles.brand}
            href="/"
            aria-label="BITDOT home"
            aria-current={pathname === "/" ? "page" : undefined}
            onClick={() => closeMenu()}
          >
            <span className={styles.wordmark}>bitd</span>
            <BrandMark className={styles.mark} />
            <span className={styles.wordmark}>t</span>
          </Link>

          <nav className={styles.desktopNav} aria-label="Primary navigation">
            <ul className={styles.links}>
              {primaryNavigation.map(({ href, label, tag }) => (
                <li key={href}>
                  <Link href={href} aria-current={current(href)}>
                    {label}
                    {tag && <span className={styles.tag}>{tag}</span>}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.actions}>
            <Link
              className={cn(styles.btn, styles.btnGhost)}
              href={headerActions.contact.href}
              aria-current={current(headerActions.contact.href)}
            >
              {headerActions.contact.label}
            </Link>
            <Link
              className={cn(styles.btn, styles.btnPrimary)}
              href={headerActions.booking.href}
              aria-current={current(headerActions.booking.href)}
            >
              {headerActions.booking.label}
            </Link>
          </div>

          <button
            ref={menuButton}
            className={styles.burger}
            type="button"
            aria-label={
              menuOpen ? "Close navigation menu" : "Open navigation menu"
            }
            aria-controls="mobile-navigation"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <svg
              width="26"
              height="26"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              {menuOpen ? (
                <path d="M6 6l12 12M18 6 6 18" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>

        <nav
          ref={menuPanel}
          id="mobile-navigation"
          className={styles.mobileMenu}
          data-open={menuOpen}
          aria-label="Mobile navigation"
        >
          <ul>
            {primaryNavigation.map(({ href, label, tag }) => (
              <li key={href}>
                <Link
                  href={href}
                  aria-current={current(href)}
                  onClick={() => closeMenu()}
                >
                  {label}
                  {tag && <span className={styles.tag}>{tag}</span>}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            className={cn(styles.btn, styles.btnGhost)}
            href={headerActions.contact.href}
            aria-current={current(headerActions.contact.href)}
            onClick={() => closeMenu()}
          >
            {headerActions.contact.label}
          </Link>
          <Link
            className={cn(styles.btn, styles.btnPrimary)}
            href={headerActions.booking.href}
            aria-current={current(headerActions.booking.href)}
            onClick={() => closeMenu()}
          >
            {headerActions.booking.label}
          </Link>
        </nav>
      </header>
    </>
  );
}
