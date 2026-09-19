import type { ReactNode } from "react";

import { LegacyMarkup } from "./legacy-markup";
import { splitHomepage } from "./split-homepage";

/** Composes the React program section within complete legacy HTML boundaries. */
export function LegacyHomepage({
  markup,
  flagship,
}: {
  markup: string;
  flagship: ReactNode;
}) {
  const parts = splitHomepage(markup);

  return (
    <>
      <LegacyMarkup markup={parts.beforeMain} />
      <main id="main">
        <LegacyMarkup markup={parts.beforeFlagship} />
        {flagship}
        <LegacyMarkup markup={parts.afterFlagship} />
      </main>
      <LegacyMarkup markup={parts.afterMain} />
    </>
  );
}
