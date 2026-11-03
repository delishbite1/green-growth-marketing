/**
 * Single source of truth for the company's real-world details.
 *
 * These appear in the Privacy Policy, the Terms, the footer, and in
 * commercial email. If any of them change, change them HERE and nowhere
 * else — every page reads from this file.
 */
export const business = {
  legalName: 'Green Growth Marketing Inc',
  shortName: 'Green Growth Marketing',

  /**
   * The canonical address of this site, with no www.
   *
   * Written out here rather than read from NEXT_PUBLIC_SITE_URL, because that
   * variable is currently set to the www subdomain and **www is not configured
   * in Vercel at all**. Only the apex is. On 3 Sep the live /free-letters page
   * was serving an og:image at www..., which resolves to nothing, so every
   * Facebook preview of the page GGM advertises had a broken image.
   *
   * Anything Google or a crawler is told has to be a URL that exists, so the
   * sitemap, robots and schema all read this constant. Change it only if the
   * domain itself changes.
   */
  siteUrl: 'https://greengrowthmarketinginc.com',

  /**
   * The Meta Pixel, created by Inbar on 3 Sep 2026.
   *
   * In the code rather than only in an environment variable, for two reasons.
   * It is public either way: the id is printed into the page source of every
   * page and anybody can read it, so there is nothing here to protect. And the
   * Vercel CLI on this machine has twice stored whitespace instead of a value,
   * which broke a build on 1 September, so a step that can be avoided should be.
   *
   * NEXT_PUBLIC_META_PIXEL_ID still wins when set, so a second pixel or a move
   * to another ad account needs no deploy.
   *
   * Do not confuse this with the ad account id, 1526070912465638. They are
   * different objects and Meta shows both on adjacent screens. The wrong one
   * reports nothing while appearing configured, which is worse than no pixel.
   */
  metaPixelId: '1075971171747917',

  /**
   * The GA4 web stream, created by Inbar on 2 Nov 2026. Public for the same
   * reason as the Pixel id: it is printed into every page. NEXT_PUBLIC_GA_MEASUREMENT_ID
   * wins when it holds a valid id. GA only loads on the live domain, see lib/analytics/ga.ts.
   */
  gaMeasurementId: 'G-J50PJRJEP6',

  phone: '(888) 601-6556',
  phoneHref: 'tel:+18886016556',
  email: 'greengrowthmarketinginc@gmail.com',

  address: {
    line1: '500 Navarro St',
    line2: '2nd Floor',
    city: 'San Antonio',
    state: 'TX',
    zip: '78205',
    country: 'United States',
  },

  /**
   * Shown as the "last updated" date on the legal pages. Bump this by hand
   * whenever the wording materially changes — that is the whole point of the
   * date, so do not wire it to today's date automatically.
   */
  legalLastUpdated: 'November 2, 2026',
} as const

/** One-line address, for inline use in a sentence. */
export const addressOneLine = [
  business.address.line1,
  business.address.line2,
  `${business.address.city}, ${business.address.state} ${business.address.zip}`,
].join(', ')
