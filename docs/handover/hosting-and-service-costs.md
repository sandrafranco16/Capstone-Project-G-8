# BITDOT Website: Hosting and Service Costs

## Recommendation and assumptions

Keep **Vercel Pro for commercial launch**. Hobby is AUD 0 but allows only personal,
non-commercial use ([policy](https://vercel.com/docs/limits/fair-use-guidelines)).

Monthly planning assumptions, **not measured usage**: 5,000 visits, 15,000 page views,
20 GB transfer, 100 enquiries, maximum 10 enquiries/day. One enquiry = one email;
no assessment emails. One deploying account, one Cal.com organiser, five booking
types. Articles/images in GitHub; YouTube videos embedded. No database or LMS.

**AUD estimates, excluding tax**, using the
[RBA rate on 7 October 2026](https://www.rba.gov.au/statistics/frequency/exchange-rates.html):
AUD 1 = USD 0.6970. Annual = 12 months before rounding, not an annual-plan discount.
Exchange rates/card fees may change invoices.

## Expected recurring service costs

| Service / selected option                                                                                                      | Monthly AUD | Annual AUD | Coverage and conditions                                                       |
| ------------------------------------------------------------------------------------------------------------------------------ | ----------: | ---------: | ----------------------------------------------------------------------------- |
| [Vercel Pro](https://vercel.com/docs/plans/pro-plan)                                                                           |       28.69 |     344.33 | Website/server endpoints; one deploying seat; AUD 28.69 monthly usage credit. |
| [Resend Free](https://resend.com/pricing)                                                                                      |           0 |          0 | 3,000 emails/month, 100/day; sufficient here. Verify sending domain.          |
| [Cal.com Individual Free](https://cal.com/pricing)                                                                             |           0 |          0 | One organiser; unlimited event types/bookings, including our five types.      |
| [Decap CMS](https://decapcms.org/) + GitHub OAuth                                                                              |           0 |          0 | No CMS/auth subscription; existing OAuth endpoints run on Vercel.             |
| [Turnstile Free](https://developers.cloudflare.com/turnstile/plans/)                                                           |           0 |          0 | Unlimited challenges; 20 widgets, 10 hostnames/widget.                        |
| [Google Analytics standard](https://marketingplatform.google.com/about/analytics/) + [Clarity](https://clarity.microsoft.com/) |           0 |          0 | Basic analytics/session insights.                                             |
| **New-service subtotal**                                                                                                       |   **28.69** | **344.33** | **Expected usage within credit; not a spending cap.**                         |

With [Flat Rate CDN](https://vercel.com/changelog/flat-rate-cdn-is-now-ga-for-pro-teams)
enabled: 1 million requests and 1 TB transfer/month. At 20 requests/page, estimate
300,000 requests/month. Functions/builds/images remain metered: monitor usage and set
spending alerts. Existing Pro teams may need to enable this in Billing.

## Conditional extra costs — not included above

| Trigger / upgrade                                                                                                                                                                                                                                                                                                                | Extra monthly AUD | Extra annual AUD |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------: | ---------------: |
| Each additional [Vercel deploying seat](https://vercel.com/docs/plans/pro-plan#team-seats)                                                                                                                                                                                                                                       |             28.69 |           344.33 |
| [Resend Pro](https://resend.com/pricing): 50,000 emails/month, no daily cap                                                                                                                                                                                                                                                      |             28.69 |           344.33 |
| [GitHub Pro](https://docs.github.com/en/get-started/learning-about-github/faq-about-changes-to-githubs-plans), if a personal private repository must retain [branch protection](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches) |              5.74 |            68.87 |

Two Vercel seats: **AUD 57.39/month, AUD 688.67/year**. Test actual publisher/deployment
permissions before accepting one seat; free Viewers cannot deploy. GitHub Pro is a
conditional repository cost, **not a CMS/login fee**.

## Existing costs and launch checks

Existing domain/mailbox fees are **excluded, not free**; renewal is unconfirmed.
No new domain, database or file-storage subscription. Maintenance labour and independent
backup storage are unpriced; agree separately. If 10% GST applies, base cost is
approximately **AUD 31.56/month, AUD 378.77/year**.

Before launch: approve billing/owners; verify DNS/email, CMS uploads/deployment,
booking/reminders and analytics/privacy ([setup](platform-account-setup.md),
[acceptance](acceptance-and-handover.md)). Team booking, custom notifications or an LMS
need a separate cost review.
