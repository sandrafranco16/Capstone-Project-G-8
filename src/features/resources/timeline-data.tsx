import type { ReactNode } from "react";

export type ResourceMilestone = {
  id: string;
  date: string;
  dateLabel: string;
  region: "au" | "eu";
  title: string;
  description: ReactNode;
  source: string;
  href: string;
};

/** Content transcribed from the approved resources prototype. */
export const milestones: ResourceMilestone[] = [
  {
    id: "eu-ai-act-prohibited-practices",
    date: "2025-02-02",
    dateLabel: "2 Feb 2025",
    region: "eu",
    title: "EU AI Act: banned practices and the AI literacy duty",
    source: "EU AI Act explorer",
    href: "https://artificialintelligenceact.eu/",
    description: (
      <p>
        {
          "The first tranche of the AI Act began to bite — a set of outright prohibitions, plus an obligation on providers and deployers to make sure the people operating their AI systems actually understand them. The literacy duty is the one most Australian organisations overlook, because it applies regardless of risk tier."
        }
      </p>
    ),
  },
  {
    id: "eu-general-purpose-ai-obligations",
    date: "2025-08-02",
    dateLabel: "2 Aug 2025",
    region: "eu",
    title: "Obligations on general-purpose AI providers begin",
    source: "European Commission",
    href: "https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai",
    description: (
      <p>
        {
          "Transparency, documentation and copyright-policy duties for the providers of general-purpose models. Relevant to Australian organisations mainly as a supply-chain question: the documentation your vendors now have to produce is documentation you can ask them for."
        }
      </p>
    ),
  },
  {
    id: "au-six-essential-ai-practices",
    date: "2025-10-21",
    dateLabel: "21 Oct 2025",
    region: "au",
    title: "Ten voluntary guardrails become six essential practices",
    source: "ai.gov.au",
    href: "https://www.ai.gov.au/staying-safe-and-responsible/essential-ai-practices",
    description: (
      <p>
        {"The National AI Centre published "}
        <em>{"Guidance for AI Adoption"}</em>
        {
          ", known as the AI6, consolidating the 2024 Voluntary AI Safety Standard into six practices: decide who is accountable, understand impacts, measure and manage risk, share essential information, test and monitor, and keep humans in control. It ships in two versions — a foundations edition for organisations getting started, and implementation guidance for higher-risk or more complex use. The older standard remains useful as a more detailed control catalogue."
        }
      </p>
    ),
  },
  {
    id: "au-national-ai-plan",
    date: "2025-12-01",
    dateLabel: "Dec 2025",
    region: "au",
    title: "The National AI Plan closes the door on a standalone AI Act",
    source: "Dept. of Industry, Science & Resources",
    href: "https://www.industry.gov.au/",
    description: (
      <p>
        {
          "The plan confirmed that Australia will regulate AI through the laws it already has — privacy, consumer, anti-discrimination, copyright and sector-specific rules — supported by voluntary guidance rather than technology-specific legislation. The mandatory high-risk guardrails floated in September 2024 were not taken forward. For organisations, this is a redistribution of responsibility rather than a reprieve: the standard of care still has to be evidenced, just against existing law."
        }
      </p>
    ),
  },
  {
    id: "au-ai-safety-institute-announced",
    date: "2026-02-01",
    dateLabel: "Early 2026",
    region: "au",
    title: "The Australian AI Safety Institute starts work",
    source: "Dept. of Industry, Science & Resources",
    href: "https://www.industry.gov.au/",
    description: (
      <p>
        {
          "Funded at $29.9 million and seated within the industry portfolio, the institute tests systems, analyses capability and harm, and advises regulators where it finds genuine gaps. It has no enforcement power of its own, so its practical significance is as the body whose gap analysis will shape whatever targeted reform eventually arrives."
        }
      </p>
    ),
  },
  {
    id: "au-privacy-act-review-response",
    date: "2026-06-15",
    dateLabel: "15 Jun 2026",
    region: "au",
    title: "First mandatory AI requirements for Commonwealth agencies",
    source: "Digital Transformation Agency",
    href: "https://www.dta.gov.au/help-and-advice/artificial-intelligence",
    description: (
      <p>
        {
          "Under version 2.0 of the Digital Transformation Agency's policy, the first hard obligations commenced for non-corporate Commonwealth entities — public AI transparency statements, a stated position on AI adoption, and foundational AI training for staff. It matters well beyond the public service: if you sell to government, the procurement questions you are asked about AI use and accountability changed on this date."
        }
      </p>
    ),
  },
  {
    id: "au-copyright-and-ai-reference-group",
    date: "2026-07-15",
    dateLabel: "15 Jul 2026",
    region: "au",
    title: "Australian Standards for AI announced, plus an Office of AI",
    source: "Prime Minister of Australia",
    href: "https://www.pm.gov.au/",
    description: (
      <p>
        {
          "The Prime Minister announced an intention to legislate an Australian Standards for AI framework, with an Office of AI established inside Prime Minister and Cabinet. Published material so far centres on large data centres and AI training rather than general duties on organisations using AI. An announcement is not legislation — treat the AI6 as the working baseline until draft law appears."
        }
      </p>
    ),
  },
  {
    id: "au-ai-safety-institute-operational",
    date: "2026-07-27",
    dateLabel: "27 Jul 2026",
    region: "eu",
    title: "The Digital Omnibus defers the high-risk deadline",
    source: "European Commission",
    href: "https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai",
    description: (
      <p>
        {
          "Days before the original cut-off, the simplification package entered into force and moved compliance for standalone high-risk systems out to December 2027, with AI embedded in regulated products following in 2028. Read carefully before relaxing: the deferral is narrow, and several duties stayed exactly where they were."
        }
      </p>
    ),
  },
  {
    id: "eu-ai-act-transparency-rules",
    date: "2026-08-02",
    dateLabel: "2 Aug 2026",
    region: "eu",
    title: "Transparency duties apply on the original schedule",
    source: "EU AI Act explorer",
    href: "https://artificialintelligenceact.eu/",
    description: (
      <p>
        {
          "Telling people when they are dealing with an AI system, and labelling AI-generated content, was not deferred. If you serve EU users through a chatbot, a synthetic-media tool or an AI-assisted service, this one landed on time."
        }
      </p>
    ),
  },
  {
    id: "au-online-safety-codes",
    date: "2026-12-02",
    dateLabel: "2 Dec 2026",
    region: "eu",
    title: "Watermarking for generative models released before August",
    source: "European Commission",
    href: "https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai",
    description: (
      <p>
        {
          "The technical requirement to mark AI-generated output was given a short extension for models already on the market. A narrow provision, but a hard one if you build on top of an older model and ship into Europe."
        }
      </p>
    ),
  },
  {
    id: "au-privacy-act-reforms",
    date: "2026-12-10",
    dateLabel: "10 Dec 2026",
    region: "au",
    title: "The one with a hard date: automated decision transparency",
    source: "Office of the Australian Information Commissioner",
    href: "https://www.oaic.gov.au/",
    description: (
      <p>
        {
          "New privacy policy obligations commence for any organisation that has arranged for a computer program to make — or substantially and directly help make — decisions that could significantly affect someone's rights or interests. Your privacy policy has to describe, in general terms, the kinds of personal information involved and the kinds of decisions being made. It captures plain rule-based software, not just AI, and it applies to qualifying decisions from that date regardless of when the system was built. Loan approvals, tenancy screening, insurance pricing, shortlisting job applicants and eligibility assessments are the obvious candidates."
        }
      </p>
    ),
  },
  {
    id: "au-automated-decision-making-rules",
    date: "2026-12-15",
    dateLabel: "Dec 2026",
    region: "au",
    title: "The rest of the government AI policy switches on",
    source: "Digital Transformation Agency",
    href: "https://www.dta.gov.au/help-and-advice/artificial-intelligence",
    description: (
      <p>
        {
          "The remaining obligations under the DTA policy — including AI impact assessments before deployment and a maintained register of in-scope AI use cases with a named owner for each — take effect. Suppliers to government should expect these to arrive as contract terms."
        }
      </p>
    ),
  },
  {
    id: "au-statutory-tort-privacy",
    date: "2027-12-02",
    dateLabel: "2 Dec 2027",
    region: "eu",
    title: "High-risk obligations, deferred but not cancelled",
    source: "EU AI Act explorer",
    href: "https://artificialintelligenceact.eu/",
    description: (
      <p>
        {
          "Risk management, data quality, human oversight, registration, logging and incident reporting for standalone high-risk systems. Surveys through 2026 kept finding the same gap — most organisations still cannot produce an inventory of the AI they operate. Inventory first, then classification, then documentation."
        }
      </p>
    ),
  },
  {
    id: "eu-ai-act-high-risk-systems",
    date: "2028-08-02",
    dateLabel: "2 Aug 2028",
    region: "eu",
    title: "AI embedded in regulated products",
    source: "European Commission",
    href: "https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai",
    description: (
      <p>
        {
          "The longest runway in the schedule, covering AI inside products already governed by EU product-safety law. If you manufacture or integrate, this is the date your conformity work has to land against."
        }
      </p>
    ),
  },
];
