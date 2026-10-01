import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Container } from "@/components/ui/container";
import { ResourcesPreview } from "@/features/home/resources-preview";
import { ToolsSection } from "@/features/home/tools-section";

export const metadata: Metadata = {
  title: "Tools and resources preview",
  robots: { index: false, follow: false },
};

export default function ToolsResourcesPreviewPage() {
  if (process.env.NODE_ENV !== "development") notFound();

  return (
    <>
      <Container>
        <h1>AI tools and resources preview</h1>
        <p>BIT-32 · Homepage sections</p>
      </Container>
      <ToolsSection />
      <ResourcesPreview />
    </>
  );
}
