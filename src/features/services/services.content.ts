import type {
  ServicePractice,
  ServicesHeroContent,
  FAQContent,
  CTAContent,
} from "./services.types";

export const servicesHero = {
  eyebrow: "Services",
  title: "What we",
  emphasis: "actually do",
  description:
    "Four practices, one idea: bring world-class AI, data and governance expertise within reach of the organisations that usually cannot buy it.",
} satisfies ServicesHeroContent;

export const servicePractices = [
  {
    id: "career",
    navigationLabel: "Career",
    title: "AI career services",
    description:
      "Coaching for students, graduates and professionals moving into AI roles, including engineers planning their next step.",
    enquiry: {
      label: "Enquire about this",
      href: "/#contact",
    },
    offers: [
      {
        title: "1:1 coaching & mentoring",
        description:
          "Regular sessions with someone who has hired for these roles and sat on the other side of the table.",
        tone: "sky",
      },
      {
        title: "Resume & profile review",
        description:
          "A teardown of how you present, rewritten against what AI employers actually screen for.",
        tone: "blush",
      },
      {
        title: "Interview preparation",
        description:
          "Technical and behavioural practice, with feedback you can act on before the real thing.",
        tone: "sage",
      },
      {
        title: "AI engineer roadmap",
        description:
          "A step-by-step plan from where you are now to the role you are aiming at.",
        tone: "lilac",
      },
    ],
  },
  {
    id: "training",
    navigationLabel: "Training",
    title: "Applied AI & automation training",
    description:
      "Practical sessions that demystify the tools, run on your real workflows rather than a demo dataset.",
    enquiry: {
      label: "Enquire about this",
      href: "/#contact",
    },
    offers: [
      {
        title: "Copilot, Claude, ChatGPT & Gemini",
        description:
          "Hands-on with the assistants your team already has licences for, and the ones about to be asked about.",
        tone: "sage",
      },
      {
        title: "Prompt engineering",
        description:
          "Repeatable prompting that produces the same quality on Friday afternoon as Monday morning.",
        tone: "sky",
      },
      {
        title: "Workflow automation",
        description:
          "Finding the repetitive work worth automating, then automating it in front of you.",
        tone: "mint",
      },
      {
        title: "AI for small business",
        description:
          "Getting the return without hiring a technology team to chase it.",
        tone: "sand",
      },
    ],
  },
  {
    id: "governance",
    navigationLabel: "Governance",
    title: "AI governance & executive education",
    description:
      "Our flagship board program plus the advisory that follows it: frameworks, policy design and accountability that survives an audit.",
    enquiry: {
      label: "Enquire about this",
      href: "/#contact",
    },
    offers: [
      {
        title: "Mastering AI Governance",
        description:
          "The four-hour board program, delivered in person across three sessions or online in staggered blocks.",
        tone: "lilac",
      },
      {
        title: "Governance frameworks",
        description:
          "Built around the six essential practices in the National AI Centre guidance, sized to your organisation.",
        tone: "blush",
      },
      {
        title: "Director education",
        description:
          "Aligned to the AICD and UTS Human Technology Institute director resources.",
        tone: "sky",
      },
      {
        title: "AI strategy development",
        description:
          "Custom strategy aligned to your business goals, with the tool selection to match.",
        tone: "sage",
      },
    ],
  },
  {
    id: "crisis",
    navigationLabel: "Risk",
    title: "AI guardrails & risk readiness",
    description:
      "Rehearse the incident before it rehearses you, and know which obligations already apply to you today.",
    enquiry: {
      label: "Enquire about this",
      href: "/#contact",
    },
    offers: [
      {
        title: "AI risk workshops",
        description:
          "Working sessions that surface where AI is actually running in your organisation.",
        tone: "sand",
      },
      {
        title: "Guardrails & data governance",
        description:
          "AI governance cannot be separated from data governance. We treat them as one problem.",
        tone: "lilac",
      },
      {
        title: "Regulatory readiness",
        description:
          "Privacy Act automated-decision transparency, procurement obligations, and what applies if you touch the EU.",
        tone: "mint",
      },
      {
        title: "Incident rehearsal",
        description:
          "A bad morning, simulated: a model produces something wrong and a journalist calls.",
        tone: "sky",
      },
    ],
  },
] satisfies readonly ServicePractice[];

export const servicesFAQ = {
  eyebrow: "Common questions",
  title: "Frequently asked.",
  items: [
    {
      id: "services-faq-1",
      question: "Who is BITDOT's board training for?",
      answer:
        "Board members, non-executive directors, executive leadership teams and senior management involved in strategy and risk. The program assumes no technical background.",
    },
    {
      id: "services-faq-2",
      question: "How long is the Mastering AI Governance program?",
      answer:
        "Four hours of immersive training. In person we split it across three sessions for engagement and retention; online we run it as staggered sessions to suit your team's schedule and location.",
    },
    {
      id: "services-faq-3",
      question: "Do you work with individuals or organisations?",
      answer:
        "Both. Individuals usually start with career coaching or the free readiness assessment. Organisations engage us for board training, team workshops, governance advisory and AI strategy.",
    },
    {
      id: "services-faq-4",
      question: "Can you train a whole team on the AI tools?",
      answer:
        "Yes. Our hands-on workshops cover Microsoft Copilot, Claude, ChatGPT and Gemini, plus prompt engineering and workflow automation, delivered in your real workflows rather than generic examples.",
    },
    {
      id: "services-faq-5",
      question: "What happens after the training?",
      answer:
        "We stay involved. Custom strategy development, tool selection, hands-on workshops, vendor introductions, integration planning and fit-for-purpose customisation are all available as continued partnership.",
    },
    {
      id: "services-faq-6",
      question: "How does the AI readiness assessment work?",
      answer:
        "You choose your pathway first, then answer five questions, about three minutes. Your level and matched recommendations appear immediately, free and ungated, and nothing is stored.",
    },
  ],
} satisfies FAQContent;

export const servicesCTA = {
  eyebrow: "Not sure which door is yours?",
  title: "Start with three minutes.",
  description:
    "Pick a pathway, take the assessment, and we will point you at the right one, or skip straight to a conversation.",
  actions: [
    {
      label: "Take the assessment",
      href: "/#pathways",
    },
    {
      label: "Book a session",
      href: "/#contact",
      variant: "on-dark",
    },
  ],
} satisfies CTAContent;
