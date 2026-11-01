import PageHero from '@/components/brand/PageHero'
import type { Metadata } from 'next'
import { CheckCircle2, Users, Target, Heart, Zap } from 'lucide-react'
import CTABanner from '@/components/shared/CTABanner'
import Link from 'next/link'

export const metadata: Metadata = {
  alternates: { canonical: '/about' },
  title: 'About Us | Green Growth Marketing',
  description:
    'Learn about Green Growth Marketing, a full service direct mail company dedicated to helping businesses grow with postcards, personalized letters, and targeted mailing campaigns.',
}

const values = [
  {
    icon: Target,
    title: 'Your Goals Come First',
    description: 'We plan your mailing around your audience, business goals and the message you want to share.',
    color: 'text-ggm-forest',
    bg: 'bg-ggm-sage-surface',
  },
  {
    icon: Users,
    title: 'People-First Service',
    description: 'We\'re not a self-serve portal. A real human expert works with you from strategy to delivery, answering questions and guiding every step.',
    color: 'text-ggm-forest',
    bg: 'bg-ggm-sage-surface',
  },
  {
    icon: Heart,
    title: 'Committed to Small Business',
    description: 'We believe every business, from the solo plumber to the regional franchise, deserves access to professional, affordable direct mail.',
    color: 'text-ggm-forest',
    bg: 'bg-ggm-sage-surface',
  },
  {
    icon: Zap,
    title: 'Relentlessly Efficient',
    description: 'Our process is built for speed without sacrificing quality. We coordinate the details so you can plan your mailing with clarity.',
    color: 'text-ggm-forest',
    bg: 'bg-ggm-sage-surface',
  },
]

const promises = [
  { value: 'All 50', label: 'States we mail to' },
  { value: '80+', label: 'Industries we serve' },
  { value: 'Flexible', label: 'Campaign planning' },
  { value: 'A to Z', label: 'A real person, not a portal' },
]

const differentiators = [
  'Share another quote and we will explore whether we can offer a better price',
  'Flexible planning with no long-term contract',
  'Design, printing, mailing lists, and postage all included',
  'Real expert guidance, not a self-serve portal',
  'Personal support as you plan your mailing',
  'Precision demographic targeting in every campaign',
  'Serving all 50 states nationwide',
]

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <PageHero eyebrow="Meet GGM" title="Thoughtful mail. Personal service." description="We bring design, printing and mailing together to help businesses connect with their audiences." />

      {/* Story */}
      <section className="section-padding bg-ggm-paper">
        <div className="container-max">
          <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-ggm-sage-surface text-ggm-forest text-xs font-bold px-4 py-2 rounded-full mb-6 border border-ggm-sage">
                Who We Are
              </div>
              <h2 className="text-3xl md:text-4xl font-semibold text-ggm-forest mb-5 leading-tight">
                A Team That Knows Direct Mail Inside and Out
              </h2>
              <div className="space-y-4 text-ggm-muted leading-relaxed text-base">
                <p>
                  We started Green Growth Marketing because we saw too many businesses getting burned by overpriced, underperforming direct mail campaigns, or avoiding direct mail entirely because it seemed too complicated and expensive.
                </p>
                <p>
                  We set out to change that. We built a streamlined, full-service operation that coordinates list building, creative design, printing, postage and USPS mailing, so businesses of any size can access the power of direct mail without the headaches.
                </p>
                <p>
                  We mail anywhere in the USA and we know 80+ industries, so whether you&rsquo;re a solo owner testing your first neighborhood drop or you&rsquo;re planning a multi-state rollout, we can build it, print it, and get it in the mail.
                </p>
                <p>
                  Have a quote from another company? We welcome the opportunity to review it and see if we can offer a better price for comparable specifications. Our focus is personal service and flexible planning for your business.
                </p>
              </div>
            </div>

            {/* What makes us different */}
            <div className="bg-ggm-ivory rounded-3xl p-8">
              <h3 className="font-semibold text-ggm-forest text-xl mb-6">What Sets Us Apart</h3>
              <ul className="space-y-3">
                {differentiators.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-gray-700">
                    <CheckCircle2 className="w-5 h-5 text-ggm-forest flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-8 pt-6 border-t border-ggm-line">
                <Link
                  href="/contact"
                  className="flex items-center justify-center w-full bg-ggm-forest hover:bg-ggm-forest text-white font-bold py-3.5 rounded-xl transition-colors text-sm shadow-md"
                >
                  Get a Free Quote Today
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Promises */}
      <section className="py-16 px-6 lg:px-8 bg-ggm-forest">
        <div className="max-w-5xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {promises.map(({ value, label }) => (
            <div key={label}>
              <div className="text-2xl lg:text-3xl font-semibold text-ggm-sage-surface mb-1">{value}</div>
              <div className="text-gray-400 text-sm font-medium">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-ggm-paper">
        <div className="container-max">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 bg-ggm-sage-surface text-ggm-forest text-xs font-bold px-4 py-2 rounded-full mb-4 border border-ggm-sage">
              Our Values
            </div>
            <h2 className="text-3xl md:text-4xl font-semibold text-ggm-forest mb-4">
              What We Believe In
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map(({ icon: Icon, title, description, color, bg }) => (
              <div key={title} className="flex gap-5 p-7 rounded-2xl border border-ggm-line hover:shadow-xl hover:-translate-y-1 transition-all duration-300 bg-ggm-paper">
                <div className={`w-12 h-12 rounded-xl ${bg} flex items-center justify-center flex-shrink-0`}>
                  <Icon className={`w-6 h-6 ${color}`} />
                </div>
                <div>
                  <h3 className="font-bold text-ggm-forest mb-2">{title}</h3>
                  <p className="text-ggm-muted text-sm leading-relaxed">{description}</p>
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
