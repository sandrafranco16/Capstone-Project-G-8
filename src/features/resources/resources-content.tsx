"use client";

import { useEffect, useState, type MouseEvent } from "react";
import Link from "next/link";
import Image from "next/image";

import { ResourcesMain } from "./resources-main";

function track(event: string, properties: Record<string, unknown>) {
  const analytics = window as Window & {
    dataLayer?: Record<string, unknown>[];
    gtag?: (
      command: string,
      name: string,
      properties: Record<string, unknown>,
    ) => void;
    clarity?: (command: string, name: string) => void;
  };
  analytics.dataLayer ??= [];
  analytics.dataLayer.push({ event, ...properties });
  analytics.gtag?.("event", event, properties);
  analytics.clarity?.("event", event);
}

export function ResourcesContent() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrolledFar, setScrolledFar] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateScroll = () => {
      const scrollTop = document.documentElement.scrollTop;
      const maximum =
        document.documentElement.scrollHeight - window.innerHeight;
      setProgress(maximum > 0 ? scrollTop / maximum : 0);
      setScrolled(scrollTop > 8);
      setScrolledFar(scrollTop > 700);
    };
    updateScroll();
    window.addEventListener("scroll", updateScroll, { passive: true });
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onEscape);
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.1 },
    );
    document
      .querySelectorAll(".resources-page .rv")
      .forEach((element) => observer.observe(element));
    return () => {
      window.removeEventListener("scroll", updateScroll);
      window.removeEventListener("keydown", onEscape);
      observer.disconnect();
    };
  }, []);

  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    const link = target.closest("a");
    if (!link) return;
    if (link.closest("#mmenu")) setMenuOpen(false);
    if (link.matches(".ev .src, .fw, .rd[href]")) {
      track("resource_clicked", {
        href: link.getAttribute("href") ?? "internal",
      });
    }
  };

  return (
    <div className="resources-page" onClick={handleClick}>
      <div
        id="prog"
        aria-hidden="true"
        style={{ transform: `scaleX(${progress})` }}
      ></div>
      <a className="skip" href="#main">
        {"Skip to content"}
      </a>
      <svg
        width="0"
        height="0"
        style={{ position: "absolute" }}
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="bg1" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0" stopColor="#0057B8"></stop>
            <stop offset="1" stopColor="#2E96FF"></stop>
          </linearGradient>
        </defs>
        <symbol id="mk" viewBox="0 0 64 64">
          <circle
            cx="29"
            cy="37"
            r="19"
            fill="none"
            stroke="url(#bg1)"
            strokeWidth="9"
          ></circle>
          <circle cx="48" cy="14" r="9" fill="#2E96FF"></circle>
        </symbol>
        <symbol id="mk-w" viewBox="0 0 64 64">
          <circle
            cx="29"
            cy="37"
            r="19"
            fill="none"
            stroke="#fff"
            strokeWidth="9"
          ></circle>
          <circle cx="48" cy="14" r="9" fill="#FF9E7A"></circle>
        </symbol>
      </svg>
      <header id="hd" className={scrolled ? "scrolled" : ""}>
        <div className="wrap nav">
          <Link className="mark" href="/" aria-label="BITDOT home">
            <span className="wm">{"bitd"}</span>
            <svg aria-hidden="true">
              <use href="#mk"></use>
            </svg>
            <span className="wm">{"t"}</span>
          </Link>
          <ul className="nav-links">
            <li>
              <Link href="/services">{"Services"}</Link>
            </li>
            <li>
              <Link href="/#assess">{"Assessment"}</Link>
            </li>
            <li>
              <Link href="/#lab">
                {"Automation Lab"}
                <span className="pill">{"Soon"}</span>
              </Link>
            </li>
            <li>
              <Link href="/resources" className="on" aria-current="page">
                {"Resources"}
              </Link>
            </li>
            <li>
              <Link href="/about">{"About"}</Link>
            </li>
          </ul>
          <Link className="btn btn-primary" href="/#contact">
            <span>{"Book a session"}</span>
          </Link>
          <button
            className="burger"
            aria-label="Open menu"
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
            >
              <path d="M4 7h16M4 12h16M4 17h16"></path>
            </svg>
          </button>
        </div>
        <nav className={`m-menu${menuOpen ? " open" : ""}`} id="mmenu">
          <ul>
            <li>
              <Link href="/services">{"Services"}</Link>
            </li>
            <li>
              <Link href="/#assess">{"Assessment"}</Link>
            </li>
            <li>
              <Link href="/#lab">{"Automation Lab"}</Link>
            </li>
            <li>
              <Link href="/resources">{"Resources"}</Link>
            </li>
            <li>
              <Link href="/about">{"About"}</Link>
            </li>
          </ul>
          <Link className="btn btn-primary" href="/#contact">
            <span>{"Book a session"}</span>
          </Link>
        </nav>
      </header>
      <ResourcesMain />
      <footer>
        <div className="wrap foot-top">
          <div className="foot-brand">
            <Link className="mark on-dark" href="/" aria-label="BITDOT home">
              <span className="wm">{"bitd"}</span>
              <svg aria-hidden="true">
                <use href="#mk-w"></use>
              </svg>
              <span className="wm">{"t"}</span>
            </Link>
            <p>
              {
                "AI and data governance solutions that fuel business growth, from Western Australia."
              }
            </p>
            <div className="foot-lg">
              <span className="lg">
                <Image
                  src="/images/resources/24ad0cc4ba36.png"
                  alt="AWS"
                  width={220}
                  height={132}
                />
              </span>
              <span className="lg">
                <Image
                  src="/images/resources/39cca07fa8f4.png"
                  alt="ACS"
                  width={120}
                  height={132}
                />
              </span>
            </div>
          </div>
          <div className="foot-col">
            <h4>{"Pathways"}</h4>
            <ul>
              <li>
                <Link href="/services#career">{"Launch my AI career"}</Link>
              </li>
              <li>
                <Link href="/services#training">{"Learn AI & automation"}</Link>
              </li>
              <li>
                <Link href="/services#governance">
                  {"Govern AI responsibly"}
                </Link>
              </li>
              <li>
                <Link href="/services#crisis">{"Prepare for AI risks"}</Link>
              </li>
            </ul>
          </div>
          <div className="foot-col">
            <h4>{"Explore"}</h4>
            <ul>
              <li>
                <Link href="/#flagship">{"Mastering AI Governance"}</Link>
              </li>
              <li>
                <Link href="/#lab">{"Automation Lab"}</Link>
              </li>
              <li>
                <Link href="/resources">{"Resource hub"}</Link>
              </li>
              <li>
                <Link href="/about">{"About us"}</Link>
              </li>
            </ul>
          </div>
          <div className="foot-col">
            <h4>{"Contact"}</h4>
            <ul>
              <li>
                <a href="mailto:info@bitdot.com.au">{"info@bitdot.com.au"}</a>
              </li>
              <li>
                <a href="tel:+61476779285">{"+61 476 779 285"}</a>
              </li>
              <li>
                <span>{"Osborne Park, WA 6017"}</span>
              </li>
              <li>
                <Link href="/#contact">{"Book via Microsoft Bookings"}</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="wrap foot-legal">
          <span>
            {"© "}
            <span id="yr">2026</span>
            {" BITDOT Consulting Services Pty Ltd. All rights reserved."}
          </span>
          <span>
            <Link href="/legal#privacy">{"Privacy"}</Link>
            {" · "}
            <Link href="/legal#terms">{"Terms"}</Link>
            {" · "}
            <Link href="/legal#disclaimer">{"Disclaimer"}</Link>
            {" · "}
            <Link href="/legal#accessibility">{"Accessibility"}</Link>
          </span>
        </div>
      </footer>
      <button
        className={`btt${scrolledFar ? " show" : ""}`}
        id="btt"
        aria-label="Back to top"
        onClick={() =>
          window.scrollTo({
            top: 0,
            behavior: window.matchMedia("(prefers-reduced-motion: reduce)")
              .matches
              ? "instant"
              : "smooth",
          })
        }
      >
        <svg
          width="19"
          height="19"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 19V5M5 12l7-7 7 7"></path>
        </svg>
      </button>
    </div>
  );
}
