import 'server-only'
import { createClient } from '@supabase/supabase-js'

/**
 * Writing a Meta lead into the portal's database.
 *
 * The marketing site and the portal are two Vercel projects sharing one
 * Supabase project. This module is how a lead crosses between them.
 *
 * It uses the ANON key, not the service role key, and that is deliberate. The
 * rule in the portal is that exactly one file in one codebase holds
 * SUPABASE_SERVICE_ROLE_KEY, the Stripe webhook, because a key that bypasses
 * RLS turns any query bug anywhere into a data leak. Copying it into a second
 * project to save writing one policy would end that rule permanently.
 *
 * What makes the anon key safe here is on the database side, in migration
 * 0032: meta_leads has an insert policy for anon and no select policy at all,
 * and the GRANT names the columns anon may set. A row can go in and can never
 * come back out, and a scripted insert cannot set its own status or write
 * notes that a rep would later read and believe.
 *
 * The variables have no NEXT_PUBLIC prefix even though the anon key is
 * designed to be publishable, because nothing in the browser needs it and a
 * key that is not shipped cannot be misused from a page.
 */

/**
 * Only what the claim form asks for.
 *
 * The table still has industry, business_website, city, state, zip,
 * target_customer, volume and timeline, all nullable as of migration 0033.
 * They are deliberately not written here: null means "never asked", which
 * stays distinct from a rep filling one in later from the call.
 */
export type LeadRow = {
  first_name: string
  last_name: string
  business_name: string
  email: string
  phone: string
  target_zip: string
  utm_source: string | null
  utm_medium: string | null
  utm_campaign: string | null
  utm_content: string | null
  utm_term: string | null
  fbclid: string | null
  landing_page: string | null
  referrer: string | null
  consent_at: string
  consent_ip: string | null
  user_agent: string | null
}

export type StoreResult =
  | { ok: true }
  | { ok: false; reason: 'duplicate' }
  | { ok: false; reason: 'unconfigured' | 'failed'; detail?: string }

export function leadsStoreConfigured(): boolean {
  return Boolean(process.env.SUPABASE_URL?.trim() && process.env.SUPABASE_ANON_KEY?.trim())
}

export async function storeLead(row: LeadRow): Promise<StoreResult> {
  const url = process.env.SUPABASE_URL?.trim()
  const key = process.env.SUPABASE_ANON_KEY?.trim()

  if (!url || !key) {
    console.error('[meta-lead] SUPABASE_URL or SUPABASE_ANON_KEY missing. Lead not stored.')
    return { ok: false, reason: 'unconfigured' }
  }

  const supabase = createClient(url, key, {
    auth: {
      // There is no user and there is no session to keep. Persisting one in a
      // serverless function means one request's state can be read by the next
      // request that lands on the same warm instance.
      persistSession: false,
      autoRefreshToken: false,
    },
  })

  // No .select() after the insert. The anon role has no select policy on this
  // table, so asking for the row back would fail the whole statement even
  // though the insert itself was allowed.
  const { error } = await supabase.from('meta_leads').insert(row)

  if (error) {
    // 23505 is a unique violation, which here means this email has already
    // claimed the offer. That is a normal outcome, not a fault: somebody
    // submits twice because the page felt slow. The caller shows them the
    // thank you page rather than an error, because from their side the request
    // genuinely did go through, the first time.
    if (error.code === '23505') return { ok: false, reason: 'duplicate' }

    console.error('[meta-lead] Supabase refused the insert:', error.code, error.message)
    return { ok: false, reason: 'failed', detail: error.message }
  }

  return { ok: true }
}
