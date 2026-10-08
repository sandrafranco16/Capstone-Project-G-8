// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { renderToStaticMarkup } from "react-dom/server";
import { afterEach, describe, expect, it } from "vitest";

import { servicesFAQ } from "../services.content";
import { FAQSection } from "./faq-section";

afterEach(cleanup);

describe("Services shared FAQ", () => {
  it("server-renders every anchored question and answer in step with the JSON-LD", () => {
    const container = document.createElement("div");
    container.innerHTML = renderToStaticMarkup(
      <FAQSection content={servicesFAQ} />,
    );
    const rows = [...container.querySelectorAll("details")];
    const script = container.querySelector(
      'script[type="application/ld+json"]',
    )!;
    const data = JSON.parse(script.textContent!);
    expect(rows).toHaveLength(servicesFAQ.items.length);
    expect(new Set(rows.map((row) => row.id)).size).toBe(rows.length);
    expect(data["@type"]).toBe("FAQPage");
    expect(data.mainEntity).toHaveLength(rows.length);
    rows.forEach((row, index) => {
      const item = servicesFAQ.items[index];
      expect(row.id).toBe(item.id);
      expect(row.querySelector("summary span")?.textContent).toBe(
        item.question,
      );
      expect(row.querySelector("p")?.textContent).toBe(item.answer);
      expect(data.mainEntity[index]).toEqual({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      });
      expect(row.classList.contains("rv")).toBe(true);
      expect(
        row.querySelector('summary [aria-hidden="true"]')?.textContent,
      ).toBe("+");
    });
  });

  it("opens two questions independently and closes one without closing the other", () => {
    const { container } = render(<FAQSection content={servicesFAQ} />);
    const [first, second] = container.querySelectorAll("details");
    fireEvent.click(screen.getByText(servicesFAQ.items[0].question));
    fireEvent.click(screen.getByText(servicesFAQ.items[1].question));
    expect(first.open).toBe(true);
    expect(second.open).toBe(true);
    fireEvent.click(screen.getByText(servicesFAQ.items[0].question));
    expect(first.open).toBe(false);
    expect(second.open).toBe(true);
  });

  it("keeps special characters as answer text and in one safe JSON-LD block", () => {
    const item = {
      id: "services-faq-special",
      question: 'Can I use <examples> & "quotes"?',
      answer: '</script><script>alert("example")</script> & other text',
    };
    const { container } = render(
      <FAQSection
        content={{ eyebrow: "FAQ", title: "Questions", items: [item] }}
      />,
    );
    expect(container.querySelectorAll("script")).toHaveLength(1);
    expect(container.querySelector("details p")?.textContent).toBe(item.answer);
    const script = container.querySelector(
      'script[type="application/ld+json"]',
    )!;
    expect(script.textContent).not.toMatch(/[<>&]/);
    const data = JSON.parse(script.textContent!);
    expect(data.mainEntity[0].name).toBe(item.question);
    expect(data.mainEntity[0].acceptedAnswer.text).toBe(item.answer);
  });
});
