import type { Metadata } from 'next'
import { Suspense } from 'react'
import ContactForm from '@/components/contact/ContactForm'
import { Phone, Mail, Clock, MapPin } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Get a Free Quote | Green Growth Marketing',
  description:
    'Contact Green Growth Marketing for a free direct mail quote. No commitment, no minimums. We\'ll respond within hours with a custom campaign proposal.',
}

const contactInfo = [
  {
    icon: Phone,
    label: 'Phone',
    value: '(888) 601-6556',
    href: 'tel:+18886016556',
    color: 'text-green-600',
    bg: 'bg-green-50',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'greengrowthmarketinginc@gmail.com',
    href: 'mailto:greengrowthmarketinginc@gmail.com',
    color: 'text-violet-600',
    bg: 'bg-violet-50',
  },
  {
    icon: Clock,
    label: 'Response Time',
    value: 'Within a few hours on business days',
    href: null,
    color: 'text-amber-600',
    bg: 'bg-amber-50',
  },
  {
    icon: MapPin,
    label: 'Service Area',
    value: 'All 50 United States',
    href: null,
    color: 'text-blue-600',
    bg: 'bg-blue-50',
  },
]

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-20 lg:py-24 px-6 lg:px-8 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0d1f0d 0%, #1a4a1a 25%, #1a1040 55%, #2d1060 80%, #0d0d1f 100%)' }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-green-500/10 blur-3xl translate-x-1/3 -translate-y-1/3" />
          <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-violet-500/10 blur-3xl -translate-x-1/3 translate-y-1/3" />
        </div>
        <div className="max-w-3xl mx-auto text-center relative">
          <div className="inline-flex items-center gap-2 bg-green-500/15 border border-green-500/25 text-green-300 text-xs font-bold px-4 py-2 rounded-full mb-6">
            Free Quote, No Commitment
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-5 leading-tight">
            Let's Grow Your Business{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-300">
              With Direct Mail
            </span>
          </h1>
          <p className="text-gray-300 text-lg leading-relaxed">
            Fill out the form below and a direct mail expert will reach out within hours with a custom campaign proposal.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding bg-gray-50">
        <div className="container-max">
          <div className="grid lg:grid-cols-[1fr_2fr] gap-10 lg:gap-16 items-start">
            {/* Left: Contact info */}
            <div className="space-y-5 lg:sticky lg:top-28">
              <div>
                <h2 className="text-2xl font-black mb-2" style={{ background: 'linear-gradient(90deg, #16a34a, #7c3aed)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Get in Touch</h2>
                <p className="text-gray-500 text-sm leading-relaxed">
                  We respond fast. Reach us by phone, email, or just fill out the form. Whatever works best for you.
                </p>
              </div>

              <div className="space-y-4">
                {contactInfo.map(({ icon: Icon, label, value, href, color, bg }) => (
                  <div key={label} className="flex items-start gap-4 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm">
                    <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center flex-shrink-0`}>
                      <Icon className={`w-5 h-5 ${color}`} />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-0.5">{label}</div>
                      {href ? (
                        <a href={href} className={`text-sm font-semibold ${color} hover:opacity-80 transition-opacity break-all`}>
                          {value}
                        </a>
                      ) : (
                        <div className="text-sm font-semibold text-gray-700">{value}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-gradient-to-br from-green-700 to-green-600 rounded-2xl p-6 text-white">
                <div className="text-lg font-black mb-2">Price Beat Guarantee</div>
                <p className="text-green-100 text-sm leading-relaxed">
                  Have a written quote from a competitor? Send it over. Same size, same quantity,
                  same paper, same postage class, and we&rsquo;ll beat it.
                </p>
              </div>
            </div>

            {/* Right: Form */}
            <div id="quote-form" className="scroll-mt-28 bg-white rounded-3xl shadow-sm border border-gray-100 p-8 lg:p-10">
              <h2 className="text-xl font-black mb-1" style={{ background: 'linear-gradient(90deg, #16a34a, #7c3aed)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Request Your Free Quote</h2>
              <p className="text-gray-400 text-sm mb-8">All fields marked * are required.</p>
              {/* Suspense is required: ContactForm reads ?industry= via
                  useSearchParams, which opts it out of static prerender. */}
              <Suspense fallback={<div className="py-12 text-center text-sm text-gray-400">Loading form…</div>}>
                <ContactForm />
              </Suspense>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
