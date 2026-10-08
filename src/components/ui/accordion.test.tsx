// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { Accordion } from "./accordion";

afterEach(cleanup);

describe("Accordion instances", () => {
  it("allows reused item keys without duplicate document IDs or coupled disclosures", () => {
    const { container } = render(
      <>
        <Accordion
          items={[
            {
              id: "audience",
              title: "First audience",
              content: <p>First answer</p>,
            },
          ]}
        />
        <Accordion
          items={[
            {
              id: "audience",
              title: "Second audience",
              content: <p>Second answer</p>,
              defaultOpen: true,
            },
          ]}
        />
      </>,
    );
    const [first, second] = container.querySelectorAll("details");
    expect(first.id).toBe("");
    expect(second.id).toBe("");
    expect(first.open).toBe(false);
    expect(second.open).toBe(true);
    fireEvent.click(screen.getByText("First audience"));
    expect(first.open).toBe(true);
    expect(second.open).toBe(true);
    fireEvent.click(screen.getByText("Second audience"));
    expect(second.open).toBe(false);
    expect(first.open).toBe(true);
  });

  it("exposes an opt-in anchor and preserves interactive content inside the answer", () => {
    const { container } = render(
      <Accordion
        items={[
          {
            id: "help",
            anchorId: "example-help",
            title: "Where can I find help?",
            content: (
              <p>
                <a href="/contact">Contact support</a>
              </p>
            ),
          },
        ]}
      />,
    );
    const details = container.querySelector(
      "#example-help",
    ) as HTMLDetailsElement;
    expect(details).toBeTruthy();
    fireEvent.click(screen.getByText("Where can I find help?"));
    expect(details.open).toBe(true);
    expect(
      screen
        .getByRole("link", { name: "Contact support" })
        .getAttribute("href"),
    ).toBe("/contact");
    expect(details.querySelector("summary a")).toBeNull();
  });
});
