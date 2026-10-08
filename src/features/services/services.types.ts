export type Service = {
  slug: string;
  title: string;
  summary: string;
  outcomes: string[];
};

export type ServiceOffer = {
  title: string;
  description: string;
  tone: "sky" | "blush" | "sage" | "lilac" | "mint" | "sand";
};

export type ServiceLinkVariant = "primary" | "coral" | "ghost" | "on-dark";

export type ServiceAction = {
  label: string;
  href: string;
  variant?: ServiceLinkVariant;
};

export type ServicePractice = {
  id: string;
  navigationLabel: string;
  title: string;
  description: string;
  enquiry: ServiceAction;
  /** Opens /booking with this practice's Cal.com appointment type selected. */
  booking: ServiceAction;
  offers: readonly ServiceOffer[];
};

export type ServicesHeroContent = {
  eyebrow: string;
  title: string;
  emphasis: string;
  description: string;
};

export type SectionHeadingProps = {
  id: string;
  title: string;
  eyebrow?: string;
  description?: string;
};

export type FAQContent = {
  eyebrow: string;
  title: string;
  items: readonly { id: string; question: string; answer: string }[];
};

export type CTAContent = {
  eyebrow: string;
  title: string;
  description: string;
  actions: readonly ServiceAction[];
};
