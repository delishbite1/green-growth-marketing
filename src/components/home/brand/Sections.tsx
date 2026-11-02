import Link from 'next/link'
import Image from 'next/image'
import {
  Check,
  Phone,
  ArrowRight,
  Home,
  Stethoscope,
  Building2,
  Sparkles,
  Hammer,
  Waves,
  DoorOpen,
  Wind,
  MoreHorizontal,
  Mail,
  Printer,
  Store,
} from 'lucide-react'

/*
 * The homepage, built to the approved reference.
 *
 * The composition is the point, not the palette. Ivory ground throughout, the
 * headline in forest Playfair on the left with the photograph on the right,
 * cards that lead with a picture rather than a paragraph, and industries as a
 * quiet row of tiles. The previous attempt put the hero on a solid forest
 * block and used text only cards, which is the thing being corrected.
 *
 * ON THE REFERENCE'S OWN CONTENT
 * The names, street addresses and postcard slogans drawn in the mockup are
 * illustrative. None of them are reproduced here as if they were real: the
 * photography is GGM's own, and the one offer stated anywhere is the real
 * price beat.
 *
 * Every route, phone number, form target and tracking path is the one that was
 * already on the site.
 */

const PHONE = '(888) 601-6556'
const PHONE_HREF = 'tel:+18886016556'

// Clip only the photographed table border; preserve the stamp and both addresses.
export function MailSample({ kind, priority = false }: { kind: 'envelope' | 'postcard'; priority?: boolean }) {
  const envelope = kind === 'envelope'
  return (
    <div className="relative w-full overflow-hidden bg-ggm-paper" style={{ aspectRatio: envelope ? '1440 / 680' : '1338 / 846' }}>
      <Image
        src={envelope ? '/products/env-style-a.jpg' : '/products/postcard-premium.jpg'}
        alt={envelope ? 'GGM envelope sample showing the return address at top left, postage stamp at top right, and handwritten recipient name and address' : 'Authentic printed GGM postcard sample, with the surrounding table cropped out'}
        width={envelope ? 1565 : 1454}
        height={envelope ? 808 : 953}
        priority={priority}
        sizes="(min-width: 1024px) 45vw, 90vw"
        className="absolute h-auto max-w-none"
        style={{ width: envelope ? '108.6806%' : '108.6697%', left: envelope ? '-4.4444%' : '-3.139%', top: envelope ? '-8.8235%' : '-6.8558%' }}
      />
    </div>
  )
}

/* ------------------------------------------------------------------ atoms */

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ggm-gold-ink">
      {children}
    </p>
  )
}

function Section({
  children,
  className = '',
  id,
}: {
  children: React.ReactNode
  className?: string
  id?: string
}) {
  return (
    <section id={id} className={`px-5 py-14 sm:px-8 sm:py-20 ${className}`}>
      <div className="mx-auto w-full max-w-6xl">{children}</div>
    </section>
  )
}

function QuoteCta({ full = false }: { full?: boolean }) {
  return (
    <Link
      href="#quote"
      className={`inline-flex min-h-[3.1rem] items-center justify-center gap-2 rounded-xl bg-ggm-forest px-6 text-[15px] font-semibold text-ggm-ivory transition hover:bg-ggm-forest-deep ${
        full ? 'w-full' : ''
      }`}
    >
      Get a Free Quote
      <ArrowRight className="h-4 w-4" aria-hidden />
    </Link>
  )
}

function CallCta({ full = false }: { full?: boolean }) {
  return (
    <a
      href={PHONE_HREF}
      className={`inline-flex min-h-[3.1rem] items-center justify-center gap-2 rounded-xl border border-ggm-forest/25 bg-ggm-paper px-6 text-[15px] font-semibold text-ggm-forest transition hover:border-ggm-forest/50 hover:bg-ggm-sage-surface/60 ${
        full ? 'w-full' : ''
      }`}
    >
      <Phone className="h-4 w-4" aria-hidden />
      {PHONE}
    </a>
  )
}

/* ------------------------------------------------------------------- hero */

