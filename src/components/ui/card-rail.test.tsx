// @vitest-environment jsdom
import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
} from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { CardRail } from "./card-rail";

const resizeCallbacks: Array<() => void> = [];
const disconnect = vi.fn();
let reducedMotion = false;

beforeEach(() => {
  resizeCallbacks.length = 0;
  reducedMotion = false;
  vi.stubGlobal(
    "ResizeObserver",
    class {
      constructor(callback: () => void) {
        resizeCallbacks.push(callback);
      }
      observe() {}
      disconnect = disconnect;
    },
  );
  vi.stubGlobal("matchMedia", () => ({ matches: reducedMotion }));
});

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
  vi.clearAllMocks();
});

function geometry(element: HTMLElement, width = 340, total = 1056) {
  Object.defineProperties(element, {
    clientWidth: { configurable: true, value: width },
    scrollWidth: { configurable: true, value: total },
  });
  element.scrollBy = vi.fn();
  element.scrollTo = vi.fn();
  const card = element.firstElementChild!;
  vi.spyOn(card, "getBoundingClientRect").mockReturnValue({
    width: 340,
  } as DOMRect);
  act(() => resizeCallbacks.forEach((callback) => callback()));
}

describe("CardRail", () => {
  it("updates controls at both edges and hides them when resizing removes overflow", () => {
    render(
      <CardRail title="Services">
        <div>One</div>
        <div>Two</div>
        <div>Three</div>
      </CardRail>,
    );
    const rail = screen.getByRole("list", { name: "Services" });
    geometry(rail);
    const previous = screen.getByRole("button", {
      name: "Previous cards: Services",
    }) as HTMLButtonElement;
    const next = screen.getByRole("button", {
      name: "Next cards: Services",
    }) as HTMLButtonElement;
    expect(previous.disabled).toBe(true);
    expect(next.disabled).toBe(false);
    rail.scrollLeft = 716;
    fireEvent.scroll(rail);
    expect(previous.disabled).toBe(false);
    expect(next.disabled).toBe(true);
    geometry(rail, 1200);
    expect(
      screen.queryByRole("button", { name: "Next cards: Services" }),
    ).toBeNull();
  });

  it("scrolls only the selected rail and respects reduced motion", () => {
    render(
      <>
        <CardRail title="A">
          <div>One</div>
          <div>Two</div>
        </CardRail>
        <CardRail title="B">
          <div>Three</div>
          <div>Four</div>
        </CardRail>
      </>,
    );
    const a = screen.getByRole("list", { name: "A" });
    const b = screen.getByRole("list", { name: "B" });
    geometry(a);
    geometry(b);
    reducedMotion = true;
    fireEvent.click(screen.getByRole("button", { name: "Next cards: A" }));
    expect(a.scrollBy).toHaveBeenCalledWith({ left: 340, behavior: "instant" });
    expect(b.scrollBy).not.toHaveBeenCalled();
    expect(a.id).not.toBe(b.id);
  });

  it("handles rail keyboard navigation without intercepting child controls", () => {
    render(
      <CardRail title="Keyboard">
        <input aria-label="Card input" />
        <div>Second</div>
      </CardRail>,
    );
    const rail = screen.getByRole("list", { name: "Keyboard" });
    geometry(rail);
    fireEvent.keyDown(rail, { key: "ArrowRight" });
    expect(rail.scrollBy).toHaveBeenCalledWith({
      left: 340,
      behavior: "smooth",
    });
    fireEvent.keyDown(screen.getByLabelText("Card input"), {
      key: "ArrowRight",
    });
    expect(rail.scrollBy).toHaveBeenCalledTimes(1);
    fireEvent.keyDown(rail, { key: "End" });
    expect(rail.scrollTo).toHaveBeenLastCalledWith({
      left: 1056,
      behavior: "instant",
    });
    fireEvent.keyDown(rail, { key: "Home" });
    expect(rail.scrollTo).toHaveBeenLastCalledWith({
      left: 0,
      behavior: "instant",
    });
  });

  it("handles empty and single-card lists, and cleans up observers", () => {
    const { rerender, unmount } = render(
      <CardRail title="Empty">{[]}</CardRail>,
    );
    expect(screen.queryByRole("region")).toBeNull();
    rerender(
      <CardRail title="One">
        <div>Only card</div>
      </CardRail>,
    );
    const rail = screen.getByRole("list", { name: "One" });
    geometry(rail, 340, 340);
    expect(screen.queryByRole("button")).toBeNull();
    unmount();
    expect(disconnect).toHaveBeenCalled();
  });

  it.each([
    ["Home", "ctrlKey"],
    ["End", "ctrlKey"],
    ["ArrowLeft", "altKey"],
    ["ArrowRight", "altKey"],
    ["ArrowLeft", "metaKey"],
    ["ArrowRight", "metaKey"],
    ["Home", "shiftKey"],
    ["End", "shiftKey"],
  ])("leaves %s with %s available to the browser", (key, modifier) => {
    render(
      <CardRail title="Shortcuts">
        <div>First</div>
        <div>Second</div>
      </CardRail>,
    );
    const rail = screen.getByRole("list", { name: "Shortcuts" });
    geometry(rail);
    const allowed = fireEvent.keyDown(rail, { key, [modifier]: true });
    expect(allowed).toBe(true);
    expect(rail.scrollBy).not.toHaveBeenCalled();
    expect(rail.scrollTo).not.toHaveBeenCalled();
  });
});
