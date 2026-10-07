import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { FlipCard } from "./flip-card";

const html = renderToStaticMarkup(
  <FlipCard
    front={<p>Front content</p>}
    back={<p>Back content</p>}
    showBack={{ text: "View profile", label: "Show Ada's profile" }}
    showFront={{ text: "Back", label: "Show Ada's photo" }}
  />,
);

function face(name: "front" | "back") {
  const faces = html.split(/(?=<div[^>]*aria-hidden=)/);
  return (
    faces.find((markup) =>
      markup.includes(`${name[0].toUpperCase()}${name.slice(1)} content`),
    ) ?? ""
  );
}

describe("FlipCard", () => {
  it("renders both faces", () => {
    expect(html).toContain("Front content");
    expect(html).toContain("Back content");
  });

  it("starts on the front, hiding the back from assistive technology and focus", () => {
    expect(face("front")).toMatch(/^<div[^>]*aria-hidden="false"/);
    expect(face("front")).not.toMatch(/^<div[^>]*inert/);
    expect(face("back")).toMatch(/^<div[^>]*aria-hidden="true"[^>]*inert=""/);
    expect(html).not.toContain("data-flipped");
  });

  it("gives each face a real button with an accessible name", () => {
    expect(face("front")).toMatch(
      /<button type="button"[^>]*aria-label="Show Ada&#x27;s profile"[^>]*>.*View profile<\/button>/,
    );
    expect(face("back")).toMatch(
      /<button type="button"[^>]*aria-label="Show Ada&#x27;s photo"[^>]*>.*Back<\/button>/,
    );
  });
});
