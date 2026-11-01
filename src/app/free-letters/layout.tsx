import type { Metadata } from 'next'
import { business } from '@/config/business'

/**
 * The advertising landing page's own shell.
 *
 * The Pixel used to live here and moved to the root layout on 3 Sep 2026. The
 * original reasoning was that only paid traffic needs measuring, which was
 * sound while this was the only page that mattered. It stopped being true the
 * moment the ad started: the homepage and the contact form were reporting
 * nothing, so there was no way to tell whether the money did anything.
 */

const TITLE = '100 Free Personalized Letters | Green Growth Marketing'
const DESCRIPTION =
  'Qualifying businesses can try our personalized direct mail with 100 complimentary letters, mailed with Forever Stamps. Printing, addressing, postage and mailing included. No contract required.'

/*
 * The canonical address of this site.
 *
 * This used to read NEXT_PUBLIC_SITE_URL with a hardcoded www fallback, and on
 * 3 Sep 2026 that produced a live bug: the variable was set to
 * www.greengrowthmarketinginc.com, www is not a domain on this Vercel project,
 * and the og:image on the page GGM pays to advertise resolved to nothing. Every
 * Facebook and WhatsApp preview of it showed a broken image. Nothing errored,
 * because a URL only has to parse to be written into a tag.
 *
 * So the environment no longer gets a vote on this one value. A canonical
 * domain changes about once in the life of a company, and when it does it
 * should be a deliberate edit by somebody who checked the new host answers,
 * not a dashboard field nobody validated. business.siteUrl is that edit.
 */
const SITE_URL = business.siteUrl

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: '100 FREE Personalized Letters, with Forever Stamps',
    description: DESCRIPTION,
    type: 'website',
    siteName: 'Green Growth Marketing',
    images: [
      {
        url: '/free-letters/opengraph-image',
        width: 1200,
        height: 630,
        alt: '100 free personalized letters with Forever Stamps from Green Growth Marketing',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '100 FREE Personalized Letters, with Forever Stamps',
    description: DESCRIPTION,
  },
  /**
   * Paid traffic only. Leaving it indexable would put a page offering free
   * letters into search results next to the real service pages, where it
   * outranks them on the strength of the word "free" and takes traffic that
   * was ready to buy.
   */
  robots: { index: false, follow: false },
}

export default function FreeLettersLayout({ children }: { children: React.ReactNode }) {
  /*
   * The pixel bootstrap used to live here. It moved to the root layout on
   * 3 Sep 2026 so that every page reports, not just this one.
   *
   * It must NOT come back. The snippet fires PageView itself, so having it in
   * both layouts would count every visit to this page twice, halving every
   * cost per result in Ads Manager while appearing to improve them.
   */
  return <>{children}</>
}
