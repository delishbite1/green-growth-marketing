import type { Metadata } from 'next'
import { CheckCircle2, Users, Target, Heart, Zap } from 'lucide-react'
import CTABanner from '@/components/shared/CTABanner'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About Us | Green Growth Marketing',
  description:
    'Learn about Green Growth Marketing — a full-service direct mail company dedicated to helping businesses grow with postcards, personalized letters, and targeted mailing campaigns.',
}

const values = [
  {
    icon: Target,
    title: 'Results Over Everything',
    description: 'Every campaign we build is designed with one goal: getting you more customers. We measure success by your ROI, not by our output.',
    color: 'text-green-600',
    bg: 'bg-green-50',
  },
  {
    icon: Users,
    title: 'People-First Service',
    description: 'We\'re not a self-serve portal. A real human expert works with you from strategy to delivery, answering questions and guiding every step.',
    color: 'text-violet-600',
    bg: 'bg-violet-50',
  },
  {
    icon: Heart,
    title: 'Committed to Small Business',
    description: 'We believe every business, from the solo plumber to the regional franchise, deserves access to professional, affordable direct mail.',
    color: 'text-rose-600',
    bg: 'bg-rose-50',
  },
  {
    icon: Zap,
    title: 'Relentlessly Efficient',
    description: 'Our process is built for speed without sacrificing quality. We move fast so your campaign gets to market before your competition.',
    color: 'text-amber-600',
    bg: 'bg-amber-50',
  },
]

const promises = [
  { value: 'All 50', label: 'States we mail to' },
  { value: '80+', label: 'Industries we serve' },
  { value: 'No Minimum', label: 'Order 100 or a million' },
  { value: 'A to Z', label: 'A real person, not a portal' },
]

const differentiators = [
  'Guaranteed to beat any competitor\'s price',
  'No minimum order, no long-term contract',
  'Design, printing, mailing lists, and postage all included',
  'Real expert guidance, not a self-serve portal',
  'Fast turnaround with same-day quote response',
  'Precision demographic targeting in every campaign',
  'Serving all 50 states nationwide',
]

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-20 lg:py-28 px-6 lg:px-8 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0d1f0d 0%, #1a4a1a 25%, #1a1040 55%, #2d1060 80%, #0d0d1f 100%)' }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-green-500/10 blur-3xl translate-x-1/3 -translate-y-1/3" />
          <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-violet-500/10 blur-3xl -translate-x-1/3 translate-y-1/3" />
        </div>
        <div className="max-w-4xl mx-auto text-center relative">
          <div className="inline-flex items-center gap-2 bg-green-500/15 border border-green-500/25 text-green-300 text-xs font-bold px-4 py-2 rounded-full mb-6">
            Our Story
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-5 leading-tight">
            Built to Help Businesses{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-300">
              Actually Grow
            </span>
          </h1>
          <p className="text-gray-300 text-lg leading-relaxed max-w-2xl mx-auto">
            Green Growth Marketing was founded with a simple mission: give every business access to the kind of direct mail strategy that was once reserved for big brands with big budgets.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 text-xs font-bold px-4 py-2 rounded-full mb-6 border border-green-100">
                Who We Are
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-5 leading-tight">
                A Team That Knows Direct Mail Inside and Out
              </h2>
              <div className="space-y-4 text-gray-500 leading-relaxed text-base">
                <p>
                  We started Green Growth Marketing because we saw too many businesses getting burned by overpriced, underperforming direct mail campaigns, or avoiding direct mail entirely because it seemed too complicated and expensive.
                </p>
                <p>
                  We set out to change that. We built a streamlined, full-service operation that handles everything in-house: list building, creative design, premium printing, postage, and USPS delivery, so businesses of any size can access the power of direct mail without the headaches.
                </p>
                <p>
                  We mail anywhere in the USA and we know 80+ industries, so whether you&rsquo;re a solo owner testing your first neighborhood drop or you&rsquo;re planning a multi-state rollout, we can build it, print it, and get it in the mail.
                </p>
                <p>
                  And our promise is simple: show us a written competitor quote for the same specs and we&rsquo;ll beat it. Better service, a real person on the phone, and no contract locking you in.
                </p>
              </div>
            </div>

            {/* What makes us different */}
            <div className="bg-gray-50 rounded-3xl p-8">
              <h3 className="font-black text-gray-900 text-xl mb-6">What Sets Us Apart</h3>
              <ul className="space-y-3">
                {differentiators.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-gray-700">
                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-8 pt-6 border-t border-gray-200">
                <Link
                  href="/contact"
                  className="flex items-center justify-center w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3.5 rounded-xl transition-colors text-sm shadow-md"
                >
                  Get a Free Quote Today
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Promises */}
      <section className="py-16 px-6 lg:px-8 bg-gray-950">
        <div className="max-w-5xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {promises.map(({ value, label }) => (
            <div key={label}>
              <div className="text-2xl lg:text-3xl font-black text-green-400 mb-1">{value}</div>
              <div className="text-gray-400 text-sm font-medium">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 bg-violet-50 text-violet-700 text-xs font-bold px-4 py-2 rounded-full mb-4 border border-violet-100">
              Our Values
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
              What We Believe In
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map(({ icon: Icon, title, description, color, bg }) => (
              <div key={title} className="flex gap-5 p-7 rounded-2xl border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 bg-white">
                <div className={`w-12 h-12 rounded-xl ${bg} flex items-center justify-center flex-shrink-0`}>
                  <Icon className={`w-6 h-6 ${color}`} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  )
}
