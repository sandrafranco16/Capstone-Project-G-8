import type {
  ContactDetailsContent,
  ContactHeroContent,
} from "./contact.types";

export const contactHero = {
  eyebrow: "Get in touch",
  title: "Tell us what you want to",
  emphasis: "achieve",
  description:
    "Don't hesitate to reach out for further discussions and tailored support. Pick what you'd like to talk about and we'll bring the right person.",
} satisfies ContactHeroContent;

export const contactDetails = {
  title: "Other ways to reach us",
  company: "BITDOT Consulting Services Pty Ltd",
  methods: [
    {
      label: "Email",
      value: "info@bitdot.com.au",
      href: "mailto:info@bitdot.com.au",
    },
    {
      label: "Mobile",
      value: "+61 476 779 285",
      href: "tel:+61476779285",
    },
  ],
  booking: {
    title: "Prefer to pick a time?",
    description: "Book a session directly and skip the back-and-forth.",
    label: "Book a session",
    href: "/booking",
  },
} satisfies ContactDetailsContent;
