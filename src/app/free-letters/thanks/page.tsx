import type { Metadata } from 'next'
import Image from 'next/image'
import { Phone, Globe, PartyPopper } from 'lucide-react'
import { business } from '@/config/business'

/**
 * Where a claim lands after it succeeds.
 *
 * A separate route rather than swapping the form out for a success message,
 * for two reasons. It gives the campaign a real thank you URL to point a Meta
 * custom conversion at, which is the fallback measurement when the Pixel is
 * blocked. And a visitor who taps back does not land on a filled in form that
 * invites them to submit the same request twice.
 *
 * No Lead event fires here. The event fired once, in OfferForm, on the
 * server's confirmation. Firing it again on this page would count a refresh,
 * a bookmark or a back button as another conversion, and this URL is one
 * anybody can visit directly.
 */

export const metadata: Metadata = {
  title: 'Your request is in | Green Growth Marketing',
  robots: { index: false, follow: false },
}

const STEPS = [
  'We review your business and target market.',
  'We contact you to confirm the campaign details.',
  'We prepare your complimentary mailing.',
]

export default function ThanksPage() {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-100 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5">
          <Image
            src="/logo-transparent.png"
            alt="Green Growth Marketing"
            width={190}
            height={44}
            priority
            className="h-9 w-auto sm:h-10"
          />
        </div>
      </header>

      <section
        className="px-5 py-14 lg:py-20"
        style={{
          background:
            'radial-gradient(ellipse at 20% 20%, rgba(34,197,94,0.18) 0%, transparent 55%), radial-gradient(ellipse at 85% 30%, rgba(124,58,237,0.16) 0%, transparent 50%), linear-gradient(160deg, #edfaf2 0%, #f3eeff 100%)',
        }}
      >
        <div className="mx-auto max-w-2xl text-center">
          <span className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-lg">
            <PartyPopper className="h-8 w-8 text-brand-green" aria-hidden />
          </span>

          <h1 className="mb-4 text-3xl font-black leading-tight text-brand-dark sm:text-4xl">
            Your Request Is In! 🎉
          </h1>

          <p className="mx-auto mb-8 max-w-xl text-base leading-relaxed text-gray-600 sm:text-lg">
            Thank you for requesting your 100 free personalized letters from Green Growth Marketing.
            Our team will review your information and contact you to discuss your complimentary
            mailing and target audience.
          </p>

          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <a
              href={business.phoneHref}
              className="flex items-center justify-center gap-2.5 rounded-xl px-8 py-4 text-base font-black text-white shadow-lg transition-all hover:-translate-y-0.5"
              style={{
                background: 'linear-gradient(135deg, #2d7a1f, #4aac2e)',
                boxShadow: '0 8px 25px rgba(74,172,46,0.35)',
              }}
            >
              <Phone className="h-5 w-5" aria-hidden />
              CALL GREEN GROWTH
            </a>
            <a
              href="/"
              className="flex items-center justify-center gap-2.5 rounded-xl border-2 border-gray-200 bg-white px-8 py-4 text-base font-black text-gray-700 transition-colors hover:border-brand-lime hover:text-brand-forest"
            >
              <Globe className="h-5 w-5 text-brand-green" aria-hidden />
              VISIT OUR WEBSITE
            </a>
          </div>
        </div>
      </section>

      <section className="bg-white py-12 lg:py-16">
        <div className="mx-auto max-w-2xl px-5">
          <h2 className="mb-8 text-center text-2xl font-black text-brand-dark">
            What happens next
          </h2>

          <ol className="space-y-4">
            {STEPS.map((step, i) => (
              <li
                key={step}
                className="flex items-start gap-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
              >
                <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-brand-green text-sm font-black text-white">
                  {i + 1}
                </span>
                <span className="pt-1.5 text-base font-semibold text-gray-700">{step}</span>
              </li>
            ))}
          </ol>

          <p className="mt-8 text-center text-sm leading-relaxed text-gray-500">
            Most businesses hear from us within one business day. If you would rather not wait,
            call{' '}
            <a href={business.phoneHref} className="font-bold text-brand-green underline">
              {business.phone}
            </a>
            .
          </p>
        </div>
      </section>

      <footer className="border-t border-gray-100 bg-white py-8">
        <div className="mx-auto max-w-6xl px-5 text-center">
          <p className="text-xs text-gray-400">
            &copy; {new Date().getFullYear()} {business.legalName}. All rights reserved.
          </p>
          <p className="mt-2 text-xs text-gray-400">
            <a href="/privacy" className="underline hover:text-gray-600">Privacy Policy</a>
            {' · '}
            <a href="/terms" className="underline hover:text-gray-600">Terms of Service</a>
          </p>
        </div>
      </footer>
    </div>
  )
}
