import type { AssessmentQuestion } from "./types";

export const pathwayIds = ["career", "learn", "govern", "risk"] as const;
export type PathwayId = (typeof pathwayIds)[number];
export type AssessmentPathway = {
  id: PathwayId;
  label: string;
  audience: string;
  description: string;
  questions: AssessmentQuestion[];
};

// Proposed BIT-30 content, grounded in PROJECT_PLAN.md and the demo service
// descriptions. The pathway-specific questions still require client approval.
function question(
  id: string,
  prompt: string,
  labels: [string, string, string, string],
): AssessmentQuestion {
  return {
    id,
    prompt,
    options: labels.map((label, score) => ({
      label,
      value: `${id}-${score}`,
      score,
    })),
  };
}

export const assessmentPathways: Record<PathwayId, AssessmentPathway> = {
  career: {
    id: "career",
    label: "Launch My AI Career",
    audience: "Students & professionals",
    description:
      "Find your next step towards an AI role, from first skills to evidence of your work.",
    questions: [
      question(
        "career-direction",
        "How clear is your next step towards an AI role?",
        [
          "I am exploring what AI roles involve",
          "I have a role in mind but no learning plan",
          "I follow a learning plan for a target role",
          "I review my plan against role requirements and feedback",
        ],
      ),
      question(
        "career-tools",
        "How do you use AI tools in your own work or study?",
        [
          "I have not used them yet",
          "I try tools on occasional tasks",
          "I use them regularly and check their outputs",
          "I compare approaches and can explain when AI is unsuitable",
        ],
      ),
      question(
        "career-evidence",
        "What evidence of your AI skills could you show an employer?",
        [
          "I do not have an example yet",
          "I have followed tutorials or made small experiments",
          "I have a project with a clear problem and outcome",
          "I can show tested projects, limitations and lessons learned",
        ],
      ),
      question(
        "career-interview",
        "How prepared are you to discuss your AI skills in an application or interview?",
        [
          "I am unsure how to describe my skills",
          "I have started updating my resume",
          "I can explain a project and my contribution",
          "I tailor my examples and practise using feedback",
        ],
      ),
      question(
        "career-responsibility",
        "How do you handle sensitive information and unreliable AI outputs?",
        [
          "I am not sure what to check",
          "I know there are risks but need a checklist",
          "I check outputs and follow data-use guidance",
          "I document limitations and can explain safeguards to others",
        ],
      ),
    ],
  },
  learn: {
    id: "learn",
    label: "Learn AI & Automation",
    audience: "Teams & individuals",
    description:
      "Turn tool experiments into useful, repeatable workflows with human checks.",
    questions: [
      question("learn-use-case", "How do you choose tasks for AI assistance?", [
        "I am unsure where to start",
        "I try it whenever a task seems interesting",
        "I choose repeatable tasks with clear success criteria",
        "I compare benefits, effort and risks before choosing",
      ]),
      question(
        "learn-prompts",
        "What do you do when an AI response is not useful?",
        [
          "I am unsure what to change",
          "I reword the request and try again",
          "I add context, examples and constraints",
          "I test reusable prompts against representative tasks",
        ],
      ),
      question(
        "learn-workflows",
        "How far have you taken AI-assisted workflows?",
        [
          "I have not tried a workflow yet",
          "I have one or two experiments",
          "I use repeatable workflows with human review",
          "I maintain documented workflows with owners and fallbacks",
        ],
      ),
      question(
        "learn-checks",
        "How do you check AI-assisted work before using it?",
        [
          "I do not have a checking process",
          "I check outputs when something looks wrong",
          "I check accuracy and sensitive data before use",
          "I use agreed checks and track recurring failures",
        ],
      ),
      question(
        "learn-improvement",
        "How do you know whether an AI workflow is helping?",
        [
          "I have not assessed this yet",
          "I rely on how useful it feels",
          "I compare time or quality with the previous process",
          "I review measured outcomes and improve the workflow",
        ],
      ),
    ],
  },
  govern: {
    id: "govern",
    label: "Govern AI Responsibly",
    audience: "Executives & boards",
    description:
      "Reflect on accountability, oversight and the decisions behind responsible AI use.",
    questions: [
      question(
        "govern-visibility",
        "How clearly can your organisation describe where AI is used?",
        [
          "We do not yet know where AI is used",
          "We know about some individual experiments",
          "We maintain a list of uses and their owners",
          "We regularly review uses, owners and changes",
        ],
      ),
      question(
        "govern-accountability",
        "Who is accountable for AI-related decisions?",
        [
          "Responsibilities have not been assigned",
          "People take responsibility informally",
          "Decision owners and escalation routes are documented",
          "Leaders regularly review decisions and accountability",
        ],
      ),
      question("govern-guidance", "What guidance supports staff using AI?", [
        "We do not have agreed guidance",
        "We share informal advice",
        "We provide approved guidance and staff training",
        "We review guidance and check whether it works in practice",
      ]),
      question(
        "govern-decisions",
        "How are new AI uses assessed before adoption?",
        [
          "There is no agreed review process",
          "Reviews happen when someone raises a concern",
          "We review benefits, data use and risks before approval",
          "We document decisions and revisit them as uses change",
        ],
      ),
      question("govern-oversight", "How does leadership oversee AI outcomes?", [
        "AI is not yet on the leadership agenda",
        "We discuss AI occasionally",
        "We receive regular reports on outcomes and issues",
        "We challenge reports and track agreed improvements",
      ]),
    ],
  },
  risk: {
    id: "risk",
    label: "Prepare for AI Risks",
    audience: "Boards & risk leaders",
    description:
      "Explore safeguards, incident response and readiness to practise difficult scenarios.",
    questions: [
      question(
        "risk-identification",
        "How do you identify risks from AI use?",
        [
          "We have not identified specific risks yet",
          "We discuss obvious risks informally",
          "We document risks for individual uses",
          "We review risks as tools, uses and impacts change",
        ],
      ),
      question("risk-data", "How do you control data shared with AI tools?", [
        "We do not have agreed data-sharing rules",
        "Individuals decide what seems appropriate",
        "We define permitted data and access for approved tools",
        "We regularly check and improve those controls",
      ]),
      question(
        "risk-safeguards",
        "How are safeguards checked before AI outputs affect people or decisions?",
        [
          "We have not defined safeguards",
          "We rely on occasional manual checks",
          "We use documented checks and human review",
          "We test safeguards and record failures and improvements",
        ],
      ),
      question(
        "risk-response",
        "What would happen if an AI tool caused a serious error or exposed information?",
        [
          "We are unsure who to contact",
          "We would ask a manager to work out the response",
          "We have response owners and an escalation process",
          "We practise response, communication and recovery",
        ],
      ),
      question(
        "risk-rehearsal",
        "How do you prepare for unfamiliar AI incidents?",
        [
          "We have not discussed scenarios",
          "We discuss possible incidents informally",
          "We run structured scenario discussions",
          "We rehearse scenarios and track lessons to completion",
        ],
      ),
    ],
  },
};

export function isPathwayId(value: unknown): value is PathwayId {
  return typeof value === "string" && pathwayIds.some((id) => id === value);
}
