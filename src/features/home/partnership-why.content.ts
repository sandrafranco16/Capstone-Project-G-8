export type PartnershipService = {
  title: string;
  description: string;
};

export type WhyBitdotPoint = {
  title: string;
  description: string;
};

export const partnershipContent = {
  label: "Continued partnership",
  heading: "Beyond foundational training.",
  lead: "BITDOT is committed to being your long-term partner in realising the full potential of AI. Beyond the foundational program, we offer extended services to support your strategic journey.",
  services: [
    {
      title: "Custom strategy development",
      description:
        "Tailored AI strategies aligned with your unique business goals.",
    },
    {
      title: "Strategic tool selection",
      description:
        "Guidance in choosing the right AI tools for your specific needs.",
    },
    {
      title: "Hands-on tool workshops",
      description:
        "Practical sessions to understand and use relevant AI tools.",
    },
    {
      title: "Vendor introductions",
      description: "Connecting you with trusted AI vendors.",
    },
    {
      title: "Integration strategies",
      description:
        "Planning and executing the smooth integration of AI solutions.",
    },
    {
      title: "Fit-for-purpose customisation",
      description:
        "Ensuring AI solutions are tailored to your exact requirements.",
    },
  ] satisfies PartnershipService[],
};

export const whyBitdotContent = {
  label: "Why BITDOT",
  heading: "Credibility your board will actually trust.",
  lead: "Four things that separate a training day from a lasting change in how your organisation handles AI.",
  points: [
    {
      title: "GAICD-qualified leadership",
      description:
        "Vaibhav Agrawal holds the AICD's Graduate Diploma and helped shape the National AI Guardrails.",
    },
    {
      title: "Practitioners, not theorists",
      description:
        "Two directors who have held senior leadership roles, not a slide deck read aloud.",
    },
    {
      title: "Built for Australian rules",
      description:
        "Grounded in the frameworks Australian boards are actually being measured against.",
    },
    {
      title: "A partner after training ends",
      description:
        "Strategy, tool selection and workshops continue long after the four hours are over.",
    },
  ] satisfies WhyBitdotPoint[],
};
