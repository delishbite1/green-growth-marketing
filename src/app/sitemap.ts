import type { MetadataRoute } from 'next'
import { business } from '@/config/business'
import { industryGuides } from '@/data/industry-guides'

/**
 * The list of pages Google is invited to index.
 *
 * There was none until 3 Sep 2026, so `/sitemap.xml` returned 404 and the only
 * way Google could find anything was by following links from somewhere it had
 * already crawled. For a site with no inbound links yet, that is close to being
 * invisible.
 *
 * Built from `business.siteUrl`, the apex domain, NOT from
 * NEXT_PUBLIC_SITE_URL, which is currently set to a www subdomain that does not
 * resolve. Telling a search engine the canonical location of a page is a URL
 * that answers nothing is worse than telling it nothing at all.
 *
 * `/free-letters` and its thank you page are deliberately absent. They exist to
 * receive paid traffic from one Facebook ad, not to rank: a thank you page in
 * search results is a page that gets visited by people who never filled the
 * form, and the offer page competes with the homepage for the same terms.
 * Neither is blocked from being crawled, they are simply not put forward.
 *
 * Priorities are relative to each other and nothing else. Contact is highest
 * after the homepage because a quote request is the point of the site.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = business.siteUrl
  const now = new Date()

  return [
    { url: `${base}/`, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/industries`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/postcard-mailing`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/handwritten-letters`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/products`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },

    // One per written guide. These are the pages most likely to be found by
    // somebody searching for their own trade, so they rank above About.
    ...industryGuides.map((g) => ({
      url: `${base}/industries/${g.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    // Legal pages are listed because they are real pages a person may look for,
    // and low priority because nobody arrives at a business through its terms.
    { url: `${base}/privacy`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${base}/terms`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
  ]
}
