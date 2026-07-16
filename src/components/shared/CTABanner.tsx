import Link from 'next/link'
import { Phone, ChevronRight, Sparkles } from 'lucide-react'

interface Props { heading?: string; subheading?: string }

export default function CTABanner({
  heading = 'Ready to Grow Your Business?',
  subheading = "Get a custom direct mail campaign quote. No commitment, no minimum order. Show us a written competitor quote for the same specs and we'll beat it.",
}: Props) {
  return (
    <section className="py-20 px-6 lg:px-8 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0d1f0d 0%, #1a1040 40%, #2d1060 70%, #1a0a0a 100%)' }}>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full blur-3xl opacity-25" style={{ background: 'radial-gradient(circle, #7dc242, transparent)' }} />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full blur-3xl opacity-20" style={{ background: 'radial-gradient(circle, #9333ea, transparent)' }} />
        <div className="absolute top-1/2 right-1/4 w-64 h-64 rounded-full blur-3xl opacity-15" style={{ background: 'radial-gradient(circle, #ea580c, transparent)' }} />
      </div>

      <div className="max-w-4xl mx-auto text-center relative">
        <div className="inline-flex items-center gap-2 text-xs font-bold px-4 py-2 rounded-full mb-6 border border-white/10" style={{ background: 'rgba(122,194,66,0.12)', color: '#a8e063' }}>
          <Sparkles className="w-3.5 h-3.5" />
          Price Beat Guarantee
        </div>

        <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-5 leading-tight">{heading}</h2>

        <p className="text-white/55 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">{subheading}</p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/contact"
            className="flex items-center gap-2 text-white font-bold px-8 py-4 rounded-2xl transition-all duration-200 text-base hover:-translate-y-0.5 w-full sm:w-auto justify-center"
            style={{ background: 'linear-gradient(135deg, #3a8a2d, #7dc242)', boxShadow: '0 8px 30px rgba(122,194,66,0.25)' }}
          >
            Get My Free Quote <ChevronRight className="w-5 h-5" />
          </Link>
          <a
            href="tel:+18886016556"
            className="flex items-center gap-2 border-2 border-white/20 hover:border-white/40 text-white font-bold px-8 py-4 rounded-2xl transition-all duration-200 text-base hover:bg-white/10 w-full sm:w-auto justify-center"
          >
            <Phone className="w-5 h-5" /> Call (888) 601-6556
          </a>
        </div>

        <p className="text-white/25 text-sm mt-8">No contracts · No minimums · Quote back the same business day</p>
      </div>
    </section>
  )
}
