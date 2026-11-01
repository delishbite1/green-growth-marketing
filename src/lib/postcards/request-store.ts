import 'server-only'
import { createClient } from '@supabase/supabase-js'

/**
 * Saving a postcard campaign request into the portal's database
 * (postcard_requests, migration 0063). Same shape as leads-store.ts: the ANON
 * key, insert only, no select policy, and a column GRANT that leaves status,
 * reference, estimate and staff notes to the database and to staff.
 *
 * Request only. Nothing here creates an order, an invoice, a payment session
 * or any payment obligation.
 */

export type RequestRow = {
  idempotency_key: string
  quantity: number
  business_name: string
  contact_name: string
  email: string
  phone: string
  industry: string
  business_website: string | null
  mailing_list: 'ggm_list' | 'own_list'
  help_choose_area: boolean
  target_cities: string | null
  target_state: string | null
  target_zips: string | null
  preferred_mailing_date: string | null
  artwork_choice: 'ggm_design' | 'own_artwork'
  instructions: string | null
  utm_source: string | null
  utm_medium: string | null
  utm_campaign: string | null
  utm_content: string | null
  utm_term: string | null
  fbclid: string | null
  landing_page: string | null
  referrer: string | null
  consent_ip: string | null
  user_agent: string | null
}

export type StoreResult =
  | { ok: true; duplicate: boolean }
  | { ok: false; reason: 'unconfigured' | 'failed'; detail?: string }

export async function storeRequest(row: RequestRow): Promise<StoreResult> {
  const url = process.env.SUPABASE_URL?.trim()
  const key = process.env.SUPABASE_ANON_KEY?.trim()
  if (!url || !key) {
    console.error('[postcard-request] SUPABASE_URL or SUPABASE_ANON_KEY missing. Request not stored.')
    return { ok: false, reason: 'unconfigured' }
  }

  const supabase = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: { fetch: (input, init) => fetch(input, { ...init, cache: 'no-store' }) },
  })

  // No .select(): anon cannot read the table back, by design.
  const { error } = await supabase.from('postcard_requests').insert(row)
  if (error) {
    // The idempotency key is unique: a double tap or a retry of the same form
    // is the same request, already received.
    if (error.code === '23505') return { ok: true, duplicate: true }
    console.error('[postcard-request] Supabase refused the insert:', error.code, error.message)
    return { ok: false, reason: 'failed', detail: error.message }
  }
  return { ok: true, duplicate: false }
}
