'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { CheckCircle2, Loader2 } from 'lucide-react'

const services = [
  'Postcard Campaign',
  'Personalized Letters',
  'Handwritten Envelopes',
  'Targeted Mailing List',
  'Premium Printing Only',
  'Full-Service Campaign',
  'Not Sure — Need Guidance',
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

const schema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  businessName: z.string().min(1, 'Business name is required'),
  industry: z.string().min(1, 'Industry is required'),
  phone: z.string().min(7, 'Enter a valid phone number'),
  email: z.string().email('Enter a valid email address'),
  address: z.string().min(5, 'Full address is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  zip: z.string().min(5, 'ZIP code is required'),
  services: z.array(z.string()).min(1, 'Select at least one service'),
  budget: z.string().optional(),
  message: z.string().optional(),
})

type FormData = z.infer<typeof schema>

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { services: [] },
  })

  const selectedServices = watch('services') ?? []

  const toggleService = (service: string) => {
    const current = selectedServices
    if (current.includes(service)) {
      setValue('services', current.filter((s) => s !== service), { shouldValidate: true })
    } else {
      setValue('services', [...current, service], { shouldValidate: true })
    }
  }

  const onSubmit = async (_data: FormData) => {
    setIsLoading(true)
    await new Promise((r) => setTimeout(r, 1500))
    setIsLoading(false)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-5">
          <CheckCircle2 className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-2xl font-black text-gray-900 mb-3">Quote Request Received!</h3>
        <p className="text-gray-500 leading-relaxed max-w-md mx-auto mb-6">
          Thanks for reaching out. A direct mail expert will review your request and be in touch within a few hours with a custom quote.
        </p>
        <a
          href="tel:8886016556"
          className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-semibold text-sm transition-colors"
        >
          Need it faster? Call (888) 601-6556
        </a>
      </div>
    )
  }

  const inputClass = (hasError: boolean) =>
    `w-full border-2 ${hasError ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-green-500'} rounded-xl px-4 py-3 text-sm outline-none transition-colors placeholder-gray-400`

  const labelClass = 'block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2'
  const errorClass = 'text-xs text-red-500 mt-1'

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
      {/* Name */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>First Name *</label>
          <input {...register('firstName')} placeholder="Jane" className={inputClass(!!errors.firstName)} />
          {errors.firstName && <p className={errorClass}>{errors.firstName.message}</p>}
        </div>
        <div>
          <label className={labelClass}>Last Name *</label>
          <input {...register('lastName')} placeholder="Smith" className={inputClass(!!errors.lastName)} />
          {errors.lastName && <p className={errorClass}>{errors.lastName.message}</p>}
        </div>
      </div>

      {/* Business */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Business Name *</label>
          <input {...register('businessName')} placeholder="Acme Roofing LLC" className={inputClass(!!errors.businessName)} />
          {errors.businessName && <p className={errorClass}>{errors.businessName.message}</p>}
        </div>
        <div>
          <label className={labelClass}>Industry *</label>
          <input {...register('industry')} placeholder="e.g. Roofing, Dental, Real Estate" className={inputClass(!!errors.industry)} />
          {errors.industry && <p className={errorClass}>{errors.industry.message}</p>}
        </div>
      </div>

      {/* Contact */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Phone *</label>
          <input {...register('phone')} type="tel" placeholder="(555) 123-4567" className={inputClass(!!errors.phone)} />
          {errors.phone && <p className={errorClass}>{errors.phone.message}</p>}
        </div>
        <div>
          <label className={labelClass}>Email *</label>
          <input {...register('email')} type="email" placeholder="you@company.com" className={inputClass(!!errors.email)} />
          {errors.email && <p className={errorClass}>{errors.email.message}</p>}
        </div>
      </div>

      {/* Address */}
      <div>
        <label className={labelClass}>Business Street Address *</label>
        <input {...register('address')} placeholder="123 Main Street, Suite 400" className={inputClass(!!errors.address)} />
        {errors.address && <p className={errorClass}>{errors.address.message}</p>}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="sm:col-span-1">
          <label className={labelClass}>City *</label>
          <input {...register('city')} placeholder="Miami" className={inputClass(!!errors.city)} />
          {errors.city && <p className={errorClass}>{errors.city.message}</p>}
        </div>
        <div>
          <label className={labelClass}>State *</label>
          <input {...register('state')} placeholder="FL" maxLength={2} className={inputClass(!!errors.state)} />
          {errors.state && <p className={errorClass}>{errors.state.message}</p>}
        </div>
        <div>
          <label className={labelClass}>ZIP Code *</label>
          <input {...register('zip')} placeholder="33101" className={inputClass(!!errors.zip)} />
          {errors.zip && <p className={errorClass}>{errors.zip.message}</p>}
        </div>
      </div>

      {/* Services */}
      <div>
        <label className={labelClass}>Services Interested In *</label>
        <div className="flex flex-wrap gap-2.5">
          {services.map((service) => {
            const active = selectedServices.includes(service)
            return (
              <button
                key={service}
                type="button"
                onClick={() => toggleService(service)}
                className={`px-4 py-2.5 rounded-xl text-xs font-semibold border-2 transition-all duration-200 ${
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
        {errors.services && <p className={errorClass}>{errors.services.message}</p>}
      </div>

      {/* Budget */}
      <div>
        <label className={labelClass}>Approximate Monthly Budget (Optional)</label>
        <select {...register('budget')} className={`${inputClass(false)} bg-white`}>
          <option value="">Select a budget range</option>
          {budgets.map((b) => (
            <option key={b} value={b}>{b}</option>
          ))}
        </select>
      </div>

      {/* Message */}
      <div>
        <label className={labelClass}>Additional Details (Optional)</label>
        <textarea
          {...register('message')}
          rows={4}
          placeholder="Tell us about your campaign goals, target area, any existing design assets, or questions you have..."
          className={`${inputClass(false)} resize-none`}
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 disabled:opacity-70 text-white font-bold py-4 rounded-xl transition-all duration-200 text-base shadow-xl shadow-green-500/20 hover:shadow-green-500/30 hover:-translate-y-0.5 disabled:translate-y-0"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Sending your request...
          </>
        ) : (
          'Send My Free Quote Request'
        )}
      </button>

      <p className="text-xs text-gray-400 text-center leading-relaxed">
        🔒 Your information is secure and will never be shared or sold. We'll only use it to prepare your custom quote.
      </p>
    </form>
  )
}
