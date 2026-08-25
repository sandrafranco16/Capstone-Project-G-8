import type { Metadata } from "next";

import { Container } from "@/components/ui/container";
import { listBlogArticles } from "@/features/blog/repository";

export const metadata: Metadata = { title: "Insights" };

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
            <p className="notice">
              The article repository is ready. Articles will appear after the Decap
              CMS publishing proof of concept is completed.
            </p>
          ) : null}
        </Container>
      </section>
    </>
  );
}
