/**
 * About page copy (BIT-39).
 *
 * Source: the client-reviewed prototype in `demo/about.html`, with the
 * September 2026 client feedback applied:
 * - no Perth / Western Australia wording in page copy (address stays elsewhere);
 * - Hemna's "leadership" wording changed to management expertise;
 * - Vibs's senior roles and MBA candidacy added;
 * - no AWS, ACS or UTS references.
 *
 * Keep claims to what the client has supplied. Anything new needs client wording.
 */

export type AboutCredential = {
  /** Short, scannable value, e.g. "30+ years". */
  value: string;
  title: string;
  description: string;
};

export type FounderDetail = {
  label: string;
  text: string;
};

export type Founder = {
  id: string;
  name: string;
  role: string;
  specialty: string;
  highlights: readonly string[];
  photo: { src: string; alt: string };
  details: readonly FounderDetail[];
};

export type AboutValue = {
  title: string;
  description: string;
};

export const aboutHero = {
  label: "Our mission",
  title:
    "To help individuals advance their AI careers, professionals become more productive, and leaders govern AI confidently.",
  lead: "Through coaching, education, automation and advisory services.",
} as const;

export const aboutStory = {
  label: "Who we are",
  title: "World-class expertise, within reach.",
  paragraphs: [
    "BITDOT was founded on a simple observation: the people and organisations who need AI guidance most, not-for-profit boards, small businesses, students and career-changers, are the least able to access the expertise large enterprises buy from big consulting firms.",
    "We set out to close that gap. We bring world-class AI, data and governance expertise to your doorstep, so no one is left behind in the AI transition. By listening first and delivering customised solutions, we help individuals and organisations thrive, from a graduate's first AI role to a board's first AI policy.",
    "Our directors bring over 30 years of combined experience, and a habit of doing the work rather than describing it.",
  ],
} as const;

export const aboutCredibility = {
  label: "Why boards trust us",
  title: "Credentials that hold up under scrutiny.",
  lead: "Not a training company reading from a slide deck. Two directors with the qualifications and the track record to be in the room.",
  items: [
    {
      value: "30+ years",
      title: "Combined experience",
      description:
        "Combined experience across both directors, not a single founder's résumé stretched thin.",
    },
    {
      value: "GAICD",
      title: "Governance qualified",
      description:
        "Vaibhav Agrawal holds the AICD's Graduate Diploma, the credential Australian boards look for in a governance advisor.",
    },
    {
      value: "National",
      title: "AI Guardrails contributor",
      description:
        "Played a direct role in developing the National AI Guardrails through the Department of Industry, Science and Resources.",
    },
    {
      value: "UWA",
      title: "Advisory board member",
      description:
        "Sits on the advisory board for UWA's Business and Computer Science schools, shaping the Master of AI curriculum.",
    },
  ] satisfies readonly AboutCredential[],
} as const;

export const aboutLeadership = {
  label: "Our leadership",
  title: "Practitioners first, advisors second.",
  founders: [
    {
      id: "hemna-goyal",
      name: "Hemna Goyal",
      role: "Co-Founder & Managing Director",
      specialty: "Management Specialist",
      highlights: ["Management expertise", "Governance"],
      photo: {
        src: "/images/people/hemna-goyal.jpg",
        alt: "Portrait of Hemna Goyal",
      },
      details: [
        {
          label: "Academic foundation",
          text: "B.Arch. and Master of Project & Program Management.",
        },
        {
          label: "Expertise",
          text: "Governance and strategic decision-making. Development of AI governance training for not-for-profits and small-to-medium businesses. AI guardrails and data governance.",
        },
        {
          label: "Management expertise",
          text: "A strategic visionary empowering boards in the age of AI. Drives impactful board visions and strategies for business growth, future-proofing frameworks, and creating training to equip leaders for ethical and efficient AI implementation.",
        },
      ],
    },
    {
      id: "vaibhav-agrawal",
      name: "Vaibhav Agrawal",
      role: "Co-Founder & Director",
      specialty: "Data & AI Specialist",
      highlights: ["GAICD", "National AI Guardrails"],
      photo: {
        src: "/images/people/vaibhav-agrawal.jpg",
        alt: "Portrait of Vaibhav Agrawal",
      },
      details: [
        {
          label: "Academic foundation",
          text: "GAICD, B.Tech and M.Tech in Data & Analytics. Currently an MBA candidate.",
        },
        {
          label: "Expertise",
          text: "AI governance and strategic decision-making. Played a role in the development of the National AI Guardrails through the Department of Industry, Science and Resources.",
        },
        {
          label: "Industry leadership",
          text: "Has held senior leadership roles at leading organisations. Lecturer at UWA, shaping future AI professionals, and a member of the advisory board for UWA's Business and Computer Science schools, contributing to Master of AI curriculum design.",
        },
      ],
    },
  ] satisfies readonly Founder[],
} as const;

export const aboutValues = {
  label: "How we work",
  title: "Three things we do not compromise on.",
  items: [
    {
      title: "Listening first",
      description:
        "We ask what the organisation is actually trying to do before we propose anything. Customised solutions come from that conversation, not a template.",
    },
    {
      title: "Within everyone's reach",
      description:
        "The organisations that need AI guidance most, not-for-profit boards, small businesses and students, are the least able to buy it from a large consultancy. We exist to close that gap.",
    },
    {
      title: "Governance from the top",
      description:
        "Strong AI adoption begins with the board and lives in the everyday. We work at both ends: structured programs for directors, practical training for the people doing the work.",
    },
  ] satisfies readonly AboutValue[],
} as const;

export const aboutCta = {
  title: "Ready to build your board's competence in AI?",
  description:
    "Reach out for further discussion and tailored support. We are committed to helping your organisation navigate AI with confidence.",
  bookingHref: "/booking",
  bookingLabel: "Book a session",
} as const;
