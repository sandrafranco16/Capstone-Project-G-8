/**
 * Card colour system (Atlassian-inspired): soft tinted cards with one bold,
 * saturated card per group. Styles live in src/styles/card-tones.css; apply a
 * tone with `data-card-tone={tone}` on the card element.
 */
export type CardTone =
  // Light tints: dark tinted text
  | "sky"
  | "butter"
  | "mint"
  | "rose"
  | "peach"
  | "lavender"
  // Bold fills: white text
  | "violet"
  | "cobalt"
  | "teal"
  | "raspberry"
  | "ember"
  | "emerald"
  | "ink";

/** Picks the tone for item `index`, cycling through the group's palette. */
export function toneAt(palette: readonly CardTone[], index: number): CardTone {
  return palette[index % palette.length];
}

/** Pathway cards on the homepage and the assessment. */
export const pathwayTones = {
  career: "rose",
  learn: "teal",
  govern: "sky",
  risk: "butter",
} as const satisfies Record<string, CardTone>;

/** Each service practice gets its own colour story, bold card second. */
export const servicePracticeTones: Record<string, readonly CardTone[]> = {
  career: ["rose", "raspberry", "butter", "peach"],
  training: ["mint", "teal", "sky", "butter"],
  governance: ["sky", "violet", "lavender", "butter"],
  crisis: ["peach", "ember", "butter", "rose"],
};

export const pageCardTones = {
  homePartnership: ["sky", "violet", "butter", "mint", "peach", "lavender"],
  homeResources: ["butter", "ink", "sky"],
  resourcesFrameworks: ["sky", "cobalt", "butter", "lavender", "mint", "peach"],
  resourcesSources: ["butter", "ink", "sky", "mint"],
  automationLab: ["sky", "cobalt", "butter"],
} as const satisfies Record<string, readonly CardTone[]>;
