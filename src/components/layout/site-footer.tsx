import Link from "next/link";

import { BrandMark } from "./brand-mark";
import {
  type FooterItem,
  footerColumns,
  footerTagline,
  legalLinks,
} from "./navigation.content";
import styles from "./site-footer.module.css";

/** Client-side links for app routes, plain anchors for mailto:/tel:, text otherwise. */
function FooterEntry({ href, label }: FooterItem) {
  if (!href) return <span>{label}</span>;
  return href.startsWith("/") ? (
    <Link href={href}>{label}</Link>
  ) : (
    <a href={href}>{label}</a>
  );
}

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <div className={styles.brandColumn}>
          <Link className={styles.brand} href="/" aria-label="BITDOT home">
            <span className={styles.wordmark}>bitd</span>
            <BrandMark onDark className={styles.mark} />
            <span className={styles.wordmark}>t</span>
          </Link>
          <p>{footerTagline}</p>
        </div>

        {footerColumns.map(({ title, links }) => (
          <nav
            key={title}
            className={styles.column}
            aria-label={`Footer: ${title}`}
          >
            <h2>{title}</h2>
            <ul>
              {links.map((link) => (
                <li key={link.label}>
                  <FooterEntry {...link} />
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className={styles.legal}>
        <p>
          © {new Date().getFullYear()} BITDOT Consulting Services Pty Ltd. All
          rights reserved.
        </p>
        <nav aria-label="Legal">
          <ul>
            {legalLinks.map(({ href, label }) => (
              <li key={href}>
                <Link href={href}>{label}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
