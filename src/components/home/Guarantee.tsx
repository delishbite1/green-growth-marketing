import Link from 'next/link'
import { ShieldCheck, FileText, Scale, ChevronRight } from 'lucide-react'

const steps = [
  {
    icon: FileText,
    title: 'Send us the quote',
    body: 'Email or text us the written quote you already have. Any competitor, any format.',
    color: '#7dc242',
    bg: 'rgba(122,194,66,0.12)',
  },
  {
    icon: Scale,
    title: 'We match the specs',
    body: 'Same size, same quantity, same paper stock, same postage class. A fair comparison, not a trick.',
    color: '#c4b5fd',
    bg: 'rgba(196,181,253,0.12)',
  },
  {
    icon: ShieldCheck,
    title: 'We beat the price',
    body: 'Same budget means more pieces in more mailboxes. Same volume means you pay less.',
    color: '#fb923c',
    bg: 'rgba(251,146,60,0.12)',
  },
]

export default function Guarantee() {
  return (
    <section
      className="py-16 lg:py-20 px-6 lg:px-8"
      style={{ background: 'linear-gradient(135deg, #0d1b0d, #0d0d1f, #1a0a2e)' }}
    >
      <div className="max-w-7xl mx-auto">

        <div className="text-center max-w-2xl mx-auto mb-12">
          <div
            className="inline-flex items-center gap-2 text-xs font-bold px-4 py-2 rounded-full mb-5 border"
            style={{ background: 'rgba(122,194,66,0.12)', color: '#a8e063', borderColor: 'rgba(122,194,66,0.25)' }}
          >
            <ShieldCheck className="w-3.5 h-3.5" aria-hidden="true" />
            Our Guarantee
          </div>

          <h2 className="text-3xl md:text-4xl font-black text-white mb-4 leading-tight">
            We Beat Any Direct Mail Price.{' '}
            <span
              className="text-transparent bg-clip-text"
              style={{ backgroundImage: 'linear-gradient(90deg, #7dc242, #a8e063)' }}
            >
              Guaranteed.
            </span>
          </h2>

          <p className="text-white/60 text-lg leading-relaxed">
            Not a slogan. Show us a written competitor quote for the same job and we&rsquo;ll beat it.
            That&rsquo;s the whole guarantee.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
          {steps.map(({ icon: Icon, title, body, color, bg }) => (
            <div
              key={title}
              className="rounded-2xl p-6 border transition-all duration-300 hover:-translate-y-1"
              style={{ background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.08)' }}
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                style={{ background: bg }}
              >
                <Icon className="w-5 h-5" style={{ color }} aria-hidden="true" />
              </div>
              <h3 className="text-white font-bold mb-2">{title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{body}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/contact#quote-form"
            className="flex items-center justify-center gap-2 text-white font-bold px-8 py-4 rounded-xl text-base transition-all hover:-translate-y-0.5 w-full sm:w-auto"
            style={{
              background: 'linear-gradient(135deg, #2d7a1f, #4aac2e)',
              boxShadow: '0 10px 30px rgba(74,172,46,0.30)',
            }}
          >
            Beat My Current Price
            <ChevronRight className="w-5 h-5" aria-hidden="true" />
          </Link>
          <p className="text-white/40 text-sm text-center">
            No minimum order. No contract. No pressure.
          </p>
        </div>

      </div>
    </section>
  )
}