export function Hero() {
  return (
    <>
      <section className="relative isolate h-[min(calc(100svh-104px),133.333vw)] min-h-[420px] overflow-hidden bg-[#062F25] sm:h-auto sm:min-h-0">
        <Image src="/products/direct-mail-hero-v3.jpg" alt="Illustrative handwritten letter, stamped envelope and stack of home postcards on a sunlit porch table" width={1086} height={1448} priority sizes="(min-width: 1024px) 62vw, 100vw" className="pointer-events-none absolute inset-x-0 bottom-0 -z-20 h-full w-full object-contain object-bottom sm:h-auto lg:left-auto lg:h-full lg:w-[62%] lg:object-cover" />
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(2,29,21,0.94)_0%,rgba(2,29,21,0.72)_32%,rgba(2,29,21,0)_64%)] lg:bg-[linear-gradient(90deg,#062F25_0%,rgba(6,47,37,0.96)_30%,rgba(6,47,37,0.35)_63%,rgba(6,47,37,0)_85%)]" />
        <div className="mx-auto max-w-7xl px-5 pt-4 sm:px-10 sm:pb-[65vw] sm:pt-10 lg:min-h-[680px] lg:px-8 lg:py-20">
          <div className="max-w-xl lg:max-w-[52%]">
            <p className="font-body text-[10px] font-semibold uppercase tracking-[0.14em] text-[#D1B575] sm:text-sm">Direct mail. Real results.</p>
            <h1 className="mt-2 font-body text-[clamp(1.35rem,6vw,1.75rem)] font-bold leading-[1.04] tracking-[-0.04em] text-white sm:mt-3 sm:text-4xl lg:text-[3.6rem] xl:text-[4.2rem]">
              Reach More Homes.<br /><span className="text-[#D1B575]">Grow Your Business.</span>
            </h1>
            <p className="mt-2 max-w-[18rem] font-body text-[13px] leading-snug text-white/95 sm:mt-4 sm:max-w-md sm:text-lg"><span className="sm:hidden">Personalized letters, handwritten envelopes and postcards.</span><span className="hidden sm:inline">Personalized letters, handwritten envelopes, and high-impact postcards that put your business directly in front of potential customers.</span></p>
            <div className="mt-3 flex flex-col items-start gap-1 sm:mt-7 sm:gap-4">
              <Link href="#quote" className="inline-flex min-h-11 w-full max-w-[17rem] items-center justify-center gap-4 rounded-xl border border-white/25 bg-ggm-forest px-5 py-2.5 font-body text-sm font-semibold text-white shadow-lg transition hover:bg-ggm-forest-deep sm:min-h-12 sm:w-auto sm:min-w-64 sm:px-6 sm:py-4 sm:text-base">Get a Free Quote <ArrowRight className="h-5 w-5" aria-hidden /></Link>
              <Link href="#products" className="inline-flex min-h-9 items-center gap-3 font-body text-xs font-semibold text-white underline decoration-white/50 underline-offset-8 sm:min-h-11 sm:text-sm">Explore our products <ArrowRight className="h-4 w-4" aria-hidden /></Link>
            </div>
          </div>
        </div>
      </section>
      <div className="border-b border-ggm-line bg-ggm-ivory px-4 py-6 sm:px-8 sm:py-8">
        <ul className="mx-auto grid max-w-7xl grid-cols-2 gap-y-6 font-body text-center text-xs font-semibold text-ggm-forest sm:grid-cols-4 sm:text-sm">
          {[{icon:Home,label:'Target the right homes'},{icon:Mail,label:'Personalized & handwritten'},{icon:Printer,label:'Design, print & mail'},{icon:Store,label:'Build local connections'}].map(({icon:Icon,label})=><li key={label} className="flex flex-col items-center gap-3 border-ggm-forest/20 px-4 odd:border-r sm:border-r sm:last:border-0"><Icon className="h-8 w-8 sm:h-10 sm:w-10" strokeWidth={1.5} aria-hidden /><span className="max-w-36">{label}</span></li>)}
        </ul>
      </div>
    </>
  )
}

/* --------------------------------------------------------- what we send */
const PRODUCTS = [
  {
    name: 'Personalized Letters',
    body: "Variable data letters carrying each homeowner's name, address and other details. A personal touch at scale.",
    img: '/products/letter-personalized.jpg',
    alt: 'Illustrative personalized letter sample generated with GGM’s handwriting tool for a fictional recipient',
    href: '/products',
  },
  {
    name: 'Handwritten Envelopes',
    body: 'Handwritten names and addresses, a return address and a real stamp give your mail a personal touch.',
    img: '/products/env-style-a.jpg',
    alt: 'A hand addressed envelope ready to mail',
    href: '/products',
  },
  {
    name: 'Postcards',
    body: 'Full colour postcards on heavy stock. Nothing to open, the offer is right there when the mail is picked up.',
    img: '/products/postcard-premium.jpg',
    alt: 'A full colour Green Growth Marketing postcard',
    // The postcard service has its own page; the other two formats are on /products.
    href: '/postcard-mailing',
  },
]

