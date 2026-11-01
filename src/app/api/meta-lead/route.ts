import { NextRequest, NextResponse } from 'next/server'
import { metaLeadSchema } from '@/lib/validation/meta-lead'
import { storeLead, type LeadRow } from '@/lib/leads-store'
import { sendLeadEvent, capiConfigured } from '@/lib/meta/capi'
import { business } from '@/config/business'

/**
 * The 100 free letters claim, from /free-letters.
 *
 * Order of operations matters here and is not arbitrary:
 *
 *   1. Store the lead.
 *   2. Email the team.
 *   3. Report the conversion to Meta.
 *   4. Tell the browser it worked.
 *
 * The database goes first because it is the only step whose failure loses the
 * lead permanently. Email can be resent from the row, and a missed Meta event
 * costs some optimisation accuracy. A lead that was never written down is
 * gone, and the person is not going to fill the form in twice.
 *
 * Steps 2 and 3 therefore cannot fail the request. This is the opposite of the
 * existing /api/quote route, which returns an error when Resend rejects the
 * send, and that is correct there: email IS the storage on that form. Here it
 * is a notification about a row that already exists.
 */

const RESEND_ENDPOINT = 'https://api.resend.com/emails'
const DEFAULT_FROM = 'Green Growth Marketing <onboarding@resend.dev>'

