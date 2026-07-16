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
  legalLastUpdated: 'July 16, 2026',
} as const

/** One-line address, for inline use in a sentence. */
export const addressOneLine = [
  business.address.line1,
  business.address.line2,
  `${business.address.city}, ${business.address.state} ${business.address.zip}`,
].join(', ')
