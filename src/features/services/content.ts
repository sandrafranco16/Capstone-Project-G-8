export type Service = {
  slug: string;
  title: string;
  summary: string;
  outcomes: string[];
};

export const services: Service[] = [
  {
    slug: "career-development",
    title: "AI Career Development",
    summary: "Career coaching, mentoring and practical preparation for AI roles.",
    outcomes: ["Clear career roadmap", "Stronger professional positioning"],
  },
  {
    slug: "ai-and-automation",
    title: "AI & Automation Training",
    summary: "Practical learning for professionals, teams and small businesses.",
    outcomes: ["Repeatable AI workflows", "Improved team capability"],
  },
  {
    slug: "ai-governance",
    title: "AI Governance",
    summary: "Governance frameworks, policies and accountability for responsible AI.",
    outcomes: ["Clear governance controls", "Defined responsibilities"],
  },
  {
    slug: "executive-and-board",
    title: "Executive & Board Advisory",
    summary: "Focused education and advisory support for organisational leaders.",
    outcomes: ["Informed oversight", "Better strategic decisions"],
  },
  {
    slug: "ai-risk-and-crisis",
    title: "AI Risk & Crisis Preparedness",
    summary: "Scenario-based preparation for AI risks and incidents.",
    outcomes: ["Stronger incident readiness", "Confident crisis decisions"],
  },
];

export function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}
