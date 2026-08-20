import { notFound } from "next/navigation";

import { Container } from "@/components/ui/container";
import { getBlogArticle } from "@/features/blog/repository";

type ArticlePageProps = { params: Promise<{ slug: string }> };

export default async function ArticlePage({ params }: ArticlePageProps) {
  const article = await getBlogArticle((await params).slug);
  if (!article) notFound();

  return (
    <article className="section">
      <Container className="prose">
        <p className="eyebrow">{article.category}</p>
        <h1>{article.title}</h1>
        <p className="lead">{article.excerpt}</p>
        <p>{article.body}</p>
      </Container>
    </article>
  );
}
