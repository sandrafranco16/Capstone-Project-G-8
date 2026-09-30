# BIT-30 — Pathways and AI Readiness Assessment

## Review status and evidence

**Proposed content — client approval pending.** This PR supplies a working review version, not evidence of final client acceptance. The UI carries a preview notice and the assessment route is marked noindex until sign-off.

Sources available when drafted:

- `PROJECT_PLAN.md`, sections 3.1, 3.4 and 4: four audience pathways, four readiness levels, relevant service recommendations, and MVP boundaries.
- `demo/index.html`: original shared five-question prototype, 0–3 option values, score bands 0–3 / 4–7 / 8–11 / 12–15, and pathway recommendations.
- `demo/services.html`: existing career, training, governance and crisis service descriptions and anchors.
- User-supplied BIT-30 Jira screenshot: pathway-specific questions, documented scoring, recommendation matrix, result messages, research/feedback alignment and client approval.
- User-supplied `Group+8_Project+Specification+and+Plans.pdf` (submitted 18 August 2026): pages 2–3 define the four pathways, four readiness levels, relevant services and MVP boundaries; page 5 separates assessment logic from email lead capture; pages 8–9 require content review and scoring verification. Appendix A5 (page 12) approves the project specification scope, not this question set.
- User-supplied Teams feedback screenshot from Vibs, received for this PR on 18 September 2026. The screenshot shows Sunday but no calendar date; no exact feedback date is inferred.

The supplied specification and feedback have been reviewed and the BIT-30-relevant feedback is incorporated below. The 20 questions, detailed answer wording, score bands and revised recommendation matrix remain proposals for final client review: the supplied material does not contain an approved question bank or validate the numeric thresholds. No separate completed question-level research register was supplied. Personal contact details and private screenshots/PDFs are not copied into this repository.

## Client feedback mapping

| Supplied feedback                                                                                                             | Implementation or follow-up                                                                                                                                                                                                                                                                                                                          |
| ----------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Four services/pathways should be at the top; the front door should not lead with the governance course.                       | The four existing pathway cards replace the old hero as the first homepage section. All four are visible in a responsive grid, before the governance program. The original `#pathways` and `#flagship` anchors remain available.                                                                                                                     |
| Put “Start where you are” at the top and revise the wording for a landing page.                                               | The first section now has one H1, “Find your next step with AI.”, and introduces career, practical AI, governance and risk. Each card opens its matching assessment.                                                                                                                                                                                 |
| The quiz is good; governance and risk questions should reflect their agendas.                                                 | Governance questions cover AI-use visibility, decision accountability, staff guidance, adoption review and leadership oversight. Risk questions cover identification, data controls, safeguard testing, incident response and scenario rehearsal. These use separate sets from career and learning. The specific wording still needs final approval. |
| Add Vibs's committee contribution, senior roles and MBA candidacy; change Hemna's leadership wording to management expertise. | Biography content follow-up outside BIT-30; no claim that these changes are complete in this PR.                                                                                                                                                                                                                                                     |
| Remove AWS/ACS logos and UTS references; use the original BITDOT logo.                                                        | Brand/attribution follow-up outside BIT-30, requiring a site-wide check and the approved logo asset. No unsupported replacement credential claims are added here.                                                                                                                                                                                    |
| Ask about Microsoft Bookings versus email and integration costs.                                                              | Booking decision/cost follow-up outside BIT-30. The supplied specification records Cal.com as the agreed baseline. The screenshot is a question, not an instruction to change providers; no current pricing claim or provider switch is made here.                                                                                                   |

The old prototype is preserved in `demo/` for reference. The application adapter implements the landing changes when the homepage is rendered. The full MVP still requires consent-based assessment lead email delivery (PDF page 2), which is separate Sprint 4 work (page 5) and is not implemented or claimed complete by this content/logic PR. CRM/lead databases remain explicitly out of the MVP.

## Flow

Homepage pathway card → `/assessment?path=career|learn|govern|risk` → five questions → result level, next step and service links. Direct `/assessment` starts with pathway selection. Unknown or repeated path parameters return to the chooser. Back retains answers; edited answers replace their prior score. Retake and change pathway clear answers. Reload resets the assessment.

The original HTML files remain reference material. A guarded adapter converts the four homepage cards to normal links, moves that section into the old hero position with landing copy, replaces the old quiz region with an invitation, and removes the bounded old assessment script. The governance section and its ID remain intact below the pathways. PR20/21 are not dependencies.

## Proposed scoring

