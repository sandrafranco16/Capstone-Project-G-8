import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { Container } from "@/components/ui/container";
import { getBlogArticle, listBlogArticles } from "@/features/blog/repository";
import { getYouTubeEmbedUrl } from "@/features/blog/youtube";

type ArticlePageProps = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return (await listBlogArticles()).map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const article = await getBlogArticle((await params).slug);
  return article
    ? { title: article.title, description: article.excerpt }
    : { title: "Article not found" };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const article = await getBlogArticle((await params).slug);
  if (!article) notFound();
  const embedUrl = getYouTubeEmbedUrl(article.youtubeUrl);

  return (
    <article className="section">
      <Container className="prose">
        <Link className="back-link" href="/blog">
          ← All insights
        </Link>
        <p className="eyebrow">{article.category}</p>
        <h1>{article.title}</h1>
        <p className="lead">{article.excerpt}</p>
        <time className="article-date" dateTime={article.publishedAt}>
          {new Intl.DateTimeFormat("en-AU", {
            dateStyle: "long",
            timeZone: "UTC",
          }).format(new Date(article.publishedAt))}
        </time>
        {embedUrl ? (
          <div className="video-embed">
            <iframe
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              src={embedUrl}
              title={`Video for ${article.title}`}
            />
          </div>
        ) : null}
        <div className="article-body">
          <ReactMarkdown
            components={{
              a: ({ children, href }) => {
                const external = href?.startsWith("http");
                return (
                  <a
                    href={href}
                    rel={external ? "noopener noreferrer" : undefined}
                    target={external ? "_blank" : undefined}
                  >
                    {children}
                  </a>
                );
              },
            }}
            remarkPlugins={[remarkGfm]}
          >
            {article.body}
          </ReactMarkdown>
        </div>
      </Container>
    </article>
  );
}
