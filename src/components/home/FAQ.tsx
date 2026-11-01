'use client'

import { useState } from 'react'
import { Plus, Minus } from 'lucide-react'
import { faqs } from '@/data/faqs'


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
              Can't find what you're looking for? Our team gets back to you the same business day.
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
