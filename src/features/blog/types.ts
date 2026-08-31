export const blogCategories = [
  "Career Development",
  "AI and Automation",
  "AI Governance",
  "Executive and Board",
  "AI Risk",
] as const;

export type BlogCategory = (typeof blogCategories)[number];

export type BlogArticle = {
  slug: string;
  title: string;
  excerpt: string;
  category: BlogCategory;
  publishedAt: string;
  youtubeUrl?: string;
  body: string;
};
