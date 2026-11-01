'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2, AlertCircle, Gift } from 'lucide-react'
import { metaLeadSchema, type MetaLeadInput } from '@/lib/validation/meta-lead'
import { readAttribution, newEventId } from '@/lib/attribution'
import { trackEvent } from '@/lib/meta/pixel'
import { business } from '@/config/business'

/**
 * Five fields and a consent box. That is the whole form, on purpose.
 *
 * Everything a rep needs beyond this comes out of the phone call, and asking
 * for it here costs completions on traffic that was paid for by the click.
 */

const inputBase =
  'w-full rounded-xl border-2 px-4 py-3.5 text-base outline-none transition-colors placeholder-gray-400 bg-white'

/**
 * 16px minimum on inputs, not 14px. Anything smaller makes iOS Safari zoom the
 * whole page in when the field is focused, and the visitor then has to pinch
 * back out to see the rest of the form. On a page where most traffic is a
 * phone, that alone costs completions.
 */
function inputClass(hasError: boolean): string {
  return `${inputBase} ${
    hasError ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-green-500'
  }`
}

const labelClass = 'block text-sm font-bold text-gray-800 mb-2'
const errorClass = 'text-xs text-red-500 mt-1.5 font-medium'

export default function OfferForm() {
  const router = useRouter()
  const [sendError, setSendError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<MetaLeadInput>({ resolver: zodResolver(metaLeadSchema) })

  const onSubmit = async (data: MetaLeadInput) => {
    setSendError(null)

    // One id, generated here, used by both reports of this conversion. The
    // browser fires Lead with it below and the server sends the same id to the
    // Conversions API, which is what lets Meta see one event instead of two.
    const eventId = newEventId()

    try {
      const res = await fetch('/api/meta-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, eventId, attribution: readAttribution() }),
      })

      if (!res.ok) {
        const payload = await res.json().catch(() => null)
        setSendError(payload?.error ?? `Something went wrong. Please call us at ${business.phone}.`)
        return
      }

      const payload = await res.json().catch(() => null)

      /**
       * Lead fires HERE and nowhere else: after the server said the row is
       * stored, not on the button press.
       *
       * Firing on click is the common mistake and it quietly ruins the
       * campaign. Meta optimises delivery toward whoever generates the event,
       * so a Lead on click teaches it to find people who tap buttons and
       * abandon forms. Ads Manager then reports a cheap, successful campaign
       * while nobody calls.
       *
       * A repeat submission from a business already in the pipeline is not a
       * new conversion either, so it is skipped. Counting it would bill the
       * campaign for a lead the sales team already has.
       */
      if (!payload?.duplicate) {
        trackEvent('Lead', eventId, {
          content_name: '100 Free Personalized Letters',
          content_category: 'Direct Mail',
        })
      }

      router.push('/free-letters/thanks')
    } catch {
      setSendError(
        `We could not reach our server. Please check your connection, or call us at ${business.phone}.`,
      )
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      {/* Honeypot. Hidden from people, irresistible to bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="website">Website</label>
        <input id="website" type="text" tabIndex={-1} autoComplete="off" {...register('website')} />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="firstName" className={labelClass}>First name</label>
          <input
            id="firstName"
            autoComplete="given-name"
            {...register('firstName')}
            aria-invalid={!!errors.firstName}
            className={inputClass(!!errors.firstName)}
          />
          {errors.firstName && <p role="alert" className={errorClass}>{errors.firstName.message}</p>}
        </div>
        <div>
          <label htmlFor="lastName" className={labelClass}>Last name</label>
          <input
            id="lastName"
            autoComplete="family-name"
            {...register('lastName')}
            aria-invalid={!!errors.lastName}
            className={inputClass(!!errors.lastName)}
          />
          {errors.lastName && <p role="alert" className={errorClass}>{errors.lastName.message}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="businessName" className={labelClass}>Business name</label>
        <input
          id="businessName"
          autoComplete="organization"
          {...register('businessName')}
          aria-invalid={!!errors.businessName}
          className={inputClass(!!errors.businessName)}
        />
        {errors.businessName && <p role="alert" className={errorClass}>{errors.businessName.message}</p>}
      </div>

      <div>
        <label htmlFor="email" className={labelClass}>Email address</label>
        <input
          id="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          {...register('email')}
          aria-invalid={!!errors.email}
          className={inputClass(!!errors.email)}
        />
        {errors.email && <p role="alert" className={errorClass}>{errors.email.message}</p>}
      </div>

      <div>
        <label htmlFor="phone" className={labelClass}>Phone number</label>
        <input
          id="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          {...register('phone')}
          aria-invalid={!!errors.phone}
          className={inputClass(!!errors.phone)}
        />
        {errors.phone && <p role="alert" className={errorClass}>{errors.phone.message}</p>}
      </div>

      {/*
        This is NOT their office postcode, and the whole field is designed to
        stop them answering as if it were.

        Asked plainly for "ZIP code", a business owner types where they are
        sitting. Then a rep builds a mailing for the wrong neighbourhood and
        nobody finds out until the letters have landed. So the field gets its
        own row rather than sharing one with the phone number, the label is a
        question rather than a noun, and the answer is restated underneath in
        plain words. Do not compress this back into a tidy half width box.

        autoComplete is off on purpose. postal-code would let the browser
        helpfully fill in their home address, which is exactly the wrong answer.
      */}
      <div className="rounded-xl border-2 border-brand-green-pale bg-brand-green-pale/40 p-4">
        <label htmlFor="targetZip" className={labelClass}>
          Which ZIP code should we mail your 100 letters to?
        </label>
        <input
          id="targetZip"
          inputMode="numeric"
          autoComplete="off"
          maxLength={10}
          placeholder="78205"
          {...register('targetZip')}
          aria-invalid={!!errors.targetZip}
          aria-describedby="targetZip-help"
          className={`${inputClass(!!errors.targetZip)} max-w-[10rem]`}
        />
        {errors.targetZip && (
          <p role="alert" className={errorClass}>{errors.targetZip.message}</p>
        )}
        <p id="targetZip-help" className="mt-2 text-xs leading-relaxed text-gray-600">
          The area you want to reach, not your own address. Pick the neighborhood whose homeowners
          you most want as customers. We will confirm it with you on the call, and you can change it
          then.
        </p>
      </div>

      {sendError && (
        <div role="alert" className="flex items-start gap-3 rounded-xl border-2 border-red-200 bg-red-50 p-4">
          <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-500" aria-hidden />
          <div>
            <p className="mb-0.5 text-sm font-bold text-red-700">We could not submit your request</p>
            <p className="text-xs leading-relaxed text-red-600">{sendError}</p>
          </div>
        </div>
      )}

      {/*
        The consent disclosure. This replaced a tick box, and it must sit
        IMMEDIATELY above the button and stay visible.

        With no tick box, pressing the button is the affirmative act that gives
        consent, and that only holds if the person can see what they are
        agreeing to at the moment they press it. Moving this into a footer, a
        link, or below the button would leave the stored consent_at stamp
        claiming an agreement that nobody was ever shown.
      */}
      <p className="text-center text-xs leading-relaxed text-gray-500">
        By pressing the button below you agree that Green Growth Marketing may contact you at the
        phone number and email above, including by autodialed or prerecorded calls and text
        messages, about this offer. Consent is not a condition of purchase. Message and data rates
        may apply.
      </p>

      <button
        type="submit"
        disabled={isSubmitting}
        className="flex w-full items-center justify-center gap-2.5 rounded-xl px-6 py-5 text-lg font-black text-white shadow-xl transition-all hover:-translate-y-0.5 disabled:translate-y-0 disabled:opacity-70"
        style={{
          background: 'linear-gradient(135deg, #2d7a1f, #4aac2e)',
          boxShadow: '0 10px 30px rgba(74,172,46,0.35)',
        }}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" aria-hidden />
            Sending your request...
          </>
        ) : (
          <>
            <Gift className="h-5 w-5" aria-hidden />
            CLAIM MY FREE LETTERS
          </>
        )}
      </button>

      {/*
        Directly under the button, not in a footer. Somebody who has just handed
        a stranger their phone number is deciding right now whether this was a
        mistake, and reassurance three scrolls away is reassurance nobody reads.
        Cut to one paragraph from two when the form was shortened.
      */}
      <p className="text-center text-xs leading-relaxed text-gray-400">
        No contract and no payment. We will call to confirm everything before anything is printed or
        mailed. Offer available to qualifying businesses, limit one per business. We never sell or
        share your information. See our{' '}
        <a href="/privacy" className="underline hover:text-gray-600">Privacy Policy</a>.
      </p>
    </form>
  )
}
