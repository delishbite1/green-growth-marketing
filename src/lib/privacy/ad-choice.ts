import { gpcEnabled, gpcHeader } from '@/lib/privacy/gpc'

/**
 * "Your Privacy Choices": a visitor's own opt out of advertising tracking, for
 * browsers that do not send Global Privacy Control (Chrome, Safari and Edge do
 * not by default).
 *
 * The choice is one first party cookie, so it survives visits, is read by the
 * Pixel bootstrap before anything loads, and travels with the free letters
 * request so the server can honor it too. It switches off exactly what GPC
 * switches off: the Meta Pixel and the Conversions API report. GA4 is untouched,
 * because it runs analytics only for everyone (see lib/analytics/ga.ts).
 *
 * GPC always wins. A visitor whose browser sends it is opted out whatever the
 * cookie says, and cannot opt back in from the page.
 *
 * The Privacy Policy and /privacy-choices describe exactly this. Change one,
 * change the others.
 */

export const AD_OPTOUT_COOKIE = 'ggm_ads_optout'

// About 400 days, the longest a browser will keep a cookie today.
const MAX_AGE = 400 * 24 * 60 * 60

/** The bootstrap's test, as a JavaScript expression. Kept beside the cookie name on purpose. */
export const AD_ALLOWED_JS = `(navigator.globalPrivacyControl!==true&&document.cookie.split('; ').indexOf('${AD_OPTOUT_COOKIE}=1')<0)`

export function adOptOutSaved(): boolean {
  if (typeof document === 'undefined') return false
  return document.cookie.split('; ').includes(`${AD_OPTOUT_COOKIE}=1`)
}

/** Browser side: may advertising tracking run on this visit? */
export function adTrackingAllowed(): boolean {
  return !gpcEnabled() && !adOptOutSaved()
}

/**
 * Save the visitor's choice. Turning tracking off also tells a Pixel that is
 * already running on this page to stop, and removes Meta's first party cookies.
 * The caller reloads the page afterwards, so the choice applies at once.
 */
export function saveAdOptOut(optOut: boolean): void {
  const secure = window.location.protocol === 'https:' ? '; Secure' : ''
  if (optOut) {
    document.cookie = `${AD_OPTOUT_COOKIE}=1; Max-Age=${MAX_AGE}; Path=/; SameSite=Lax${secure}`
    try {
      window.fbq?.('consent', 'revoke')
    } catch {
      // Nothing to stop.
    }
    for (const name of ['_fbp', '_fbc']) {
      document.cookie = `${name}=; Max-Age=0; Path=/`
      document.cookie = `${name}=; Max-Age=0; Path=/; Domain=.${window.location.hostname.replace(/^www\./, '')}`
    }
  } else {
    document.cookie = `${AD_OPTOUT_COOKIE}=; Max-Age=0; Path=/; SameSite=Lax${secure}`
  }
}

/** Server side, for API routes that receive the browser's own request. */
export function adTrackingBlockedByRequest(headers: Headers, cookies: { get(name: string): { value: string } | undefined }): boolean {
  return gpcHeader(headers) || cookies.get(AD_OPTOUT_COOKIE)?.value === '1'
}
