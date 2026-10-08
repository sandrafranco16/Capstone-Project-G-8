/**
 * Homepage "AI tools" and "Resources" preview copy (BIT-32).
 *
 * Source: the client-reviewed prototype, `demo/index.html#tools` and
 * `#resources`. Only the four tools the client approved are listed; AWS and
 * ACS logos were removed at the client's request and must not be re-added.
 */

export type TrainedTool = {
  id: string;
  name: string;
  description: string;
  logo: { src: string; width: number; height: number };
};

export type ResourcePreview = {
  id: string;
  kicker: string;
  title: string;
  description: string;
  href: string;
  linkLabel: string;
};

export const toolsSection = {
  label: "Hands-on workshops",
  title: "The tools we train your team on.",
  lead: "Practical sessions in the AI assistants your organisation already runs.",
  topicsCaption: "What we cover, in your team's own words",
  tools: [
    {
      id: "copilot",
      name: "Microsoft Copilot",
      description: "Embedded across Word, Excel, Outlook and Teams.",
      logo: { src: "/images/tools/copilot.png", width: 143, height: 84 },
    },
    {
      id: "claude",
      name: "Claude",
      description: "Long-document analysis, drafting and research work.",
      logo: { src: "/images/tools/claude.png", width: 392, height: 84 },
    },
    {
      id: "chatgpt",
      name: "ChatGPT",
      description: "General-purpose assistance across everyday tasks.",
      logo: { src: "/images/tools/chatgpt.png", width: 284, height: 84 },
    },
    {
      id: "gemini",
      name: "Gemini",
      description: "Integrated with Google Workspace.",
      logo: { src: "/images/tools/gemini.png", width: 336, height: 84 },
    },
  ] satisfies readonly TrainedTool[],
  topics: [
    "AI Governance",
    "Prompt Engineering",
    "Workflow Automation",
    "Data Governance",
    "AI Guardrails",
    "Board Education",
    "Regulatory Readiness",
    "AI Strategy",
    "Risk Workshops",
    "Vendor Selection",
  ],
} as const;

/**
 * Homepage resource cards link to the matching sections of the Resources hub.
 * The dated claims below come from the approved prototype and should be
 * re-checked before launch.
 */
export const resourcesSection = {
  label: "Resources",
  title: "What changed this year.",
  lead: "The frameworks and deadlines Australian leaders are being asked about, dated and sourced.",
  items: [
    {
      id: "compliance-clock",
      kicker: "Compliance clock",
      title: "The dates that are already fixed",
      description:
        "Privacy Act automated-decision transparency starts 10 December 2026. The EU's high-risk deadline moved to December 2027; its transparency rules did not.",
      href: "/resources#clock",
      linkLabel: "View the compliance clock",
    },
    {
      id: "frameworks",
      kicker: "Frameworks",
      title: "Ten guardrails became six practices",
      description:
        "The National AI Centre's Guidance for AI Adoption is now the working baseline for Australian organisations, and it maps onto ISO/IEC 42001.",
      href: "/resources#frameworks",
      linkLabel: "Explore the frameworks",
    },
    {
      id: "reading",
      kicker: "Reading",
      title: "Articles from our directors",
      description:
        "Writing on change leadership, governance for smaller organisations, data literacy and data governance.",
      href: "/resources#reading",
      linkLabel: "Browse the articles",
    },
  ] satisfies readonly ResourcePreview[],
} as const;