Each pathway has five equally weighted questions. Every question has four options worth 0, 1, 2 or 3 points. All five must have a known option; missing, additional, unknown and cross-pathway answers cannot produce a result. Total = sum of the five selected option values, maximum 15.

| Score | Level        |
| ----- | ------------ |
| 0–3   | Beginner     |
| 4–7   | Explorer     |
| 8–11  | Practitioner |
| 12–15 | Leader       |

These bands preserve the prototype as a review baseline. They are not statistically validated or a compliance/certification judgement. Scores reflect self-reported practice in the selected pathway and should not be compared across pathways. A high total can mask a low answer; the result explicitly notes this and provides an answer review. Confirm with the client whether any risk/governance answer should override or cap the overall level before release.

## Question and answer catalogue

### Launch My AI Career

Find your next step towards an AI role, from first skills to evidence of your work.

**How clear is your next step towards an AI role?** (`career-direction`)

- **0** — I am exploring what AI roles involve
- **1** — I have a role in mind but no learning plan
- **2** — I follow a learning plan for a target role
- **3** — I review my plan against role requirements and feedback

**How do you use AI tools in your own work or study?** (`career-tools`)

- **0** — I have not used them yet
- **1** — I try tools on occasional tasks
- **2** — I use them regularly and check their outputs
- **3** — I compare approaches and can explain when AI is unsuitable

**What evidence of your AI skills could you show an employer?** (`career-evidence`)

- **0** — I do not have an example yet
- **1** — I have followed tutorials or made small experiments
- **2** — I have a project with a clear problem and outcome
- **3** — I can show tested projects, limitations and lessons learned

**How prepared are you to discuss your AI skills in an application or interview?** (`career-interview`)

- **0** — I am unsure how to describe my skills
- **1** — I have started updating my resume
- **2** — I can explain a project and my contribution
- **3** — I tailor my examples and practise using feedback

**How do you handle sensitive information and unreliable AI outputs?** (`career-responsibility`)

- **0** — I am not sure what to check
- **1** — I know there are risks but need a checklist
- **2** — I check outputs and follow data-use guidance
- **3** — I document limitations and can explain safeguards to others

### Learn AI & Automation

Turn tool experiments into useful, repeatable workflows with human checks.

**How do you choose tasks for AI assistance?** (`learn-use-case`)

- **0** — I am unsure where to start
- **1** — I try it whenever a task seems interesting
- **2** — I choose repeatable tasks with clear success criteria
- **3** — I compare benefits, effort and risks before choosing

**What do you do when an AI response is not useful?** (`learn-prompts`)

- **0** — I am unsure what to change
- **1** — I reword the request and try again
- **2** — I add context, examples and constraints
- **3** — I test reusable prompts against representative tasks

**How far have you taken AI-assisted workflows?** (`learn-workflows`)

- **0** — I have not tried a workflow yet
- **1** — I have one or two experiments
- **2** — I use repeatable workflows with human review
- **3** — I maintain documented workflows with owners and fallbacks

**How do you check AI-assisted work before using it?** (`learn-checks`)

- **0** — I do not have a checking process
- **1** — I check outputs when something looks wrong
- **2** — I check accuracy and sensitive data before use
- **3** — I use agreed checks and track recurring failures

**How do you know whether an AI workflow is helping?** (`learn-improvement`)

- **0** — I have not assessed this yet
- **1** — I rely on how useful it feels
- **2** — I compare time or quality with the previous process
- **3** — I review measured outcomes and improve the workflow

### Govern AI Responsibly

Reflect on accountability, oversight and the decisions behind responsible AI use.

**How clearly can your organisation describe where AI is used?** (`govern-visibility`)

- **0** — We do not yet know where AI is used
- **1** — We know about some individual experiments
- **2** — We maintain a list of uses and their owners
- **3** — We regularly review uses, owners and changes

**Who is accountable for AI-related decisions?** (`govern-accountability`)

- **0** — Responsibilities have not been assigned
- **1** — People take responsibility informally
- **2** — Decision owners and escalation routes are documented
- **3** — Leaders regularly review decisions and accountability

**What guidance supports staff using AI?** (`govern-guidance`)

- **0** — We do not have agreed guidance
- **1** — We share informal advice
- **2** — We provide approved guidance and staff training
- **3** — We review guidance and check whether it works in practice

**How are new AI uses assessed before adoption?** (`govern-decisions`)

- **0** — There is no agreed review process
- **1** — Reviews happen when someone raises a concern
- **2** — We review benefits, data use and risks before approval
- **3** — We document decisions and revisit them as uses change

