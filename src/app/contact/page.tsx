import PageHero from '@/components/brand/PageHero'
import type { Metadata } from 'next'
import { Suspense } from 'react'
import ContactForm from '@/components/contact/ContactForm'
import { Phone, Mail, Clock, MapPin } from 'lucide-react'

export const metadata: Metadata = {
  alternates: { canonical: '/contact' },
  title: 'Get a Free Quote | Green Growth Marketing',
  description:
    'Contact Green Growth Marketing to discuss your audience, mailing format and campaign goals. Request a personalized direct mail quote.',
}

const contactInfo = [
  {
    icon: Phone,
    label: 'Phone',
    value: '(888) 601-6556',
    href: 'tel:+18886016556',
    color: 'text-ggm-forest',
    bg: 'bg-ggm-sage-surface',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'greengrowthmarketinginc@gmail.com',
    href: 'mailto:greengrowthmarketinginc@gmail.com',
    color: 'text-ggm-forest',
    bg: 'bg-ggm-sage-surface',
  },
  {
    icon: Clock,
    label: 'Campaign Support',
    value: 'Personal guidance for your mailing',
    href: null,
    color: 'text-ggm-forest',
    bg: 'bg-ggm-sage-surface',
  },
  {
    icon: MapPin,
    label: 'Service Area',
    value: 'All 50 United States',
    href: null,
    color: 'text-ggm-forest',
    bg: 'bg-ggm-sage-surface',
  },
]

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <PageHero eyebrow="Let us talk" title="Your next campaign starts with a conversation." description="Tell us about your business and mailing goals. We can help you explore the options and prepare a personalized quote." />

      {/* Content */}
      <section className="section-padding bg-ggm-ivory">
        <div className="container-max">
          <div className="grid lg:grid-cols-[1fr_2fr] gap-10 lg:gap-16 items-start">
            {/* Left: Contact info */}
            <div className="order-2 space-y-5 lg:order-1 lg:sticky lg:top-28">
              <div>
                <h2 className="text-2xl font-semibold mb-2" style={{ background: 'linear-gradient(135deg, #173D32, #547767)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Get in Touch</h2>
                <p className="text-ggm-muted text-sm leading-relaxed">
                  We respond fast. Reach us by phone, email, or just fill out the form. Whatever works best for you.
                </p>
              </div>

              <div className="space-y-4">
                {contactInfo.map(({ icon: Icon, label, value, href, color, bg }) => (
                  <div key={label} className="flex items-start gap-4 p-4 bg-ggm-paper rounded-2xl border border-ggm-line shadow-sm">
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

              <div className="bg-gradient-to-br from-ggm-forest to-ggm-forest rounded-2xl p-6 text-white">
                <div className="text-lg font-semibold mb-2">Have another quote?</div>
                <p className="text-ggm-sage-surface text-sm leading-relaxed">
                  Share a quote from another company. We would be happy to review the format,
                  quantity and mailing details to see if we can offer a better price.
                </p>
              </div>
            </div>

            {/* Right: Form */}
            <div id="quote-form" className="order-1 scroll-mt-6 lg:order-2 bg-ggm-paper rounded-3xl shadow-sm border border-ggm-line p-8 lg:p-10">
              <h2 className="text-xl font-semibold mb-1" style={{ background: 'linear-gradient(135deg, #173D32, #547767)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Request Your Free Quote</h2>
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
