'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { X, Phone, ChevronRight, Home, Building2, Users, Mail } from 'lucide-react'

const navLinks = [
  { label: 'Home',       href: '/',           icon: Home },
  { label: 'Products',   href: '/products',   icon: Building2 },
  { label: 'Industries', href: '/industries', icon: Building2 },
  { label: 'How It Works', href: '/#how-it-works', icon: Mail },
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
    <div className="brand-controls relative z-50 font-body">

      {/* ── ANNOUNCEMENT BAR ── */}
      <div
        role="region"
        aria-label="Promotional offer"
        style={{
          background: '#173D32',
          boxShadow: '0 2px 10px rgba(0,0,0,0.15)',
          minHeight: '44px',
        }}
        className="w-full flex items-center"
      >
        <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 flex items-center justify-center gap-3 sm:gap-6 py-2" style={{ minHeight: '44px' }}>
          {/* Small phones: short version, one line. It used to wrap to 4-5 lines
              at 360px and shove the hero off screen. */}
          <p className="text-white text-center sm:hidden" style={{ fontSize: '12px', fontWeight: 600, lineHeight: 1.3 }}>
            <strong style={{ fontWeight: 800, color: '#C6A875' }}>1,000 FREE Postcards</strong> on 3,000+<span className="block text-[10px] font-normal text-white/85">New customers only</span>
          </p>
          <p className="text-white text-center hidden sm:block" style={{ fontSize: '13px', fontWeight: 600, lineHeight: 1.4 }}>
            Get <strong style={{ fontWeight: 800, color: '#C6A875' }}>1,000 FREE Postcards</strong>
            {' '}when you order 3,000+ New customers only
          </p>
          <a
            href="tel:+18886016556"
            aria-label="Call us at 888-601-6556"
            className="hidden sm:flex items-center gap-1.5 text-white hover:text-yellow-200 transition-colors flex-shrink-0 whitespace-nowrap"
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
          background: #173D32; border-radius: 2px;
          transition: background 0.2s;
        }
      `}</style>

      <header
        aria-label="Main navigation"
        className="w-full transition-all duration-500"
        style={{
          /*
             A solid ivory surface rather than a transparent one.

             Transparent worked over the old light hero. Over the forest hero it
             left the forest wordmark and the forest nav links drawn on forest,
             which is to say invisible. An opaque bar also stops the links
             sitting on whatever photograph happens to scroll beneath them.
          */
          background: '#F6F3ED',
          boxShadow: '0 1px 0 #E2DFD7',
        }}
      >
        <div className="max-w-[1600px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex h-14 items-center justify-between sm:h-20">

            {/* Logo */}
            <Link
              href="/"
              aria-label="Green Growth Marketing, homepage"
              className="nav-logo focus-visible:outline-2 focus-visible:outline-green-500 focus-visible:rounded-lg"
              style={{ animationDelay: '0ms' }}
            >
              <span className="inline-flex flex-col leading-none ">
            <span className="font-display text-[26px] font-medium tracking-[0.02em] text-ggm-forest">GGM</span>
            <span aria-hidden className="mt-0.5 text-[7.5px] font-semibold uppercase tracking-[0.18em] text-ggm-forest">Green Growth Marketing</span>
          </span>
            </Link>

            {/* Desktop nav links */}
            <div className="hidden lg:flex items-center gap-1 nav-links-anim" style={{ animationDelay: '100ms' }}>
              {navLinks.map(({ label, href }) => {
                const active = pathname === href
                return (
                  <Link
                    key={href}
                    href={href}
                    aria-current={active ? 'page' : undefined}
                    className="transition-all duration-200 focus-visible:outline-2 focus-visible:outline-green-500"
                    style={{
                      fontSize: '15px',
                      fontWeight: 600,
                      borderRadius: '12px',
                      padding: '10px 16px',
                      color: active ? '#173D32' : '#2E2E2E',
                      background: active ? 'rgba(23,61,50,0.07)' : 'transparent',
                    }}
                    onMouseEnter={e => {
                      if (!active) {
                        e.currentTarget.style.background = 'rgba(23,61,50,0.07)'
                        e.currentTarget.style.color = '#15803d'
                      }
                    }}
                    onMouseLeave={e => {
                      if (!active) {
                        e.currentTarget.style.background = 'transparent'
                        e.currentTarget.style.color = '#2E2E2E'
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
                style={{ color: '#2E2E2E', fontWeight: 600, fontSize: '14px' }}
              >
                <Phone className="w-4 h-4 text-green-600" />
                (888) 601-6556
              </a>


              <Link
                href="/contact#quote-form"
                className="flex items-center gap-2 text-white font-bold transition-all duration-200 hover:-translate-y-0.5"
                style={{
                  background: '#173D32',
                  borderRadius: '12px',
                  padding: '12px 22px',
                  fontSize: '14px',

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
                <X className="w-6 h-6" style={{ color: '#2E2E2E' }} />
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
        {isOpen && <div className="px-5 pb-6 pt-4 space-y-1">
          <span className="inline-flex flex-col leading-none mb-2">
            <span className="font-display text-[26px] font-medium tracking-[0.02em] text-ggm-forest">GGM</span>
            <span aria-hidden className="mt-0.5 text-[7.5px] font-semibold uppercase tracking-[0.18em] text-ggm-forest">Green Growth Marketing</span>
          </span>
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
                  color: active ? '#173D32' : '#2E2E2E',
                  background: active ? 'rgba(23,61,50,0.07)' : 'transparent',
                }}
              >
                <Icon className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                {label}
              </Link>
            )
          })}
          {/* Existing customers, on the device they are most likely to be
              holding when they wonder where their campaign has got to. */}


          <div className="pt-4 space-y-3 border-t border-gray-100">
            <a
              href="tel:+18886016556"
              className="flex items-center justify-center gap-2 w-full border border-ggm-line text-ggm-forest font-bold rounded-xl hover:bg-ggm-sage-surface transition-colors"
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
                background: '#173D32',
                boxShadow: 'none',
                whiteSpace: 'nowrap',
              }}
            >
              Get a Free Quote <ChevronRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </div>}
      </div>

    </div>
  )
}
