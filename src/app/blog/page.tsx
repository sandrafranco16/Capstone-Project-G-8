import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { Container } from "@/components/ui/container";
import { listBlogArticles } from "@/features/blog/repository";
import { cn } from "@/lib/cn";
import { formatShortDate } from "@/lib/dates";

const meshCycle = ["mesh-ember", "mesh-lagoon", "mesh-orchid", "mesh-dusk"];

export const metadata: Metadata = { title: "Insights" };

export default async function BlogPage() {
  const articles = await listBlogArticles();

  return (
    <>
      <header className="page-header hero-band hero-band--charcoal">
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
              {articles.map((article, index) => (
                <article
                  className={cn(
                    "card blog-card mesh-card",
                    meshCycle[index % meshCycle.length],
                  )}
                  key={article.slug}
                >
                  <span className="mesh-arrow" aria-hidden="true">
                    <ArrowUpRight size={18} strokeWidth={2.2} />
                  </span>
                  <p className="card__meta">{article.category}</p>
                  <h2>{article.title}</h2>
                  <p>{article.excerpt}</p>
                  <div className="blog-card__footer">
                    <time dateTime={article.publishedAt}>
                      {formatShortDate(article.publishedAt)}
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
