// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { renderToStaticMarkup } from "react-dom/server";
import { afterEach, describe, expect, it, vi } from "vitest";

import GlobalError from "./global-error";
import { siteConfig } from "@/lib/site-config";

afterEach(cleanup);

describe("root layout error recovery", () => {
  it("renders its own complete, labelled document without diagnostic details", () => {
    const error = Object.assign(new Error("Private layout failure"), {
      digest: "private-diagnostic-id",
    });
    const markup = renderToStaticMarkup(
      <GlobalError error={error} retry={vi.fn()} />,
    );
    const page = new DOMParser().parseFromString(markup, "text/html");
    expect(markup).toContain('<html lang="en-AU">');
    expect(markup).toContain("<body");
    expect(page.title).toBe("Temporarily unavailable | BITDOT");
    expect(
      page.querySelector('meta[name="robots"]')?.getAttribute("content"),
    ).toBe("noindex, nofollow");
    expect(page.querySelector("main")?.getAttribute("aria-labelledby")).toBe(
      "global-error-heading",
    );
    expect(page.querySelector("h1")?.id).toBe("global-error-heading");
    expect(markup).not.toContain(error.message);
    expect(markup).not.toContain(error.digest);
    expect(page.querySelector('a[href="/"]')).toBeTruthy();
    expect(
      page.querySelector(`a[href="mailto:${siteConfig.email}"]`),
    ).toBeTruthy();
    expect(page.querySelector("nav")).toBeNull();
  });

  it("focuses the recovery heading and supports repeated retry attempts", () => {
    const retry = vi.fn();
    render(<GlobalError error={new Error("Root failure")} retry={retry} />, {
      container: document,
      baseElement: document.documentElement,
    });
    const heading = screen.getByRole("heading", {
      name: "We couldn’t load BITDOT.",
      level: 1,
    });
    expect(document.activeElement).toBe(heading);
    const button = screen.getByRole("button", { name: "Try again" });
    expect(button.getAttribute("type")).toBe("button");
    fireEvent.click(button);
    fireEvent.click(button);
    expect(retry).toHaveBeenCalledTimes(2);
    expect(
      screen.getByRole("link", { name: "Return home" }).getAttribute("href"),
    ).toBe("/");
  });
});
