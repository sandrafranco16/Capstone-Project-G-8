# Known Issues and Release Gates

Reviewed 7 October 2026 against main `149020a` and the available source/docs.
These entries are code findings or unverified configuration gates, not a claim that
every deployed environment fails. No application fixes are included in this documentation change.
Suggested owners require team agreement. Recheck on the final release.

## Current register

| ID  | Finding / evidence                                                                                                                                                           | Impact and next action                                                                                                                                                        | Suggested owner          |
| --- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| H01 | Homepage uses `demo/index.html` through the compatibility layer; retained Microsoft Bookings text and `#contact`/placeholder booking logic                                   | Features exist on direct routes, but not all homepage actions reach them. Wire Cal.com/Contact/Blog consistently and perform A02; do not call whole-site integration complete | Frontend                 |
| H02 | `src/features/assessment/assessment-result.tsx` has service links but no direct Contact CTA                                                                                  | Agreed assessment-to-Contact journey is not fully evidenced; connect the intended path without adding an assessment email feature. Test A03                                   | Frontend                 |
| H03 | `src/features/analytics` has event helpers; no `NEXT_PUBLIC_GA_ID`/`NEXT_PUBLIC_CLARITY_ID` script loading found in `src`                                                    | IDs alone do not enable analytics. Complete provider loading/privacy verification or obtain explicit scope acceptance; test A14                                               | Frontend/client          |
| H04 | CMS config still has the old repository-owner fallback; production validation is proposed in [PR #26](https://github.com/sandrafranco16/Capstone-Project-G-8/pull/26)        | Set the current repository, branch and stable origin explicitly; decide/test PR before release. Fresh configuration must not rely on old defaults                             | Backend/repository owner |
| H05 | CMS media can require a direct target-branch write; protected-branch upload behaviour was previously reported                                                                | Validate both media upload and publishing with the real client role. Record a safe policy; this remains an acceptance gate until tested                                       | Repository owner/backend |
| H06 | Vercel retained; commercial plan approval, project, final domain, account ownership and production variables not verified in this audit                                      | Approve the cost summary, confirm configuration and run live tests. Local checks do not establish Vercel production acceptance                                                | PM/client/backend        |
| H07 | Demo Markdown articles remain under `src/content/blog`, including test-named entries                                                                                         | Review visible test content before commercial launch; remove through reviewed changes or get explicit client approval                                                         | Content owner/client     |
| H08 | [PR #39](https://github.com/sandrafranco16/Capstone-Project-G-8/pull/39) and [PR #40](https://github.com/sandrafranco16/Capstone-Project-G-8/pull/40) are open at inspection | Social-preview/structured-data and baseline-header changes are not in the inspected main. Record merge/retest or agreed deferral; do not claim those PRs as delivered         | PR owners/reviewer       |
| H09 | `PROJECT_PLAN.md` still specifies separate assessment lead email and Vercel as the final host                                                                                | Record actual customer-approved flow and any hosting change with dated evidence in the final report; do not silently present original plans as final facts                    | PM/client                |

GitHub returned **no open issues** at inspection. This repository document makes the
findings visible now; it does not mean GitHub tickets were created. Before submission,
assign actionable items to tickets/board entries, add links here and record fixes or
explicitly accepted limitations. Do not close release blockers only because documentation exists.

## Outside the current MVP

LMS, learner accounts, certificates, payments, custom video hosting, custom scheduling
and a lead database/CRM remain future work, not missing implemented backend features.
Revisit authentication, database, video access, privacy and operating costs before an
LMS extension. Do not add these to the delivery claim without a separately agreed scope.
