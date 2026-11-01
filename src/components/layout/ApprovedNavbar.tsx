'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { business } from '@/config/business'

const links = [
  ['Home', '/'], ['Products', '/products'], ['Industries', '/industries'],
  ['About Us', '/about'], ['Contact', '/contact'],
]

export default function ApprovedNavbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  useEffect(() => { setOpen(false) }, [pathname])
  useEffect(() => {
    const escape = (event: KeyboardEvent) => { if (event.key === 'Escape') setOpen(false) }
    document.addEventListener('keydown', escape)
    return () => document.removeEventListener('keydown', escape)
  }, [])
  return (
    <div className="ggm-approved">
      <div className="announcement" role="region" aria-label="New customer offer">
        <span className="offer-main">Get <strong>1,000 FREE Postcards</strong> when you order <strong>3,000+</strong></span>
        <span className="offer-terms">New customers only</span>
        <a className="promo-call" href={business.phoneHref}>{business.phone}</a>
      </div>
      <header>
        <nav className="nav" aria-label="Main navigation">
          <Link href="/" className="logo" aria-label="Green Growth Marketing home"><strong>GGM</strong><small>GREEN GROWTH MARKETING</small></Link>
          <div className="navlinks">{links.map(([label, href]) => <Link key={href} href={href} className={pathname === href ? 'active' : undefined} aria-current={pathname === href ? 'page' : undefined}>{label}</Link>)}</div>
          <Link className="button" href="/contact#quote-form">Get a Free Quote <span aria-hidden="true">↗</span></Link>
          <button className="menu" type="button" aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)}>Menu</button>
        </nav>
        <div id="mobile-navigation" className="mobile-nav" hidden={!open}>{links.map(([label, href]) => <Link key={href} href={href} onClick={() => setOpen(false)} aria-current={pathname === href ? 'page' : undefined}>{label}</Link>)}</div>
      </header>
    </div>
  )
}
