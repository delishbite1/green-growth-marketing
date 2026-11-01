import { NextRequest, NextResponse } from 'next/server'
import { postcardRequestSchema } from '@/lib/validation/postcard-request'
import { storeRequest } from '@/lib/postcards/request-store'
import { PACKAGES, requestReference } from '@/lib/postcards/packages'
import { business } from '@/config/business'
import { clientIp, rateLimited } from '@/lib/postcards/rate-limit'

/**
 * A postcard campaign REQUEST from /postcards.
 *
 * Request only. This route stores the request and nothing else: no order, no
 * invoice, no payment session, no payment obligation, and nothing that could
 * mark anything paid. The customer is told our team reviews the details and
 * confirms the final price, timing and payment arrangements before work
 * begins.
 *
 * Staff notification by email is OFF unless POSTCARD_REQUEST_NOTIFY=on, and
 * then only to LEAD_EMAIL. It stays off until a delivery test is authorized
 * and verified. The request is safe in the database either way.
 */

const RESEND_ENDPOINT = 'https://api.resend.com/emails'
const DEFAULT_FROM = 'Green Growth Marketing <onboarding@resend.dev>'

export async function POST(req: NextRequest) {
  const ip = clientIp(req)
  if (rateLimited(`request:${ip}`, 5)) {
    return NextResponse.json({ error: `Too many attempts. Please call us at ${business.phone}.` }, { status: 429 })
  }

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }

  // Honeypot first, and a believable success, so a bot learns nothing.
  const trap = (body as { website?: unknown })?.website
  if (typeof trap === 'string' && trap.length > 0) {
    console.warn('[postcard-request] Honeypot tripped from', ip)
    return NextResponse.json({ ok: true, reference: 'PR-00000000' }, { status: 200 })
  }

  const parsed = postcardRequestSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Please check the form and try again.', issues: parsed.error.flatten().fieldErrors },
      { status: 422 },
    )
  }

  const d = parsed.data
  const a = d.attribution ?? {}
  const ggmList = d.mailingList === 'ggm_list'
  const stored = await storeRequest({
    idempotency_key: d.idempotencyKey,
    quantity: d.quantity,
    business_name: d.businessName,
    contact_name: d.contactName,
    email: d.email,
    phone: d.phone,
    industry: d.industry,
    business_website: d.businessWebsite || null,
    mailing_list: d.mailingList,
    help_choose_area: ggmList && d.helpChooseArea,
    target_cities: ggmList && !d.helpChooseArea ? d.targetCities || null : null,
    target_state: ggmList && !d.helpChooseArea ? d.targetState || null : null,
    target_zips: ggmList ? d.targetZips || null : null,
    preferred_mailing_date: d.preferredMailingDate || null,
    artwork_choice: d.artworkChoice,
    instructions: d.instructions || null,
    utm_source: a.utm_source ?? null,
    utm_medium: a.utm_medium ?? null,
    utm_campaign: a.utm_campaign ?? null,
    utm_content: a.utm_content ?? null,
    utm_term: a.utm_term ?? null,
    fbclid: a.fbclid ?? null,
    landing_page: a.landing_page ?? '/postcards',
    referrer: a.referrer ?? null,
    consent_ip: ip === 'unknown' ? null : ip,
    user_agent: req.headers.get('user-agent')?.slice(0, 500) ?? null,
  })

  if (!stored.ok) {
    return NextResponse.json(
      { error: `We could not send your request right now. Please call us at ${business.phone} and we will take it over the phone.` },
      { status: 503 },
    )
  }

  const reference = requestReference(d.idempotencyKey)
  if (!stored.duplicate) {
    await notifyTeam(reference, d).catch((err) => console.error('[postcard-request] Notification failed, request is stored:', err))
  }
  console.log('[postcard-request] Request', reference, stored.duplicate ? '(repeat submit)' : 'stored')
  return NextResponse.json({ ok: true, reference, duplicate: stored.duplicate })
}

function esc(v: unknown): string {
  return String(v ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

/** Best effort, and only when explicitly switched on. Never throws to the caller. */
async function notifyTeam(reference: string, d: ReturnType<typeof postcardRequestSchema.parse>): Promise<void> {
  if (process.env.POSTCARD_REQUEST_NOTIFY?.trim() !== 'on') {
    console.log('[postcard-request] Staff email notification is off. Request', reference, 'is in the database.')
    return
  }
  const apiKey = process.env.RESEND_API_KEY?.trim()
  const to = process.env.LEAD_EMAIL?.trim()
  if (!apiKey || !to) {
    console.error('[postcard-request] Notification on but RESEND_API_KEY or LEAD_EMAIL missing.')
    return
  }
  const pkg = PACKAGES.find((p) => p.quantity === d.quantity)
  const est = pkg ? (pkg.totalCents / 100).toLocaleString('en-US', { style: 'currency', currency: 'USD' }) : 'n/a'
  const area =
    d.mailingList === 'own_list'
      ? 'Customer has their own list'
      : d.helpChooseArea
        ? 'Help choosing the area'
        : [d.targetCities, d.targetState].filter(Boolean).join(', ')
  const lines = [
    `New postcard campaign REQUEST ${reference} (awaiting review, nothing paid, nothing ordered).`,
    `${d.quantity.toLocaleString('en-US')} postcards, estimate ${est} before any tax.`,
    `${d.businessName}, ${d.contactName}, ${d.email}, ${d.phone}, ${d.industry}`,
    `Audience: ${area}${d.targetZips ? ` (${d.targetZips})` : ''}`,
    `Artwork: ${d.artworkChoice === 'ggm_design' ? 'GGM designs it' : 'Customer has artwork'}`,
    d.preferredMailingDate ? `Preferred mailing date: ${d.preferredMailingDate}` : '',
    d.instructions ? `Notes: ${d.instructions}` : '',
    'Confirm the final price, timing and payment arrangements with the customer before any work begins.',
  ].filter(Boolean)
  const res = await fetch(RESEND_ENDPOINT, {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: process.env.LEAD_FROM_EMAIL || DEFAULT_FROM,
      to: [to],
      reply_to: d.email,
      subject: `Postcard request ${reference}: ${d.businessName}, ${d.quantity.toLocaleString('en-US')} postcards`,
      text: lines.join('\n'),
      html: `<div style="font-family:Arial,sans-serif;font-size:14px;line-height:1.5">${lines.map((l) => `<p style="margin:0 0 8px">${esc(l)}</p>`).join('')}</div>`,
    }),
  })
  if (!res.ok) throw new Error(`Resend ${res.status}: ${(await res.text()).slice(0, 200)}`)
  console.log('[postcard-request] Staff notified for', reference, 'Resend accepted the message (delivery not confirmed).')
}
