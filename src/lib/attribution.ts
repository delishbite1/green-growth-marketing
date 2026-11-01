import type { Attribution } from '@/lib/validation/meta-lead'

export const ATTRIBUTION_KEYS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
  'fbclid',
] as const

const STORAGE_KEY = 'ggm_attribution'

/**
 * Where a visitor came from, captured once and kept for the session.
 *
 * The reason this is stored rather than read straight off the URL at submit
 * time is that people do not submit on the page they landed on. They land on
 * /free-letters?utm_campaign=letters_sep, read it, tap the phone number, come
 * back, refresh, and by then the query string is gone. Reading location.search
 * inside the submit handler would attribute a genuine Facebook lead to nothing
 * and make the campaign look like it produced no leads at all.
 *
 * sessionStorage rather than localStorage on purpose. Attribution should not
 * outlive the visit: somebody who clicked an ad in March and came back
 * organically in June is an organic lead, and filing them under the March
 * campaign inflates it forever.
 */
export function captureAttribution(): void {
  if (typeof window === 'undefined') return

  try {
    const params = new URLSearchParams(window.location.search)
    const found: Record<string, string> = {}

    for (const key of ATTRIBUTION_KEYS) {
      const value = params.get(key)
      // Cap it. This lands in a database column and anything from a URL is
      // untrusted, including its length.
      if (value) found[key] = value.slice(0, 500)
    }

    // Only overwrite a stored record when this visit actually carries
    // attribution of its own. Otherwise an internal click from the landing
    // page to the thank you page and back would wipe the ad click that
    // started the session.
    if (Object.keys(found).length === 0 && sessionStorage.getItem(STORAGE_KEY)) return

    const record = {
      ...found,
      landing_page: window.location.pathname.slice(0, 500),
      // document.referrer is empty on a direct visit and that is a real answer,
      // so it is stored as absent rather than as an empty string.
      ...(document.referrer ? { referrer: document.referrer.slice(0, 500) } : {}),
    }

    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(record))
  } catch {
    // Private browsing, a storage quota, or a browser with storage switched
    // off. Attribution is a nice to have; losing it must never stop somebody
    // claiming the offer.
  }
}

/** What we captured on arrival, for the form to send along with the lead. */
export function readAttribution(): Attribution {
  if (typeof window === 'undefined') return {}

  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    if (!raw) return {}
    const parsed = JSON.parse(raw)
    return typeof parsed === 'object' && parsed !== null ? parsed : {}
  } catch {
    return {}
  }
}

/**
 * A unique id for one conversion, shared by the browser Pixel and the server
 * side Conversions API so Meta can tell it is one event reported twice.
 *
 * crypto.randomUUID is missing on older Safari and on any page served over
 * plain http, which includes a phone testing against a laptop's dev server, so
 * there is a fallback. A duplicated id is worse than an ugly one.
 */
export function newEventId(): string {
  try {
    if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
      return crypto.randomUUID()
    }
  } catch {
    // fall through
  }
  return `lead-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`
}
