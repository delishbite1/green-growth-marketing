import type { Metadata } from 'next'
import { Inter, Playfair_Display, Figtree } from 'next/font/google'
import './globals.css'
import './approved-opening.css'
import Navbar from '@/components/layout/ApprovedNavbar'
import Footer from '@/components/layout/Footer'
import SiteChrome from '@/components/layout/SiteChrome'
import BrandFrame from '@/components/brand/BrandFrame'
import { StructuredData } from '@/components/seo/StructuredData'
import { MetaPixel } from '@/components/seo/MetaPixel'
import { GoogleAnalytics } from '@/components/seo/GoogleAnalytics'
import { Analytics } from '@vercel/analytics/react'
import { business } from '@/config/business'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

/*
 * The approved pairing, loaded alongside Inter rather than instead of it.
 * Inter still sets every page that has not been redesigned yet, so adding
 * these cannot change the look of a page nobody has reviewed. Figtree is
 * deliberate: it is already the client portal's typeface, so the two
 * properties read as one company.
 */
const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  weight: ['500', '600'],
  variable: '--font-playfair',
})

const figtree = Figtree({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-figtree',
})

export const metadata: Metadata = {
  /*
   * Makes every relative URL in metadata absolute against the apex domain.
   * Without it Next.js emits relative og:image paths, which Facebook cannot
   * fetch, and the site had no canonical anywhere.
   *
   * Deliberately business.siteUrl and not NEXT_PUBLIC_SITE_URL: that variable
   * is set to a www subdomain which is not configured in Vercel and resolves to
   * nothing. On 3 Sep the live /free-letters og:image pointed there and was
   * dead, so every Facebook preview of the advertised page showed no image.
   */
  metadataBase: new URL(business.siteUrl),
  alternates: { canonical: '/' },

  /*
   * Proves to Google that we own this site, which is what unlocks Search
   * Console. Not a secret: it is served in the public source of every page,
   * which is the entire mechanism, since only somebody who can change the site
   * could have put it there.
   *
   * Expressed through the metadata API rather than as raw markup in the head,
   * so Next renders the tag once and it cannot end up duplicated by a second
   * hand written copy later.
   *
   * Leave it in place after verification. Google rechecks periodically, and
   * removing the tag drops the property along with all its history.
   */
  verification: {
    google: 'DZFLKg_3AfqWn-k6M1kxpmXBTKIezoEEsHX5xWtOZ4U',
  },
  title: 'Green Growth Marketing | Direct Mail That Delivers Results',
  description:
    'Full service direct mail campaigns for businesses nationwide. Postcards, personalized letters, handwritten envelopes. Design, printing, mailing lists, and postage all included.',
  keywords:
    'direct mail marketing, postcards, mailing lists, printing, personalized letters, handwritten envelopes, business marketing USA',
  openGraph: {
    title: 'Green Growth Marketing | Direct Mail That Delivers Results',
    description:
      'Full-service direct mail campaigns. We handle design, printing, mailing lists, and postage so you can focus on growing your business.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} ${figtree.variable}`}>
      <head>
        <StructuredData />
      </head>
      <body className="font-sans">
        {/* Site wide, so every page reports, not only the ad landing page. */}
        <MetaPixel />
        <GoogleAnalytics />
        {/* Advertising landing pages render bare. See SiteChrome for why. */}
        <SiteChrome>
          <Navbar />
        </SiteChrome>
        <main><BrandFrame>{children}</BrandFrame></main>
        <SiteChrome>
          <Footer />
        </SiteChrome>
        {/* Vercel's own analytics: no extra account, no cookie banner, and it
            answers the question nobody could answer before, which is whether
            anybody reaches this site at all. */}
        {process.env.NEXT_PUBLIC_DESIGN_PREVIEW !== '1' && <Analytics />}
      </body>
    </html>
  )
}
