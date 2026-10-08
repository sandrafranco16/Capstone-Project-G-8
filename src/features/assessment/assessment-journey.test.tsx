// @vitest-environment jsdom
import {
  cleanup,
  fireEvent,
  render,
  screen,
  within,
} from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { AssessmentJourney } from "./assessment-journey";
import { assessmentPathways } from "./pathways";

afterEach(cleanup);

function completeCareer() {
  const { questions } = assessmentPathways.career;
  questions.forEach((question, index) => {
    fireEvent.click(
      screen.getByRole("radio", {
        name: question.options[index < 2 ? 3 : 2].label,
      }),
    );
    fireEvent.click(
      screen.getByRole("button", {
        name:
          index === questions.length - 1 ? "See my result" : "Next question",
      }),
    );
  });
}

describe("assessment answer review", () => {
  it("edits the first answer directly, preserves the rest and recalculates the level", () => {
    render(<AssessmentJourney initialPathway="career" />);
    completeCareer();
    expect(screen.getByText("Your score: 12 / 15")).toBeTruthy();
    expect(document.activeElement).toBe(
      screen.getByRole("heading", { name: "AI Leader" }),
    );

    const [first, second] = assessmentPathways.career.questions;
    fireEvent.click(screen.getByText("Review your answers"));
    fireEvent.click(
      screen.getByRole("button", { name: `Edit answer: ${first.prompt}` }),
    );

    expect(document.activeElement).toBe(
      screen.getByRole("heading", { name: first.prompt }),
    );
    expect(
      (
        screen.getByRole("radio", {
          name: first.options[3].label,
        }) as HTMLInputElement
      ).checked,
    ).toBe(true);
    expect(
      (
        screen.getByRole("progressbar", {
          name: "Questions answered",
        }) as HTMLProgressElement
      ).value,
    ).toBe(5);

    fireEvent.click(
      screen.getByRole("radio", { name: first.options[0].label }),
    );
    fireEvent.click(
      screen.getByRole("button", { name: "Save and view result" }),
    );
    expect(screen.getByText("Your score: 9 / 15")).toBeTruthy();
    expect(document.activeElement).toBe(
      screen.getByRole("heading", { name: "AI Practitioner" }),
    );

    fireEvent.click(screen.getByText("Review your answers"));
    const review = screen.getByText("Review your answers").closest("details")!;
    expect(within(review).getByText(first.options[0].label)).toBeTruthy();
    expect(within(review).getByText(second.options[3].label)).toBeTruthy();

    fireEvent.click(
      screen.getByRole("button", { name: "Retake this pathway" }),
    );
    expect(
      screen
        .getAllByRole("radio")
        .every((radio) => !(radio as HTMLInputElement).checked),
    ).toBe(true);
    expect(
      (
        screen.getByRole("button", {
          name: "Next question",
        }) as HTMLButtonElement
      ).disabled,
    ).toBe(true);
  });

  it("keeps normal unanswered questions gated and counts selected answers", () => {
    render(<AssessmentJourney initialPathway="career" />);
    const [first, second] = assessmentPathways.career.questions;
    const progress = screen.getByRole("progressbar", {
      name: "Questions answered",
    }) as HTMLProgressElement;
    expect(progress.value).toBe(0);
    expect(
      (
        screen.getByRole("button", {
          name: "Next question",
        }) as HTMLButtonElement
      ).disabled,
    ).toBe(true);
    fireEvent.click(
      screen.getByRole("radio", { name: first.options[1].label }),
    );
    expect(progress.value).toBe(1);
    fireEvent.click(screen.getByRole("button", { name: "Next question" }));
    expect(screen.getByRole("heading", { name: second.prompt })).toBe(
      document.activeElement,
    );
    expect(
      (
        screen.getByRole("button", {
          name: "Next question",
        }) as HTMLButtonElement
      ).disabled,
    ).toBe(true);
    expect(
      screen.queryByRole("button", { name: "Save and view result" }),
    ).toBeNull();
  });

  it("offers a booking link for the pathway's appointment type on the result", () => {
    render(<AssessmentJourney initialPathway="career" />);
    completeCareer();

    const link = screen.getByRole("link", {
      name: "Book a career coaching session",
    });
    expect(link.getAttribute("href")).toBe("/booking?type=career-coaching");
  });
});
