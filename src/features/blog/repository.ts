import { readFile, readdir } from "node:fs/promises";
import { basename, join } from "node:path";

import matter from "gray-matter";

import type { BlogArticle } from "./types";
import { blogCategories, type BlogCategory } from "./types";

const defaultContentDirectory = join(process.cwd(), "src/content/blog");
const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export class BlogContentError extends Error {
  constructor(fileName: string, reason: string) {
    super(`Invalid blog article "${fileName}": ${reason}`);
    this.name = "BlogContentError";
  }
}

function requiredText(
  value: unknown,
  field: string,
  fileName: string,
): string {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new BlogContentError(fileName, `${field} is required.`);
  }

  return value.trim();
}

function parsePublishedAt(value: unknown, fileName: string): string {
  const date = value instanceof Date ? value : new Date(String(value));

  if (Number.isNaN(date.getTime())) {
    throw new BlogContentError(fileName, "publishedAt must be a valid date.");
  }

  return date.toISOString();
}

function parseCategory(value: unknown, fileName: string): BlogCategory {
  if (!blogCategories.includes(value as BlogCategory)) {
    throw new BlogContentError(fileName, "category is not supported.");
  }

  return value as BlogCategory;
}

export function parseBlogArticle(fileName: string, source: string): BlogArticle {
  const slug = basename(fileName, ".md");
  if (!slugPattern.test(slug)) {
    throw new BlogContentError(fileName, "file name must be a URL-safe slug.");
  }

  const { data, content } = matter(source);
  const body = content.trim();
  if (!body) throw new BlogContentError(fileName, "body is required.");

  const youtubeUrl =
    typeof data.youtubeUrl === "string" && data.youtubeUrl.trim()
      ? data.youtubeUrl.trim()
      : undefined;

  return {
    slug,
    title: requiredText(data.title, "title", fileName),
    excerpt: requiredText(data.excerpt, "excerpt", fileName),
    category: parseCategory(data.category, fileName),
    publishedAt: parsePublishedAt(data.publishedAt, fileName),
    youtubeUrl,
    body,
  };
}

export async function listBlogArticles(
  contentDirectory = defaultContentDirectory,
): Promise<BlogArticle[]> {
  const fileNames = (await readdir(contentDirectory)).filter(
    (fileName) => fileName.endsWith(".md") && fileName.toLowerCase() !== "readme.md",
  );
  const articles = await Promise.all(
    fileNames.map(async (fileName) =>
      parseBlogArticle(
        fileName,
        await readFile(join(contentDirectory, fileName), "utf8"),
      ),
    ),
  );

  return articles.sort(
    (left, right) =>
      new Date(right.publishedAt).getTime() - new Date(left.publishedAt).getTime(),
  );
}

export async function getBlogArticle(slug: string): Promise<BlogArticle | null> {
  if (!slugPattern.test(slug)) return null;
  const articles = await listBlogArticles();
  return articles.find((article) => article.slug === slug) ?? null;
}