export function WhatWeSend() {
  return (
    <Section className="bg-ggm-forest" id="products">
      <p className="font-body text-[11px] font-semibold uppercase tracking-[0.2em] text-ggm-gold">Our products</p>
      <h2 className="mt-3 font-body text-[2rem] font-bold leading-tight tracking-tight text-ggm-ivory sm:text-[2.6rem]">
        Good mail. Great first impressions.
      </h2>

      <div className="mt-9 grid gap-5 sm:grid-cols-3">
        {PRODUCTS.map((p) => (
          <article
            key={p.name}
            className="overflow-hidden rounded-xl border border-ggm-line bg-ggm-paper"
          >
            {/* A fixed aspect on every card, so three photographs of different
                shapes still line up as a row rather than a staircase. */}
            <div className="relative flex aspect-[16/10] w-full items-center overflow-hidden bg-ggm-sage-surface p-3">
              {p.name === 'Handwritten Envelopes' ? <MailSample kind="envelope" /> : p.name === 'Postcards' ? <MailSample kind="postcard" /> : <Image
                src={p.img}
                alt={p.alt}
                fill
                sizes="(min-width: 640px) 33vw, 100vw"
                className="object-cover"
              />}
            </div>
            <div className="bg-ggm-ivory p-5 sm:min-h-[160px]">
              <h3 className="font-body text-lg font-bold text-ggm-forest">{p.name}</h3>
              <p className="mt-2 font-body text-[13.5px] leading-relaxed text-ggm-muted">
                {p.body}
              </p>
              <Link href={p.href} aria-label={`Explore ${p.name}`} className="mt-4 inline-flex min-h-10 items-center gap-3 font-body text-sm font-semibold text-ggm-forest">Explore <ArrowRight className="h-4 w-4" aria-hidden /></Link>
            </div>
          </article>
        ))}
      </div>
    </Section>
  )
}

/* ------------------------------------------------------------ industries */

/*
 * Tiles, and only some of them are links.
 *
 * Ten trades have a real page of their own and are linked. The wider sectors
 * are shown because GGM does mail for them, but they have no page yet, so they
 * are plain tiles rather than links. Linking them would mean either inventing
 * destinations or shipping eight 404s, and a broken link on the homepage costs
 * more than a tile that does not move.
 */
const SECTORS: { label: string; icon: typeof Home; slug?: string }[] = [
  { label: 'Home Services', icon: Home, slug: 'home-remodeling' },
  { label: 'Dentistry', icon: Stethoscope },
  { label: 'Real Estate', icon: Building2 },
  { label: 'Cleaning', icon: Sparkles },
  { label: 'Concrete', icon: Hammer },
  { label: 'Pool Services', icon: Waves, slug: 'pool-service' },
  { label: 'Garage Doors', icon: DoorOpen, slug: 'garage-doors' },
  { label: 'HVAC', icon: Wind, slug: 'hvac' },
]

function Tile({ label, icon: Icon }: { label: string; icon: typeof Home }) {
  return (
    <>
      <Icon className="h-5 w-5 text-ggm-forest" aria-hidden strokeWidth={1.5} />
      <span className="mt-2 text-center font-body text-[12px] leading-tight text-ggm-charcoal">
        {label}
      </span>
    </>
  )
}

const TILE_CLASS =
  'flex min-h-[5.25rem] flex-col items-center justify-center rounded-xl border border-ggm-line bg-ggm-paper px-2 py-3'

export function Industries() {
  return (
    <Section className="bg-ggm-sage-surface/60">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <Eyebrow>Who we help</Eyebrow>
          <h2 className="mt-3 font-body text-[1.75rem] font-bold leading-tight text-ggm-forest sm:text-[2.2rem]">
            Built for local service businesses.
          </h2>
        </div>
        <Link
          href="/industries"
          className="inline-flex items-center gap-1.5 font-body text-[13px] font-semibold text-ggm-forest underline-offset-4 hover:underline"
        >
          View all industries
          <ArrowRight className="h-3.5 w-3.5" aria-hidden />
        </Link>
      </div>

      <div className="mt-8 grid grid-cols-3 gap-3 sm:grid-cols-5 lg:grid-cols-9">
        {SECTORS.map((s) =>
          s.slug ? (
            <Link
              key={s.label}
              href={`/industries/${s.slug}`}
              className={`${TILE_CLASS} transition hover:border-ggm-sage hover:bg-ggm-sage-surface/50`}
            >
              <Tile label={s.label} icon={s.icon} />
            </Link>
          ) : (
            <div key={s.label} className={TILE_CLASS}>
              <Tile label={s.label} icon={s.icon} />
            </div>
          ),
        )}

        <Link
          href="/industries"
          className={`${TILE_CLASS} transition hover:border-ggm-sage hover:bg-ggm-sage-surface/50`}
        >
          <MoreHorizontal className="h-5 w-5 text-ggm-forest" aria-hidden strokeWidth={1.5} />
          <span className="mt-2 text-center font-body text-[12px] leading-tight text-ggm-charcoal">
            and more
          </span>
        </Link>
      </div>
    </Section>
  )
}

