import type { Metadata } from "next";

import { AboutPage } from "@/features/about/about-page";

const description =
  "BITDOT Consulting Services brings world-class AI, data and governance expertise within everyone's reach. Meet co-founders Hemna Goyal and Vaibhav Agrawal GAICD.";

export const metadata: Metadata = {
  title: { absolute: "About BITDOT — Our Mission and Leadership" },
  description,
  alternates: { canonical: "/about" },
  openGraph: {
    type: "website",
    url: "/about",
    title: "About BITDOT — Our Mission and Leadership",
    description,
  },
};

export default function Page() {
  return <AboutPage />;
}
