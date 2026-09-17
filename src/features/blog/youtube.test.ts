import { describe, expect, it } from "vitest";

import { getYouTubeEmbedUrl } from "./youtube";

describe("getYouTubeEmbedUrl", () => {
  it("converts supported YouTube links to privacy-enhanced embeds", () => {
    expect(getYouTubeEmbedUrl("https://youtu.be/abcdefghijk")).toBe(
      "https://www.youtube-nocookie.com/embed/abcdefghijk",
    );
    expect(
      getYouTubeEmbedUrl("https://www.youtube.com/watch?v=abcdefghijk"),
    ).toBe("https://www.youtube-nocookie.com/embed/abcdefghijk");
  });

  it("rejects unsupported or malformed URLs", () => {
    expect(getYouTubeEmbedUrl("https://example.com/abcdefghijk")).toBeNull();
    expect(getYouTubeEmbedUrl("not a URL")).toBeNull();
  });
});
