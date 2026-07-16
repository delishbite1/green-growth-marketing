'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CheckCircle2, Loader2, AlertCircle } from 'lucide-react'
import { quoteSchema, type QuoteInput } from '@/lib/validation/lead'

const services = [
  'Postcard Campaign',
  'Personalized Letters',
  'Handwritten Envelopes',
  'Targeted Mailing List',
  'Premium Printing Only',
  'Full-Service Campaign',
  'Not Sure, Need Guidance',
]

const budgets = [
  'Under $500',
  '$500 – $1,000',
  '$1,000 – $2,500',
  '$2,500 – $5,000',
  '$5,000 – $10,000',
  '$10,000+',
  'Not sure yet',
]

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false)
  const [sendError, setSendError] = useState<string | null>(null)

  // Someone who clicked "Dental" on the Industries page arrives with
  // ?industry=Dental. Don't make them tell us twice. Capped because it lands
  // in an input, and anything from a URL is untrusted.
  const searchParams = useSearchParams()
  const prefilledIndustry = (searchParams.get('industry') ?? '').slice(0, 120)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<QuoteInput>({
    resolver: zodResolver(quoteSchema),
    defaultValues: { services: [], industry: prefilledIndustry },
  })

  const selectedServices = watch('services') ?? []

  const toggleService = (service: string) => {
    const current = selectedServices
    setValue(
      'services',
      current.includes(service) ? current.filter((s) => s !== service) : [...current, service],
      { shouldValidate: true },
    )
  }

  const onSubmit = async (data: QuoteInput) => {
    setSendError(null)
    try {
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, source: 'quote' }),
      })

      if (!res.ok) {
        const payload = await res.json().catch(() => null)
        setSendError(payload?.error ?? 'Something went wrong. Please call us at (888) 601-6556.')
        return
      }

      // Only now is it true.
      setSubmitted(true)
    } catch {
      setSendError(
        'We could not reach our server. Please check your connection, or call us at (888) 601-6556.',
      )
    }
  }

  if (submitted) {
    return (
      <div className="text-center py-12" role="status" aria-live="polite">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-5">
          <CheckCircle2 className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-2xl font-black text-gray-900 mb-3">Quote Request Received!</h3>
        <p className="text-gray-500 leading-relaxed max-w-md mx-auto mb-6">
          Thanks for reaching out. A direct mail expert will review your request and be in touch
          with a custom quote.
        </p>
        <a
          href="tel:+18886016556"
          className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-semibold text-sm transition-colors"
        >
          Need it faster? Call (888) 601-6556
        </a>
      </div>
    )
  }

  const inputClass = (hasError: boolean) =>
    `w-full border-2 ${
      hasError ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-green-500'
    } rounded-xl px-4 py-3 text-sm outline-none transition-colors placeholder-gray-400`

  const labelClass = 'block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2'
  const errorClass = 'text-xs text-red-500 mt-1'

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
      {/* Honeypot: hidden from people, irresistible to bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px] w-px h-px overflow-hidden">
        <label htmlFor="website">Website</label>
        <input id="website" type="text" tabIndex={-1} autoComplete="off" {...register('website')} />
      </div>

      {/* Name */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="firstName" className={labelClass}>First Name *</label>
          <input
            id="firstName"
            {...register('firstName')}
            placeholder="Jane"
            aria-invalid={!!errors.firstName}
            aria-describedby={errors.firstName ? 'firstName-error' : undefined}
            className={inputClass(!!errors.firstName)}
          />
          {errors.firstName && <p id="firstName-error" role="alert" className={errorClass}>{errors.firstName.message}</p>}
        </div>
        <div>
          <label htmlFor="lastName" className={labelClass}>Last Name *</label>
          <input
            id="lastName"
            {...register('lastName')}
            placeholder="Smith"
            aria-invalid={!!errors.lastName}
            aria-describedby={errors.lastName ? 'lastName-error' : undefined}
            className={inputClass(!!errors.lastName)}
          />
          {errors.lastName && <p id="lastName-error" role="alert" className={errorClass}>{errors.lastName.message}</p>}
        </div>
      </div>

      {/* Business */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="businessName" className={labelClass}>Business Name *</label>
          <input
            id="businessName"
            {...register('businessName')}
            placeholder="Acme Roofing LLC"
            aria-invalid={!!errors.businessName}
            aria-describedby={errors.businessName ? 'businessName-error' : undefined}
            className={inputClass(!!errors.businessName)}
          />
          {errors.businessName && <p id="businessName-error" role="alert" className={errorClass}>{errors.businessName.message}</p>}
        </div>
        <div>
          <label htmlFor="industry" className={labelClass}>Industry *</label>
          <input
            id="industry"
            {...register('industry')}
            placeholder="e.g. Roofing, Dental, Real Estate"
            aria-invalid={!!errors.industry}
            aria-describedby={errors.industry ? 'industry-error' : undefined}
            className={inputClass(!!errors.industry)}
          />
          {errors.industry && <p id="industry-error" role="alert" className={errorClass}>{errors.industry.message}</p>}
        </div>
      </div>

      {/* Contact */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="phone" className={labelClass}>Phone *</label>
          <input
            id="phone"
            type="tel"
            {...register('phone')}
            placeholder="(555) 123-4567"
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? 'phone-error' : undefined}
            className={inputClass(!!errors.phone)}
          />
          {errors.phone && <p id="phone-error" role="alert" className={errorClass}>{errors.phone.message}</p>}
        </div>
        <div>
          <label htmlFor="email" className={labelClass}>Email *</label>
          <input
            id="email"
            type="email"
            {...register('email')}
            placeholder="you@company.com"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-error' : undefined}
            className={inputClass(!!errors.email)}
          />
          {errors.email && <p id="email-error" role="alert" className={errorClass}>{errors.email.message}</p>}
        </div>
      </div>

      {/* Address */}
      <div>
        <label htmlFor="address" className={labelClass}>Business Street Address *</label>
        <input
          id="address"
          {...register('address')}
          placeholder="123 Main Street, Suite 400"
          aria-invalid={!!errors.address}
          aria-describedby={errors.address ? 'address-error' : undefined}
          className={inputClass(!!errors.address)}
        />
        {errors.address && <p id="address-error" role="alert" className={errorClass}>{errors.address.message}</p>}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="sm:col-span-1">
          <label htmlFor="city" className={labelClass}>City *</label>
          <input
            id="city"
            {...register('city')}
            placeholder="Miami"
            aria-invalid={!!errors.city}
            aria-describedby={errors.city ? 'city-error' : undefined}
            className={inputClass(!!errors.city)}
          />
          {errors.city && <p id="city-error" role="alert" className={errorClass}>{errors.city.message}</p>}
        </div>
        <div>
          <label htmlFor="state" className={labelClass}>State *</label>
          <input
            id="state"
            {...register('state')}
            placeholder="FL"
            maxLength={2}
            aria-invalid={!!errors.state}
            aria-describedby={errors.state ? 'state-error' : undefined}
            className={inputClass(!!errors.state)}
          />
          {errors.state && <p id="state-error" role="alert" className={errorClass}>{errors.state.message}</p>}
        </div>
        <div>
          <label htmlFor="zip" className={labelClass}>ZIP Code *</label>
          <input
            id="zip"
            {...register('zip')}
            placeholder="33101"
            aria-invalid={!!errors.zip}
            aria-describedby={errors.zip ? 'zip-error' : undefined}
            className={inputClass(!!errors.zip)}
          />
          {errors.zip && <p id="zip-error" role="alert" className={errorClass}>{errors.zip.message}</p>}
        </div>
      </div>

      {/* Services */}
      <fieldset>
        <legend className={labelClass}>Services Interested In *</legend>
        <div className="flex flex-wrap gap-2.5">
          {services.map((service) => {
            const active = selectedServices.includes(service)
            return (
              <button
                key={service}
                type="button"
                onClick={() => toggleService(service)}
                aria-pressed={active}
                className={`px-4 py-2.5 rounded-xl text-xs font-semibold border-2 transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 ${
                  active
                    ? 'bg-green-600 text-white border-green-600 shadow-md'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-green-300 hover:text-green-700'
                }`}
              >
                {service}
              </button>
            )
          })}
        </div>
        {errors.services && <p role="alert" className={errorClass}>{errors.services.message}</p>}
      </fieldset>

      {/* Budget */}
      <div>
        <label htmlFor="budget" className={labelClass}>Approximate Monthly Budget (Optional)</label>
        <select id="budget" {...register('budget')} className={`${inputClass(false)} bg-white`}>
          <option value="">Select a budget range</option>
          {budgets.map((b) => (
            <option key={b} value={b}>{b}</option>
          ))}
        </select>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className={labelClass}>Additional Details (Optional)</label>
        <textarea
          id="message"
          {...register('message')}
          rows={4}
          placeholder="Tell us about your campaign goals, target area, any existing design assets, or questions you have..."
          className={`${inputClass(false)} resize-none`}
        />
      </div>

      {/* Consent — TCPA. Required, unchecked by default. */}
      <div>
        <label htmlFor="consent" className="flex items-start gap-3 cursor-pointer">
          <input
            id="consent"
            type="checkbox"
            {...register('consent')}
            aria-invalid={!!errors.consent}
            aria-describedby={errors.consent ? 'consent-error' : undefined}
            className="mt-0.5 w-5 h-5 flex-shrink-0 rounded border-2 border-gray-300 text-green-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 cursor-pointer"
          />
          <span className="text-xs text-gray-500 leading-relaxed">
            I agree that Green Growth Marketing may contact me at the phone number and email I
            provided, including by autodialed or prerecorded calls and text messages, about my
            quote request. Consent is not a condition of purchase. Message and data rates may apply.
          </span>
        </label>
        {errors.consent && <p id="consent-error" role="alert" className={errorClass}>{errors.consent.message}</p>}
      </div>

      {/* Send failure */}
      {sendError && (
        <div
          role="alert"
          className="flex items-start gap-3 p-4 rounded-xl border-2 border-red-200 bg-red-50"
        >
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
          <div>
            <p className="text-sm font-bold text-red-700 mb-0.5">We could not send your request</p>
            <p className="text-xs text-red-600 leading-relaxed">{sendError}</p>
          </div>
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 disabled:opacity-70 text-white font-bold py-4 rounded-xl transition-colors duration-200 text-base shadow-xl shadow-green-500/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" />
            Sending your request...
          </>
        ) : (
          'Send My Free Quote Request'
        )}
      </button>

      <p className="text-xs text-gray-500 text-center leading-relaxed">
        🔒 We will never share or sell your information. We use it to prepare your quote and to
        contact you about it. See our{' '}
        <a href="/privacy" className="underline hover:text-gray-700">Privacy Policy</a>.
      </p>
    </form>
  )
}
