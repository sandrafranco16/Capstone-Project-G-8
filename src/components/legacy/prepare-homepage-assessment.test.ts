import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { prepareHomepageAssessment } from "./prepare-homepage-assessment";

const source = readFileSync("demo/index.html", "utf8");

describe("homepage assessment bridge", () => {
  it("routes all four cards to the matching assessment and removes the old quiz", () => {
    const html = prepareHomepageAssessment(source);
    for (const path of ["career", "learn", "govern", "risk"]) {
      expect(html).toContain(`href="/assessment?path=${path}"`);
    }
    expect(html).toContain('href="/assessment"');
    expect(html).not.toContain("choosePath(");
    expect(html).not.toContain("function qRender");
    expect(html).not.toContain('id="quiz"');
    expect(html.match(/id="assess"/g)).toHaveLength(1);
  });

  it("preserves the governance section and unrelated scripts byte for byte", () => {
    const html = prepareHomepageAssessment(source);
    const governance = source.match(
      /<section class="section" id="flagship">[\s\S]*?<\/section>/,
    )![0];
    expect(html).toContain(governance);
    const booking = source.slice(
      source.indexOf("/* ============ booking ============"),
    );
    expect(html.endsWith(booking)).toBe(true);
    const header = source.match(/<header\b[\s\S]*?<\/header>/)![0];
    expect(html).toContain(header);
  });

  it("makes the four pathways the landing section before the governance program", () => {
    const html = prepareHomepageAssessment(source);
    const main = html.slice(html.indexOf('<main id="main">'));
    expect(main.match(/<section[^>]+>/)?.[0]).toBe(
      '<section class="section pathway-landing" id="pathways">',
    );
    expect(main.indexOf('id="pathways"')).toBeLessThan(
      main.indexOf('id="flagship"'),
    );
    expect(main.match(/id="pathways"/g)).toHaveLength(1);
    expect(main.match(/<h1\b/g)).toHaveLength(1);
    expect(main).not.toContain('<section class="hero">');
    const landing = main.match(
      /<section class="section pathway-landing"[\s\S]*?<\/section>/,
    )![0];
    expect(landing).not.toContain('class="rail-nav"');
    expect(landing).not.toMatch(/class="[^"]*\brv\b/);
    expect(landing.match(/href="\/assessment\?path=/g)).toHaveLength(4);
  });

  it.each([
    source.replace('data-path="career"', 'data-path="unknown"'),
    source.replace('data-path="career"', 'data-path="risk"'),
    source.replace('id="assess"', 'id="missing"'),
    source.replace('id="pathways"', 'id="missing"'),
    source.replace('<section class="hero">', '<section class="missing">'),
    source.replace(
      "/* ============ pathway → assessment ============",
      "/* changed",
    ),
  ])(
    "fails visibly when the checked-in prototype structure changes",
    (html) => {
      expect(() => prepareHomepageAssessment(html)).toThrow(
        /Assessment migration/,
      );
    },
  );
});
