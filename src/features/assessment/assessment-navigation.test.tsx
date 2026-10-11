// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { AssessmentNavigation } from "./assessment-navigation";
import { assessmentPathways } from "./pathways";

let params: URLSearchParams;

vi.mock("next/navigation", () => ({ useSearchParams: () => params }));

beforeEach(() => {
  window.history.replaceState(
    null,
    "",
    "/assessment?path=career&source=home#main-content",
  );
  params = new URLSearchParams(window.location.search);
});

afterEach(cleanup);

describe("assessment URL navigation", () => {
  it("switches from a direct career URL to the chooser and then risk, retaining unrelated URL context", () => {
    const { rerender } = render(
      <AssessmentNavigation initialPathway="career" />,
    );
    fireEvent.click(screen.getByRole("button", { name: "Change pathway" }));
    expect(window.location.search).toBe("?source=home");
    expect(window.location.hash).toBe("#main-content");
    params = new URLSearchParams(window.location.search);
    rerender(<AssessmentNavigation initialPathway="career" />);
    expect(document.activeElement).toBe(
      screen.getByRole("heading", { name: "Choose your pathway" }),
    );
    fireEvent.click(
      screen.getByRole("button", { name: /Prepare for AI Risks/ }),
    );
    expect(new URLSearchParams(window.location.search).get("path")).toBe(
      "risk",
    );
    expect(new URLSearchParams(window.location.search).get("source")).toBe(
      "home",
    );
    expect(window.location.hash).toBe("#main-content");
    params = new URLSearchParams(window.location.search);
    rerender(<AssessmentNavigation initialPathway="career" />);
    expect(document.activeElement).toBe(
      screen.getByRole("heading", {
        name: assessmentPathways.risk.questions[0].prompt,
      }),
    );
    expect(
      screen
        .getAllByRole("radio")
        .every((radio) => !(radio as HTMLInputElement).checked),
    ).toBe(true);
  });

  it("keeps an answer and its focus when the query state has not changed", () => {
    const { rerender } = render(
      <AssessmentNavigation initialPathway="career" />,
    );
    const selected = screen.getByRole("radio", {
      name: assessmentPathways.career.questions[0].options[2].label,
    });
    selected.focus();
    fireEvent.click(selected);
    rerender(<AssessmentNavigation initialPathway="career" />);
    expect((selected as HTMLInputElement).checked).toBe(true);
    expect(document.activeElement).toBe(selected);
    expect(window.location.search).toContain("path=career");
    expect(screen.getByRole("progressbar").getAttribute("value")).toBe("1");
  });

  it("uses the restored URL pathway rather than stale server props and clears the previous answers", () => {
    const { rerender } = render(
      <AssessmentNavigation initialPathway="career" />,
    );
    fireEvent.click(
      screen.getByRole("radio", {
        name: assessmentPathways.career.questions[0].options[2].label,
      }),
    );
    params = new URLSearchParams("path=govern");
    rerender(<AssessmentNavigation initialPathway="career" />);
    expect(
      screen.getByRole("heading", {
        name: assessmentPathways.govern.questions[0].prompt,
      }),
    ).toBeTruthy();
    expect(
      screen
        .getAllByRole("radio")
        .every((radio) => !(radio as HTMLInputElement).checked),
    ).toBe(true);
    params = new URLSearchParams("path=career");
    rerender(<AssessmentNavigation initialPathway="career" />);
    expect(
      screen.getByRole("heading", {
        name: assessmentPathways.career.questions[0].prompt,
      }),
    ).toBeTruthy();
    expect(screen.getByRole("progressbar").getAttribute("value")).toBe("0");
  });

  it.each(["", "path=unknown", "path=career&path=risk", "path="])(
    "shows the chooser for an absent or invalid path (%s)",
    (query) => {
      params = new URLSearchParams(query);
      render(<AssessmentNavigation initialPathway="career" />);
      expect(
        screen.getByRole("heading", { name: "Choose your pathway" }),
      ).toBeTruthy();
      expect(screen.queryByRole("radio")).toBeNull();
    },
  );

  it("starts a fresh direct visit on the pathway encoded in the selected URL", () => {
    params = new URLSearchParams("path=risk");
    render(<AssessmentNavigation initialPathway="risk" />);
    expect(
      screen.getByRole("heading", {
        name: assessmentPathways.risk.questions[0].prompt,
      }),
    ).toBeTruthy();
    expect(screen.getByRole("progressbar").getAttribute("value")).toBe("0");
  });
});
