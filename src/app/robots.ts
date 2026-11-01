import type { MetadataRoute } from 'next'
import { business } from '@/config/business'

/**
 * What crawlers may read, and where the sitemap is.
 *
 * `/robots.txt` returned 404 until 3 Sep 2026. A missing robots file does not
 * block anything, crawlers assume they may read everything, but it also means
 * there was nowhere to point them at a sitemap, and no way to keep pages out of
 * search that have no business being there.
 *
 * Two things are kept out, both for the same reason: they are pages that only
 * make sense to somebody who arrived from somewhere specific.
 *
 *   /free-letters/thanks  is what you see AFTER filling the form. Landing on it
 *                         from Google means seeing a thank you for something you
 *                         never did, and it would compete for the brand name.
 *   /api/                 has no pages, only endpoints.
 *
 * `/free-letters` needs nothing here: its own layout already sets
 * `robots: { index: false, follow: false }`, because an offer page carrying the
 * word "free" will outrank the pages that sell, and take traffic that was ready
 * to buy. Repeating that rule here would be a second place to forget to change.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/free-letters/thanks'],
    },
    sitemap: `${business.siteUrl}/sitemap.xml`,
    host: business.siteUrl,
  }
}
