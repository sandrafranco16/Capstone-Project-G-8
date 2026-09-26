import type { AssessmentLevel } from "../types";
import type { PathwayId } from "../types";

export const services = {
  career: { label: "AI career coaching", href: "/services#career" },
  training: { label: "AI and automation training", href: "/services#training" },
  governance: {
    label: "AI governance and board training",
    href: "/services#governance",
  },
  risk: {
    label: "AI risk workshops and crisis preparation",
    href: "/services#crisis",
  },
} as const;

type ServiceId = keyof typeof services;
type Recommendation = { nextStep: string; services: readonly ServiceId[] };

// Proposed guidance for reflection; levels are not certifications or a
// determination of organisational compliance. Client sign-off is pending.
export const resultMessages: Record<AssessmentLevel, string> = {
  beginner:
    "You are building your foundations. Start with a small, supported step and learn what good practice looks like.",
  explorer:
    "You have started exploring. Turn what you have tried into a repeatable approach with clear checks.",
  practitioner:
    "You report established practices. Look for gaps, review evidence and make improvements repeatable.",
  leader:
    "You report consistent practices in this pathway. Test those assumptions, invite challenge and keep improving.",
};

export const recommendationMatrix: Record<
  PathwayId,
  Record<AssessmentLevel, Recommendation>
> = {
  career: {
    beginner: {
      nextStep:
        "Choose a target role and identify one practical skill to work on with a coach.",
      services: ["career", "training"],
    },
    explorer: {
      nextStep:
        "Build a small project for your target role and ask for feedback on how you explain it.",
      services: ["career", "training"],
    },
    practitioner: {
      nextStep:
        "Refine your portfolio and rehearse explaining outcomes, limitations and your contribution.",
      services: ["career", "governance"],
    },
    leader: {
      nextStep:
        "Review your next career move and strengthen the evidence behind your responsible AI practice.",
      services: ["career", "governance"],
    },
  },
  learn: {
    beginner: {
      nextStep:
        "Bring one everyday task to a hands-on workshop and practise checking the output.",
      services: ["training"],
    },
    explorer: {
      nextStep:
        "Choose one experiment to repeat, write down the steps and define a human check.",
      services: ["training", "risk"],
    },
    practitioner: {
      nextStep:
        "Measure the benefit of a workflow and review its safeguards before wider use.",
      services: ["training", "risk"],
    },
    leader: {
      nextStep:
        "Review how your team maintains workflows and shares evidence of what works.",
      services: ["training", "governance"],
    },
  },
  govern: {
    beginner: {
      nextStep:
        "Start a leadership discussion about current AI uses, responsibilities and training needs.",
      services: ["governance", "training"],
    },
    explorer: {
      nextStep:
        "Agree decision owners and turn informal advice into a practical governance plan.",
      services: ["governance"],
    },
    practitioner: {
      nextStep:
        "Review how leaders challenge AI decisions and follow up on risks and outcomes.",
      services: ["governance", "risk"],
    },
    leader: {
      nextStep:
        "Use a challenging scenario to test oversight and identify where governance should evolve.",
      services: ["governance", "risk"],
    },
  },
  risk: {
    beginner: {
      nextStep:
        "Identify one important AI use and discuss its data, potential harms and response owner.",
      services: ["risk", "governance"],
    },
    explorer: {
      nextStep:
        "Document the main risks and agree safeguards and an escalation route.",
      services: ["risk", "governance"],
    },
    practitioner: {
      nextStep:
        "Rehearse an incident and check whether response, communication and recovery work together.",
      services: ["risk"],
    },
    leader: {
      nextStep:
        "Challenge your safeguards with a new scenario and track the resulting improvements.",
      services: ["risk", "governance"],
    },
  },
};
