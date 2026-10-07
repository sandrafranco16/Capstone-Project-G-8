# BITDOT Client User Guide

For day-to-day use. First-time account setup is covered in the
[platform guide](platform-account-setup.md). Complete the website address and support
contact in the [handover index](README.md).

## 1. What the website does

Visitors explore services and resources, read articles, complete a short assessment,
book through Cal.com, or send an enquiry through `/contact`.
The assessment is self-reflection, not certification or a compliance assessment.
Answers stay in browser memory and reset on reload; the website does not email an
assessment report or save assessment answers in an application database.

For now, use `/blog`, `/booking` and `/contact` directly if an older homepage
button does not reach the feature. Final navigation integration remains a
[release check](known-issues.md), not a task for the client.

## 2. Create or edit an article

1. Visit `<website origin>/admin/` and choose GitHub login.
2. Sign in with **your own authorised GitHub account** and authorise the BITDOT CMS
   OAuth app. Repository access must already be granted; login alone is not permission.
3. Select **Blog**, then a new entry or an existing article.
4. Enter title, summary, category, publish date and body. Use the editor's headings,
   lists, links and image tools. Review the preview and proofread the text.
5. For video, paste a supported YouTube watch/share URL into **YouTube URL**, not
   iframe code. Confirm embedding is allowed and content is approved.
6. Use the image/media control to upload an appropriately sized, licensed image.
   Images are stored in GitHub, not a separate photo service. Add useful alternative
   text in the article image syntax/editor.
7. Save the draft. Online, move it through **In Review** and **Ready to Publish**,
   then choose **Publish** when permitted.
8. After a successful deployment, open `/blog` and check the article, image and video.

The CMS creates content changes in GitHub. Publishing merges them only when account
permissions and branch rules allow it; a successful hosting build then updates the site.
Saving is not publishing. There is no guaranteed one-minute update time.
The publish-date field is article metadata, **not scheduled publication**.

If approval is required, ask the designated reviewer to approve/merge the content PR.
Do not share a student password or remove branch protection to work around errors.
Ask the maintainer before deleting articles or media: other links may depend on them.

## 3. Manage bookings

Open the client-owned [Cal.com dashboard](https://app.cal.com), not the website CMS.
Use **Bookings** to view appointments and available cancellation/rescheduling actions.
Use **Availability** to adjust working hours, time zones and holiday overrides.
Use **Event Types** to edit duration, descriptions and meeting locations.

Keep the five event URL slugs unchanged unless the maintainer updates the mapping.
Follow the [Cal.com guide](calcom-client-guide.md) for calendar setup.
The website does not manage bookings, take payments or send booking reminders itself.

## 4. Receive and reply to enquiries

Visitors enter name, email and message, consent to a response, complete spam
verification and select **Send Enquiry**. With live email configured, the enquiry
goes to the agreed BITDOT inbox. Use **Reply** in the received email; Reply-To is the
visitor's address. Review the address and message before replying.

The website does not send the visitor a separate confirmation email. It has no
application lead database; Resend and the mail provider may still store messages.
Cal.com handles booking emails separately. A website success message does not prove
inbox delivery, particularly in a demo using mock mode.

## 5. Quick troubleshooting

| Problem                              | Action                                                                              |
| ------------------------------------ | ----------------------------------------------------------------------------------- |
| Login fails or Blog cannot be edited | Check the correct GitHub account and accepted invitation; contact the maintainer    |
| Upload requires a pull request       | Stop retrying; ask the administrator to check the agreed media-upload permissions   |
| Published article is not visible     | Ask the maintainer to check target branch and deployment; do not repeatedly publish |
| YouTube will not play                | Test the original link and embedding permission                                     |
| No booking slots                     | Check schedule, time zone, calendar conflicts and event visibility                  |
| Booking frame fails                  | Choose **Open directly on Cal.com**                                                 |
| Enquiry not received                 | Check spam/quarantine; ask the maintainer to inspect Resend delivery status         |

## 6. Short training exercise

Use labelled test content and a consenting test email account. Publish an article
with an image and video, manage a test appointment, then reply to a test enquiry.
Remove test appointments/content using the agreed process. Record actual outcomes
and feedback in the [acceptance record](acceptance-and-handover.md).
Add final screenshots or a short recording there after the release interface is confirmed.
