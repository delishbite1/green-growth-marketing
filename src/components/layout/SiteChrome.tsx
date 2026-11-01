'use client'

import { usePathname } from 'next/navigation'

/**
 * Hides the site's normal furniture on dedicated advertising landing pages.
 *
 * Paid traffic and organic traffic want opposite things from a page. Somebody
 * who found the site on Google is browsing and needs the navigation. Somebody
 * who just paid us a click by tapping "100 FREE Personalized Letters" on
 * Instagram has exactly one thing to do, and every other link on the screen is
 * a way to not do it. The navbar alone offers seven ways to leave.
 *
 * There is a specific conflict too, not just a general one. PopupOffer offers
 * 1,000 free postcards. Firing that over a page whose whole promise is 100
 * free letters gives the visitor two different free offers from one company in
 * the first ten seconds, which reads as a bait and switch and is the single
 * fastest way to lose a lead that already cost money.
 *
 * Done as a pathname check rather than by moving every existing page into a
 * route group. The route group is the tidier structure, but it would mean
 * moving files that another session currently has uncommitted work in, and a
 * merge conflict across the whole site is not worth a nicer folder tree.
 */

/** Routes that get no navbar, no footer, no popup and no floating button. */
const BARE_ROUTES = ['/free-letters', '/postcards']

export function isBareRoute(pathname: string): boolean {
  return BARE_ROUTES.some((route) => pathname === route || pathname.startsWith(`${route}/`))
}

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  if (isBareRoute(pathname)) return null
  return <>{children}</>
}
