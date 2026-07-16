import { NextRequest, NextResponse } from 'next/server'
import { quoteSchema, popupSchema } from '@/lib/validation/lead'

const SENDLAYER_ENDPOINT = 'https://console.sendlayer.com/api/v1/email'

/** Escape user input before it goes into the HTML email body. */
function esc(v: unknown): string {
  return String(v ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

/**
 * Very small in-memory throttle. This only holds within a single warm serverless
 * instance, so it is a speed bump, not a wall. Real protection = Turnstile or an
 * Upstash-backed limiter. Tracked as a follow-up.
 */
const hits = new Map<string, number[]>()
const WINDOW_MS = 60_000
const MAX_PER_WINDOW = 5

function rateLimited(ip: string): boolean {
  const now = Date.now()
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS)
  recent.push(now)
  hits.set(ip, recent)
  if (hits.size > 5000) hits.clear() // crude memory guard
  return recent.length > MAX_PER_WINDOW
}

function row(label: string, value: string): string {
  return `<tr>
    <td style="padding:8px 14px;border-bottom:1px solid #eef2f7;color:#64748b;font-size:13px;white-space:nowrap;vertical-align:top;">${esc(label)}</td>
    <td style="padding:8px 14px;border-bottom:1px solid #eef2f7;color:#0f172a;font-size:14px;font-weight:600;">${value}</td>
  </tr>`
}

export async function POST(req: NextRequest) {
  const apiKey = process.env.SENDLAYER_API_KEY
  const to = process.env.LEAD_EMAIL
  const from = process.env.LEAD_FROM_EMAIL

  if (!apiKey || apiKey === 'PASTE_YOUR_KEY_HERE' || !to || !from) {
    // Loud for us, useful for them. If the env vars are ever missing on the
    // live server this fires on EVERY submission, so the visitor must still
    // get a way to reach us rather than an internal-sounding dead end.
    console.error('[quote] SENDLAYER_API_KEY / LEAD_EMAIL / LEAD_FROM_EMAIL missing. Check Vercel env vars.')
    return NextResponse.json(
      { error: 'We could not send your request right now. Please call us at (888) 601-6556 and we will take care of you.' },
      { status: 503 },
    )
  }

  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('x-real-ip') ||
    'unknown'

  if (rateLimited(ip)) {
    return NextResponse.json(
      { error: 'Too many requests. Please call us at (888) 601-6556.' },
      { status: 429 },
    )
  }

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }

  // Honeypot check runs BEFORE validation, on purpose. A real person never sees
  // this field, so anything in it is a bot. We return a normal-looking 200 so the
  // bot believes it worked and moves on. Validating it instead would return a 422
  // naming the field, which just teaches the bot to skip it next time.
  if (typeof (body as { website?: unknown })?.website === 'string' && (body as { website: string }).website.length > 0) {
    console.warn('[quote] Honeypot tripped from', ip)
    return NextResponse.json({ ok: true }, { status: 200 })
  }

  const source = (body as { source?: string })?.source === 'popup' ? 'popup' : 'quote'
  const schema = source === 'popup' ? popupSchema : quoteSchema
  const parsed = schema.safeParse(body)

  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Please check the form and try again.', issues: parsed.error.flatten().fieldErrors },
      { status: 422 },
    )
  }

  const stamp = new Date().toISOString()
  let subject: string
  let html: string
  let text: string
  let replyTo: string

  if (source === 'popup') {
    const d = parsed.data as { email: string }
    replyTo = d.email
    // Deliberately not "1,000 free postcards" — Gmail reads offer language as
    // marketing and files it under Promotions, where leads get missed.
    subject = `New website lead: ${d.email}`
    text = `Popup lead (1,000 free postcards offer)\n\nEmail: ${d.email}\nReceived: ${stamp}\nIP: ${ip}\n\nThey have not given a phone number. Reply to this email to reach them.`
    html = `<div style="font-family:-apple-system,Segoe UI,Roboto,sans-serif;max-width:620px;margin:0 auto;">
      <div style="background:linear-gradient(135deg,#1a5c1a,#3a8a2d);padding:20px 24px;border-radius:12px 12px 0 0;">
        <div style="color:#fff;font-size:18px;font-weight:800;">New popup lead</div>
        <div style="color:rgba(255,255,255,.75);font-size:13px;margin-top:2px;">1,000 free postcards offer</div>
      </div>
      <div style="border:1px solid #e5e7eb;border-top:0;border-radius:0 0 12px 12px;padding:6px 10px 14px;">
        <table style="width:100%;border-collapse:collapse;">
          ${row('Email', `<a href="mailto:${esc(d.email)}" style="color:#3a8a2d;">${esc(d.email)}</a>`)}
          ${row('Received', esc(stamp))}
          ${row('IP', esc(ip))}
        </table>
        <p style="color:#64748b;font-size:13px;padding:12px 14px 0;margin:0;">
          No phone number given. Just hit reply to reach them.
        </p>
      </div>
    </div>`
  } else {
    const d = parsed.data as import('@/lib/validation/lead').QuoteInput
    replyTo = d.email
    subject = `New quote request — ${d.businessName} (${d.industry})`
    text = [
      `New quote request`,
      ``,
      `Name:      ${d.firstName} ${d.lastName}`,
      `Business:  ${d.businessName}`,
      `Industry:  ${d.industry}`,
      `Phone:     ${d.phone}`,
      `Email:     ${d.email}`,
      `Address:   ${d.address}, ${d.city}, ${d.state} ${d.zip}`,
      `Services:  ${d.services.join(', ')}`,
      `Budget:    ${d.budget || 'Not given'}`,
      ``,
      `Message:`,
      d.message || '(none)',
      ``,
      `--`,
      `Consent to be contacted: YES (checked at ${stamp})`,
      `IP: ${ip}`,
    ].join('\n')

    html = `<div style="font-family:-apple-system,Segoe UI,Roboto,sans-serif;max-width:620px;margin:0 auto;">
      <div style="background:linear-gradient(135deg,#1a5c1a,#3a8a2d);padding:20px 24px;border-radius:12px 12px 0 0;">
        <div style="color:#fff;font-size:18px;font-weight:800;">New quote request</div>
        <div style="color:rgba(255,255,255,.75);font-size:13px;margin-top:2px;">${esc(d.businessName)} &middot; ${esc(d.industry)}</div>
      </div>
      <div style="border:1px solid #e5e7eb;border-top:0;border-radius:0 0 12px 12px;padding:6px 10px 16px;">
        <table style="width:100%;border-collapse:collapse;">
          ${row('Name', esc(`${d.firstName} ${d.lastName}`))}
          ${row('Business', esc(d.businessName))}
          ${row('Industry', esc(d.industry))}
          ${row('Phone', `<a href="tel:${esc(d.phone.replace(/[^\d+]/g, ''))}" style="color:#3a8a2d;font-size:16px;">${esc(d.phone)}</a>`)}
          ${row('Email', `<a href="mailto:${esc(d.email)}" style="color:#3a8a2d;">${esc(d.email)}</a>`)}
          ${row('Address', esc(`${d.address}, ${d.city}, ${d.state} ${d.zip}`))}
          ${row('Services', esc(d.services.join(', ')))}
          ${row('Budget', esc(d.budget || 'Not given'))}
        </table>
        ${
          d.message
            ? `<div style="margin:14px;padding:12px 14px;background:#f8fafc;border-left:3px solid #3a8a2d;border-radius:6px;">
                 <div style="color:#64748b;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:.05em;margin-bottom:6px;">Their message</div>
                 <div style="color:#0f172a;font-size:14px;line-height:1.6;white-space:pre-wrap;">${esc(d.message)}</div>
               </div>`
            : ''
        }
        <div style="margin:14px;padding:10px 14px;background:#f0fdf4;border-radius:6px;color:#166534;font-size:12px;line-height:1.6;">
          <strong>Consent record (keep this):</strong> they ticked the box agreeing to be contacted
          at the number above.<br>Timestamp ${esc(stamp)} &middot; IP ${esc(ip)}
        </div>
        <p style="color:#94a3b8;font-size:12px;padding:0 14px;margin:0;">Hit reply to answer them directly.</p>
      </div>
    </div>`
  }

  try {
    const res = await fetch(SENDLAYER_ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        From: { name: 'Green Growth Marketing Website', email: from },
        To: [{ name: 'Green Growth Marketing', email: to }],
        ReplyTo: [{ email: replyTo }],
        Subject: subject,
        ContentType: 'HTML',
        HTMLContent: html,
        PlainContent: text,
        Tags: [source === 'popup' ? 'popup-lead' : 'quote-lead'],
        // Tell mail clients this is transactional, not a bulk campaign. Helps
        // keep leads out of Gmail's Promotions tab. Not a guarantee — the
        // Gmail-side filter is what actually pins this to Primary.
        Headers: {
          'X-Entity-Ref-ID': `lead-${Date.now()}`,
          'X-Auto-Response-Suppress': 'OOF, AutoReply',
        },
      }),
    })

    const payload = await res.json().catch(() => null)

    if (!res.ok || payload?.Errors) {
      // Log the real reason for us; never leak it to the visitor.
      console.error('[quote] SendLayer rejected the send:', res.status, JSON.stringify(payload))
      return NextResponse.json(
        { error: 'We could not send your request. Please call us at (888) 601-6556.' },
        { status: 502 },
      )
    }

    console.log('[quote] Sent', source, 'lead. MessageID:', payload?.MessageID)
    return NextResponse.json({ ok: true }, { status: 200 })
  } catch (err) {
    console.error('[quote] Network error calling SendLayer:', err)
    return NextResponse.json(
      { error: 'We could not send your request. Please call us at (888) 601-6556.' },
      { status: 502 },
    )
  }
}
