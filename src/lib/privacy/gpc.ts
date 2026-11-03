/**
 * Global Privacy Control: a browser setting that says "do not sell or share my
 * data". Browsers that support it expose navigator.globalPrivacyControl and send
 * a Sec-GPC: 1 header with every request.
 *
 * What it switches off on this site is advertising, not analytics:
 *   - the Meta Pixel never loads (see pixelScript in lib/meta/pixel.ts)
 *   - the free letters form sends no Meta event id, so the server never reports
 *     the lead to the Conversions API (and the route checks the header too)
 * GA4 still loads, because its advertising features are denied for everyone
 * (see lib/analytics/ga.ts), which keeps it analytics only.
 *
 * The Privacy Policy promises exactly this. Change one, change the other.
 */

declare global {
  interface Navigator {
    globalPrivacyControl?: boolean
  }
}

/** Browser side. False on the server and in browsers without GPC. */
export function gpcEnabled(): boolean {
  return typeof navigator !== 'undefined' && navigator.globalPrivacyControl === true
}

/** Server side, for API routes that receive the browser's own request. */
export function gpcHeader(headers: Headers): boolean {
  return headers.get('sec-gpc')?.trim() === '1'
}
