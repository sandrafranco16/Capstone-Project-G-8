import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { testimonials } from "./leadership-content";
import { TestimonialsSection } from "./testimonials-section";

describe("TestimonialsSection", () => {
  const html = renderToStaticMarkup(<TestimonialsSection />);

  it("renders a labelled section and list", () => {
    expect(html).toContain('id="testimonials"');
    expect(html).toMatch(
      /<h2 id="testimonials-heading"[^>]*>What participants told us\.<\/h2>/,
    );
    expect(html).toMatch(/<ul[^>]*aria-label="Client testimonials"/);
  });

  it("renders each quote as an attributed figure", () => {
    expect(html.match(/<figure/g)).toHaveLength(testimonials.length);
    for (const item of testimonials) {
      expect(html).toContain(`<blockquote><p>${item.quote}</p></blockquote>`);
      expect(html).toContain(`>${item.author}</span>`);
      expect(html).toContain(`>${item.role}</span>`);
    }
  });

  it("gives the arrow controls accessible names", () => {
    expect(html).toContain('aria-label="Previous testimonial"');
    expect(html).toContain('aria-label="Next testimonial"');
  });

  it("hides the arrows until the rail is measured as scrollable", () => {
    expect(html).toMatch(/<div[^>]*hidden=""[^>]*>\s*<button/);
    expect(html).not.toContain('tabindex="0"');
  });

  it("renders nothing without testimonials", () => {
    expect(
      renderToStaticMarkup(<TestimonialsSection testimonials={[]} />),
    ).toBe("");
  });
});
