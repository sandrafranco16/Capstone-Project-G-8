export type RailMetrics = {
  scrollLeft: number;
  scrollWidth: number;
  clientWidth: number;
};

export type RailState = {
  /** False when every card fits, so the arrow controls can be hidden. */
  scrollable: boolean;
  canScrollBack: boolean;
  canScrollForward: boolean;
};

// Sub-pixel layouts can leave a scroll position a fraction short of its end.
const EDGE_TOLERANCE = 1;

export function getRailState({
  scrollLeft,
  scrollWidth,
  clientWidth,
}: RailMetrics): RailState {
  const maxScroll = scrollWidth - clientWidth;
  const scrollable = maxScroll > EDGE_TOLERANCE;

  return {
    scrollable,
    canScrollBack: scrollable && scrollLeft > EDGE_TOLERANCE,
    canScrollForward: scrollable && scrollLeft < maxScroll - EDGE_TOLERANCE,
  };
}

/** Distance that advances the rail by exactly one card plus the gap after it. */
export function getRailStep(cardWidth: number, gap: number) {
  return cardWidth + gap;
}