function esc(v: unknown): string {
  return String(v ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function row(label: string, value: string): string {
  return `<tr>
    <td style="padding:8px 14px;border-bottom:1px solid #eef2f7;color:#64748b;font-size:13px;white-space:nowrap;vertical-align:top;">${esc(label)}</td>
    <td style="padding:8px 14px;border-bottom:1px solid #eef2f7;color:#0f172a;font-size:14px;font-weight:600;">${value}</td>
  </tr>`
}

/** Same crude in memory throttle as /api/quote. A speed bump, not a wall. */
const hits = new Map<string, number[]>()
const WINDOW_MS = 60_000
const MAX_PER_WINDOW = 5

function rateLimited(ip: string): boolean {
  const now = Date.now()
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS)
  recent.push(now)
  hits.set(ip, recent)
  if (hits.size > 5000) hits.clear()
  return recent.length > MAX_PER_WINDOW
}

/** Read one cookie by name off the request. Used for _fbp. */
function cookie(req: NextRequest, name: string): string | undefined {
  return req.cookies.get(name)?.value
}

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('x-real-ip') ||
    'unknown'

  if (rateLimited(ip)) {
    return NextResponse.json(
      { error: `Too many requests. Please call us at ${business.phone}.` },
      { status: 429 },
    )
  }

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }

  // Honeypot before validation, so the 422 never names the field and teaches a
  // bot to skip it. A normal looking 200 makes the bot believe it worked.
  const trap = (body as { website?: unknown })?.website
  if (typeof trap === 'string' && trap.length > 0) {
    console.warn('[meta-lead] Honeypot tripped from', ip)
    return NextResponse.json({ ok: true }, { status: 200 })
  }

  const parsed = metaLeadSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Please check the form and try again.', issues: parsed.error.flatten().fieldErrors },
      { status: 422 },
    )
  }

  const d = parsed.data
  const now = new Date()
  const stamp = now.toISOString()
  const a = d.attribution ?? {}
  const userAgent = req.headers.get('user-agent') ?? undefined

  // ------------------------------------------------------------- 1. store --
  // Industry, location, volume and timeline are no longer asked. Their columns
  // are nullable as of migration 0033 and are simply not written, so null there
  // means "never asked", which stays distinct from a rep later typing in what
  // they learned on the call.
  const leadRow: LeadRow = {
    first_name: d.firstName,
    last_name: d.lastName,
    business_name: d.businessName,
    email: d.email,
    phone: d.phone,
    target_zip: d.targetZip,
    utm_source: a.utm_source ?? null,
    utm_medium: a.utm_medium ?? null,
    utm_campaign: a.utm_campaign ?? null,
    utm_content: a.utm_content ?? null,
    utm_term: a.utm_term ?? null,
    fbclid: a.fbclid ?? null,
    landing_page: a.landing_page ?? null,
    referrer: a.referrer ?? null,
    consent_at: stamp,
    consent_ip: ip === 'unknown' ? null : ip,
    user_agent: userAgent ?? null,
  }

  const stored = await storeLead(leadRow)

  // A second submission from the same business is not an error to them. They
  // are already in the pipeline, so send them to the thank you page, and do
  // not email or re-report the conversion, or a rep phones them twice and Ads
  // Manager counts one person as two leads.
  if (!stored.ok && stored.reason === 'duplicate') {
    console.log('[meta-lead] Duplicate claim from', d.email)
    return NextResponse.json({ ok: true, duplicate: true }, { status: 200 })
  }

  // The only failure that stops the visitor. If the lead cannot be written
  // down, telling them it worked is a lie that costs a customer, so they get
  // the phone number instead.
  if (!stored.ok) {
    return NextResponse.json(
      {
        error: `We could not submit your request right now. Please call us at ${business.phone} and we will set up your free letters over the phone.`,
      },
      { status: 503 },
    )
  }

  // ------------------------------------------------------------- 2. email --
  // Best effort from here down. The lead is safe.
  await notifyTeam(d, { ip, stamp, attribution: a }).catch((err) =>
    console.error('[meta-lead] Notification failed, lead is stored:', err),
  )

  // -------------------------------------------------------- 3. report it ---
  if (d.eventId && capiConfigured()) {
    // business.siteUrl rather than NEXT_PUBLIC_SITE_URL: that variable held a
    // www host that does not resolve, and reporting a dead event_source_url to
    // Meta makes the conversion harder to attribute, not easier.
    const origin = req.headers.get('origin') ?? business.siteUrl
    await sendLeadEvent({
      eventId: d.eventId,
      eventTime: Math.floor(now.getTime() / 1000),
      sourceUrl: `${origin}${a.landing_page ?? '/free-letters'}`,
      email: d.email,
      phone: d.phone,
      firstName: d.firstName,
      lastName: d.lastName,
      /**
       * No ZIP is sent to Meta any more.
       *
       * Meta's `zp` field means "this person's postcode" and is used to match
       * them against a Facebook account. The only ZIP on this form is now the
       * area they want to mail INTO, which is frequently not where they live
       * or work. Passing it as their postcode would be feeding Meta incorrect
       * personal data in the hope of a match, which is both worse for matching
       * and not something to do with somebody's information.
       *
       * Email and phone are still sent and are the two strongest signals.
       */
      clientIp: ip === 'unknown' ? undefined : ip,
      userAgent,
      fbclid: a.fbclid,
      fbp: cookie(req, '_fbp'),
    }).catch((err) => console.error('[meta-lead] CAPI threw, lead is stored:', err))
  }

  console.log('[meta-lead] Stored lead for', d.businessName, 'campaign:', a.utm_campaign ?? 'none')
  return NextResponse.json({ ok: true }, { status: 200 })
}

