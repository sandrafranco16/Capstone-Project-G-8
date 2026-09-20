import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

import { splitHomepage } from "./split-homepage";

const oldFlagship =
  '<section class="section" id="flagship"><h2>Old program</h2></section>';
const fixture = `<header>Navigation</header><main id="main"><section>Hero</section>${oldFlagship}<section id="contact">Contact</section></main><footer>Footer</footer>`;

describe("homepage migration boundary", () => {
  it("keeps complete document fragments around the replaced section", () => {
    const parts = splitHomepage(fixture);
    expect(parts).toEqual({
      beforeMain: "<header>Navigation</header>",
      beforeFlagship: "<section>Hero</section>",
      afterFlagship: '<section id="contact">Contact</section>',
      afterMain: "<footer>Footer</footer>",
    });
  });

  it("preserves every byte outside the approved prototype's flagship section", () => {
    const source = readFileSync(join(process.cwd(), "demo/index.html"), "utf8");
    // The migration layer strips comments and scripts before composing the page.
    const markup = source
      .match(/<body[^>]*>([\s\S]*?)<\/body>/i)![1]
      .replace(/<!--[\s\S]*?-->/g, "")
      .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "");
    const parts = splitHomepage(markup);
    const original = markup.match(
      /<section class="section" id="flagship">[\s\S]*?<\/section>/,
    )![0];
    expect(
      `${parts.beforeMain}<main id="main">${parts.beforeFlagship}${original}${parts.afterFlagship}</main>${parts.afterMain}`,
    ).toBe(markup);
    expect(parts.beforeFlagship).toContain('href="#flagship"');
    expect(parts.afterFlagship).toContain('id="contact"');
    expect(parts.afterMain).toContain('href="#flagship"');
    expect(Object.values(parts).join("")).not.toContain('id="flagship"');
  });

  it.each([
    fixture.replace(oldFlagship, ""),
    fixture.replace(oldFlagship, oldFlagship + oldFlagship),
    fixture.replace("<h2>Old program</h2>", "<section>Nested</section>"),
    fixture.replace('<main id="main">', '<main id="changed">'),
    fixture.replace("</main>", ""),
  ])("fails visibly when the expected prototype boundary changes", (markup) => {
    expect(() => splitHomepage(markup)).toThrow(/Homepage migration requires/);
  });
});
