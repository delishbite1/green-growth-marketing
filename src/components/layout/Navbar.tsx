'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { X, Phone, ChevronRight, Home, Building2, Users, Mail } from 'lucide-react'

const navLinks = [
  { label: 'Home',       href: '/',           icon: Home },
  { label: 'Products',   href: '/products',   icon: Building2 },
  { label: 'Industries', href: '/industries', icon: Building2 },
  { label: 'About Us',   href: '/about',      icon: Users },
  { label: 'Contact',    href: '/contact',    icon: Mail },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setMounted(true)
    const onScroll = () => setScrolled(window.scrollY > 20)
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
        <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 flex items-center justify-center gap-3 sm:gap-6 py-2" style={{ minHeight: '44px' }}>
          {/* Small phones: short version, one line. It used to wrap to 4-5 lines
              at 360px and shove the hero off screen. */}
          <p className="text-white text-center sm:hidden" style={{ fontSize: '12px', fontWeight: 600, lineHeight: 1.3 }}>
            🎁 <strong style={{ fontWeight: 800, color: '#fde68a' }}>1,000 FREE Postcards</strong> on 3,000+
          </p>
          <p className="text-white text-center hidden sm:block" style={{ fontSize: '13px', fontWeight: 600, lineHeight: 1.4 }}>
            🎁 Get <strong style={{ fontWeight: 800, color: '#fde68a' }}>1,000 FREE Postcards</strong>
            {' '}when you order 3,000+ New customers only
          </p>
          <a
            href="tel:+18886016556"
            aria-label="Call us at 888-601-6556"
            className="flex items-center gap-1.5 text-white hover:text-yellow-200 transition-colors flex-shrink-0 whitespace-nowrap"
            style={{ fontSize: '12px', fontWeight: 700 }}
          >
            <Phone className="w-3.5 h-3.5" aria-hidden="true" />
            (888) 601-6556
          </a>
        </div>
      </div>

      {/* ── FLOATING NAV ── */}
      <style>{`
        @keyframes navFadeIn {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes logoFloat {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes burgerFadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        .nav-logo { animation: logoFloat 700ms ease-out both; }
        .nav-burger { animation: burgerFadeIn 900ms ease-out both; }
        .nav-links-anim { animation: navFadeIn 700ms ease-out both; }
        .hamburger-line {
          display: block; width: 22px; height: 2px;
          background: #12213d; border-radius: 2px;
          transition: background 0.2s;
        }
      `}</style>

      <header
        aria-label="Main navigation"
        className="w-full transition-all duration-500"
        style={{
          background: scrolled
            ? 'rgba(255,255,255,0.08)'
            : 'transparent',
          backdropFilter: scrolled ? 'blur(14px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(14px)' : 'none',
          boxShadow: scrolled ? '0 1px 0 rgba(255,255,255,0.12)' : 'none',
        }}
      >
        <div className="max-w-[1600px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between" style={{ height: '80px' }}>

            {/* Logo */}
            <Link
              href="/"
              aria-label="Green Growth Marketing, homepage"
              className="nav-logo focus-visible:outline-2 focus-visible:outline-green-500 focus-visible:rounded-lg"
              style={{ animationDelay: '0ms' }}
            >
              <img
                src="/logo-transparent.png"
                alt="Green Growth Marketing"
                style={{
                  height: '64px',
                  width: 'auto',
                  objectFit: 'contain',
                  objectPosition: 'left center',
                  filter: 'drop-shadow(0 2px 10px rgba(26,92,26,0.12))',
                }}
              />
            </Link>

            {/* Desktop nav links */}
            <div className="hidden lg:flex items-center gap-1 nav-links-anim" role="list" style={{ animationDelay: '100ms' }}>
              {navLinks.map(({ label, href }) => {
                const active = pathname === href
                return (
                  <Link
                    key={href}
                    href={href}
                    role="listitem"
                    aria-current={active ? 'page' : undefined}
                    className="transition-all duration-200 focus-visible:outline-2 focus-visible:outline-green-500"
                    style={{
                      fontSize: '15px',
                      fontWeight: 600,
                      borderRadius: '999px',
                      padding: '10px 16px',
                      color: active ? '#13823b' : '#12213d',
                      background: active ? 'rgba(22,163,74,0.10)' : 'transparent',
                    }}
                    onMouseEnter={e => {
                      if (!active) {
                        e.currentTarget.style.background = 'rgba(22,163,74,0.08)'
                        e.currentTarget.style.color = '#15803d'
                      }
                    }}
                    onMouseLeave={e => {
                      if (!active) {
                        e.currentTarget.style.background = 'transparent'
                        e.currentTarget.style.color = '#12213d'
                      }
                    }}
                  >
                    {label}
                  </Link>
                )
              })}
            </div>

            {/* Desktop right: phone + CTA */}
            <div className="hidden lg:flex items-center gap-4 nav-links-anim" style={{ animationDelay: '150ms' }}>
              <a
                href="tel:+18886016556"
                aria-label="Call us at 888-601-6556"
                className="flex items-center gap-2 transition-colors duration-200 hover:opacity-70"
                style={{ color: '#12213d', fontWeight: 600, fontSize: '14px' }}
              >
                <Phone className="w-4 h-4 text-green-600" />
                (888) 601-6556
              </a>
              <Link
                href="/contact#quote-form"
                className="flex items-center gap-2 text-white font-bold transition-all duration-200 hover:-translate-y-0.5"
                style={{
                  background: 'linear-gradient(100deg, #16953d 0%, #18a85a 38%, #6c35de 75%, #922ee7 100%)',
                  borderRadius: '999px',
                  padding: '12px 22px',
                  fontSize: '14px',
                  boxShadow: '0 8px 22px rgba(97,54,220,0.22), 0 4px 14px rgba(22,149,61,0.16)',
                  whiteSpace: 'nowrap',
                }}
              >
                Get a Free Quote
                <ChevronRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="nav-burger lg:hidden flex flex-col justify-center gap-[5px] transition-transform duration-200 hover:scale-105"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              style={{ padding: '12px', minWidth: '44px', minHeight: '44px', background: 'transparent', border: 'none', cursor: 'pointer' }}
            >
              {isOpen ? (
                <X className="w-6 h-6" style={{ color: '#12213d' }} />
              ) : (
                <>
                  <span className="hamburger-line" />
                  <span className="hamburger-line" />
                  <span className="hamburger-line" />
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu drawer */}
      <div
        id="mobile-menu"
        className={`lg:hidden overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-[520px]' : 'max-h-0'}`}
        style={{
          background: 'rgba(255,255,255,0.97)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
        }}
      >
        {isOpen && (
          <div className="fixed inset-0 z-[-1]" onClick={() => setIsOpen(false)} aria-hidden="true" />
        )}
        <div className="px-5 pb-6 pt-4 space-y-1">
          <img
            src="/logo-transparent.png"
            alt="Green Growth Marketing"
            style={{ height: '64px', width: 'auto', marginBottom: '8px' }}
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
                  background: active ? 'rgba(22,163,74,0.08)' : 'transparent',
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
                whiteSpace: 'nowrap',
              }}
            >
              Get a Free Quote <ChevronRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>

    </div>
  )
}
