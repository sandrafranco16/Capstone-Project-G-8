# GenAI Use and Review Evidence

Prepared for team confirmation, 7 October 2026. This is an evidence-backed example
and a completion template, not a declaration of every member's AI use.

## Acknowledgement

Junlong used an AI coding assistant to support backend implementation, documentation,
planning and code review. AI also assisted preparation of this handover pack. Suggestions
were checked against source code, requirements, peer feedback and official provider
documentation; speculative account status and acceptance were left explicitly pending.
Each member must add their own actual use/non-use and review evidence before submission.

## Worked example: Contact / Turnstile, PR #27

Evidence: [PR #27, reviews and commits](https://github.com/sandrafranco16/Capstone-Project-G-8/pull/27).

| Stage              | What happened / evidence                                                                                                                                               |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Assisted work      | AI-assisted changes addressed deployed Turnstile enforcement and widget reset/retry behaviour                                                                          |
| Critical review    | A teammate tested the production-build API and raised configuration, formatting and inconsistent `error` versus `errors` response concerns                             |
| Adaptation         | The revision aligned error responses with the form, retained fail-closed behaviour and resolved integration/formatting concerns                                        |
| Verification       | Peer review recorded 503 without the secret, 400 without a token, visible error messages and a passing format check; the PR subsequently received approvals and merged |
| Remaining boundary | The review does not prove client-owned keys were installed or that real email reached the client. Those require the live acceptance record                             |

Junlong should confirm this account accurately represents his decisions and add the
specific AI tool/model/session evidence available to him. Do not infer model names
or fabricate prompts from GitHub commits.

## Documentation review example

The handover audit found that older AI-assisted/technical descriptions overstated
automatic booking prefill, assessment contact buttons and instant publishing. These
were corrected using the current source. Analytics configuration was also separated
from unimplemented provider-script loading. This shows evaluation of outputs rather
than accepting generated documentation as proof of functionality.

## Complete for each member

| Member / work              | Tool and purpose                                                 | Human checks and changes                                                 | Evidence link                             |
| -------------------------- | ---------------------------------------------------------------- | ------------------------------------------------------------------------ | ----------------------------------------- |
| Junlong — backend/handover | AI coding assistant; confirm exact tool where available          | Source/provider checks, peer review, tests and documentation corrections | PR #27 and handover verification; confirm |
| Other members              | Pending individual confirmation, including non-use if applicable | Pending                                                                  | Pending                                   |

For each example, describe an actual suggestion, what you accepted/rejected/changed,
why, and how the final result was verified. Redact credentials, private client data
and copyrighted material from any prompt/session evidence. AI was not given authority
to certify client acceptance or approve production account changes.
