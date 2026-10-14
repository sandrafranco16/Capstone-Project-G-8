# Known Issues and Release Gates

Initially reviewed 7 October 2026 against main `149020a`. Updated 8 October after
integrating main `fa84259`, including CMS validation, Contact and shared navigation,
and again on 13 October 2026 after the final design and security PRs (#73 to #78).
These entries are code findings or unverified configuration gates, not a claim that
every deployed environment fails.
Suggested owners require team agreement. Recheck on the final release.

## Current register

| ID  | Finding / evidence                                                                                                                                                                                       | Impact and next action                                                                                                                                                            | Suggested owner          |
| --- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| H01 | **Resolved (13 Oct 2026).** Homepage booking actions now use the shared Cal.com links; no Microsoft Bookings text or placeholder booking logic remains in `src`                                          | Re-run A02 on the final deployment                                                                                                                                                | Frontend                 |
| H02 | `assessment-result.tsx` now ends with a pathway-specific "Book a consultation" CTA (Cal.com) next to the service links; there is still no direct Contact link                                            | Confirm with BITDOT that booking is the intended next step from the result, then test A03                                                                                         | Frontend/client          |
| H03 | `src/features/analytics` has event helpers; no `NEXT_PUBLIC_GA_ID`/`NEXT_PUBLIC_CLARITY_ID` script loading found in `src`                                                                                | IDs alone do not enable analytics. Complete provider loading/privacy verification or obtain explicit scope acceptance; test A14                                                   | Frontend/client          |
| H04 | [PR #26](https://github.com/sandrafranco16/Capstone-Project-G-8/pull/26) is merged: repository is required everywhere; production OAuth origin is required; old fallback removed                         | Code change is integrated. Confirm actual hosting variables and test client login/publication; missing required values return 503                                                 | Backend/repository owner |
| H05 | CMS media can require a direct target-branch write; protected-branch upload behaviour was previously reported                                                                                            | Validate both media upload and publishing with the real client role. Record a safe policy; this remains an acceptance gate until tested                                           | Repository owner/backend |
| H06 | Vercel remains the final host, pending BITDOT approving the Pro plan (client meeting 16 Oct 2026). Until then the submission build is reviewed on a Netlify deployment, which is not the production host | After approval, deploy to Vercel per [deployment](deployment-and-maintenance.md), set production variables, update the OAuth callback and Turnstile hostnames, and run live tests | PM/client/backend        |
| H07 | Three CMS test articles and their dedicated screenshot were removed in an earlier PR; two sample articles remain in `src/content/blog`                                                                   | Client must approve or replace the remaining sample content before commercial launch                                                                                              | Content owner/client     |
| H08 | **Resolved.** [PR #39](https://github.com/sandrafranco16/Capstone-Project-G-8/pull/39) and [PR #40](https://github.com/sandrafranco16/Capstone-Project-G-8/pull/40) are merged into main                 | None; social preview, structured data and baseline headers are covered by the CI header check and unit tests                                                                      | PR owners/reviewer       |
| H09 | `PROJECT_PLAN.md` still specifies separate assessment lead email and Vercel as the final host                                                                                                            | Record actual customer-approved flow and any hosting change with dated evidence in the final report; do not silently present original plans as final facts                        | PM/client                |
| H10 | Named testimonials quoted from public posts (Jeff McLean) are published with a source but not yet confirmed by BITDOT; the Alan Jones quote was approved by BITDOT on 13 Oct 2026                        | Record BITDOT's confirmation in `docs/testimonial-sources.md` before launch                                                                                                       | Content owner/client     |

GitHub returned **no open issues** at inspection. This repository document makes the
findings visible now; it does not mean GitHub tickets were created. Before submission,
assign actionable items to tickets/board entries, add links here and record fixes or
explicitly accepted limitations. Do not close release blockers only because documentation exists.

## Outside the current MVP

LMS, learner accounts, certificates, payments, custom video hosting, custom scheduling
and a lead database/CRM remain future work, not missing implemented backend features.
Revisit authentication, database, video access, privacy and operating costs before an
LMS extension. Do not add these to the delivery claim without a separately agreed scope.
