import { mkdtemp, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

import {
  BlogContentError,
  listBlogArticles,
  parseBlogArticle,
} from "./repository";

const validArticle = `---
title: A useful article
excerpt: A short summary.
category: AI Governance
publishedAt: 2026-08-20T00:00:00.000Z
---

Article body.
`;

describe("parseBlogArticle", () => {
  it("parses valid front matter and Markdown", () => {
    expect(parseBlogArticle("useful-article.md", validArticle)).toMatchObject({
      slug: "useful-article",
      title: "A useful article",
      category: "AI Governance",
      body: "Article body.",
    });
  });

  it("rejects missing required fields", () => {
    expect(() =>
      parseBlogArticle(
        "invalid.md",
        validArticle.replace("title: A useful article\n", ""),
      ),
    ).toThrow(BlogContentError);
  });
});

describe("listBlogArticles", () => {
  it("returns articles newest first and ignores the README", async () => {
    const directory = await mkdtemp(join(tmpdir(), "bitdot-blog-"));
    await writeFile(join(directory, "README.md"), "Documentation only.");
    await writeFile(join(directory, "older.md"), validArticle);
    await writeFile(
      join(directory, "newer.md"),
      validArticle.replace("2026-08-20", "2026-08-22"),
    );

    const articles = await listBlogArticles(directory);

    expect(articles.map((article) => article.slug)).toEqual(["newer", "older"]);
  });
});
