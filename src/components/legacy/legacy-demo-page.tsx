import "server-only";
import { prepareHomepageAssessment } from "./prepare-homepage-assessment";
import {
  prepareHomepageSections,
  SLOT_PATTERN,
} from "./prepare-homepage-sections";
import { toReplayableScript } from "./replayable-script";

import { readFileSync } from "node:fs";
import { join } from "node:path";
import { Fragment, type ReactNode } from "react";

import { DemoRuntime } from "./demo-runtime";

export type DemoFile = "about.html" | "index.html" | "legal.html";

type LegacyDemoPageProps = {
  file: DemoFile;
  /** React content rendered in place of the matching slot markers. */
  slots?: Partial<Record<string, ReactNode>>;
};

const shellOverride = `
  body:has(.legacy-demo-page) > .skip-link,
  body:has(.legacy-demo-page) > .site-header,
  body:has(.legacy-demo-page) > .site-footer { display: none !important; }
  body:has(.legacy-demo-page) > #main-content { display: contents; }
  .legacy-demo-page,
  .legacy-demo-document { display: contents; }
`;

function rewriteDemoLinks(markup: string) {
  return markup
    .replaceAll('href="index.html', 'href="/')
    .replaceAll("href='index.html", "href='/")
    .replaceAll('href="services.html', 'href="/services')
    .replaceAll("href='services.html", "href='/services")
    .replaceAll('href="about.html', 'href="/about')
    .replaceAll("href='about.html", "href='/about")
    .replaceAll('href="resources.html', 'href="/resources')
    .replaceAll("href='resources.html", "href='/resources")
    .replaceAll('href="legal.html', 'href="/legal')
    .replaceAll("href='legal.html", "href='/legal");
}

function loadDemo(file: DemoFile) {
  const original = readFileSync(join(process.cwd(), "demo", file), "utf8");
  const source =
    file === "index.html"
      ? prepareHomepageSections(prepareHomepageAssessment(original))
      : original;
  const styles = [...source.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)].map(
    (match) => match[1],
  );
  const structuredData = [
    ...source.matchAll(
      /<script\s+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi,
    ),
  ].map((match) => match[1].trim());
  const body = source.match(/<body[^>]*>([\s\S]*?)<\/body>/i)?.[1];

  if (!body) throw new Error(`The demo file ${file} does not contain a body.`);

  // Comments include analytics examples containing script tags. Drop comments
  // before extracting active scripts so those examples remain inactive.
  const uncommentedBody = body.replace(/<!--[\s\S]*?-->/g, "");
  const scripts = [
    ...uncommentedBody.matchAll(
      /<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/gi,
    ),
  ]
    .map((match) => toReplayableScript(match[1].trim()))
    .filter(Boolean);
  const visibleBody = uncommentedBody.replace(
    /<script[^>]*>[\s\S]*?<\/script>/gi,
    "",
  );
  const fontLinks = [
    ...source.matchAll(
      /<link[^>]+href=["']https:\/\/fonts\.googleapis\.com[^>]*>/gi,
    ),
  ]
    .map((match) => match[0])
    .join("\n");
  const jsonLd = structuredData
    .map((json) => `<script type="application/ld+json">${json}</script>`)
    .join("\n");

  return {
    markup: rewriteDemoLinks(
      `${fontLinks}\n${jsonLd}\n<style>${styles.join("\n")}\n${shellOverride}</style>\n${visibleBody}`,
    ),
    scripts,
  };
}

export function LegacyDemoPage({ file, slots = {} }: LegacyDemoPageProps) {
  const { markup, scripts } = loadDemo(file);
  const parts = markup.split(new RegExp(SLOT_PATTERN.source, "g"));

  return (
    <div className="legacy-demo-page">
      {parts.map((part, index) =>
        index % 2 === 0 ? (
          <div
            key={index}
            className="legacy-demo-document"
            dangerouslySetInnerHTML={{ __html: part }}
          />
        ) : (
          <Fragment key={index}>{slots[part]}</Fragment>
        ),
      )}
      <DemoRuntime scripts={scripts} />
    </div>
  );
}
