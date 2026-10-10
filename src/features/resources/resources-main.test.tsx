import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { ResourcesMain } from "./resources-main";

describe("Resources article enquiries", () => {
  const html = renderToStaticMarkup(<ResourcesMain />);

  it.each([
    "The real hurdle with AI isn't the software, it is us",
    "The imperative of AI governance for NFPs and SMBs",
    "Beyond data governance",
    "Data literacy in the times of AI and data science",
  ])("links the %s article to the contact enquiry flow", (title) => {
    expect(html).toContain(
      `/contact?${new URLSearchParams({ article: title }).toString()}`,
    );
  });

  it("renders all article enquiry actions as real links", () => {
    expect(html.match(/>Ask us for the article<\/a>/g)).toHaveLength(4);
  });
});