**How does leadership oversee AI outcomes?** (`govern-oversight`)

- **0** — AI is not yet on the leadership agenda
- **1** — We discuss AI occasionally
- **2** — We receive regular reports on outcomes and issues
- **3** — We challenge reports and track agreed improvements

### Prepare for AI Risks

Explore safeguards, incident response and readiness to practise difficult scenarios.

**How do you identify risks from AI use?** (`risk-identification`)

- **0** — We have not identified specific risks yet
- **1** — We discuss obvious risks informally
- **2** — We document risks for individual uses
- **3** — We review risks as tools, uses and impacts change

**How do you control data shared with AI tools?** (`risk-data`)

- **0** — We do not have agreed data-sharing rules
- **1** — Individuals decide what seems appropriate
- **2** — We define permitted data and access for approved tools
- **3** — We regularly check and improve those controls

**How are safeguards checked before AI outputs affect people or decisions?** (`risk-safeguards`)

- **0** — We have not defined safeguards
- **1** — We rely on occasional manual checks
- **2** — We use documented checks and human review
- **3** — We test safeguards and record failures and improvements

**What would happen if an AI tool caused a serious error or exposed information?** (`risk-response`)

- **0** — We are unsure who to contact
- **1** — We would ask a manager to work out the response
- **2** — We have response owners and an escalation process
- **3** — We practise response, communication and recovery

**How do you prepare for unfamiliar AI incidents?** (`risk-rehearsal`)

- **0** — We have not discussed scenarios
- **1** — We discuss possible incidents informally
- **2** — We run structured scenario discussions
- **3** — We rehearse scenarios and track lessons to completion

## Result messages

- **beginner** — You are building your foundations. Start with a small, supported step and learn what good practice looks like.
- **explorer** — You have started exploring. Turn what you have tried into a repeatable approach with clear checks.
- **practitioner** — You report established practices. Look for gaps, review evidence and make improvements repeatable.
- **leader** — You report consistent practices in this pathway. Test those assumptions, invite challenge and keep improving.

## Pathway × level recommendation matrix

