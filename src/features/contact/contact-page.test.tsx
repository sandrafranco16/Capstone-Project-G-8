import { existsSync } from "node:fs";
import { join } from "node:path";

import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { ContactDetails } from "./components/contact-details";
import { ContactForm } from "./components/contact-form";
import { contactDetails, contactHero } from "./contact.content";
import { ENQUIRY_TYPES } from "./contact-fields";

describe("ContactForm", () => {
  const html = renderToStaticMarkup(<ContactForm />);

  it.each([
    ["name", "text"],
    ["email", "email"],
    ["phone", "tel"],
    ["organisation", "text"],
  ])("renders a labelled %s input", (field, type) => {
    expect(html).toContain(`<label for="contact-${field}">`);
    expect(html).toMatch(
      new RegExp(`<input[^>]*id="contact-${field}"[^>]*type="${type}"`),
    );
  });

  it("renders the enquiry types as one labelled radio group", () => {
    expect(html).toMatch(
      /<fieldset[^>]*><legend class="group-title">What would you like to talk about\?<\/legend>/,
    );
    for (const type of ENQUIRY_TYPES) {
      expect(html).toMatch(
        new RegExp(
          `<input type="radio"[^>]*name="enquiryType"[^>]*value="${type}"`,
        ),
      );
    }
    expect(html).toMatch(/<input type="radio"[^>]*id="contact-enquiryType"/);
  });

  it("renders the message, consent and submit button", () => {
    expect(html).toMatch(/<textarea[^>]*id="contact-message"/);
    expect(html).toMatch(/<input[^>]*id="contact-consent"[^>]*type="checkbox"/);
    expect(html).toMatch(/<button type="submit"[^>]*>Send message<svg/);
  });

  it("requires every field except phone and organisation", () => {
    const required = [...html.matchAll(/id="contact-(\w+)"[^>]*required/g)]
      .map((match) => match[1])
      .sort();
    expect(required).toEqual(
      ["consent", "email", "enquiryType", "message", "name"].sort(),
    );
    expect(html.match(/\(optional\)/g)).toHaveLength(2);
  });

  it("opens a telephone keypad for the phone field", () => {
    expect(html).toMatch(
      /id="contact-phone"[^>]*type="tel"[^>]*inputMode="tel"/,
    );
  });

  it("links the consent text to the privacy policy", () => {
    expect(html).toContain('href="/legal#privacy"');
  });

  it("validates in JavaScript and does not autofocus a field", () => {
    expect(html).toMatch(/novalidate/i);
    expect(html).not.toMatch(/autofocus/i);
  });

  it("shows no errors before the visitor interacts", () => {
    expect(html).not.toContain('role="alert"');
    expect(html).not.toContain("aria-invalid");
  });

  it("keeps the honeypot out of the tab order and accessibility tree", () => {
    expect(html).toMatch(
      /<div aria-hidden="true" class="honeypot"><label for="contact-website">/,
    );
    expect(html).toMatch(/id="contact-website"[^>]*tabindex="-1"/);
  });
});

describe("Contact content", () => {
  const copy = JSON.stringify({ contactHero, contactDetails });

  it("does not describe BITDOT by Perth or Western Australia location", () => {
    expect(copy).not.toMatch(/Western Australia|Perth|Osborne Park|\bWA\b/);
  });

  it("uses mailto and tel links for the contact methods", () => {
    const [email, phone] = contactDetails.methods;
    expect(email.href).toBe(`mailto:${email.value}`);
    expect(phone.href).toBe(`tel:${phone.value.replace(/\s/g, "")}`);
  });

  it("points the booking link at a real route", () => {
    const route = contactDetails.booking.href.replace(/^\//, "");
    expect(existsSync(join(process.cwd(), "src/app", route, "page.tsx"))).toBe(
      true,
    );
  });

  it("gives each contact method a labelled copy button", () => {
    const html = renderToStaticMarkup(
      <ContactDetails content={contactDetails} />,
    );
    expect(html).toContain('aria-label="Copy email"');
    expect(html).toContain('aria-label="Copy mobile"');
  });

  it("renders the contact methods as links", () => {
    const html = renderToStaticMarkup(
      <ContactDetails content={contactDetails} />,
    );
    for (const { href } of contactDetails.methods) {
      expect(html).toContain(`href="${href}"`);
    }
  });
});
