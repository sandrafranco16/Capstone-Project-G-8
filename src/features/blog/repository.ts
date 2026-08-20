import type { BlogArticle } from "./types";

// Markdown parsing will be implemented with the Decap CMS proof of concept.
// Keeping reads behind this boundary avoids coupling pages to a parser.
export async function listBlogArticles(): Promise<BlogArticle[]> {
  return [];
}

export async function getBlogArticle(slug: string): Promise<BlogArticle | null> {
  void slug;
  return null;
}
