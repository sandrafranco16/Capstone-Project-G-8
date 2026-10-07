import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

import { prepareHomepageAssessment } from "./prepare-homepage-assessment";
import { prepareHomepageShell } from "./prepare-homepage-shell";

const prototype = readFileSync(
  join(process.cwd(), "demo", "index.html"),
  "utf8",
);
const homepage = prepareHomepageShell(prepareHomepageAssessment(prototype));

describe("prepareHomepageShell", () => {
  it("removes the prototype header, footer, skip link and progress bar", () => {
    expect(homepage).not.toContain('<header id="hd">');
    expect(homepage).not.toMatch(/<footer\b/);
    expect(homepage).not.toContain('class="skip"');
    expect(homepage).not.toContain('id="prog"');
    expect(homepage).not.toContain('id="mmenu"');
  });

  it("leaves no <main> inside the layout's main landmark", () => {
    expect(homepage).not.toMatch(/<\/?main\b/);
    expect(homepage).toContain('<div id="main">');
  });

  it("removes every script reference to the removed elements", () => {
    for (const reference of [
      "getElementById('yr')",
      "getElementById('prog')",
      "getElementById('hd')",
      "getElementById('mmenu')",
      "toggleMenu",
      "closeMenu",
      "bar.style",
      "hd.classList",
    ]) {
      expect(homepage).not.toContain(reference);
    }
  });

  it("keeps the homepage content and its back-to-top behaviour", () => {
    for (const id of ["flagship", "lab", "contact", "btt"]) {
      expect(homepage).toContain(`id="${id}"`);
    }
    expect(homepage).toContain("const btt=document.getElementById('btt');");
    expect(homepage).toContain("btt.classList.toggle('show'");
  });

  it("fails loudly when the prototype no longer matches", () => {
    expect(() => prepareHomepageShell("<body></body>")).toThrow(
      /Homepage shell migration expects one/,
    );
  });
});