| Pathway               | Level        | Next step                                                                                     | Services                                                                                                               |
| --------------------- | ------------ | --------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| Launch My AI Career   | beginner     | Choose a target role and identify one practical skill to work on with a coach.                | [AI career coaching](/services#career); [AI and automation training](/services#training)                               |
| Launch My AI Career   | explorer     | Build a small project for your target role and ask for feedback on how you explain it.        | [AI career coaching](/services#career); [AI and automation training](/services#training)                               |
| Launch My AI Career   | practitioner | Refine your portfolio and rehearse explaining outcomes, limitations and your contribution.    | [AI career coaching](/services#career); [AI governance and board training](/services#governance)                       |
| Launch My AI Career   | leader       | Review your next career move and strengthen the evidence behind your responsible AI practice. | [AI career coaching](/services#career); [AI governance and board training](/services#governance)                       |
| Learn AI & Automation | beginner     | Bring one everyday task to a hands-on workshop and practise checking the output.              | [AI and automation training](/services#training)                                                                       |
| Learn AI & Automation | explorer     | Choose one experiment to repeat, write down the steps and define a human check.               | [AI and automation training](/services#training); [AI risk workshops and crisis preparation](/services#crisis)         |
| Learn AI & Automation | practitioner | Measure the benefit of a workflow and review its safeguards before wider use.                 | [AI and automation training](/services#training); [AI risk workshops and crisis preparation](/services#crisis)         |
| Learn AI & Automation | leader       | Review how your team maintains workflows and shares evidence of what works.                   | [AI and automation training](/services#training); [AI governance and board training](/services#governance)             |
| Govern AI Responsibly | beginner     | Start a leadership discussion about current AI uses, responsibilities and training needs.     | [AI governance and board training](/services#governance); [AI and automation training](/services#training)             |
| Govern AI Responsibly | explorer     | Agree decision owners and turn informal advice into a practical governance plan.              | [AI governance and board training](/services#governance)                                                               |
| Govern AI Responsibly | practitioner | Review how leaders challenge AI decisions and follow up on risks and outcomes.                | [AI governance and board training](/services#governance); [AI risk workshops and crisis preparation](/services#crisis) |
| Govern AI Responsibly | leader       | Use a challenging scenario to test oversight and identify where governance should evolve.     | [AI governance and board training](/services#governance); [AI risk workshops and crisis preparation](/services#crisis) |
| Prepare for AI Risks  | beginner     | Identify one important AI use and discuss its data, potential harms and response owner.       | [AI risk workshops and crisis preparation](/services#crisis); [AI governance and board training](/services#governance) |
| Prepare for AI Risks  | explorer     | Document the main risks and agree safeguards and an escalation route.                         | [AI risk workshops and crisis preparation](/services#crisis); [AI governance and board training](/services#governance) |
| Prepare for AI Risks  | practitioner | Rehearse an incident and check whether response, communication and recovery work together.    | [AI risk workshops and crisis preparation](/services#crisis)                                                           |
| Prepare for AI Risks  | leader       | Challenge your safeguards with a new scenario and track the resulting improvements.           | [AI risk workshops and crisis preparation](/services#crisis); [AI governance and board training](/services#governance) |

## Client acceptance checklist

- [x] Review the supplied project specification and client feedback; record source boundaries and relevant findings.
- [x] Map supplied feedback to implemented changes and separate follow-up work.
- [ ] Confirm whether a separate question-level research register should inform the final wording.
- [ ] Confirm each pathway's questions, options and intended audience.
- [ ] Confirm score bands, equal weighting and any mandatory risk safeguards.
- [ ] Confirm all 16 recommendation combinations and result messages.
- [ ] Demonstrate the final journey and record client approval (date, approver, evidence link).
- [ ] After approval, remove preview notices/noindex and run regression checks.

No client message or approval is generated by this change. BIT-30 should remain in review until these acceptance items are satisfied.

## Privacy and scope

Answers stay in React memory. No cookies, local storage, API submission, lead capture or answer-level analytics are added. Browser navigation may retain an in-memory page; reloading clears answers. Booking, consent-based email delivery and analytics integrations are separate work; a lead database/CRM is outside the MVP. Recommendation links use the existing `/services#career`, `#training`, `#governance` and `#crisis` sections, with no dependency on unmerged booking or governance PRs.

## Code organisation

Question content lives in `src/features/assessment/content/pathways.ts`; service
labels, result messages and the recommendation matrix live in
`content/recommendations.ts`. The feature modules retain pathway validation and
recommendation lookup. Shared types are in `types.ts`.

`AssessmentJourney` owns state and focus orchestration. `PathwaySelection`,
`AssessmentQuestion` and `AssessmentResult` render its three states using typed
props. The reducer handles every action in a single switch with a compile-time
exhaustive default. The homepage adapter runs five small, ordered helper steps,
retaining the same boundary guards and output.

Review refactor validation: all 50 tests, lint, TypeScript and production build
passed. A comparison against the prior PR head confirmed unchanged question and
recommendation data, byte-identical homepage transformation, and identical server
markup for 37 selection/question/result states.

## Validation

Run the existing package scripts: `pnpm test`, `pnpm lint`, `pnpm typecheck`, and `pnpm build`. The assessment suites cover 4,096 complete answer combinations, threshold boundaries, malformed answers, back/edit/retake/change transitions, all 16 service mappings, query parsing and the checked-in homepage transformation.

Browser checklist: complete every pathway; test keyboard selection and heading focus; change a previous answer and verify the new total; retake; switch paths; open recommendations; exercise direct, invalid and repeated query parameters; verify 320px, 390px and desktop layouts. Review the console for errors. Check the governance section remains present after homepage migration.

### Verification recorded for this PR

- 50 tests passed across nine suites, including the existing repository tests and checks for pathway-first landing order.
- ESLint, TypeScript, changed-file Prettier checks and the production build passed.
- In the production browser preview, all four pathways completed; career returned 0/15 and the other three returned 15/15 for the chosen test answers.
- Editing the last career answer changed 0/15 to 3/15; retake cleared answers and disabled Next until selection.
- Keyboard selection and focus transfer, pathway switching, homepage-to-governance assessment navigation, and 390px/320px layouts were checked. At the narrow viewport the document had no horizontal overflow. No assessment console errors were recorded.
- Direct, unknown and repeated path queries returned HTTP 200; unknown/repeated values showed the chooser.
- A Git merge simulation with the current PR21 branch (which includes PR20) completed without conflicts. This is not a merged integration build; repeat regression checks when those PRs land.
- After incorporating the supplied feedback, the new landing grid was checked at 1280px, 768px, 390px and 320px. The four choices use four, two or one columns respectively; the new landing section fits each viewport and the risk card opens its specific first question. Existing lower-page prototype rails still extend the document by approximately 6px at phone widths; that separate legacy layout issue is not claimed fixed here.
- PR21's `splitHomepage` was run against the transformed homepage: it accepts the output and places the pathway landing before the governance replacement slot.