/** Tell the team. Never throws to the caller: the lead is already saved. */
async function notifyTeam(
  d: import('@/lib/validation/meta-lead').MetaLeadInput,
  meta: { ip: string; stamp: string; attribution: Record<string, string | undefined> },
): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.LEAD_EMAIL
  const from = process.env.LEAD_FROM_EMAIL || DEFAULT_FROM

  if (!apiKey || apiKey.startsWith('PASTE_') || !to) {
    console.error('[meta-lead] RESEND_API_KEY or LEAD_EMAIL missing. Lead stored, nobody emailed.')
    return
  }

  const a = meta.attribution
  const source = a.utm_campaign || a.utm_source || 'Meta ad'

  /**
   * The subject deliberately contains no offer language.
   *
   * It used to read "Free letters claim: <business>". Every one of those
   * landed in Gmail's Promotions tab on 1 September, which for a sales lead is
   * the same as not arriving. Gmail's classifier keys hard on words like free,
   * claim, offer and deal, and the /api/quote route already learned this once:
   * its popup subject is a bare email address for exactly this reason.
   *
   * Naming the source instead is both safer and more useful, because a rep
   * scanning the inbox can tell a paid lead from a website enquiry without
   * opening either.
   */
  const subject = `Meta ad lead: ${d.businessName}`

  const text = [
    `New lead from the Meta ad`,
    ``,
    `Name:      ${d.firstName} ${d.lastName}`,
    `Business:  ${d.businessName}`,
    `Phone:     ${d.phone}`,
    `Email:     ${d.email}`,
    `Mail into: ${d.targetZip}   <-- the ZIP they want reached, not their own address`,
    ``,
    `Source:    ${source}`,
    `utm_source/medium/campaign: ${a.utm_source ?? '-'} / ${a.utm_medium ?? '-'} / ${a.utm_campaign ?? '-'}`,
    ``,
    `--`,
    `Consent to be contacted: YES (ticked at ${meta.stamp})`,
    `IP: ${meta.ip}`,
    ``,
    `This lead is saved in the portal under Staff tools, Meta leads.`,
  ].join('\n')

  /**
   * Plain on purpose. This is a work notification, not a mailshot.
   *
   * The first version opened with a full width green gradient banner in white
   * bold type. That is the visual signature of a marketing email, and Gmail
   * reads layout as well as words, so it reinforced the Promotions filing that
   * the old subject line was already causing. No gradients, no banner, no
   * inverted headings, no images. Left border and plain rows only.
   */
  const html = `<div style="font-family:-apple-system,Segoe UI,Roboto,sans-serif;max-width:620px;margin:0 auto;color:#0f172a;">
    <p style="font-size:15px;margin:0 0 4px;">
      <strong>${esc(d.businessName)}</strong> asked for the 100 letters through the Meta ad.
    </p>
    <p style="font-size:13px;color:#64748b;margin:0 0 16px;">Source: ${esc(source)}</p>

    <table style="width:100%;border-collapse:collapse;border-left:3px solid #3a8a2d;">
      ${row('Name', esc(`${d.firstName} ${d.lastName}`))}
      ${row('Business', esc(d.businessName))}
      ${row('Phone', `<a href="tel:${esc(d.phone.replace(/[^\d+]/g, ''))}" style="color:#166534;font-size:16px;">${esc(d.phone)}</a>`)}
      ${row('Email', `<a href="mailto:${esc(d.email)}" style="color:#166534;">${esc(d.email)}</a>`)}
      ${row('Wants to mail into', `<strong>${esc(d.targetZip)}</strong> <span style="font-weight:400;color:#64748b;">(target area, not their own address)</span>`)}
    </table>

    <p style="font-size:12px;color:#64748b;line-height:1.6;margin:16px 0 0;">
      Consent record, keep this: they agreed to be contacted at the number above on
      ${esc(meta.stamp)} from ${esc(meta.ip)}.
    </p>
    <p style="font-size:12px;color:#94a3b8;margin:8px 0 0;">
      Saved in the portal under Staff tools, Meta leads. Reply to this message to answer them.
    </p>
  </div>`

  const res = await fetch(RESEND_ENDPOINT, {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: d.email,
      subject,
      html,
      text,
      headers: {
        'X-Entity-Ref-ID': `meta-lead-${meta.stamp}`,
        'X-Auto-Response-Suppress': 'OOF, AutoReply',
        // Tells Gmail this is a one to one operational message rather than a
        // bulk send. It is a hint, not a guarantee: the only thing that
        // reliably pins a message to the inbox is a filter on the receiving
        // account. See the Gmail filter in WHERE-WE-ARE-META-LANDING.md.
        Precedence: 'normal',
        'Auto-Submitted': 'auto-generated',
      },
      tags: [{ name: 'source', value: 'meta_lead' }],
    }),
  })

  const payload = await res.json().catch(() => null)
  if (!res.ok || payload?.error) {
    console.error('[meta-lead] Resend rejected the send:', res.status, JSON.stringify(payload))
    return
  }
  console.log('[meta-lead] Notified team. Resend id:', payload?.id)
}
