import Image from 'next/image'
import {
  Check,
  Phone,
  PenLine,
  Stamp,
  Users,
  Printer,
  Mail,
  Send,
  ShieldCheck,
  ArrowDown,
} from 'lucide-react'
import { business } from '@/config/business'
import PixelBoot from '@/components/landing/PixelBoot'
import OfferForm from '@/components/landing/OfferForm'

/**
 * The Meta ad landing page.
 *
 * Everything here answers one question: does this page look like the ad they
 * just tapped? The headline is word for word the headline on the creative, in
 * the same order, in the same colours, above the fold on a phone. A visitor
 * who has to scroll or read to work out they are in the right place has
 * already half decided to leave, and that click was paid for.
 *
 * There is no navigation, no popup and no footer menu. See SiteChrome.
 *
 * Deliberately static. No framer-motion, no scroll animation, no carousel.
 * Most of this traffic is a phone on cellular, and the offer being legible in
 * the first second beats anything that moves.
 */

const INCLUDED = [
  'Personalized or handwritten style letters',
  'Forever Stamps',
  'Targeted mailing lists',
  'Printing and addressing',
  'Mailing included',
  'No contract required',
]

const STEPS = [
  {
    icon: PenLine,
    title: 'We review your business',
    body: 'A real person looks at what you do and who you are trying to reach. No portal, no ticket queue.',
  },
  {
    icon: Users,
    title: 'We build your audience',
    body: 'We put together a targeted list of households in the area you want, then confirm it with you.',
  },
  {
    icon: Send,
    title: 'We print, stamp and mail',
    body: 'Your 100 letters go out with Forever Stamps. Nothing is printed until you have said yes.',
  },
]

const SERVICES = [
  { icon: PenLine, label: 'Design' },
  { icon: Users, label: 'Mailing list' },
  { icon: Printer, label: 'Printing' },
  { icon: Mail, label: 'Addressing' },
  { icon: Stamp, label: 'Postage' },
  { icon: Send, label: 'Mailing' },
]

const HERO_BACKGROUND =
  'radial-gradient(ellipse at 15% 35%, rgba(34,197,94,0.20) 0%, transparent 52%), radial-gradient(ellipse at 88% 12%, rgba(124,58,237,0.18) 0%, transparent 46%), linear-gradient(160deg, #edfaf2 0%, #f3eeff 55%, #f7fbff 100%)'

