import type { Ref } from "react";
import type { JourneyAction } from "./journey";

export type AssessmentViewProps = {
  headingRef: Ref<HTMLHeadingElement>;
  onAction: (action: JourneyAction) => void;
};
