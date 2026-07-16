'use client'

import { Phone } from 'lucide-react'

export default function FloatingCallButton() {
  return (
    <a
      href="tel:+18886016556"
      aria-label="Call Green Growth Marketing"
      className="fixed bottom-6 right-6 z-50 lg:hidden flex items-center gap-2.5 text-white font-bold text-sm px-5 py-3.5 rounded-full shadow-2xl transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
      style={{ background: 'linear-gradient(135deg, #2d6b22, #7dc242)', boxShadow: '0 8px 30px rgba(122,194,66,0.4)' }}
    >
      <div className="relative">
        <Phone className="w-5 h-5" />
        <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-green-300 rounded-full animate-ping" />
        <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-green-300 rounded-full" />
      </div>
      Call Now
    </a>
  )
}
