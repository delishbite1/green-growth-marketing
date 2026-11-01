import { z } from 'zod/v3'
import { attributionSchema } from '@/lib/validation/meta-lead'
import { QUANTITIES } from '@/lib/postcards/packages'

/**
 * The postcard campaign REQUEST at /postcards. Request only: nothing here
 * concerns payment, and no price crosses the wire (the database recomputes
 * the estimate from the quantity).
 *
 * `website` stays the honeypot, as on /free-letters. The real field is
 * `businessWebsite`.
 */

export const INDUSTRIES = [
  'Roofing',
  'HVAC',
  'Plumbing',
  'Electrical',
  'Landscaping',
  'Pools',
  'Garage doors',
  'Remodeling',
  'Solar',
  'Pest control',
  'Cleaning',
  'Real estate',
  'Restaurant',
  'Other',
] as const

export const postcardRequestSchema = z
  .object({
    idempotencyKey: z.string().uuid(),
    quantity: z.number().int().refine((q) => QUANTITIES.includes(q), 'Choose a quantity'),

    businessName: z.string().trim().min(1, 'Business name is required').max(120),
    contactName: z.string().trim().min(1, 'Your name is required').max(120),
    email: z.string().trim().email('Enter a valid email address').max(160),
    phone: z
      .string()
      .trim()
      .max(32)
      .refine((v) => v.replace(/\D/g, '').length >= 10, 'Enter a 10 digit phone number'),
    industry: z.enum(INDUSTRIES, { errorMap: () => ({ message: 'Choose your industry' }) }),
    businessWebsite: z.string().trim().max(200).optional().or(z.literal('')),

    helpChooseArea: z.boolean(),
    targetCities: z.string().trim().max(300).optional().or(z.literal('')),
    targetState: z.string().trim().max(2).optional().or(z.literal('')),
    targetZips: z
      .string()
      .trim()
      .max(600)
      .refine((v) => v === '' || /^[\d\s,;-]+$/.test(v), 'ZIP codes should be numbers separated by commas')
      .optional()
      .or(z.literal('')),
    preferredMailingDate: z
      .string()
      .optional()
      .or(z.literal(''))
      .refine((v) => !v || /^\d{4}-\d{2}-\d{2}$/.test(v), 'Choose a valid date'),
    mailingList: z.enum(['ggm_list', 'own_list'], { errorMap: () => ({ message: 'Choose one option' }) }),
    instructions: z.string().trim().max(2000).optional().or(z.literal('')),
    artworkChoice: z.enum(['ggm_design', 'own_artwork'], { errorMap: () => ({ message: 'Choose one option' }) }),

    consent: z.literal(true, { errorMap: () => ({ message: 'Please confirm to send your request' }) }),

    website: z.string().optional(),
    attribution: attributionSchema.optional(),
  })
  .superRefine((d, ctx) => {
    if (d.mailingList === 'own_list' || d.helpChooseArea) return
    if (!d.targetCities) ctx.addIssue({ code: 'custom', path: ['targetCities'], message: 'Tell us the city or cities to mail' })
    if (!d.targetState) ctx.addIssue({ code: 'custom', path: ['targetState'], message: 'Choose a state' })
  })

export type PostcardRequestInput = z.infer<typeof postcardRequestSchema>
