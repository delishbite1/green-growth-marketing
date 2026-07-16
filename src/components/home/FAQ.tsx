'use client'

import { useState } from 'react'
import { Plus, Minus } from 'lucide-react'

const faqs = [
  {
    question: 'How does the direct mail process work?',
    answer:
      "It's simple. You tell us your goals, budget, and target audience. We handle the rest: design, list building, printing, addressing, and mailing. You get a proof to approve before anything goes to print, and we give you a tracking timeline so you know exactly when your mail hits.",
  },
  {
    question: 'Do I need a minimum order quantity?',
    answer:
      'No minimum. We work with orders of any size, from 100 pieces for a neighborhood test to millions for a national rollout. Pricing scales with volume, so larger campaigns get even better rates.',
  },
  {
    question: 'How long does it take from quote to delivery?',
    answer:
      "Quotes come back within a few hours. Once you approve the design and give the go-ahead, standard production is 5–7 business days plus USPS transit time (typically 3–5 days). We also offer rush production for time-sensitive campaigns.",
  },
  {
    question: "Can you help with design if I don't have artwork?",
    answer:
      "Absolutely. Our design team creates high-converting direct mail pieces from scratch. We just need your logo, brand colors, offer, and target audience. If you have your own design, we can print from your files too.",
  },
  {
    question: "I don't have a mailing list. Can you build one for me?",
    answer:
      "Yes, and it's included. We build precision-targeted lists using filters like ZIP code, income, home value, age, business type, and buying behavior, so your mail reaches the people most likely to actually respond.",
  },
  {
    question: "How does your price beat guarantee work?",
    answer:
      "Get a quote from any competitor for the same specs (size, quantity, paper stock, postage class) and show it to us. We'll beat it. If we can't, we'll tell you why and do everything we can to get as close as possible. We're confident in our pricing.",
  },
  {
    question: 'Do you handle postage and USPS mailing?',
    answer:
      "Everything. We sort your mail, prep it for USPS specifications, apply postage, and drop it at a USPS facility. You don't touch a single piece. Your campaign goes from our facility directly to your customers' mailboxes.",
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="section-padding" style={{ background: 'linear-gradient(135deg, #fafffe 0%, #faf5ff 50%, #fff7ed 100%)' }}>
      <div className="container-max">
        <div className="grid lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20 items-start">
          {/* Left: Header */}
          <div className="lg:sticky lg:top-28">
            <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 text-xs font-bold px-4 py-2 rounded-full mb-4 border border-green-100">
              FAQ
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4 leading-tight">
              Questions? We've Got Answers.
            </h2>
            <p className="text-gray-500 text-base leading-relaxed mb-6">
              Can't find what you're looking for? Our team responds within hours.
            </p>
            <a
              href="tel:+18886016556"
              className="inline-flex items-center gap-2 bg-brand-green hover:bg-brand-green-dark text-white font-bold px-6 py-3 rounded-xl transition-all duration-200 text-sm shadow-md hover:shadow-lg hover:-translate-y-0.5"
            >
              Call Us Now
            </a>
          </div>

          {/* Right: Accordion */}
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  openIndex === i
                    ? 'border-green-200 bg-white shadow-md'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 p-6 text-left"
                  aria-expanded={openIndex === i}
                >
                  <span className={`font-semibold text-sm leading-snug ${openIndex === i ? 'text-green-700' : 'text-gray-900'}`}>
                    {faq.question}
                  </span>
                  <div className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-colors ${
                    openIndex === i ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-500'
                  }`}>
                    {openIndex === i ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openIndex === i ? 'max-h-60' : 'max-h-0'
                  }`}
                >
                  <p className="px-6 pb-6 text-sm text-gray-500 leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