export default function FreeLettersPage() {
  return (
    <div className="bg-white">
      <PixelBoot />

      {/* ── Bar: logo and phone only. The phone number is a conversion path,
             not a distraction, and some people would rather just call. ── */}
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
          <a
            href={business.phoneHref}
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-bold text-brand-forest transition-colors hover:bg-brand-green-pale sm:text-base"
          >
            <Phone className="h-4 w-4 text-brand-green" aria-hidden />
            <span className="hidden sm:inline">{business.phone}</span>
            <span className="sm:hidden">Call us</span>
          </a>
        </div>
      </header>

      {/* ───────────────────────────── HERO ───────────────────────────── */}
      <section style={{ background: HERO_BACKGROUND }}>
        <div className="mx-auto max-w-6xl px-5 py-10 lg:py-16">
          <div className="flex flex-col items-center gap-10 lg:flex-row lg:gap-12">
            <div className="w-full lg:w-[54%]">
              <p className="mb-4 text-[11px] font-black uppercase tracking-[0.18em] text-brand-green sm:text-xs">
                Direct mail that delivers results
              </p>

              {/* Word for word the creative, in the creative's colours. */}
              <h1 className="mb-4 font-black leading-[0.95]">
                <span className="block text-[3.4rem] text-brand-dark sm:text-6xl lg:text-7xl">
                  100 FREE
                </span>
                <span className="block text-[2.1rem] text-brand-green sm:text-4xl lg:text-[3.1rem]">
                  PERSONALIZED LETTERS
                </span>
              </h1>

              <p className="mb-5 inline-block rounded-lg bg-brand-forest px-4 py-2 text-sm font-black uppercase tracking-wide text-white sm:text-base">
                WITH FOREVER STAMPS
              </p>

              <p className="mb-6 max-w-xl text-base leading-relaxed text-gray-600 sm:text-lg">
                See how personalized direct mail can help put your business in front of more
                potential customers.
              </p>

              {/*
                An anchor, not a button with a scroll handler. It works before
                React has hydrated, it works with JavaScript off, and a long
                press offers "copy link". The page already sets
                scroll-behavior: smooth globally, so the movement is the same.
              */}
              <a
                href="#claim"
                className="mb-6 flex w-full items-center justify-center gap-2.5 rounded-xl px-6 py-5 text-center text-lg font-black text-white shadow-xl transition-all hover:-translate-y-0.5 sm:w-auto sm:px-10"
                style={{
                  background: 'linear-gradient(135deg, #2d7a1f, #4aac2e)',
                  boxShadow: '0 10px 30px rgba(74,172,46,0.35)',
                }}
              >
                CLAIM MY 100 FREE LETTERS
                <ArrowDown className="h-5 w-5" aria-hidden />
              </a>

              <ul className="mb-6 grid grid-cols-1 gap-x-6 gap-y-2.5 sm:grid-cols-2">
                {INCLUDED.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-brand-green">
                      <Check className="h-3 w-3 text-white" strokeWidth={3.5} aria-hidden />
                    </span>
                    <span className="text-sm font-semibold text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>

              <p
                className="text-lg font-black italic sm:text-xl"
                style={{
                  fontFamily: 'Georgia, "Times New Roman", serif',
                  background: 'linear-gradient(90deg, #7c3aed, #3a8a2d)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Real Letters. Real People. Real Results.
              </p>
            </div>

            <div className="w-full lg:w-[46%]">
              {/*
                The dimensions must match the file. Next uses them to reserve
                the space before the image arrives, and a wrong ratio makes the
                hero jump as it loads, which is both ugly and a Core Web Vitals
                penalty on exactly the traffic we are paying for.
              */}
              {/*
                Cropped out of the Facebook creative, deliberately.

                The full creative cannot go here. It carries the same headline,
                the same checkmark list, the same phone number and the same URL
                as this page, so the visitor reads everything twice in two
                different fonts, which looks like a bug rather than emphasis.
                Worse, it has a large green CLICK HERE TO CLAIM button painted
                on it. Inside an image that button does nothing, and somebody
                who taps it and gets no response concludes the page is broken
                and leaves. That is the most expensive click on the page.

                The envelope alone gives the continuity with the ad without any
                of that: same envelope, same handwriting, same stamp.
              */}
              <Image
                src="/free-letters/envelope-ad.jpg"
                alt="A handwritten style envelope with a real United States Forever Stamp, addressed from your company to homeowners looking for your services, on top of a stack of further letters"
                width={710}
                height={448}
                priority
                sizes="(max-width: 1024px) 100vw, 46vw"
                className="w-full rounded-2xl shadow-2xl"
              />
              <p className="mt-3 text-center text-xs font-medium text-gray-500">
                A Forever Stamp on every envelope. Not a printed postage mark.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Trust strip. Every one of these is a fact, not a claim about
             results, which is the line this page does not cross. ── */}
      <section className="border-y border-gray-100 bg-white">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-5 px-5 py-6 text-center lg:grid-cols-4">
          {[
            { value: 'No contract', label: 'Campaign by campaign', color: '#3a8a2d' },
            { value: 'Custom quotes', label: 'Tell us the quantity you have in mind', color: '#7c3aed' },
            { value: 'All 50 states', label: 'We mail anywhere in the USA', color: '#2563eb' },
            { value: 'A to Z', label: 'A real person, not a portal', color: '#d97706' },
          ].map(({ value, label, color }) => (
            <div key={value}>
              <div className="text-lg font-black sm:text-xl" style={{ color }}>{value}</div>
              <div className="mt-0.5 text-xs font-medium text-gray-500">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── What is included ── */}
      <section className="bg-white py-12 lg:py-16">
        <div className="mx-auto max-w-6xl px-5">
          <h2 className="mb-2 text-center text-2xl font-black text-brand-dark sm:text-3xl">
            We handle every part of it
          </h2>
          <p className="mx-auto mb-9 max-w-xl text-center text-base text-gray-500">
            There is nothing for you to print, stuff, stamp or drive to the post office.
          </p>

          <div className="grid grid-cols-3 gap-4 sm:gap-6 lg:grid-cols-6">
            {SERVICES.map(({ icon: Icon, label }) => (
              <div key={label} className="flex flex-col items-center gap-2.5 text-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-green-pale">
                  <Icon className="h-6 w-6 text-brand-green" aria-hidden />
                </span>
                <span className="text-xs font-bold text-gray-700 sm:text-sm">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="bg-gradient-to-b from-brand-green-pale to-white py-12 lg:py-16">
        <div className="mx-auto max-w-6xl px-5">
          <h2 className="mb-9 text-center text-2xl font-black text-brand-dark sm:text-3xl">
            How your free letters happen
          </h2>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {STEPS.map(({ icon: Icon, title, body }, i) => (
              <div key={title} className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                <div className="mb-4 flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-purple-pale">
                    <Icon className="h-5 w-5 text-brand-purple" aria-hidden />
                  </span>
                  <span className="text-3xl font-black text-gray-200">{i + 1}</span>
                </div>
                <h3 className="mb-2 text-base font-black text-brand-dark">{title}</h3>
                <p className="text-sm leading-relaxed text-gray-500">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────────────────── FORM ───────────────────────────── */}
      {/*
        scroll-mt keeps the heading clear of the sticky mobile bar when the
        anchor lands. Without it the first thing a phone shows after the CTA is
        the middle of the form, which reads as a broken link.
      */}
      <section id="claim" className="scroll-mt-4 bg-white py-12 lg:py-16">
        <div className="mx-auto max-w-2xl px-5">
          <div className="mb-8 text-center">
            <span className="mb-4 inline-block rounded-full bg-brand-green-pale px-4 py-1.5 text-xs font-black uppercase tracking-wide text-brand-forest">
              Limited to qualifying businesses
            </span>
            <h2 className="mb-3 text-3xl font-black leading-tight text-brand-dark sm:text-4xl">
              Claim Your 100 Free Letters
            </h2>
            {/*
              This used to say "tell us a little about your business so we can
              determine the best way to prepare your mailing", which was written
              for the thirteen field version. Against five fields it promises an
              interrogation that never comes, and a promise the page does not
              keep is the wrong way to open. It now says how short it is, which
              is the actual selling point.
            */}
            <p className="text-base leading-relaxed text-gray-500">
              Five quick details and we will call you to set up your complimentary mailing. It takes
              about thirty seconds.
            </p>
          </div>

          <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-2xl sm:p-8">
            <OfferForm />
          </div>

          <div className="mt-6 flex items-start gap-3 rounded-2xl bg-gray-50 p-5">
            <ShieldCheck className="mt-0.5 h-5 w-5 flex-shrink-0 text-brand-green" aria-hidden />
            <p className="text-xs leading-relaxed text-gray-500">
              <span className="font-bold text-gray-700">Would you rather just talk?</span> Call{' '}
              <a href={business.phoneHref} className="font-bold text-brand-green underline">
                {business.phone}
              </a>{' '}
              and we will set your free letters up over the phone. {business.legalName},{' '}
              {business.address.city}, {business.address.state}.
            </p>
          </div>
        </div>
      </section>

      {/* ── Minimal footer. Two legal links and a phone number, nothing that
             invites a visitor to go browsing. ── */}
      <footer className="border-t border-gray-100 bg-white py-8">
        <div className="mx-auto max-w-6xl px-5 text-center">
          <p className="text-xs text-gray-400">
            &copy; {new Date().getFullYear()} {business.legalName}. All rights reserved.
          </p>
          <p className="mt-2 text-xs text-gray-400">
            <a href="/privacy" className="underline hover:text-gray-600">Privacy Policy</a>
            {' · '}
            <a href="/terms" className="underline hover:text-gray-600">Terms of Service</a>
            {' · '}
            <a href={business.phoneHref} className="underline hover:text-gray-600">
              {business.phone}
            </a>
          </p>
        </div>
      </footer>

      {/*
        There was a sticky bar pinned to the bottom of the screen on phones,
        carrying a call button and a second CLAIM MY FREE LETTERS. Removed on
        1 September at Inbar's request, and he was right.

        The theory was that somebody reading the middle of the page is nowhere
        near a call to action. In practice it sat directly on top of the real
        submit button once you reached the form, so filling the form in meant
        looking at two identical green buttons, one of which only scrolled you
        to where you already were. On a small screen it also ate the bottom of
        every screenful for the whole page.

        The page is not short of ways to convert: the hero button, the form
        itself, the phone number in the header, and the "would you rather just
        talk" panel beside the form. If a floating call to action is ever tried
        again, it must hide itself while the form is on screen.
      */}
    </div>
  )
}
