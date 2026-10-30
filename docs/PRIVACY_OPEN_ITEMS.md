# Privacy notice: verified facts and items to confirm

`privacy.html` (public URL `https://hospitality.todo.rw/privacy.html`) was written on 30 October 2026 from the actual implementation. It is plain-language operational information, **not legal advice**. Have it reviewed before paid traffic starts.

## Verified from the code

| Topic | Fact | Where |
|---|---|---|
| Fields collected | Name, business, phone/WhatsApp, optional email, property type, needs, message (plus a hidden honeypot field that is never sent) | `index.html`, `assets/js/lead-form.js` |
| Extra data sent with an enquiry | Page URL (including any `utm_*` and `fbclid` parameters), referrer | `lead-form.js` (params `page_url`, `referrer`, `utm_*`, `fbclid`) |
| Delivery | EmailJS REST API (`api.emailjs.com`), service `service_tyheci5`, template `template_0n9539s`; the recipient is set in the template, with `to_email = richie@todo.rw` also sent | `config.js`, `submit.js` |
| Browser storage | `sessionStorage` only: `hg-enquiry-draft` (form draft) and `hg-enquiry-sent` (duplicate guard). The draft is cleared on success. No cookies. | `lead-form.js` |
| Third parties loaded | Google Fonts (`fonts.googleapis.com`, `fonts.gstatic.com`). EmailJS only on submit. No analytics, no Meta Pixel. | `index.html`, `privacy.html` |
| Images | All served from the site itself (`assets/`) | `index.html` |
| Links that leave the site | WhatsApp (`wa.me`), `mailto:`, todo.rw, Wikimedia/Creative Commons credit links, grottaresort.rw | `index.html` |

## Not stated on the page: please confirm

1. **Legal entity details.** The registered company name is assumed to be "TODO Growth Ltd" (as used site-wide). The registered address and company number are not known, so neither is shown.
2. **Retention period.** None is set. The page says so honestly and offers deletion on request. Decide a period (for example, how long unconverted enquiries are kept) and add it.
3. **Mailbox provider.** The EmailJS error names Outlook (Microsoft), so enquiries likely land in a Microsoft 365 / Outlook mailbox. The page names EmailJS but not Microsoft. Confirm, and decide whether to name it.
4. **Hosting provider.** Production hosting is not yet set up (Vercel was suggested). Once chosen, consider naming it, since hosts process server logs.
5. **Data protection law.** Rwanda's personal data protection law and any registration duties with the national supervisory authority were not assessed. Get legal confirmation before claiming compliance with any law. The page deliberately makes no legal claims.
6. **Cross-border transfers.** EmailJS, Google and Microsoft may process data outside Rwanda. Not stated on the page, pending legal advice.
7. **Request handling owner.** Requests go to `richie@todo.rw`. Confirm that this person is responsible for handling them.
