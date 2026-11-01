'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { guideForIndustry } from '@/data/industry-guides'
import { X, ChevronRight, CheckCircle2 } from 'lucide-react'
import IndustryIcon from './IndustryIcon'
import type { Industry } from '@/data/industries'

interface Props {
  industry: Industry
  onClose: () => void
}

export default function IndustryModal({ industry, onClose }: Props) {
  const dialogRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const previousFocus = document.activeElement as HTMLElement | null
    const previousOverflow = document.body.style.overflow
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key !== 'Tab') return
      const controls = dialogRef.current?.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), input:not([disabled]), [tabindex="0"]')
      if (!controls?.length) return
      const first = controls[0]
      const last = controls[controls.length - 1]
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
      if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
    }
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    dialogRef.current?.querySelector<HTMLElement>('button')?.focus()
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = previousOverflow
      previousFocus?.focus()
    }
  }, [onClose])

  return (
    <div ref={dialogRef} className="fixed inset-0 z-[100] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="industry-modal-title">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />

      {/* Card. max-h + flex column so the body scrolls instead of the CTAs
          falling off the bottom of a short phone screen. */}
      <div className="relative bg-ggm-paper rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden animate-scale-in flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-gradient-to-br from-ggm-forest to-ggm-forest p-7 pr-14 flex-shrink-0">
          <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-lg border border-ggm-ivory/25 text-ggm-ivory"><IndustryIcon name={industry.name} category={industry.category} className="h-6 w-6" /></div>
          <h2 id="industry-modal-title" className="text-xl font-semibold text-white mb-1">{industry.name}</h2>
          <div className="text-ggm-sage-surface text-xs font-semibold uppercase tracking-wider">{industry.category}</div>
        </div>

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-11 h-11 rounded-lg border border-white/20 bg-transparent hover:bg-white/10 flex items-center justify-center transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5 text-white" />
        </button>

        {/* Body — scrolls if the content is taller than the screen */}
        <div className="p-7 overflow-y-auto">
          <p className="text-ggm-muted text-sm leading-relaxed mb-6">{industry.description}</p>

          <div className="mb-7">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Popular Campaign Types</h3>
            <ul className="space-y-2.5">
              {industry.examples.map((ex) => (
                <li key={ex} className="flex items-center gap-2.5 text-sm text-gray-700">
                  <CheckCircle2 className="w-4 h-4 text-ggm-forest flex-shrink-0" />
                  {ex}
                </li>
              ))}
            </ul>
          </div>

          {/* A full page exists for the trades GGM actually sells to. Linking it
              from here is also what lets Google reach those pages at all: a
              modal is invisible to a crawler, so without this the guides would
              be orphans reachable only from the sitemap. */}
          {guideForIndustry(industry.name) && (
            <Link
              href={`/industries/${guideForIndustry(industry.name)!.slug}`}
              onClick={onClose}
              className="mb-4 flex items-center justify-between gap-2 rounded-lg border border-ggm-line bg-transparent px-4 py-3 text-sm font-medium text-ggm-forest transition-colors hover:border-ggm-sage"
            >
              Explore the industry guide
              <ChevronRight className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
            </Link>
          )}

          <div className="flex flex-col sm:flex-row gap-3">
            {/* Carries the chosen niche through to the form and lands on the
                form itself, not the top of the page. */}
            <Link
              href={`/contact?industry=${encodeURIComponent(industry.name)}#quote-form`}
              onClick={onClose}
              className="flex-1 flex items-center justify-center gap-2 bg-ggm-forest hover:bg-ggm-forest-deep text-white font-medium min-h-12 py-3 px-5 rounded-lg transition-colors duration-200 text-sm shadow-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ggm-forest"
            >
              Get a Free Quote
              <ChevronRight className="w-4 h-4" aria-hidden="true" />
            </Link>
            <a
              href="tel:+18886016556"
              className="flex-1 flex items-center justify-center gap-2 border border-ggm-line hover:border-ggm-sage text-gray-700 hover:text-ggm-forest font-medium min-h-12 py-3 px-5 rounded-lg transition-colors duration-200 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ggm-forest"
            >
              Call (888) 601-6556
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
