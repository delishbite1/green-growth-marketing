import type { Metadata } from 'next'
import { Figtree, Playfair_Display } from 'next/font/google'
import { business } from '@/config/business'

/**
 * The postcard campaign request page's own shell.
 *
 * The fonts are the brand pair already used by the portal and the proposal:
 * Playfair Display for display type, Figtree for everything else. Loaded here
 * rather than in the root layout so the rest of the site is untouched.
 *
 * No Pixel here. It lives in the root layout and fires PageView itself; adding
 * it again would double count. No checkout or purchase events: this page is
 * request only.
 */

const figtree = Figtree({ subsets: ['latin'], variable: '--font-figtree', display: 'swap' })
const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
  display: 'swap',
})

const TITLE = 'Premium 9" × 11" Postcards, Everything Included | Green Growth Marketing'
const DESCRIPTION =
  'Professional design, targeted homeowner mailing lists, full color printing and postage, all included. Request your campaign and get an estimate, from $640 for 1,000 postcards.'

export const metadata: Metadata = {
  metadataBase: new URL(business.siteUrl),
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/postcards' },
  openGraph: { title: TITLE, description: DESCRIPTION, type: 'website', siteName: business.shortName },
  // Paid traffic only, same as /free-letters.
  robots: { index: false, follow: false },
}

export default function PostcardsLayout({ children }: { children: React.ReactNode }) {
  return <div className={`${figtree.variable} ${playfair.variable}`}>{children}</div>
}
