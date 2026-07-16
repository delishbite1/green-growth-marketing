'use client'

import { Phone } from 'lucide-react'

export default function FloatingCallButton() {
  return (
    <a
      href="tel:+18886016556"
      aria-label="Call Green Growth Marketing at 888 601 6556"
      className="fixed bottom-6 right-6 z-50 lg:hidden flex items-center gap-2.5 text-white font-bold text-sm px-5 py-3.5 rounded-full shadow-2xl transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      style={{
        // Was #2d6b22 -> #7dc242, which put white text on a light lime at the
        // right-hand end: 2.17:1, less than half the 4.5:1 minimum. Darkened the
        // whole ramp so the text stays readable across the entire button.
        background: 'linear-gradient(135deg, #1a5c1a 0%, #2d7a1f 100%)',
        boxShadow: '0 8px 30px rgba(26,92,26,0.45)',
        minHeight: '48px',
      }}
    >
      <span className="relative flex-shrink-0" aria-hidden="true">
        <Phone className="w-5 h-5" />
        <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-green-300 rounded-full motion-safe:animate-ping" />
        <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-green-300 rounded-full" />
      </span>
      Call Now
    </a>
  )
}
