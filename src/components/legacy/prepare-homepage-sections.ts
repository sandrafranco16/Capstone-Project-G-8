export const LEADERSHIP_SLOT = "leadership";

export function slotMarker(name: string) {
  return `<bitdot-slot data-name="${name}"></bitdot-slot>`;
}

export const SLOT_PATTERN =
  /<bitdot-slot data-name="([a-z-]+)"><\/bitdot-slot>/;

const LEADERSHIP_START = '<section class="section bg-mist" id="leadership">';
const CONTACT_START = '<section class="section bg-mist" id="contact">';

export function replaceLeadershipAndTestimonials(source: string): string {
  const start = source.indexOf(LEADERSHIP_START);
  const contact = source.indexOf(CONTACT_START);
  const end = source.lastIndexOf("</section>", contact) + "</section>".length;

  if (
    start === -1 ||
    contact === -1 ||
    source.indexOf(LEADERSHIP_START, start + 1) !== -1 ||
    end <= start
  ) {
    throw new Error(
      "Homepage migration expects one leadership section before the contact section.",
    );
  }

  const span = source.slice(start, end);
  const sections = span.match(/<section\b/g) ?? [];
  if (
    sections.length !== 2 ||
    !span.includes('id="quoteRail"') ||
    !span.includes("Client testimonials")
  ) {
    throw new Error(
      "Homepage migration expects the leadership section followed by the testimonials section.",
    );
  }

  return (
    source.slice(0, start) + slotMarker(LEADERSHIP_SLOT) + source.slice(end)
  );
}

export function unwrapMain(source: string): string {
  if (
    source.split('<main id="main">').length !== 2 ||
    source.split("</main>").length !== 2
  ) {
    throw new Error("Homepage migration expects one <main> element.");
  }
  return source
    .replace('<main id="main">', '<div id="main"></div>')
    .replace("</main>", "");
}

export function prepareHomepageSections(source: string): string {
  return unwrapMain(replaceLeadershipAndTestimonials(source));
}
