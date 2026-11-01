'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { useForm, type FieldPath } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { postcardRequestSchema, INDUSTRIES, type PostcardRequestInput } from '@/lib/validation/postcard-request'
import { captureAttribution, readAttribution } from '@/lib/attribution'
import StateSelect from '@/components/landing/StateSelect'
import type { PostcardPackage } from '@/lib/postcards/packages'

/**
 * /postcards: REQUEST ONLY. A short first screen, then two steps.
 *
 *   Intro   headline, the sample postcard, quantity and estimated price,
 *           one action ("Request my campaign").
 *   Step 1  campaign and contact details. Area and artwork follow ups appear
 *           only once the visitor says which situation they are in.
 *   Step 2  review and "Send my campaign request".
 *
 * No payment of any kind happens here: no payment choice, no deposit, no
 * checkout, no payment instructions. Prices are estimates; our team reviews
 * each request and confirms the final price (including any applicable tax),
 * timing and payment arrangements before work begins. The payment version of
 * this page lives on the postcards-order-page branch for later.
 *
 * One idempotency key per visit and a synchronous lock stop a double tap
 * sending two requests; the database's unique key catches anything else.
 */

const INCLUDED = [
  'Professional postcard design',
  'Print ready artwork preparation',
  'Targeted homeowner mailing list',
  'Full color 9" × 11" printing',
  'Postage and mailing',
]

const ESTIMATE_NOTE =
  'Estimate, subject to review. Your final price, including any applicable sales tax, is confirmed with you before you commit.'

type View = 'intro' | 1 | 2

function dollars(cents: number): string {
  return (cents / 100).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: cents % 100 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  })
}
const perCard = (cents: number) => `$${(cents / 100).toFixed(2)}`

const STEP_FIELDS: Record<1 | 2, FieldPath<PostcardRequestInput>[]> = {
  1: ['businessName', 'contactName', 'email', 'phone', 'industry', 'businessWebsite', 'mailingList', 'targetCities', 'targetState', 'targetZips', 'artworkChoice', 'preferredMailingDate', 'instructions'],
  2: ['consent'],
}

const NEXT_STEPS = [
  { title: 'We get in touch', text: 'Our team contacts you to discuss your campaign and confirm your price.' },
  { title: 'We set up your campaign', text: 'If you decide to go ahead, we arrange how you share your details, images and artwork with us.' },
  { title: 'You approve before printing', text: 'You approve your final design and mailing audience before anything is printed or mailed.' },
]

const input =
  'block w-full min-h-[48px] rounded-md border border-[#CBC6B8] bg-white px-3.5 py-2.5 text-base text-[#1F2A24] scroll-mb-[120px] focus:border-[#173D32] focus:outline focus:outline-2 focus:outline-offset-1 focus:outline-[#B8995C] aria-[invalid=true]:border-[#A4321F]'

const focusRing = 'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B8995C]'

function Check({ size = 14, color = '#173D32' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m5 12 5 5L20 7" />
    </svg>
  )
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null
  return (
    <p id={id} role="alert" className="text-[13px] font-semibold text-[#A4321F]">
      {message}
    </p>
  )
}

