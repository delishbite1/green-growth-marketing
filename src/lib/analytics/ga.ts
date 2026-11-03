import { business } from '@/config/business'

/**
 * Google Analytics 4, analytics only.
 *
 * Where it runs: the bootstrap is printed on every page, but it only loads
 * gtag.js when the page is served from the live domain. That is decided in the
 * browser rather than from VERCEL_ENV at build time, because a deployment that
 * is promoted to production keeps the environment it was built with, and
 * because the main project's Preview shares production settings. Previews,
 * vercel.app URLs and localhost therefore never report anything.
 *
 * What it does not do: advertising. ad_storage, ad_user_data and
 * ad_personalization are denied by default for every visitor, and Google
 * Signals and ad personalization are off in the config call. Nothing in this
 * file or its callers sends a name, email address, phone number or form field.
 *
 * Page views: the config call sends the first one. Later client side
 * navigations are counted by the stream's Enhanced Measurement ("page changes
 * based on browser history events"). Nothing here listens to the router, which
 * is what keeps each view from being counted twice.
 */

export const GA_HOSTS = ['greengrowthmarketinginc.com', 'www.greengrowthmarketinginc.com']

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    dataLayer?: unknown[]
  }
}

export function gaMeasurementId(): string | undefined {
  // Same hard off switch as the Pixel for the design preview copies.
  if (process.env.NEXT_PUBLIC_DESIGN_PREVIEW === '1') return undefined
  const fromEnv = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim()
  const id = fromEnv && /^G-[A-Z0-9]{6,}$/.test(fromEnv) ? fromEnv : business.gaMeasurementId
  return /^G-[A-Z0-9]{6,}$/.test(id) ? id : undefined
}

/** The inline bootstrap. It defines gtag only on the live domain, so gaEvent is a no-op everywhere else. */
export function gaScript(id: string): string {
  return `(function(w,d,id,hosts){
if(hosts.indexOf(w.location.hostname)<0)return;
w.dataLayer=w.dataLayer||[];
w.gtag=function(){w.dataLayer.push(arguments)};
w.gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'granted'});
w.gtag('js',new Date());
w.gtag('config',id,{allow_google_signals:false,allow_ad_personalization_signals:false});
var s=d.createElement('script');s.async=true;s.src='https://www.googletagmanager.com/gtag/js?id='+id;
d.head.appendChild(s);
})(window,document,${JSON.stringify(id)},${JSON.stringify(GA_HOSTS)});`
}

type GaEvent =
  | { name: 'generate_lead'; params: { form_name: 'quote' | 'popup' | 'postcard_request' | 'free_letters' } }
  | { name: 'phone_click'; params: { link_location: string } }
  | { name: 'cta_click'; params: { link_location: string; link_text: string; link_destination: string } }

/** Send one event. Silent when GA is not loaded, blocked, or this is not the live site. */
export function gaEvent(event: GaEvent): void {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return
  try {
    window.gtag('event', event.name, event.params)
  } catch {
    // Analytics must never take a form down with it.
  }
}
