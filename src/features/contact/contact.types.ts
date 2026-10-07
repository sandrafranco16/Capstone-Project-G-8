export type ContactHeroContent = {
  eyebrow: string;
  title: string;
  emphasis: string;
  description: string;
};

export type ContactMethod = {
  label: string;
  value: string;
  href: string;
};

export type ContactDetailsContent = {
  title: string;
  company: string;
  methods: readonly ContactMethod[];
  booking: {
    title: string;
    description: string;
    label: string;
    href: string;
  };
};
