'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { X, ChevronRight, CheckCircle2 } from 'lucide-react'
import type { Industry } from '@/data/industries'

interface Props {
  industry: Industry
  onClose: () => void
}

export default function IndustryModal({ industry, onClose }: Props) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />

      {/* Card */}
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden animate-scale-in">
        {/* Header */}
        <div className="bg-gradient-to-br from-green-700 to-green-600 p-7 pr-14">
          <div className="text-4xl mb-3">{industry.icon}</div>
          <h2 className="text-xl font-black text-white mb-1">{industry.name}</h2>
          <div className="text-green-200 text-xs font-semibold uppercase tracking-wider">{industry.category}</div>
        </div>

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5 text-white" />
        </button>

        {/* Body */}
        <div className="p-7">
          <p className="text-gray-600 text-sm leading-relaxed mb-6">{industry.description}</p>

          <div className="mb-7">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Popular Campaign Types</h3>
            <ul className="space-y-2.5">
              {industry.examples.map((ex) => (
                <li key={ex} className="flex items-center gap-2.5 text-sm text-gray-700">
                  <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                  {ex}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            {/* Carries the chosen niche through to the form and lands on the
                form itself, not the top of the page. */}
            <Link
              href={`/contact?industry=${encodeURIComponent(industry.name)}#quote-form`}
              onClick={onClose}
              className="flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-5 rounded-xl transition-colors duration-200 text-sm shadow-lg shadow-green-500/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700"
            >
              Get a Free Quote
              <ChevronRight className="w-4 h-4" aria-hidden="true" />
            </Link>
            <a
              href="tel:+18886016556"
              className="flex-1 flex items-center justify-center gap-2 border-2 border-gray-200 hover:border-green-300 text-gray-700 hover:text-green-700 font-semibold py-3 px-5 rounded-xl transition-colors duration-200 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
            >
              Call (888) 601-6556
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