/* ------------------------------------------------------------ the steps */

const STEPS = [
  { n: '01', h: 'Tell us about your campaign', p: 'Share your business, the area you want to reach and the type of mail you have in mind.' },
  { n: '02', h: 'Review your quote', p: 'We prepare a quote based on your selected format, quantity, mailing list and postage requirements.' },
  { n: '03', h: 'Review the design', p: 'Work with us on the message and artwork for your mailing.' },
  { n: '04', h: 'Prepare for mailing', p: 'We coordinate printing, addressing and mailing according to the agreed campaign details.' },
]

export function HowItWorks() {
  return (
    <Section className="bg-ggm-paper" id="how-it-works">
      <Eyebrow>How it works</Eyebrow>
      <h2 className="mt-3 font-display text-[1.75rem] font-medium leading-tight text-ggm-forest sm:text-[2.2rem]">
        From your idea to the mailbox
      </h2>
      <ol className="mt-9 grid gap-7 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
        {STEPS.map((s) => (
          <li key={s.n}>
            <span className="font-display text-xl font-medium text-ggm-sage">{s.n}</span>
            <h3 className="mt-2 font-display text-[16px] font-medium text-ggm-forest">{s.h}</h3>
            <p className="mt-1.5 font-body text-[13.5px] leading-relaxed text-ggm-muted">{s.p}</p>
          </li>
        ))}
      </ol>
    </Section>
  )
}

/* -------------------------------------------------------- the guarantee */

export function PriceBeat() {
  return (
    <Section className="bg-ggm-ivory">
      <div className="rounded-2xl border border-ggm-line bg-ggm-sage-surface/45 p-7 sm:p-10">
        <div className="max-w-2xl">
          <Eyebrow>Your campaign</Eyebrow>
          <h2 className="mt-3 font-display text-[1.65rem] font-medium leading-tight text-ggm-forest sm:text-[2rem]">
            Let’s find the right approach for your business
          </h2>
          <p className="mt-4 font-body text-[15px] leading-relaxed text-ggm-charcoal">
            Tell us what you want to send, who you want to reach and your budget.
            We can discuss formats, quantities and mailing options, then prepare a quote
            for the campaign you have in mind.
          </p>
          <p className="mt-4 font-body text-[15px] leading-relaxed text-ggm-charcoal">
            Already have a quote from another company? We’d be happy to review it and see
            if we can offer a better price for comparable specifications. A lower price
            isn’t guaranteed.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <QuoteCta />
            <CallCta />
          </div>
        </div>
      </div>
    </Section>
  )
}

/* --------------------------------------------------------------- the ask */

export function QuoteSection({ children }: { children: React.ReactNode }) {
  return (
    <Section className="bg-ggm-paper">
      <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
        <div className="contents lg:block">
          <div className="order-1">
          <Eyebrow>Get a quote</Eyebrow>
          <h2 className="mt-3 font-display text-[1.75rem] font-medium leading-tight text-ggm-forest sm:text-[2.2rem]">
            Your next campaign, tailored to you.
          </h2>
          <p className="mt-4 font-body text-[15px] leading-relaxed text-ggm-muted">
            Share a few details about your business and mailing needs.
            You can also call us to discuss your campaign.
          </p>
          </div>
          <div className="order-3 lg:mt-4">
          <p className="font-body text-[15px] leading-relaxed text-ggm-forest">
            Direct mail built around your business, with the flexibility to plan each campaign on your terms.
          </p>

          <div className="mt-6">
            <CallCta />
          </div>

          <ul className="mt-8 space-y-2.5">
            {['Design, printing and mailing in one place', 'Personalized mail for your audience', 'Flexible planning, no long-term contract'].map((f) => (
              <li
                key={f}
                className="flex items-center gap-2.5 font-body text-[14px] text-ggm-charcoal"
              >
                <Check className="h-4 w-4 shrink-0 text-ggm-forest" aria-hidden />
                {f}
              </li>
            ))}
          </ul>
          </div>
        </div>

        {/* The existing form component, unchanged. Still posts to /api/quote
            with source 'quote', so the notification email and the attribution
            behave exactly as they did on /contact. */}
        <div id="quote" className="order-2 scroll-mt-6 rounded-2xl border border-ggm-line bg-ggm-ivory p-5 sm:p-7"><h2 className="mb-5 font-body text-xl font-semibold text-ggm-forest">Request your free quote</h2>{children}</div>
      </div>
    </Section>
  )
}
