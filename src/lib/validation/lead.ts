import { z } from 'zod/v3'

/**
 * Shared between the browser form and the server route.
 * The browser copy gives instant feedback; the server copy is the one that
 * actually protects us, because anything sent from a browser can be faked.
 */

// `website` is a honeypot. It is hidden from real users, so a human always
// leaves it empty. Bots fill in every field they find, which is how we spot them.
//
// Deliberately NOT validated here. If zod rejected it, the 422 response would
// name the field and tell a bot exactly which one to leave alone. The route
// checks it before validation and fakes a success instead.
const honeypot = z.string().optional()

export const quoteSchema = z.object({
  firstName: z.string().trim().min(1, 'First name is required').max(80),
  lastName: z.string().trim().min(1, 'Last name is required').max(80),
  businessName: z.string().trim().min(1, 'Business name is required').max(120),
  industry: z.string().trim().min(1, 'Industry is required').max(120),
  phone: z.string().trim().min(7, 'Enter a valid phone number').max(32),
  email: z.string().trim().email('Enter a valid email address').max(160),
  address: z.string().trim().max(200).default(''),
  city: z.string().trim().max(80).default(''),
  state: z.string().trim().max(40).default(''),
  zip: z.string().trim().max(12).default(''),
  services: z.array(z.string().max(80)).min(1, 'Select at least one service').max(20),
  budget: z.string().max(60).optional(),
  message: z.string().max(4000).optional(),
  consent: z.literal(true, {
    errorMap: () => ({ message: 'Please agree to be contacted so we can send your quote' }),
  }),
  website: honeypot,
  // The page the form was sent from, e.g. "/postcard-mailing", so the team can
  // see which page produced the lead. A path only, never the query string, so
  // no UTM or personal data rides along. Optional, and anything malformed
  // becomes undefined instead of failing: a bad path must never block a lead.
  pagePath: z.string().trim().max(200).regex(/^\/[A-Za-z0-9/_.~-]*$/).optional().catch(undefined),
})

export const popupSchema = z.object({
  email: z.string().trim().email('Enter a valid email address').max(160),
  website: honeypot,
})

export type QuoteInput = z.infer<typeof quoteSchema>
export type QuoteFormInput = z.input<typeof quoteSchema>
export type PopupInput = z.infer<typeof popupSchema>
