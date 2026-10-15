# GenAI Use and Review Evidence

Prepared 7 October 2026 and updated **15 October 2026** to align with the final group
report's individual AI-use declarations.

## Acknowledgement

GenAI was used as an assistant for development and documentation where applicable; it
was not treated as evidence of correctness or client approval. Outputs were checked
against the repository, project requirements, peer review, provider documentation and
executable tests before being retained. AI was not given authority to certify client
acceptance or approve production account changes.

## Individual declarations

| Member and tool | Purpose and work affected | Evaluation and adaptation |
| --- | --- | --- |
| Sandra / Claude | Used Claude to assist with development and debugging of the Contact page, including form validation, accessibility and supporting tests. | Checked Claude's suggestions against the existing contact API, project requirements and client feedback, adapted the implementation where needed, and verified the final changes using lint, formatting, type checking, automated tests, production build and manual browser testing. |
| Karthikeya / ChatGPT | Used ChatGPT to help debug the Resources page. | Checked AI suggestions against the existing shared layout, adapted the implementation where needed, and verified the final result using tests, lint, type checking and browser testing. |
| Lizhou Xiong / ChatGPT | Used ChatGPT to assist with code review, investigate potential bugs and support functional testing of the website. | Checked AI suggestions against the existing code, adapted proposed changes where needed, and verified the affected functionality through testing before retaining the final result. |
| Junlong Huang / ChatGPT | Backend development, debugging and handover documentation. | Checked AI suggestions against the code and project requirements, adapted them where needed, and verified the changes through testing and code review. |
| Shravan / Claude | Used Claude to assist with front-end development, debugging, accessibility improvements and responsive design across the website. | Reviewed Claude's suggestions against the existing codebase and design requirements, changed or rejected suggestions where necessary, and verified the retained changes using automated tests, lint, type checking, production builds, accessibility checks and desktop/mobile browser testing. |

These entries record purpose, human review and verification. They do not imply that
an AI-generated suggestion was accepted unchanged, nor that AI output is evidence of
client approval or production readiness.

## Worked evidence example: Contact / Turnstile, PR #27

Evidence: [PR #27, reviews and commits](https://github.com/sandrafranco16/Capstone-Project-G-8/pull/27).

| Stage              | What happened / evidence                                                                                                                                               |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Assisted work      | AI-assisted changes addressed deployed Turnstile enforcement and widget reset/retry behaviour                                                                          |
| Critical review    | A teammate tested the production-build API and raised configuration, formatting and inconsistent `error` versus `errors` response concerns                             |
| Adaptation         | The revision aligned error responses with the form, retained fail-closed behaviour and resolved integration/formatting concerns                                        |
| Verification       | Peer review recorded 503 without the secret, 400 without a token, visible error messages and a passing format check; the PR subsequently received approvals and merged |
| Remaining boundary | The review does not prove client-owned keys were installed or that real email reached the client. Those require the live production/handover checks                    |

## Documentation review example

The handover audit found that older AI-assisted/technical descriptions overstated
automatic booking prefill, assessment contact buttons and instant publishing. These
were corrected using the current source. Analytics configuration was also separated
from unimplemented provider-script loading. This demonstrates evaluation and correction
of AI-assisted documentation rather than accepting generated text as proof of
functionality.

## Evidence and verification principles

For AI-assisted work, the retained evidence should show the human decision and the
resulting verification rather than relying on a prompt transcript alone. Appropriate
evidence includes reviewed PRs, test results, lint/type-check/build output, browser or
accessibility checks, and repository documentation that records changes and limitations.
Do not infer model versions or fabricate prompts from GitHub commits.

Redact credentials, private client data and copyrighted material from any prompt/session
evidence. Where no specific session transcript is retained, the declaration should stay
limited to the purpose, human evaluation and verification that can actually be supported.
