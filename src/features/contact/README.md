# Contact

`src/app/contact/page.tsx` composes the Contact page from native React sections, styled
with the shared Services theme (`../services/services-theme.module.css`). The copy comes
from the contact section of `demo/index.html`, without the location line (client feedback).

- `contact.content.ts`: hero and contact-details copy.
- `contact.types.ts`: typed content contracts.
- `contact-fields.ts`: enquiry types, length limits and email/phone rules shared by the
  form and the API, so client and server validation always agree.
- `client-validation.ts`: per-field messages shown in the form.
- `validation.ts`: server-side payload validation, honeypot and Turnstile checks.
- `components/`: hero, form, contact details and the Turnstile widget.
- `contact.module.css`: page layout and form controls.
- `server/deliver-contact-lead.ts`: sends the enquiry through the configured email provider.

## Form behaviour

- Fields: name, email, phone (optional), organisation (optional), topic, message and
  consent, plus a hidden honeypot. Only optional fields are marked.
- A field's error appears once the visitor leaves it with a value in it, and on submit for
  every field; it then updates as they type. On submit, focus moves to the first invalid
  field. Messages are short ("Invalid email address", "Name is required").
- Errors are tied to their control with `aria-invalid` and `aria-describedby`.
- No field is focused on page load. Inputs show focus with a darker border rather than an
  outline ring; topics, the checkbox, links and buttons show a ring for keyboard users only.

Run `pnpm dev` and open `/contact`. Without `CONTACT_EMAIL_PROVIDER` the API returns a
"temporarily unavailable" message; set it to `mock` to test a successful send locally.
