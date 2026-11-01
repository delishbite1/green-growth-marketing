import 'server-only'
import { createHash } from 'crypto'

/**
 * Meta Conversions API, server side.
 *
 * Why this exists at all when the Pixel already reports the same event: a
 * large and growing share of visitors never run the Pixel. iOS blocks it,
 * ad blockers block it, and Safari's tracking prevention shortens what
 * survives. Those leads are real, they cost real money to acquire, and
 * without this they are invisible to Meta, so the algorithm never learns what
 * a converting visitor looks like.
 *
 * Two rules hold this together.
 *
 *   The access token NEVER reaches the browser. It has no NEXT_PUBLIC prefix,
 *   this module is server-only, and the send happens inside the route handler.
 *   A leaked CAPI token lets anyone write events into the ad account, which
 *   corrupts optimisation in a way that is very hard to notice and impossible
 *   to undo.
 *
 *   Every event carries the same event_id as its Pixel twin. That is what
 *   makes Meta treat two reports as one conversion. Without it the account
 *   reports double the leads at half the cost per lead, and the campaign
 *   looks like it is working twice as well as it is.
 */

const API_VERSION = 'v21.0'

/**
 * Meta requires personal data to be SHA256 hashed, lowercased and trimmed
 * first. Getting the normalisation wrong does not error, it just silently
 * fails to match anybody, so the rules are applied here in one place rather
 * than at each call site.
 */
function hash(value: string | undefined | null): string | undefined {
  if (!value) return undefined
  const normalised = value.trim().toLowerCase()
  if (!normalised) return undefined
  return createHash('sha256').update(normalised).digest('hex')
}

/** Phone numbers match on digits only, with the country code, and no plus. */
function hashPhone(phone: string | undefined | null): string | undefined {
  if (!phone) return undefined
  let digits = phone.replace(/\D/g, '')
  if (!digits) return undefined
  // A 10 digit US number has no country code. Meta will not match it without
  // one, and every number on this form is a US business.
  if (digits.length === 10) digits = `1${digits}`
  return createHash('sha256').update(digits).digest('hex')
}

export function capiConfigured(): boolean {
  return Boolean(
    process.env.META_CONVERSIONS_API_TOKEN?.trim() &&
      process.env.NEXT_PUBLIC_META_PIXEL_ID?.trim(),
  )
}

/**
 * City and state are not collected. ZIP is, since 2 September, and it is worth
 * sending: postcode is one of the signals Meta matches on, so passing it lifts
 * the match rate above what email and phone alone achieve, and a better match
 * rate is directly a lower cost per lead.
 */
export type LeadEvent = {
  eventId: string
  eventTime: number
  sourceUrl: string
  email: string
  phone: string
  firstName: string
  lastName: string
  zip?: string
  clientIp?: string
  userAgent?: string
  fbclid?: string
  /** The _fbp cookie, when the browser has one. Meta's strongest match signal. */
  fbp?: string
}

/**
 * Send one Lead event. Returns whether it was accepted, for logging only.
 *
 * This deliberately never throws. A lead is already safely in the database by
 * the time this runs, and failing the visitor's request because a marketing
 * API had a bad minute would turn a reporting problem into a lost customer.
 */
export async function sendLeadEvent(event: LeadEvent): Promise<boolean> {
  const token = process.env.META_CONVERSIONS_API_TOKEN?.trim()
  const id = process.env.NEXT_PUBLIC_META_PIXEL_ID?.trim()

  if (!token || !id) return false

  /**
   * fbc is a formatted value, not the raw click id. Meta expects
   * fb.1.<timestamp>.<fbclid> and quietly ignores anything else, so building
   * it wrong looks identical to not sending it.
   */
  const fbc = event.fbclid ? `fb.1.${event.eventTime * 1000}.${event.fbclid}` : undefined

  const payload = {
    data: [
      {
        event_name: 'Lead',
        event_time: event.eventTime,
        event_id: event.eventId,
        event_source_url: event.sourceUrl,
        action_source: 'website',
        user_data: {
          em: hash(event.email),
          ph: hashPhone(event.phone),
          fn: hash(event.firstName),
          ln: hash(event.lastName),
          // Meta matches on the 5 digit ZIP only, so a ZIP+4 has to be cut
          // down or it simply fails to match, silently.
          zp: hash(event.zip?.slice(0, 5)),
          country: hash('us'),
          client_ip_address: event.clientIp,
          client_user_agent: event.userAgent,
          fbc,
          fbp: event.fbp,
        },
        custom_data: {
          content_name: '100 Free Personalized Letters',
          content_category: 'Direct Mail',
        },
      },
    ],
    // Set only when testing from Events Manager. Left unset in production, or
    // real conversions are filed as test events and never optimise anything.
    ...(process.env.META_TEST_EVENT_CODE
      ? { test_event_code: process.env.META_TEST_EVENT_CODE }
      : {}),
  }

  try {
    const res = await fetch(
      `https://graph.facebook.com/${API_VERSION}/${id}/events?access_token=${encodeURIComponent(token)}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      },
    )

    if (!res.ok) {
      const detail = await res.text().catch(() => '')
      // Log the reason for us, never for the visitor. Note the token is in the
      // query string above, so the URL itself must never be logged.
      console.error('[capi] Meta rejected the Lead event:', res.status, detail.slice(0, 500))
      return false
    }

    return true
  } catch (err) {
    console.error('[capi] Network error sending the Lead event:', err)
    return false
  }
}
