import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/ui/container";
import { listBlogArticles } from "@/features/blog/repository";

export const metadata: Metadata = { title: "Insights" };

function formatPublishedDate(value: string) {
  return new Intl.DateTimeFormat("en-AU", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(value));
}

export default async function BlogPage() {
  const articles = await listBlogArticles();

  return (
    <>
      <header className="page-header">
        <Container>
          <p className="eyebrow">Insights</p>
          <h1>Practical articles on AI capability, governance and risk.</h1>
        </Container>
      </header>
      <section className="section">
        <Container>
          {articles.length === 0 ? (
            <p className="notice">No articles have been published yet.</p>
          ) : (
            <div className="card-grid blog-grid">
              {articles.map((article) => (
                <article className="card blog-card" key={article.slug}>
                  <p className="card__meta">{article.category}</p>
                  <h2>{article.title}</h2>
                  <p>{article.excerpt}</p>
                  <div className="blog-card__footer">
                    <time dateTime={article.publishedAt}>
                      {formatPublishedDate(article.publishedAt)}
                    </time>
                    <Link href={`/blog/${article.slug}`}>Read article →</Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
