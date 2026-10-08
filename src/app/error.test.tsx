// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { Component, type ReactNode } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";

import ErrorPage from "./error";

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe("page error recovery", () => {
  it("focuses a safe heading without displaying error details", () => {
    const error = Object.assign(new Error("Private upstream response"), {
      digest: "internal-diagnostic-id",
    });
    const { container } = render(<ErrorPage error={error} retry={vi.fn()} />);
    expect(document.activeElement).toBe(
      screen.getByRole("heading", {
        name: "We couldn’t load this page.",
        level: 1,
      }),
    );
    expect(container.textContent).not.toContain(error.message);
    expect(container.textContent).not.toContain(error.digest);
    expect(
      screen.getByRole("link", { name: "Return home" }).getAttribute("href"),
    ).toBe("/");
    expect(
      screen.getByRole("link", { name: "Contact us" }).getAttribute("href"),
    ).toBe("/contact");
    expect(
      screen.getByRole("link", { name: "Resources hub" }).getAttribute("href"),
    ).toBe("/resources");
  });

  it("recovers a failed render through the retry callback", () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    let shouldFail = true;
    const recovered = vi.fn(() => {
      shouldFail = false;
    });

    function Page() {
      if (shouldFail) throw new Error("Temporary render failure");
      return <h1>Recovered page</h1>;
    }

    class Boundary extends Component<
      { children: ReactNode },
      { error: Error | null }
    > {
      state: { error: Error | null } = { error: null };

      static getDerivedStateFromError(error: Error) {
        return { error };
      }

      render() {
        return this.state.error ? (
          <ErrorPage
            error={this.state.error}
            retry={() => {
              recovered();
              this.setState({ error: null });
            }}
          />
        ) : (
          this.props.children
        );
      }
    }

    render(
      <Boundary>
        <Page />
      </Boundary>,
    );
    const retry = screen.getByRole("button", { name: "Try again" });
    expect(retry.getAttribute("type")).toBe("button");
    fireEvent.click(retry);
    expect(recovered).toHaveBeenCalledOnce();
    expect(
      screen.getByRole("heading", { name: "Recovered page" }),
    ).toBeTruthy();
    expect(screen.queryByRole("button", { name: "Try again" })).toBeNull();
  });

  it("allows repeated retry attempts when the problem persists", () => {
    const retry = vi.fn();
    render(<ErrorPage error={new Error("Persistent failure")} retry={retry} />);
    fireEvent.click(screen.getByRole("button", { name: "Try again" }));
    fireEvent.click(screen.getByRole("button", { name: "Try again" }));
    expect(retry).toHaveBeenCalledTimes(2);
    expect(screen.getByRole("link", { name: "Return home" })).toBeTruthy();
  });
});
