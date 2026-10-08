"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";

import { AssessmentJourney } from "./assessment-journey";
import { isPathwayId, type PathwayId } from "./pathways";

/** Keep the displayed pathway aligned with URL changes and browser restoration. */
export function AssessmentNavigation({
  initialPathway,
}: {
  initialPathway: PathwayId | null;
}) {
  const searchParams = useSearchParams();
  const [focusOnStart, setFocusOnStart] = useState(false);
  const paths = searchParams?.getAll("path");
  const pathway = paths
    ? paths.length === 1 && isPathwayId(paths[0])
      ? paths[0]
      : null
    : initialPathway;

  function changePathway(next: PathwayId | null) {
    const url = new URL(window.location.href);
    if (next) url.searchParams.set("path", next);
    else url.searchParams.delete("path");
    setFocusOnStart(true);
    window.history.replaceState(
      null,
      "",
      `${url.pathname}${url.search}${url.hash}`,
    );
  }

  return (
    <AssessmentJourney
      key={pathway ?? "choose"}
      initialPathway={pathway}
      onPathwayChange={changePathway}
      focusOnStart={focusOnStart}
    />
  );
}
