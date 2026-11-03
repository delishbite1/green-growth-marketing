import { business } from '@/config/business'

/**
 * Meta Pixel, browser side.
 *
 * The Pixel id comes from NEXT_PUBLIC_META_PIXEL_ID. When it is missing,
 * nothing loads and nothing fires: an ad account without a pixel is a normal
 * state before launch, and a page that throws because a marketing tag is not
 * configured yet is a page that loses leads for a reason nobody would guess.
 *
 * Three events, and only three:
 *
 *   PageView    on load, once.
 *   ViewContent on load, once, so audiences can be built from people who read
 *               the offer without asking for it.
 *   Lead        ONLY after the server has confirmed the lead was stored.
 *
 * The Lead rule is the whole point. Firing Lead on the button click is the
 * common mistake and it poisons the campaign: Meta optimises delivery towards
 * whoever produces the event, so a Lead on click trains the algorithm to find
 * people who tap buttons and abandon forms. Every figure in Ads Manager then
 * looks excellent while the phone does not ring.
 */

declare global {
  interface Window {
    fbq?: ((...args: unknown[]) => void) & { queue?: unknown[]; loaded?: boolean }
    _fbq?: unknown
  }
}

export function pixelId(): string | undefined {
  // A hard off switch for test and preview copies of the site. Without it the
  // id in config would fire real PageViews from localhost into the live pixel,
  // polluting the audience the ads are optimised on. Unset in production.
  if (process.env.NEXT_PUBLIC_META_PIXEL_DISABLED === '1' || process.env.NEXT_PUBLIC_DESIGN_PREVIEW === '1') return undefined

  // The environment wins when it holds something usable, so a second pixel or a
  // different ad account needs no deploy. Otherwise the real id from config,
  // which is public anyway and saves a dashboard step that has silently stored
  // whitespace on this machine before.
  const fromEnv = process.env.NEXT_PUBLIC_META_PIXEL_ID?.trim()
  // A placeholder left in an env file is worse than an empty one, because it
  // looks configured. Treat anything that is not digits as absent.
  const id = fromEnv && /^\d{6,}$/.test(fromEnv) ? fromEnv : business.metaPixelId
  if (!id || !/^\d{6,}$/.test(id)) return undefined
  return id
}

/**
 * The bootstrap snippet, injected once in the page head.
 *
 * Written out as a string rather than pulled from a package because Meta's
 * loader is the supported integration and it has to run before any fbq() call
 * queues. `fbq.queue` is what makes an early call safe.
 */
export function pixelScript(id: string): string {
  // Global Privacy Control turns the Pixel off entirely: no fbq, no library, no
  // PageView. trackEvent below is then a no-op. See lib/privacy/gpc.ts.
  return `if(navigator.globalPrivacyControl!==true)!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window,document,'script',
'https://connect.facebook.net/en_US/fbevents.js'),
fbq('init','${id}'),
fbq('track','PageView');`
}

/**
 * Fire a standard event.
 *
 * eventID is not optional in practice. Every event this app sends is also sent
 * from the server, and a pair without a shared id is counted twice by Meta,
 * which halves every reported cost per lead. Passing it is what makes the two
 * reports one event.
 */
export function trackEvent(
  name: 'ViewContent' | 'Lead',
  eventId: string,
  params?: Record<string, unknown>,
): void {
  if (typeof window === 'undefined' || typeof window.fbq !== 'function') return
  try {
    window.fbq('track', name, params ?? {}, { eventID: eventId })
  } catch {
    // A blocked pixel is the normal case for a meaningful share of visitors.
    // It must never take the form down with it.
  }
}
