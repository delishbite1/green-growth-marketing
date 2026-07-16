'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Phone, ChevronRight, Home, Building2, Users, Mail } from 'lucide-react'

const navLinks = [
  { label: 'Home',       href: '/',           icon: Home },
  { label: 'Industries', href: '/industries', icon: Building2 },
  { label: 'About Us',   href: '/about',      icon: Users },
  { label: 'Contact',    href: '/contact',    icon: Mail },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setIsOpen(false) }, [pathname])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const closeOnEsc = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') setIsOpen(false)
  }, [])
  useEffect(() => {
    document.addEventListener('keydown', closeOnEsc)
    return () => document.removeEventListener('keydown', closeOnEsc)
  }, [closeOnEsc])

  return (
    <div className="relative z-50">

      {/* ── ANNOUNCEMENT BAR ── */}
      <div
        role="region"
        aria-label="Promotional offer"
        style={{
          background: 'linear-gradient(90deg, #159447 0%, #087f7a 25%, #275bd8 55%, #7436dc 78%, #c126bb 100%)',
          boxShadow: '0 2px 10px rgba(0,0,0,0.15)',
          minHeight: '44px',
        }}
        className="w-full flex items-center"
      >
        <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 flex items-center justify-center gap-4 sm:gap-8 py-2" style={{ minHeight: '44px' }}>
          <p className="text-white text-center" style={{ fontSize: '15px', fontWeight: 600, lineHeight: 1.4 }}>
            🎁 Get{' '}
            <strong style={{ fontWeight: 800, color: '#fde68a' }}>1,000 FREE Postcards</strong>
            {' '}when you order 3,000+ New customers only
          </p>
          <a
            href="tel:+18886016556"
            aria-label="Call us at 888-601-6556"
            className="flex items-center gap-1.5 text-white hover:text-yellow-200 transition-colors flex-shrink-0"
            style={{ fontSize: '15px', fontWeight: 700 }}
          >
            <Phone className="w-3.5 h-3.5" aria-hidden="true" />
            (888) 601-6556
          </a>
        </div>
      </div>

      {/* ── FLOATING GLASS NAV ── */}
      <div className="flex justify-center px-3 sm:px-4 pt-3.5 pb-1">
        <header
          aria-label="Main navigation"
          className="w-full transition-all duration-300"
          style={{
            maxWidth: '1600px',
            width: '93%',
            borderRadius: '24px',
            background: 'rgba(255,255,255,0.94)',
            backdropFilter: 'blur(18px)',
            WebkitBackdropFilter: 'blur(18px)',
            border: '1px solid rgba(255,255,255,0.80)',
            boxShadow: scrolled
              ? '0 16px 48px rgba(15,23,42,0.14), 0 2px 10px rgba(34,197,94,0.10)'
              : '0 12px 40px rgba(15,23,42,0.10), 0 2px 8px rgba(34,197,94,0.08)',
          }}
        >
          <nav className="px-5 lg:px-8">
            <div className="flex items-center justify-between" style={{ height: '108px' }}>

              {/* Logo + separator */}
              <div className="flex items-center gap-5 flex-shrink-0">
                <Link
                  href="/"
                  aria-label="Green Growth Marketing — go to homepage"
                  className="hover:opacity-90 transition-opacity focus-visible:outline-2 focus-visible:outline-green-500 focus-visible:rounded-lg"
                >
                  <img
                    src="/logo.png"
                    alt="Green Growth Marketing"
                    style={{
                      height: '96px',
                      width: '200px',
                      objectFit: 'contain',
                      objectPosition: 'left center',
                      mixBlendMode: 'multiply',
                    }}
                  />
                </Link>
                {/* Vertical separator */}
                <div
                  aria-hidden="true"
                  className="hidden lg:block h-10 w-px"
                  style={{ background: 'rgba(0,0,0,0.09)' }}
                />
              </div>

              {/* Desktop nav links */}
              <div className="hidden lg:flex items-center gap-1" role="list">
                {navLinks.map(({ label, href, icon: Icon }) => {
                  const active = pathname === href
                  return (
                    <Link
                      key={href}
                      href={href}
                      role="listitem"
                      aria-current={active ? 'page' : undefined}
                      className="group flex items-center gap-2 transition-all duration-200 focus-visible:outline-2 focus-visible:outline-green-500"
                      style={{
                        fontSize: '16px',
                        fontWeight: 600,
                        borderRadius: '999px',
                        padding: '13px 18px',
                        color: active ? '#13823b' : '#12213d',
                        background: active
                          ? 'linear-gradient(135deg, rgba(224,247,229,0.95), rgba(239,252,241,0.95))'
                          : 'transparent',
                        boxShadow: active
                          ? 'inset 0 0 0 1px rgba(34,197,94,0.12), 0 6px 18px rgba(34,197,94,0.10)'
                          : 'none',
                      }}
                      onMouseEnter={(e) => {
                        if (active) return
                        e.currentTarget.style.background = 'rgba(22,163,74,0.07)'
                        e.currentTarget.style.color = '#15803d'
                        e.currentTarget.style.transform = 'translateY(-1px)'
                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(22,163,74,0.12)'
                      }}
                      onMouseLeave={(e) => {
                        if (active) return
                        e.currentTarget.style.background = 'transparent'
                        e.currentTarget.style.color = '#12213d'
                        e.currentTarget.style.transform = 'translateY(0)'
                        e.currentTarget.style.boxShadow = 'none'
                      }}
                    >
                      <Icon className="w-4 h-4 flex-shrink-0" aria-hidden="true" style={{ color: active ? '#13823b' : '#2563eb' }} />
                      {label}
                    </Link>
                  )
                })}
              </div>

              {/* Desktop right: phone + CTA */}
              <div className="hidden lg:flex items-center gap-4">
                {/* Phone */}
                <a
                  href="tel:+18886016556"
                  aria-label="Call us at 888-601-6556"
                  className="flex items-center gap-2.5 transition-colors duration-200 hover:opacity-80"
                  style={{ color: '#12213d', fontWeight: 600, fontSize: '15px' }}
                >
                  <span
                    className="flex items-center justify-center w-9 h-9 rounded-full"
                    style={{ background: 'rgba(22,163,74,0.10)' }}
                    aria-hidden="true"
                  >
                    <Phone className="w-4 h-4" style={{ color: '#16a34a' }} />
                  </span>
                  (888) 601-6556
                </a>

                {/* CTA button */}
                <Link
                  href="/contact#quote-form"
                  className="flex items-center gap-2 text-white font-bold transition-all duration-200 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-purple-500"
                  style={{
                    background: 'linear-gradient(100deg, #16953d 0%, #18a85a 38%, #6c35de 75%, #922ee7 100%)',
                    borderRadius: '999px',
                    padding: '16px 24px',
                    fontSize: '15px',
                    boxShadow: '0 10px 24px rgba(97,54,220,0.22), 0 5px 16px rgba(22,149,61,0.16)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 16px 36px rgba(97,54,220,0.32), 0 8px 24px rgba(22,149,61,0.22)'
                    const arrow = e.currentTarget.querySelector('.cta-arrow') as HTMLElement
                    if (arrow) arrow.style.transform = 'translateX(3px)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = '0 10px 24px rgba(97,54,220,0.22), 0 5px 16px rgba(22,149,61,0.16)'
                    const arrow = e.currentTarget.querySelector('.cta-arrow') as HTMLElement
                    if (arrow) arrow.style.transform = 'translateX(0)'
                  }}
                >
                  Get a Free Quote
                  <ChevronRight className="cta-arrow w-4 h-4 transition-transform duration-200" aria-hidden="true" />
                </Link>
              </div>

              {/* Mobile hamburger */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden p-2.5 rounded-xl transition-colors hover:bg-green-50"
                aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
                aria-expanded={isOpen}
                aria-controls="mobile-menu"
                style={{ color: '#12213d', minWidth: '44px', minHeight: '44px' }}
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </nav>

          {/* Mobile menu */}
          <div
            id="mobile-menu"
            className={`lg:hidden overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-[500px]' : 'max-h-0'}`}
          >
            {/* Backdrop close */}
            {isOpen && (
              <div
                className="fixed inset-0 z-[-1]"
                onClick={() => setIsOpen(false)}
                aria-hidden="true"
              />
            )}
            <div className="border-t border-gray-100 px-5 pb-6 pt-4 space-y-1">
              <img
                src="/logo.png"
                alt="Green Growth Marketing"
                style={{ height: '72px', width: 'auto', mixBlendMode: 'multiply', marginBottom: '8px' }}
              />
              {navLinks.map(({ label, href, icon: Icon }) => {
                const active = pathname === href
                return (
                  <Link
                    key={href}
                    href={href}
                    aria-current={active ? 'page' : undefined}
                    className="flex items-center gap-2.5 px-4 rounded-xl font-semibold transition-colors"
                    style={{
                      minHeight: '48px',
                      fontSize: '15px',
                      color: active ? '#13823b' : '#12213d',
                      background: active ? 'linear-gradient(135deg, rgba(224,247,229,0.95), rgba(239,252,241,0.95))' : 'transparent',
                    }}
                  >
                    <Icon className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                    {label}
                  </Link>
                )
              })}
              <div className="pt-4 space-y-3 border-t border-gray-100">
                <a
                  href="tel:+18886016556"
                  className="flex items-center justify-center gap-2 w-full border-2 border-green-600 text-green-700 font-bold rounded-xl hover:bg-green-50 transition-colors"
                  style={{ minHeight: '48px', fontSize: '15px' }}
                >
                  <Phone className="w-4 h-4" aria-hidden="true" />
                  Call (888) 601-6556
                </a>
                <Link
                  href="/contact#quote-form"
                  className="flex items-center justify-center gap-2 w-full text-white font-bold rounded-xl"
                  style={{
                    minHeight: '48px',
                    fontSize: '15px',
                    background: 'linear-gradient(100deg, #16953d 0%, #18a85a 38%, #6c35de 75%, #922ee7 100%)',
                    boxShadow: '0 6px 18px rgba(97,54,220,0.20)',
                  }}
                >
                  Get a Free Quote <ChevronRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </header>
      </div>

    </div>
  )
}
