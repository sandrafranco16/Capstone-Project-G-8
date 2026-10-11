// @vitest-environment jsdom
import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { CopyResult } from "./copy-result";
import { AssessmentJourney } from "./assessment-journey";
import { assessmentPathways, type PathwayId } from "./pathways";
import { siteConfig } from "@/lib/site-config";

const writeText = vi.fn();

function complete(id: PathwayId) {
  const pathway = assessmentPathways[id];
  pathway.questions.forEach((question, index) => {
    fireEvent.click(
      screen.getByRole("radio", { name: question.options[3].label }),
    );
    fireEvent.click(
      screen.getByRole("button", {
        name:
          index === pathway.questions.length - 1
            ? "See my result"
            : "Next question",
      }),
    );
  });
}

beforeEach(() => {
  writeText.mockReset().mockResolvedValue(undefined);
  vi.stubGlobal("navigator", { clipboard: { writeText } });
});

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

describe("copying assessment results", () => {
  it("copies only after activation and reports success", async () => {
    render(<CopyResult summary="Example result" />);
    expect(writeText).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole("button", { name: "Copy result" }));
    await waitFor(() =>
      expect(screen.getByRole("status").textContent).toBe(
        "Result summary copied.",
      ),
    );
    expect(writeText).toHaveBeenCalledExactlyOnceWith("Example result");
    expect(screen.queryByRole("textbox")).toBeNull();
  });

  it("focuses and selects a manual summary when copying is denied", async () => {
    writeText.mockRejectedValue(new Error("Private permission failure"));
    const summary = "A result with a service suggestion";
    render(<CopyResult summary={summary} />);
    fireEvent.click(screen.getByRole("button", { name: "Copy result" }));
    const manual = (await screen.findByRole("textbox", {
      name: "Result summary",
    })) as HTMLTextAreaElement;
    expect(manual.readOnly).toBe(true);
    expect(manual.value).toBe(summary);
    expect(document.activeElement).toBe(manual);
    expect(manual.selectionStart).toBe(0);
    expect(manual.selectionEnd).toBe(summary.length);
    expect(screen.getByRole("status").textContent).toContain(
      "copy it manually",
    );
    expect(document.body.textContent).not.toContain(
      "Private permission failure",
    );
  });

  it("offers the same fallback when Clipboard API is unavailable", async () => {
    vi.stubGlobal("navigator", {});
    render(<CopyResult summary="Manual result" />);
    fireEvent.click(screen.getByRole("button", { name: "Copy result" }));
    expect(
      await screen.findByRole("textbox", { name: "Result summary" }),
    ).toBeTruthy();
    expect(writeText).not.toHaveBeenCalled();
  });

  it("prevents duplicate requests while a write is pending", async () => {
    let finish!: () => void;
    writeText.mockReturnValue(
      new Promise<void>((resolve) => {
        finish = resolve;
      }),
    );
    render(<CopyResult summary="Pending result" />);
    fireEvent.click(screen.getByRole("button", { name: "Copy result" }));
    const button = screen.getByRole("button", {
      name: "Copying…",
    }) as HTMLButtonElement;
    expect(button.disabled).toBe(true);
    fireEvent.click(button);
    expect(writeText).toHaveBeenCalledTimes(1);
    await act(async () => finish());
    expect(
      (screen.getByRole("button", { name: "Copy result" }) as HTMLButtonElement)
        .disabled,
    ).toBe(false);
  });

  it.each(Object.keys(assessmentPathways) as PathwayId[])(
    "copies the %s outcome without individual questions or answers",
    async (id) => {
      const pathway = assessmentPathways[id];
      render(<AssessmentJourney initialPathway={id} />);
      complete(id);
      fireEvent.click(screen.getByRole("button", { name: "Copy result" }));
      await waitFor(() => expect(writeText).toHaveBeenCalledTimes(1));
      const copied = writeText.mock.calls[0][0] as string;
      expect(copied).toContain(`${pathway.label}: AI Leader`);
      expect(copied).toContain("Your score: 15 / 15");
      expect(copied).toContain("awaiting client confirmation");
      expect(copied).toContain("not a certification or compliance assessment");
      expect(copied).toContain(`${siteConfig.url}/services#`);
      pathway.questions.forEach((question) => {
        expect(copied).not.toContain(question.prompt);
        expect(copied).not.toContain(question.options[3].label);
      });
    },
  );

  it("copies the recalculated result after editing an answer", async () => {
    render(<AssessmentJourney initialPathway="career" />);
    complete("career");
    fireEvent.click(screen.getByRole("button", { name: "Copy result" }));
    await screen.findByText("Result summary copied.");
    const first = assessmentPathways.career.questions[0];
    fireEvent.click(screen.getByText("Review your answers"));
    fireEvent.click(
      screen.getByRole("button", { name: `Edit answer: ${first.prompt}` }),
    );
    fireEvent.click(
      screen.getByRole("radio", { name: first.options[0].label }),
    );
    fireEvent.click(
      screen.getByRole("button", { name: "Save and view result" }),
    );
    fireEvent.click(screen.getByRole("button", { name: "Copy result" }));
    await waitFor(() => expect(writeText).toHaveBeenCalledTimes(2));
    expect(writeText.mock.calls[0][0]).toContain("Your score: 15 / 15");
    expect(writeText.mock.calls[1][0]).toContain("Your score: 12 / 15");
    expect(writeText.mock.calls[1][0]).not.toContain("Your score: 15 / 15");
  });
});
