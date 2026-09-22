# BIT-40 legal page review

The four sections at `/legal` are implemented in `demo/legal.html`. The page is a
draft and is marked `noindex` in `src/app/legal/page.tsx`; `/legal` is excluded
from `src/app/sitemap.ts` until BITDOT approves the copy.

## BITDOT decisions before publication

- Confirm the legal entity name, contact address and whether the Privacy Act
  and Australian Privacy Principles apply to the business.
- Confirm all categories of personal information collected through contact,
  booking, spam protection, hosting and any future analytics or mailing list.
- Name the actual service providers, retention periods, security practices,
  overseas disclosures and countries where practicable.
- Agree on how access, correction and privacy complaints are handled.
- Approve the Terms of Use, including governing law and any liability clauses.
- Review the Disclaimer against the actual services and published content.
- Audit accessibility, record known limitations, and approve the target and
  feedback process in the Accessibility section.

The [OAIC's APP 1 guidance](https://www.oaic.gov.au/privacy/australian-privacy-principles/australian-privacy-principles-guidelines/chapter-1-app-1-open-and-transparent-management-of-personal-information)
lists the information an APP privacy policy must cover when the APPs apply. The
[W3C accessibility statement guidance](https://www.w3.org/WAI/planning/statements/)
recommends a stated standard, contact route and known limitations.

After approval, update the visible draft notice and final copy, remove `robots`
from `src/app/legal/page.tsx` and the static demo's `<meta name="robots">`,
and add `/legal` back to `src/app/sitemap.ts`.
