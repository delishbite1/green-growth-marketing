import { z } from 'zod/v3'

/**
 * The 100 free letters claim form, at /free-letters.
 *
 * Five questions and a consent box. Nothing else.
 *
 * It asked thirteen things at first, and that was wrong. The offer is "claim
 * your free letters", so every field after the phone number was really asking
 * somebody to qualify themselves before they had been given anything. Industry,
 * location, mailing volume and timeline are all things a rep learns in the
 * first two minutes of the call, by which point the lead is already captured
 * instead of still deciding whether the form is worth finishing.
 *
 * If a field is ever added back, add it here, in OfferForm, in the route
 * handler and in the portal's detail page. The database columns still exist
 * and are nullable, so no migration is needed to bring one back.
 *
 * Shared between the browser and the route handler. The browser copy gives
 * instant feedback; the server copy is the one that protects us, because
 * anything sent from a browser can be faked.
 */

/**
 * `website` is the honeypot, hidden from real people and irresistible to bots.
 *
 * Keep the name. It matches the honeypot on the main site's quote form, so
 * both forms trip the same trap on the same field.
 *
 * Deliberately not validated. If zod rejected it, the 422 response would name
 * the field and teach a bot which one to leave alone. The route checks it
 * before validation and fakes a success instead.
 */
const honeypot = z.string().optional()

/**
 * Attribution travels with the submission rather than being read from headers
 * on the server, because by the time the form posts we are on a same origin
 * fetch and the original ad click parameters are long gone from the request.
 *
 * Every one of these is optional. Organic traffic and a pasted link are both
 * real and neither carries a utm, and a form that refuses a lead because
 * Facebook did not append a parameter is a form that loses money.
 */
export const attributionSchema = z.object({
  utm_source: z.string().max(200).optional(),
  utm_medium: z.string().max(200).optional(),
  utm_campaign: z.string().max(200).optional(),
  utm_content: z.string().max(200).optional(),
  utm_term: z.string().max(200).optional(),
  fbclid: z.string().max(500).optional(),
  landing_page: z.string().max(500).optional(),
  referrer: z.string().max(500).optional(),
})

export const metaLeadSchema = z.object({
  firstName: z.string().trim().min(1, 'First name is required').max(80),
  lastName: z.string().trim().min(1, 'Last name is required').max(80),
  businessName: z.string().trim().min(1, 'Business name is required').max(120),
  email: z.string().trim().email('Enter a valid email address').max(160),
  phone: z.string().trim().min(7, 'Enter a valid phone number').max(32),

  /**
   * The ZIP the letters should be MAILED INTO. Not the business's own address.
   *
   * This is the single most useful thing on the form, because it is the only
   * answer that lets a rep start pulling an audience before the first call
   * rather than after it. It is also the one people get wrong if the label is
   * lazy: asked for "ZIP code", a business owner types their office postcode,
   * and a rep six weeks later builds a mailing for the wrong neighbourhood.
   *
   * The label and the helper text under the field both say "mail to", and the
   * placeholder is a ZIP rather than a hint. Do not shorten that copy back to
   * "ZIP code" to tidy the layout: the wording IS the feature.
   *
   * Stored in target_zip, its own column since migration 0034, for the same
   * reason. See that file.
   *
   * ZIP+4 is accepted because some people type it, but it is never required.
   */
  targetZip: z
    .string()
    .trim()
    .regex(/^\d{5}(-\d{4})?$/, 'Enter a 5 digit ZIP code'),

  /**
   * There is no consent field any more.
   *
   * The form used to carry a tick box. Inbar asked twice for nothing on the
   * form except the visitor's own details, so consent moved to a clear
   * disclosure sitting directly above the submit button: pressing the button
   * is the affirmative act, which is the other accepted way to take TCPA
   * express written consent.
   *
   * The RECORD did not go anywhere. The route still stamps consent_at,
   * consent_ip and user_agent on every stored lead, so there is still evidence
   * of who agreed, when, and from where. What changed is the strength of the
   * evidence, not whether it exists: a tick box is a separate deliberate act
   * and is easier to defend than "the button said so". If a complaint ever
   * arrives, bring the tick box back.
   *
   * Do not remove the disclosure text above the button. Without it there is no
   * consent at all, only a stamp claiming there was.
   */

  website: honeypot,
  attribution: attributionSchema.optional(),

  /**
   * Generated in the browser and reused by the server so the Pixel's Lead
   * event and the Conversions API's Lead event are recognised by Meta as one
   * event rather than two. Without this the same lead is counted twice and
   * every cost per lead figure in Ads Manager is half what it should be.
   */
  eventId: z.string().max(100).optional(),
})

export type MetaLeadInput = z.infer<typeof metaLeadSchema>
export type Attribution = z.infer<typeof attributionSchema>
