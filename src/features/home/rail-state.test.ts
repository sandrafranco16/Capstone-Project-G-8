import { describe, expect, it } from "vitest";

import { getRailState, getRailStep } from "./rail-state";

describe("getRailState", () => {
  it("hides the controls when every card fits", () => {
    expect(
      getRailState({ scrollLeft: 0, scrollWidth: 800, clientWidth: 800 }),
    ).toEqual({
      scrollable: false,
      canScrollBack: false,
      canScrollForward: false,
    });
  });

  it("treats a sub-pixel overflow as fitting", () => {
    expect(
      getRailState({ scrollLeft: 0, scrollWidth: 800.5, clientWidth: 800 })
        .scrollable,
    ).toBe(false);
  });

  it("only allows scrolling forward at the start", () => {
    expect(
      getRailState({ scrollLeft: 0, scrollWidth: 1200, clientWidth: 600 }),
    ).toEqual({
      scrollable: true,
      canScrollBack: false,
      canScrollForward: true,
    });
  });

  it("allows both directions mid-way", () => {
    expect(
      getRailState({ scrollLeft: 300, scrollWidth: 1200, clientWidth: 600 }),
    ).toMatchObject({ canScrollBack: true, canScrollForward: true });
  });

  it("only allows scrolling back at the end, within rounding tolerance", () => {
    expect(
      getRailState({ scrollLeft: 599.5, scrollWidth: 1200, clientWidth: 600 }),
    ).toMatchObject({ canScrollBack: true, canScrollForward: false });
  });
});

describe("getRailStep", () => {
  it("advances by one card plus the gap", () => {
    expect(getRailStep(280, 18)).toBe(298);
  });
});
