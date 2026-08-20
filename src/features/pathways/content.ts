export type Pathway = {
  slug: string;
  title: string;
  audience: string;
  summary: string;
  serviceSlugs: string[];
};

export const pathways: Pathway[] = [
  {
    slug: "launch-my-ai-career",
    title: "Launch My AI Career",
    audience: "Students, graduates and professionals",
    summary: "Build a practical roadmap into AI roles and strengthen career positioning.",
    serviceSlugs: ["career-development"],
  },
  {
    slug: "learn-ai-and-automation",
    title: "Learn AI & Automation",
    audience: "Professionals, teams and small businesses",
    summary: "Apply AI tools and automation to real workflows with practical guidance.",
    serviceSlugs: ["ai-and-automation"],
  },
  {
    slug: "govern-ai-responsibly",
    title: "Govern AI Responsibly",
    audience: "Executives, boards and organisations",
    summary: "Build governance capability, accountability and informed AI oversight.",
    serviceSlugs: ["ai-governance", "executive-and-board"],
  },
  {
    slug: "prepare-for-ai-risks",
    title: "Prepare for AI Risks",
    audience: "Leaders and risk teams",
    summary: "Prepare decision-makers for AI incidents, uncertainty and crisis response.",
    serviceSlugs: ["ai-risk-and-crisis"],
  },
];

export function getPathway(slug: string) {
  return pathways.find((pathway) => pathway.slug === slug);
}