function Field({
  id, label, optional, hint, error, children,
}: { id: string; label: string; optional?: boolean; hint?: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-semibold text-[#1F2A24]">
        {label}
        {optional && <span className="font-normal text-[#5F6A63]"> (optional)</span>}
      </label>
      {children}
      {hint && !error && <span id={`${id}-hint`} className="text-[13px] leading-snug text-[#5F6A63]">{hint}</span>}
      <FieldError id={`${id}-error`} message={error} />
    </div>
  )
}

/** A two way choice drawn as large tappable cards. */
function Choice<T extends string>({
  name, legend, value, options, onChange, error,
}: {
  name: string
  legend: string
  value: T | null
  options: { value: T; title: string; sub: string; badge?: string }[]
  onChange: (v: T) => void
  error?: string
}) {
  return (
    <fieldset className="flex flex-col gap-2" aria-describedby={error ? `${name}-error` : undefined}>
      <legend className="mb-2 text-sm font-semibold text-[#1F2A24]">{legend}</legend>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {options.map((o) => {
          const on = value === o.value
          return (
            <label
              key={o.value}
              className={`flex min-h-[56px] cursor-pointer items-start gap-3 rounded-md border px-3.5 py-3 focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-[#B8995C] ${on ? 'border-[#173D32] bg-[#EEF2EC]' : 'border-[#DDD8CC] bg-white'}`}
            >
              <input type="radio" name={name} value={o.value} checked={on} onChange={() => onChange(o.value)} className="mt-0.5 h-5 w-5 shrink-0 accent-[#173D32]" />
              <span className="flex flex-col gap-0.5">
                <span className="flex flex-wrap items-center gap-2 text-[15px] font-semibold text-[#1F2A24]">
                  {o.title}
                  {o.badge && <span className="rounded-sm bg-[#173D32] px-1.5 py-0.5 text-[10px] font-bold tracking-[1px] text-[#F6F3ED]">{o.badge}</span>}
                </span>
                <span className="text-[13px] leading-snug text-[#5F6A63]">{o.sub}</span>
              </span>
            </label>
          )
        })}
      </div>
      <FieldError id={`${name}-error`} message={error} />
    </fieldset>
  )
}

export default function PostcardRequest({
  packages, phone, phoneHref, email, testMode,
}: {
  packages: PostcardPackage[]
  phone: string
  phoneHref: string
  email: string
  testMode: boolean
}) {
  const defaultPkg = packages.find((p) => p.quantity === 5000) ?? packages[0]

  const {
    register, handleSubmit, watch, setValue, trigger, getValues, setError, setFocus,
    formState: { errors, isSubmitting },
  } = useForm<PostcardRequestInput>({
    resolver: zodResolver(postcardRequestSchema),
    mode: 'onTouched',
    shouldFocusError: true,
    defaultValues: {
      idempotencyKey: '00000000-0000-4000-8000-000000000000',
      quantity: defaultPkg.quantity,
      helpChooseArea: false,
      businessWebsite: '',
      targetCities: '',
      targetState: '',
      targetZips: '',
      preferredMailingDate: '',
      instructions: '',
      website: '',
    },
  })

  register('idempotencyKey')
  register('quantity')
  register('mailingList')
  register('artworkChoice')
  register('consent')

  const [view, setView] = useState<View>('intro')
  const [stepError, setStepError] = useState<string>()
  const [serverError, setServerError] = useState<string>()
  const [sending, setSending] = useState(false)
  const [reference, setReference] = useState<string | null>(null)
  const idemKey = useRef<string | null>(null)
  // A synchronous lock: React state updates too late to stop a fast double tap.
  const submitLock = useRef(false)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const topRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    captureAttribution()
  }, [])

  const quantity = watch('quantity')
  const mailingList = watch('mailingList')
  const artworkChoice = watch('artworkChoice')
  const helpChooseArea = watch('helpChooseArea')
  const v = watch()

  const selected = packages.find((p) => p.quantity === quantity) ?? defaultPkg
  const qty = selected.quantity.toLocaleString('en-US')

  function go(next: View) {
    setStepError(undefined)
    setView(next)
    requestAnimationFrame(() => {
      topRef.current?.scrollIntoView({ block: 'start' })
      headingRef.current?.focus({ preventScroll: true })
    })
  }

  async function next() {
    if (view === 'intro') return go(1)
    if (view === 2) return
    let ok = await trigger(STEP_FIELDS[1], { shouldFocus: true })
    // zod refinements wait for the whole object, so the "where to mail" rule
    // is checked here too. The server still enforces it.
    if (getValues('mailingList') === 'ggm_list' && !getValues('helpChooseArea')) {
      const missing: FieldPath<PostcardRequestInput>[] = []
      if (!getValues('targetCities')?.trim()) {
        setError('targetCities', { type: 'custom', message: 'Tell us the city or cities to mail' })
        missing.push('targetCities')
      }
      if (!getValues('targetState')) {
        setError('targetState', { type: 'custom', message: 'Choose a state' })
        missing.push('targetState')
      }
      if (missing.length) {
        if (ok) setFocus(missing[0])
        ok = false
      }
    }
    if (!ok) {
      setStepError('Please check the highlighted fields.')
      submitLock.current = false
      return
    }
    go(2)
  }

  function back() {
    if (view === 1) return go('intro')
    if (view === 2) return go(1)
  }

  const onSubmit = handleSubmit(
    async (data) => {
      if (sending) return
      setSending(true)
      setServerError(undefined)
      // One key per visit: a double tap or a retry is the same request.
      if (!idemKey.current) idemKey.current = crypto.randomUUID()
      try {
        const res = await fetch('/api/postcard-request', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...data, idempotencyKey: idemKey.current, attribution: readAttribution() }),
        })
        const json = await res.json().catch(() => ({}))
        if (!res.ok) {
          setServerError(json.error ?? `Something went wrong. Please call us at ${phone}.`)
          setSending(false)
          submitLock.current = false
          return
        }
        setReference(json.reference)
        requestAnimationFrame(() => topRef.current?.scrollIntoView({ block: 'start' }))
      } catch {
        setServerError(`We could not reach our server. Please try again or call us at ${phone}.`)
        setSending(false)
        submitLock.current = false
      }
    },
    () => {
      setStepError('Please check the highlighted fields.')
      submitLock.current = false
    },
  )

  const busy = isSubmitting || sending
  const stepTitle = view === 1 ? 'Campaign and contact details' : view === 2 ? 'Review your request' : ''

  return (
    <div className="min-h-screen bg-[#F6F3ED] pb-[calc(96px+env(safe-area-inset-bottom))] font-[family-name:var(--font-figtree)] text-[#1F2A24] [font-variant-numeric:lining-nums] lg:pb-0">
      <style>{`@media (max-width:1023px){html{scroll-padding-bottom:120px}}`}</style>

      {testMode && (
        <div className="bg-[#8A6A2B] px-4 py-1.5 text-center text-[12px] font-semibold text-white">
          Test environment. Requests go to the test database only.
        </div>
      )}

      <header className="border-b border-[#E2DDD0] bg-[#FBF9F4]">
        <div className="mx-auto flex h-14 max-w-[1120px] items-center justify-between gap-3 px-4 sm:px-8">
          <a href="/postcards" className={`flex flex-col items-start gap-0.5 no-underline ${focusRing}`} aria-label="Green Growth Marketing">
            <span className="font-[family-name:var(--font-playfair)] text-[24px] font-bold leading-none text-[#173D32]">GGM</span>
            <span className="text-[7.5px] font-semibold leading-none tracking-[2px] text-[#1F2A24]">GREEN GROWTH MARKETING</span>
          </a>
          <a href={phoneHref} className={`flex min-h-[44px] items-center text-[14px] font-semibold text-[#173D32] no-underline ${focusRing}`}>
            {phone}
          </a>
        </div>
      </header>

      <div ref={topRef} className="scroll-mt-0" />

      {reference ? (
        <Received reference={reference} qty={qty} estimate={dollars(selected.totalCents)} phone={phone} phoneHref={phoneHref} />
      ) : (
        <form
          id="pc-request"
          noValidate
          onSubmit={(e) => {
            e.preventDefault()
            if (submitLock.current) return
            submitLock.current = true
            void onSubmit(e)
          }}
        >
          <div aria-hidden="true" className="absolute left-[-10000px] top-auto h-px w-px overflow-hidden">
            <label htmlFor="pc-website">Leave this empty</label>
            <input id="pc-website" type="text" tabIndex={-1} autoComplete="off" {...register('website')} />
          </div>

          {view === 'intro' ? (
            <section className="mx-auto grid max-w-[1120px] gap-5 px-4 pb-8 pt-3.5 sm:px-8 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-12 lg:pb-14 lg:pt-12">
              <div className="flex flex-col gap-3 lg:gap-4">
                <h1
                  ref={headingRef}
                  tabIndex={-1}
                  className="font-[family-name:var(--font-playfair)] text-[26px] font-semibold leading-[1.1] text-[#173D32] outline-none sm:text-[34px] lg:text-[40px]"
                >
                  9&quot; × 11&quot; postcards, designed, printed and mailed for you
                </h1>
                <p className="text-[15px] leading-snug text-[#3E4A43] lg:text-[16px]">
                  One price includes design, a targeted homeowner list, printing and postage.
                </p>
                <figure className="flex flex-col items-center lg:hidden">
                  <div className="overflow-hidden rounded-[4px] border border-[#E2DDD0] bg-white">
                    <Image
                      src="/products/postcard-premium-card.jpg"
                      alt="Sample 9 by 11 inch postcard design for a roofing company"
                      width={1345}
                      height={858}
                      priority
                      sizes="(max-width: 1023px) 260px, 50vw"
                      className="block h-[152px] w-auto max-w-full"
                    />
                  </div>
                  <figcaption className="mt-1 text-[11px] text-[#5F6A63]">Sample design. The business details shown are not GGM&apos;s.</figcaption>
                </figure>

                <div id="pc-price-card" className="rounded-md border border-[#CBC6B8] bg-white p-4">
                  <label htmlFor="pc-qty" className="text-sm font-semibold text-[#1F2A24]">How many postcards?</label>
                  <div className="mt-2 flex items-center gap-3">
                    <select
                      id="pc-qty"
                      value={quantity}
                      onChange={(e) => setValue('quantity', Number(e.target.value))}
                      className={`${input} flex-1`}
                    >
                      {packages.map((p) => (
                        <option key={p.quantity} value={p.quantity}>{p.quantity.toLocaleString('en-US')} postcards</option>
                      ))}
                    </select>
                    <div className="shrink-0 text-right">
                      <div className="text-[11px] font-semibold tracking-[0.5px] text-[#5F6A63]">Estimated price</div>
                      <div className="text-[24px] font-bold leading-tight text-[#173D32]">{dollars(selected.totalCents)}</div>
                      <div className="text-[12px] text-[#5F6A63]">{perCard(selected.unitPriceCents)} each</div>
                    </div>
                  </div>
                  <p className="mt-3 border-t border-[#ECE8DE] pt-2.5 text-[13px] leading-snug text-[#3E4A43]">
                    Everything included. {ESTIMATE_NOTE}
                  </p>
                  <div className="mt-3 flex lg:justify-end">
                    <button
                      id="pc-start"
                      type="button"
                      onClick={() => go(1)}
                      className={`inline-flex min-h-[52px] w-full items-center justify-center rounded-md bg-[#173D32] px-7 text-[16px] font-semibold text-[#F6F3ED] hover:bg-[#10302A] lg:w-auto ${focusRing}`}
                    >
                      Request my campaign
                    </button>
                  </div>
                </div>
              </div>
              <figure className="hidden lg:block">
                <div className="w-full overflow-hidden rounded-md border border-[#E2DDD0] bg-white">
                  <Image src="/products/postcard-premium-card.jpg" alt="Sample 9 by 11 inch postcard design for a roofing company" width={1345} height={858} priority sizes="50vw" className="block h-auto w-full" />
                </div>
                <figcaption className="mt-2 text-[12px] text-[#5F6A63]">Sample design. The business details shown are not GGM&apos;s.</figcaption>
              </figure>
            </section>
          ) : (
            <section className="mx-auto grid max-w-[1120px] gap-6 px-4 pb-8 pt-4 sm:px-8 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start lg:pt-8">
              <div className="min-w-0">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <button type="button" onClick={back} className={`inline-flex min-h-[44px] items-center gap-1 text-[14px] font-semibold text-[#173D32] ${focusRing}`}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m15 18-6-6 6-6" /></svg>
                    Back
                  </button>
                  <span className="text-[13px] font-semibold text-[#5F6A63]">Step {view} of 2</span>
                </div>
                <ol className="mb-5 grid grid-cols-2 gap-1.5" aria-label="Request progress">
                  {['Details', 'Review'].map((label, i) => {
                    const n = i + 1
                    const state = n < (view as number) ? 'done' : n === view ? 'current' : 'todo'
                    return (
                      <li key={label} aria-current={state === 'current' ? 'step' : undefined} className="flex flex-col gap-1.5">
                        <span className={`h-1 rounded-full ${state === 'todo' ? 'bg-[#DDD8CC]' : 'bg-[#173D32]'}`} />
                        <span className={`text-[12px] ${state === 'current' ? 'font-bold text-[#173D32]' : 'text-[#5F6A63]'}`}>
                          {label}
                          <span className="sr-only">{state === 'done' ? ' (completed)' : state === 'current' ? ' (current step)' : ''}</span>
                        </span>
                      </li>
                    )
                  })}
                </ol>

                <h2 ref={headingRef} tabIndex={-1} className="mb-4 font-[family-name:var(--font-playfair)] text-[24px] font-semibold leading-tight text-[#173D32] outline-none sm:text-[28px]">
                  {stepTitle}
                </h2>

                {stepError && (
                  <p role="alert" className="mb-4 rounded-md border border-[#E7C1B8] bg-[#FBEFEC] px-3.5 py-2.5 text-sm font-semibold text-[#A4321F]">
                    {stepError}
                  </p>
                )}

                {view === 1 && (
                  <div className="flex flex-col gap-7">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="pc-qty-2" className="text-sm font-semibold">Quantity</label>
                      <select id="pc-qty-2" value={quantity} onChange={(e) => setValue('quantity', Number(e.target.value))} className={input}>
                        {packages.map((p) => (
                          <option key={p.quantity} value={p.quantity}>
                            {p.quantity.toLocaleString('en-US')} postcards, estimated {dollars(p.totalCents)}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="flex flex-col gap-4">
                      <h3 className="text-[15px] font-bold text-[#173D32]">Your business</h3>
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <Field id="pc-biz" label="Business name" error={errors.businessName?.message}>
                          <input id="pc-biz" type="text" autoComplete="organization" aria-invalid={!!errors.businessName} aria-describedby={errors.businessName ? 'pc-biz-error' : undefined} className={input} {...register('businessName')} />
                        </Field>
                        <Field id="pc-contact" label="Your name" error={errors.contactName?.message}>
                          <input id="pc-contact" type="text" autoComplete="name" aria-invalid={!!errors.contactName} aria-describedby={errors.contactName ? 'pc-contact-error' : undefined} className={input} {...register('contactName')} />
                        </Field>
                        <Field id="pc-email" label="Email" error={errors.email?.message}>
                          <input id="pc-email" type="email" inputMode="email" autoComplete="email" aria-invalid={!!errors.email} aria-describedby={errors.email ? 'pc-email-error' : undefined} className={input} {...register('email')} />
                        </Field>
                        <Field id="pc-phone" label="Phone" error={errors.phone?.message}>
                          <input id="pc-phone" type="tel" inputMode="tel" autoComplete="tel" aria-invalid={!!errors.phone} aria-describedby={errors.phone ? 'pc-phone-error' : undefined} className={input} {...register('phone')} />
                        </Field>
                        <Field id="pc-industry" label="Industry" error={errors.industry?.message}>
                          <select id="pc-industry" defaultValue="" aria-invalid={!!errors.industry} aria-describedby={errors.industry ? 'pc-industry-error' : undefined} className={input} {...register('industry')}>
                            <option value="" disabled>Choose your industry</option>
                            {INDUSTRIES.map((i) => <option key={i} value={i}>{i}</option>)}
                          </select>
                        </Field>
                      </div>
                    </div>

                    <div className="flex flex-col gap-4">
                      <h3 className="text-[15px] font-bold text-[#173D32]">Your audience</h3>
                      <Choice<'ggm_list' | 'own_list'>
                        name="pc-list"
                        legend="Who should receive your postcards?"
                        value={mailingList ?? null}
                        error={errors.mailingList?.message}
                        onChange={(val) => setValue('mailingList', val, { shouldValidate: true })}
                        options={[
                          { value: 'ggm_list', title: 'I need help reaching my audience', sub: 'We build a targeted homeowner list. Included.' },
                          { value: 'own_list', title: 'I have a mailing list', sub: 'You can share it with us once your campaign is set up.' },
                        ]}
                      />
                      {mailingList === 'ggm_list' && (
                        <div className="flex flex-col gap-4 rounded-md border border-[#E2DDD0] bg-white p-3.5">
                          <label className="flex min-h-[44px] cursor-pointer items-center gap-3">
                            <input type="checkbox" className="h-5 w-5 shrink-0 accent-[#173D32]" {...register('helpChooseArea')} />
                            <span className="text-[14px] font-semibold">Not sure where to mail? Help me choose.</span>
                          </label>
                          {!helpChooseArea && (
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                              <Field id="pc-cities" label="Target city or cities" hint="For example: San Antonio, Boerne" error={errors.targetCities?.message}>
                                <input id="pc-cities" type="text" aria-invalid={!!errors.targetCities} aria-describedby={errors.targetCities ? 'pc-cities-error' : 'pc-cities-hint'} className={input} {...register('targetCities')} />
                              </Field>
                              <Field id="pc-state" label="Target state" error={errors.targetState?.message}>
                                <StateSelect id="pc-state" registration={register('targetState')} hasError={!!errors.targetState} className={input} />
                              </Field>
                            </div>
                          )}
                          <Field id="pc-zips" label="ZIP codes" optional hint="Leave blank and we suggest the best areas." error={errors.targetZips?.message}>
                            <input id="pc-zips" type="text" inputMode="numeric" aria-invalid={!!errors.targetZips} className={input} {...register('targetZips')} />
                          </Field>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col gap-4">
                      <h3 className="text-[15px] font-bold text-[#173D32]">Your postcard design</h3>
                      <Choice<'ggm_design' | 'own_artwork'>
                        name="pc-art"
                        legend="Do you have a finished design?"
                        value={artworkChoice ?? null}
                        error={errors.artworkChoice?.message}
                        onChange={(val) => setValue('artworkChoice', val, { shouldValidate: true })}
                        options={[
                          { value: 'ggm_design', title: 'I need design help', sub: 'Our designer creates it with you.', badge: 'INCLUDED' },
                          { value: 'own_artwork', title: 'I have artwork', sub: 'You can share your files with us once your campaign is set up.' },
                        ]}
                      />
                    </div>

                    <details className="rounded-md border border-[#E2DDD0] bg-white px-3.5 py-2.5">
                      <summary className={`cursor-pointer py-1 text-[14px] font-semibold text-[#173D32] ${focusRing}`}>More details (optional)</summary>
                      <div className="mt-3 flex flex-col gap-4 pb-1">
                        <Field id="pc-site" label="Website" optional error={errors.businessWebsite?.message}>
                          <input id="pc-site" type="text" inputMode="url" autoComplete="url" className={input} {...register('businessWebsite')} />
                        </Field>
                        <Field id="pc-date" label="Preferred mailing date" optional hint="A preference only. We confirm timing with you.">
                          <input id="pc-date" type="date" className={input} {...register('preferredMailingDate')} />
                        </Field>
                        <Field id="pc-notes" label="Anything else we should know?" optional>
                          <textarea id="pc-notes" rows={3} className={`${input} min-h-[88px]`} {...register('instructions')} />
                        </Field>
                      </div>
                    </details>
                  </div>
                )}

                {view === 2 && (
                  <div className="flex flex-col gap-5">
                    <ReviewBlock title="Campaign" onEdit={() => go(1)}>
                      <p>{qty} postcards, 9&quot; × 11&quot;, everything included</p>
                      <p className="mt-2">
                        {v.mailingList === 'own_list'
                          ? 'Mailing to your own list'
                          : v.helpChooseArea
                            ? 'GGM homeowner list, area to be chosen with you'
                            : `GGM homeowner list: ${[v.targetCities, v.targetState].filter(Boolean).join(', ')}${v.targetZips ? ` (${v.targetZips})` : ''}`}
                      </p>
                      <p>{v.artworkChoice === 'ggm_design' ? 'Design by GGM, included' : 'Your own artwork'}</p>
                    </ReviewBlock>
                    <ReviewBlock title="Contact" onEdit={() => go(1)}>
                      <p>{v.businessName} · {v.contactName}</p>
                      <p className="text-[#5F6A63]">{v.email} · {v.phone} · {v.industry}</p>
                    </ReviewBlock>

                    <div className="rounded-md border border-[#173D32] bg-white p-4">
                      <dl className="flex flex-col gap-2 text-[15px]">
                        <div className="flex items-baseline justify-between gap-3">
                          <dt className="font-bold">Estimated price</dt>
                          <dd className="font-[family-name:var(--font-playfair)] text-[26px] font-semibold text-[#173D32]">{dollars(selected.totalCents)}</dd>
                        </div>
                        <div className="flex justify-between gap-3"><dt className="text-[#5F6A63]">Sales tax</dt><dd className="text-right text-[14px]">If it applies, confirmed with your final price</dd></div>
                        <div className="flex justify-between gap-3 border-t border-[#E2DDD0] pt-2"><dt className="text-[#5F6A63]">Due now</dt><dd className="font-semibold">Nothing</dd></div>
                      </dl>
                      <p className="mt-2 text-[13px] leading-snug text-[#5F6A63]">
                        {ESTIMATE_NOTE} Sending this request does not place an order or create any payment.
                      </p>
                    </div>

                    <section aria-labelledby="pc-next" className="rounded-md border border-[#E2DDD0] bg-white p-4">
                      <h3 id="pc-next" className="mb-2.5 text-[13px] font-bold tracking-[1px] text-[#8A6A2B]">WHAT HAPPENS NEXT</h3>
                      <Steps />
                    </section>

                    <div className="flex flex-col gap-1.5">
                      <label className="flex cursor-pointer items-start gap-3">
                        <input
                          type="checkbox"
                          checked={!!v.consent}
                          onChange={(e) => setValue('consent', (e.target.checked || undefined) as true, { shouldValidate: true })}
                          aria-invalid={!!errors.consent}
                          aria-describedby={errors.consent ? 'pc-consent-error' : undefined}
                          className="mt-0.5 h-5 w-5 shrink-0 accent-[#173D32]"
                        />
                        <span className="text-[14px] leading-snug">
                          I confirm these details and agree to be contacted about this request. See our{' '}
                          <a href="/terms" className="font-semibold text-[#173D32] underline">Terms</a> and{' '}
                          <a href="/privacy" className="font-semibold text-[#173D32] underline">Privacy</a>.
                        </span>
                      </label>
                      <FieldError id="pc-consent-error" message={errors.consent?.message} />
                    </div>

                    {serverError && (
                      <p role="alert" className="rounded-md border border-[#E7C1B8] bg-[#FBEFEC] px-3.5 py-2.5 text-sm font-semibold text-[#A4321F]">{serverError}</p>
                    )}
                  </div>
                )}

                <div className="mt-8 hidden items-center justify-between gap-3 lg:flex">
                  <button type="button" onClick={back} className={`min-h-[48px] rounded-md border border-[#CBC6B8] px-5 text-[15px] font-semibold text-[#173D32] ${focusRing}`}>Back</button>
                  {view === 2 ? (
                    <button key="send-desktop" type="submit" disabled={busy} className={`inline-flex min-h-[52px] items-center gap-2 rounded-md bg-[#173D32] px-6 text-[16px] font-semibold text-[#F6F3ED] disabled:opacity-60 ${focusRing}`}>
                      {busy ? 'Sending your request...' : 'Send my campaign request'}
                    </button>
                  ) : (
                    <button key="next-desktop" type="button" onClick={next} className={`min-h-[52px] rounded-md bg-[#173D32] px-6 text-[16px] font-semibold text-[#F6F3ED] ${focusRing}`}>Continue</button>
                  )}
                </div>
              </div>

              <aside aria-label="Request summary" className="hidden rounded-md border border-[#E2DDD0] bg-white p-5 lg:sticky lg:top-6 lg:block">
                <p className="text-[12px] font-bold tracking-[1.6px] text-[#8A6A2B]">YOUR REQUEST</p>
                <p className="mt-2 text-[16px] font-semibold">{qty} postcards</p>
                <p className="text-[13px] text-[#5F6A63]">{perCard(selected.unitPriceCents)} each, everything included</p>
                <dl className="mt-4 flex flex-col gap-1.5 border-t border-[#E2DDD0] pt-3 text-[14px]">
                  <div className="flex items-baseline justify-between"><dt className="font-bold">Estimated price</dt><dd className="text-[22px] font-bold text-[#173D32]">{dollars(selected.totalCents)}</dd></div>
                  <div className="flex justify-between"><dt className="text-[#5F6A63]">Due now</dt><dd className="font-semibold">Nothing</dd></div>
                </dl>
                <p className="mt-3 text-[12px] leading-snug text-[#5F6A63]">{ESTIMATE_NOTE}</p>
              </aside>
            </section>
          )}

          <div
            className="fixed inset-x-0 bottom-0 z-30 border-t border-[#E2DDD0] bg-[#FBF9F4] px-4 pt-2.5 lg:hidden"
            style={{ paddingBottom: 'calc(10px + env(safe-area-inset-bottom))' }}
          >
            <div className="mx-auto flex max-w-[640px] items-center justify-between gap-3">
              <div className="min-w-0" aria-live="polite">
                <div className="truncate text-[12px] text-[#5F6A63]">{qty} postcards · estimate</div>
                <div className="text-[20px] font-bold leading-tight text-[#173D32]">{dollars(selected.totalCents)}</div>
              </div>
              {view === 2 ? (
                <button key="send-bar" type="submit" form="pc-request" disabled={busy} className={`min-h-[48px] shrink-0 whitespace-nowrap rounded-md bg-[#173D32] px-5 text-[15px] font-semibold text-[#F6F3ED] disabled:opacity-60 ${focusRing}`}>
                  {busy ? 'Sending...' : 'Send my campaign request'}
                </button>
              ) : (
                <button key="next-bar" type="button" onClick={next} className={`min-h-[48px] shrink-0 whitespace-nowrap rounded-md bg-[#173D32] px-6 text-[15px] font-semibold text-[#F6F3ED] ${focusRing}`}>
                  {view === 'intro' ? 'Request my campaign' : 'Continue'}
                </button>
              )}
            </div>
          </div>
        </form>
      )}

      {!reference && (
        <section className="border-t border-[#E2DDD0] bg-[#FBF9F4]">
          <div className="mx-auto max-w-[760px] px-4 py-8 sm:px-8">
            <h2 className="font-[family-name:var(--font-playfair)] text-[22px] font-semibold text-[#173D32]">A few helpful details</h2>
            <p className="mb-3 mt-1 text-[14px] text-[#5F6A63]">Explore what&apos;s included and how your mailing comes together.</p>
            <div className="flex flex-col divide-y divide-[#E2DDD0] border-y border-[#E2DDD0]">
              <Faq q="How does it work?">
                Choose a quantity and send your request. Our team gets in touch to discuss your campaign and confirm your price. If you go ahead, we set up your campaign, prepare your design and mailing audience, and you approve everything before anything is printed or mailed.
              </Faq>
              <Faq q="Do I pay anything now?">
                No. Sending a request is free and does not place an order. We discuss your price and payment terms with you directly before you commit.
              </Faq>
              <Faq q="What is included in the price?">
                {INCLUDED.join(', ')}. The price shown is an estimate; your final price, including any applicable sales tax, is confirmed after we review your request.
              </Faq>
              <Faq q="When will my postcards mail?">
                We agree the timing with you. Nothing prints before you approve your final design and mailing audience.
              </Faq>
              <Faq q="Can I use my own mailing list?">
                Yes. Choose &quot;I have a mailing list&quot;. You can share it with us once your campaign is set up.
              </Faq>
              <Faq q="I already have artwork. How do I send it?">
                Choose &quot;I have artwork&quot;. You can share your files with us once your campaign is set up.
              </Faq>
            </div>
            <div className="mt-6">
              <p className="text-[15px] font-semibold text-[#1F2A24]">Prefer to talk it through?</p>
              <p className="mt-1 text-[14px] text-[#3E4A43]">
                Call <a href={phoneHref} className="font-semibold text-[#173D32]">{phone}</a> or email{' '}
                <a href={`mailto:${email}`} className="font-semibold text-[#173D32]">{email}</a>.
              </p>
            </div>
          </div>
          <footer className="border-t border-[#E2DDD0] px-4 py-5 text-center text-[12px] text-[#5F6A63]">
            Green Growth Marketing · <a href="/privacy" className="underline">Privacy</a> · <a href="/terms" className="underline">Terms</a>
          </footer>
        </section>
      )}
    </div>
  )
}

function Steps() {
  return (
    <ol className="flex flex-col gap-2.5">
      {NEXT_STEPS.map((s, i) => (
        <li key={s.title} className="flex gap-3 text-[14px] leading-snug">
          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[#173D32] text-[11px] font-bold text-[#173D32]">{i + 1}</span>
          <span><strong className="font-semibold">{s.title}.</strong> {s.text}</span>
        </li>
      ))}
    </ol>
  )
}

function ReviewBlock({ title, onEdit, children }: { title: string; onEdit: () => void; children: React.ReactNode }) {
  return (
    <div className="rounded-md border border-[#E2DDD0] bg-white p-4 text-[14px] leading-relaxed">
      <div className="mb-1.5 flex items-center justify-between">
        <h3 className="text-[13px] font-bold tracking-[1px] text-[#8A6A2B]">{title.toUpperCase()}</h3>
        <button type="button" onClick={onEdit} className={`min-h-[40px] px-1 text-[14px] font-semibold text-[#173D32] underline ${focusRing}`} aria-label={`Edit ${title.toLowerCase()}`}>
          Edit
        </button>
      </div>
      {children}
    </div>
  )
}

function Faq({ q, children }: { q: string; children: React.ReactNode }) {
  return (
    <details className="group">
      <summary className={`flex min-h-[48px] cursor-pointer list-none items-center justify-between gap-3 py-2 text-[15px] font-semibold text-[#1F2A24] [&::-webkit-details-marker]:hidden ${focusRing}`}>
        {q}
        <span aria-hidden="true" className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#CBC6B8] text-[16px] leading-none text-[#173D32]">
          <span className="group-open:hidden">+</span>
          <span className="hidden group-open:inline">−</span>
        </span>
      </summary>
      <p className="pb-3 pr-8 text-[14px] leading-relaxed text-[#3E4A43]">{children}</p>
    </details>
  )
}

function Received({
  reference, qty, estimate, phone, phoneHref,
}: { reference: string; qty: string; estimate: string; phone: string; phoneHref: string }) {
  return (
    <section className="mx-auto max-w-[640px] px-4 py-10" aria-live="polite">
      <p className="text-[12px] font-bold tracking-[1.6px] text-[#8A6A2B]">REQUEST {reference}</p>
      <h1 className="mt-2 font-[family-name:var(--font-playfair)] text-[30px] font-semibold leading-tight text-[#173D32]">
        Request received, awaiting review
      </h1>
      <p className="mt-3 text-[15px] leading-relaxed text-[#3E4A43]">
        Thank you. We have your request for {qty} postcards (estimated {estimate}). This is not an order and nothing has
        been charged. Our team will be in touch shortly to discuss your campaign.
      </p>
      <div className="mt-6 rounded-md border border-[#E2DDD0] bg-white p-4">
        <h2 className="mb-2.5 text-[13px] font-bold tracking-[1px] text-[#8A6A2B]">WHAT HAPPENS NEXT</h2>
        <Steps />
      </div>
      <p className="mt-6 text-[14px] text-[#3E4A43]">
        Questions in the meantime? Call <a href={phoneHref} className="font-semibold text-[#173D32]">{phone}</a> and mention {reference}.
      </p>
    </section>
  )
}
