// @vitest-environment jsdom
import {
  cleanup,
  fireEvent,
  render,
  screen,
  within,
} from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { AssessmentJourney } from "./assessment-journey";
import { assessmentPathways } from "./pathways";

const originalShowModal = Object.getOwnPropertyDescriptor(
  HTMLDialogElement.prototype,
  "showModal",
);
const originalClose = Object.getOwnPropertyDescriptor(
  HTMLDialogElement.prototype,
  "close",
);

beforeEach(() => {
  Object.defineProperty(HTMLDialogElement.prototype, "showModal", {
    configurable: true,
    value(this: HTMLDialogElement) {
      this.open = true;
    },
  });
  Object.defineProperty(HTMLDialogElement.prototype, "close", {
    configurable: true,
    value(this: HTMLDialogElement) {
      this.open = false;
    },
  });
});

afterEach(() => {
  cleanup();
  if (originalShowModal)
    Object.defineProperty(
      HTMLDialogElement.prototype,
      "showModal",
      originalShowModal,
    );
  else Reflect.deleteProperty(HTMLDialogElement.prototype, "showModal");
  if (originalClose)
    Object.defineProperty(HTMLDialogElement.prototype, "close", originalClose);
  else Reflect.deleteProperty(HTMLDialogElement.prototype, "close");
});

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
    fireEvent.click(
      screen.getByRole("button", { name: "Restart and clear answers" }),
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

describe("assessment reset confirmation", () => {
  it("changes pathway immediately when there are no answers to lose", () => {
    render(<AssessmentJourney initialPathway="career" />);
    fireEvent.click(screen.getByRole("button", { name: "Change pathway" }));
    expect(screen.queryByRole("dialog")).toBeNull();
    expect(screen.getByRole("heading", { name: "Choose your pathway" })).toBe(
      document.activeElement,
    );
  });

  it("keeps the selected answer, question and focus when the visitor cancels", () => {
    render(<AssessmentJourney initialPathway="career" />);
    const question = assessmentPathways.career.questions[0];
    const radio = screen.getByRole("radio", {
      name: question.options[2].label,
    }) as HTMLInputElement;
    fireEvent.click(radio);
    const trigger = screen.getByRole("button", { name: "Change pathway" });
    trigger.focus();
    fireEvent.click(trigger);
    const dialog = screen.getByRole("dialog", { name: "Clear your answers?" });
    expect(document.activeElement).toBe(
      within(dialog).getByRole("button", { name: "Keep my answers" }),
    );
    expect(dialog.getAttribute("aria-describedby")).toBeTruthy();
    fireEvent.click(
      within(dialog).getByRole("button", { name: "Keep my answers" }),
    );
    expect(screen.queryByRole("dialog")).toBeNull();
    expect(radio.checked).toBe(true);
    expect(screen.getByRole("heading", { name: question.prompt })).toBeTruthy();
    expect(screen.getByRole("progressbar").getAttribute("value")).toBe("1");
    expect(document.activeElement).toBe(trigger);
  });

  it("treats native Escape cancellation as keeping the answers", () => {
    render(<AssessmentJourney initialPathway="career" />);
    const radio = screen.getByRole("radio", {
      name: assessmentPathways.career.questions[0].options[1].label,
    }) as HTMLInputElement;
    fireEvent.click(radio);
    const trigger = screen.getByRole("button", { name: "Change pathway" });
    trigger.focus();
    fireEvent.click(trigger);
    fireEvent(
      screen.getByRole("dialog"),
      new Event("cancel", { cancelable: true }),
    );
    expect(screen.queryByRole("dialog")).toBeNull();
    expect(radio.checked).toBe(true);
    expect(document.activeElement).toBe(trigger);
  });

  it("clears the answers only after pathway-change confirmation", () => {
    render(<AssessmentJourney initialPathway="career" />);
    fireEvent.click(
      screen.getByRole("radio", {
        name: assessmentPathways.career.questions[0].options[1].label,
      }),
    );
    fireEvent.click(screen.getByRole("button", { name: "Change pathway" }));
    fireEvent.click(
      screen.getByRole("button", { name: "Change pathway and clear answers" }),
    );
    expect(screen.queryByRole("dialog")).toBeNull();
    expect(screen.getByRole("heading", { name: "Choose your pathway" })).toBe(
      document.activeElement,
    );
    fireEvent.click(
      screen.getByRole("button", { name: /Launch My AI Career/ }),
    );
    expect(screen.getByRole("progressbar").getAttribute("value")).toBe("0");
    expect(
      screen
        .getAllByRole("radio")
        .every((radio) => !(radio as HTMLInputElement).checked),
    ).toBe(true);
  });

  it("retains the completed result when a retake is cancelled", () => {
    render(<AssessmentJourney initialPathway="career" />);
    completeCareer();
    const trigger = screen.getByRole("button", { name: "Retake this pathway" });
    trigger.focus();
    fireEvent.click(trigger);
    fireEvent.click(screen.getByRole("button", { name: "Keep my answers" }));
    expect(screen.getByText("Your score: 12 / 15")).toBeTruthy();
    expect(screen.getByRole("heading", { name: "AI Leader" })).toBeTruthy();
    expect(document.activeElement).toBe(trigger);
    fireEvent.click(screen.getByText("Review your answers"));
    expect(
      screen.getByText(assessmentPathways.career.questions[0].options[3].label),
    ).toBeTruthy();
  });
});
