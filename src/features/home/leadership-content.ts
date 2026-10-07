export type DirectorTheme = "maroon" | "navy";

export type Director = {
  id: string;
  name: string;
  role: string;
  specialism: string;
  photo: { src: string; alt: string };
  badges: readonly string[];
  details: readonly { label: string; text: string }[];
  theme: DirectorTheme;
};

export type TestimonialTheme = "blush" | "mint";

export type Testimonial = {
  id: string;
  quote: string;
  author: string;
  role: string;
  theme: TestimonialTheme;
};

export const directors: readonly Director[] = [
  {
    id: "hemna-goyal",
    name: "Hemna Goyal",
    role: "Co-Founder & Managing Director",
    specialism: "Management Specialist",
    photo: {
      src: "/images/people/hemna-goyal.jpg",
      alt: "Portrait of Hemna Goyal",
    },
    badges: ["Management expertise", "Governance"],
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
    theme: "maroon",
  },
  {
    id: "vaibhav-agrawal",
    name: "Vaibhav Agrawal",
    role: "Co-Founder & Director",
    specialism: "Data & AI Specialist",
    photo: {
      src: "/images/people/vaibhav-agrawal.jpg",
      alt: "Portrait of Vaibhav Agrawal",
    },
    badges: ["GAICD", "National AI Guardrails"],
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
    theme: "navy",
  },
];

export const testimonials: readonly Testimonial[] = [
  {
    id: "sarah-m",
    quote:
      "The various applications through the case studies provided were new to us.",
    author: "Sarah M.",
    role: "Board Director",
    theme: "blush",
  },
  {
    id: "david-k",
    quote: "This was a good introduction into the capability of AI.",
    author: "David K.",
    role: "General Manager",
    theme: "mint",
  },
];
