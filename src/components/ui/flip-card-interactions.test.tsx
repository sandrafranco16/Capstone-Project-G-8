// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { FlipCard } from "./flip-card";

beforeEach(() => {
  vi.stubGlobal("matchMedia", () => ({
    matches: false,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  }));
});

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

function card(front: ReactNode) {
  return render(
    <FlipCard
      front={front}
      back={<p>Back content</p>}
      showBack={{ text: "Turn over", label: "Show back" }}
      showFront={{ text: "Return", label: "Show front" }}
    />,
  );
}

describe("FlipCard interactive content", () => {
  it("keeps label activation and checkbox changes on the visible face", () => {
    const { container } = card(
      <label>
        <input type="checkbox" />
        <span>Receive updates</span>
      </label>,
    );
    fireEvent.click(screen.getByText("Receive updates"));
    expect((screen.getByRole("checkbox") as HTMLInputElement).checked).toBe(
      true,
    );
    expect(container.firstElementChild?.hasAttribute("data-flipped")).toBe(
      false,
    );
  });

  it.each([
    <input key="input" aria-label="Card control" />,
    <textarea key="textarea" aria-label="Card control" />,
    <select key="select" aria-label="Card control">
      <option>Choose one</option>
    </select>,
    <div key="editable" contentEditable suppressContentEditableWarning>
      <span>Editable text</span>
    </div>,
    <details key="disclosure">
      <summary>Additional details</summary>
      <p>Disclosure answer</p>
    </details>,
    <span key="focusable" tabIndex={0} role="button">
      Custom control
    </span>,
  ])("keeps nested controls on the current face (%#)", (control) => {
    const { container } = card(control);
    const target =
      screen.queryByLabelText("Card control") ??
      screen.queryByText("Editable text") ??
      screen.queryByText("Additional details") ??
      screen.getByText("Custom control");
    fireEvent.click(target);
    expect(container.firstElementChild?.hasAttribute("data-flipped")).toBe(
      false,
    );
  });

  it("still flips through ordinary card content and transfers toggle focus", () => {
    const { container } = card(<p>Front content</p>);
    fireEvent.click(screen.getByText("Front content"));
    expect(container.firstElementChild?.getAttribute("data-flipped")).toBe(
      "true",
    );
    fireEvent.click(screen.getByRole("button", { name: "Show front" }));
    expect(container.firstElementChild?.hasAttribute("data-flipped")).toBe(
      false,
    );
    expect(document.activeElement).toBe(
      screen.getByRole("button", { name: "Show back" }),
    );
  });
});
