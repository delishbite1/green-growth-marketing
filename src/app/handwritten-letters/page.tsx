import { Suspense } from 'react'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Check, Phone } from 'lucide-react'
import ContactForm from '@/components/contact/ContactForm'
import { QuoteSection } from '@/components/home/brand/Sections'
import { JsonLd } from '@/components/seo/StructuredData'
import { business } from '@/config/business'
import { industryGuides } from '@/data/industry-guides'

/*
 * Handwritten direct mail service, the search landing page for letters.
 *
 * Planned in GGM-SEO-HANDWRITTEN-LETTERS-STRATEGY-2026-11-03.md: primary
 * keyword "handwritten direct mail service". Built to the same pattern as
 * /postcard-mailing, with the same quote form below.
 *
 * The production method is not confirmed with the supplier, so every mention
 * is "handwritten style": nothing here says the letters are written by hand,
 * by a robot or with pen and ink. There is also no letter price, no price
 * guarantee, no minimum quantity, no turnaround time and no response rate,
 * because none of those is confirmed. Product options are only the ones
 * already shown on /products.
 */

const TITLE = 'Handwritten Direct Mail Service for U.S. Businesses | GGM'
const DESCRIPTION =
  'Handwritten-style direct mail letters for U.S. businesses. Personalized campaigns, mailing support and full-service fulfillment. Request a free quote.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/handwritten-letters' },
  openGraph: { title: TITLE, description: DESCRIPTION, type: 'website', url: '/handwritten-letters', siteName: business.shortName },
}

const INCLUDED = [
  { h: 'Your message', p: 'We prepare the letter with you around your offer and your audience, or work from wording you already have.' },
  { h: 'The mailing list', p: 'We discuss who you want to reach and the mailing list for your campaign, or mail to a list you already have.' },
  { h: 'Letters and envelopes', p: 'Your letter and its envelope are prepared in a handwritten style, with the envelope addressed to each recipient.' },
  { h: 'Postage and mailing', p: 'We apply postage and send every letter, so nothing passes through your office.' },
]

const SAMPLES = [
  { src: '/products/letter-blue.jpg', w: 1102, h: 1428, name: 'Sample letter', note: 'Illustrative sample', alt: 'Sample handwritten style letter in blue ink on lined paper, written as a template with placeholders for the business name' },
  { src: '/products/letter-black.jpg', w: 1104, h: 1425, name: 'Sample letter', note: 'Illustrative sample', alt: 'Sample handwritten style letter in black ink on lined paper' },
  { src: '/products/env-style-a.jpg', w: 1565, h: 808, name: 'Sample envelope', note: 'Illustrative sample', alt: 'Sample envelope addressed in a handwriting style, with a return address and a Forever stamp' },
  { src: '/products/env-style-c.jpg', w: 1498, h: 735, name: 'Sample envelope with a logo', note: 'Illustrative sample', alt: 'Sample envelope with a business logo and an address in a handwriting style' },
]

const USES = [
  { h: 'Introduce your business', p: 'Reach homeowners in a new service area, or announce a new service, with a personal letter from a local business.' },
  { h: 'Neighborhood campaigns', p: 'Write to the homes around a job you just finished, or to the neighborhoods you most want to work in.' },
  { h: 'Past customers', p: 'Stay in touch with people who already know you, with a seasonal reminder or a thank you.' },
  { h: 'Business outreach', p: 'Contact the owners of businesses you want to work with, at their business address.' },
]

const REAL_ESTATE = [
  { h: 'Homeowner outreach', p: 'Introduce yourself to the homeowners in the area you serve, with a letter addressed to each of them.' },
  { h: 'Prospecting letters', p: 'Write to the owners of properties you would like to list or buy, and invite them to get in touch.' },
  { h: 'Neighborhood campaigns', p: 'Mail a neighborhood you are building a presence in, or the streets around a listing or a recent sale.' },
  { h: 'Seller lead generation', p: 'Ask owners who may be thinking about selling to call you, with one clear way to reply.' },
]

const STEPS = [
  { n: '01', h: 'Tell us about your campaign', p: 'Share your business, who you want to reach, the area and an approximate quantity.' },
  { n: '02', h: 'Choose your audience', p: 'We agree the mailing audience with you, or review the list you already have.' },
  { n: '03', h: 'Approve your letter', p: 'We prepare the message, the letter style and the envelope with you. Nothing is printed until you approve.' },
  { n: '04', h: 'Printing and mailing', p: 'We coordinate printing, addressing, postage and mailing according to the agreed campaign details.' },
]

const WHY = [
  'One team from the first draft to the mailbox, with no separate writer, list broker, printer or mail house to manage',
  'A real person who knows your campaign and answers your questions',
  'Each campaign is quoted on its own, with no subscription and no long term contract',
  'You approve the message and the mailing audience before anything is printed',
]

// The visible FAQ and the FAQPage markup both read this array, so they match word for word.
const LETTER_FAQS = [
  {
    question: 'What does your handwritten direct mail service include?',
    answer:
      'Preparing your message, help with your mailing list, handwritten style letters and envelopes, postage and mailing. You approve the letter and the mailing audience before anything is printed.',
  },
  {
    question: 'Are the letters written by hand?',
    answer:
      'Our letters and envelopes are handwritten style, designed to look like personal handwriting. Ask us about the letter and envelope options for your campaign when we prepare your quote.',
  },
  {
    question: 'Can each letter be personalized?',
    answer:
      'Each envelope is addressed to its recipient. If you would like to personalize the letter itself, tell us what you have in mind and we will confirm what is possible for your campaign.',
  },
  {
    question: 'Can I use my own mailing list or message?',
    answer:
      'Yes. Tell us what you already have and you can share your list or wording with us once your campaign is set up.',
  },
  {
    question: 'Do you work with real estate agents and investors?',
    answer:
      'Yes. We prepare letters for homeowner outreach, prospecting, neighborhood campaigns and seller lead generation, mailed to the audience we agree with you or to your own list.',
  },
  {
    question: 'How much does a handwritten letter campaign cost?',
    answer:
      'Every campaign is quoted on its own, based on the quantity, the letter and envelope style, the mailing list and postage. Request a quote and we will confirm your price before you commit.',
  },
  {
    question: 'Is this a monthly subscription?',
    answer: 'No. Each campaign is quoted on its own, with no subscription, no monthly fee and no long term contract.',
  },
  {
    question: 'When will my letters mail?',
    answer: 'We agree the timing with you. Nothing prints before you approve your final letter and mailing audience.',
  },
  {
    question: 'Should I send letters or postcards?',
    answer:
      'A letter arrives in an envelope and reads like personal mail, which suits introductions and prospecting. A postcard shows your offer without being opened. We can help you choose, and many businesses use both.',
  },
]

function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <p className={`text-[11px] font-semibold uppercase tracking-[0.16em] ${light ? 'text-ggm-gold' : 'text-ggm-gold-ink'}`}>
      {children}
    </p>
  )
}

function Section({ children, className = '', id }: { children: React.ReactNode; className?: string; id?: string }) {
  return (
    <section id={id} className={`scroll-mt-6 px-5 py-14 sm:px-8 sm:py-20 ${className}`}>
      <div className="mx-auto w-full max-w-6xl">{children}</div>
    </section>
  )
}

const quoteButton =
  'inline-flex min-h-[3.1rem] items-center justify-center gap-2 rounded-xl bg-ggm-forest px-6 text-[15px] font-semibold text-ggm-ivory transition hover:bg-ggm-forest-deep'
const quietButton =
  'inline-flex min-h-[3.1rem] items-center justify-center gap-2 rounded-xl border border-ggm-forest/25 bg-ggm-paper px-6 text-[15px] font-semibold text-ggm-forest transition hover:border-ggm-forest/50 hover:bg-ggm-sage-surface/60'
const inlineLink = 'font-semibold text-ggm-forest underline decoration-ggm-gold underline-offset-4'

function Hero() {
  return (
    <section className="border-b border-ggm-line/70 bg-ggm-ivory px-5 pb-14 pt-10 sm:px-8 sm:pb-20 sm:pt-16">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
        <div>
          <Eyebrow>Handwritten direct mail service</Eyebrow>
          <h1 className="mt-4 font-display text-[2.15rem] font-medium leading-[1.08] tracking-[-0.01em] text-ggm-forest sm:text-[2.9rem] lg:text-[3.2rem]">
            Handwritten-Style Direct Mail, Prepared and Mailed for You
          </h1>
          <p className="mt-5 max-w-xl font-body text-[16px] leading-relaxed text-ggm-charcoal sm:text-[17px]">
            Handwritten style letters bring a personal touch to your marketing. We prepare your
            message and your mailing list, then address and mail every letter, for businesses across
            the United States.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="#quote" className={quoteButton}>
              Get a Free Quote <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <Link href="#styles" className={quietButton}>
              See letter styles
            </Link>
          </div>
          <a href={business.phoneHref} className="mt-5 inline-flex min-h-11 items-center gap-2 font-body text-[15px] font-semibold text-ggm-forest">
            <Phone className="h-4 w-4" aria-hidden /> Prefer to talk? {business.phone}
          </a>
        </div>
        <figure className="mx-auto w-full max-w-[26rem] lg:max-w-none">
          <div className="overflow-hidden rounded-[1.25rem] bg-ggm-paper p-2.5 shadow-[0_2px_4px_rgba(16,42,35,0.08),0_30px_60px_-30px_rgba(16,42,35,0.45)] ring-1 ring-ggm-line">
            <Image
              src="/products/letter-blue.jpg"
              alt="Sample handwritten style letter in blue ink on lined paper, written as a template with placeholders for the business name"
              width={1102}
              height={1428}
              priority
              sizes="(min-width: 1024px) 40vw, 92vw"
              className="block h-auto w-full rounded-[0.9rem]"
            />
          </div>
          <figcaption className="mt-3 font-body text-[12.5px] text-ggm-muted">
            Sample letter layout. Your message and details replace the template text.
          </figcaption>
        </figure>
      </div>
    </section>
  )
}

function Included() {
  return (
    <Section className="bg-ggm-paper">
      <div className="max-w-2xl">
        <Eyebrow>What&apos;s included</Eyebrow>
        <h2 className="mt-3 font-display text-[1.75rem] font-medium leading-tight text-ggm-forest sm:text-[2.2rem]">
          Handwritten style letters and envelopes, handled end to end
        </h2>
        <p className="mt-4 font-body text-[15.5px] leading-relaxed text-ggm-muted">
          Instead of splitting your campaign between a writer, a list provider, a printer and a mail
          house, you work with one team that brings it all together, with one price to approve.
        </p>
      </div>
      <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {INCLUDED.map((item, i) => (
          <li key={item.h} className="rounded-[1.1rem] border border-ggm-line bg-ggm-ivory p-6">
            <span className="font-display text-xl font-medium text-ggm-gold-ink">0{i + 1}</span>
            <h3 className="mt-3 font-display text-[17px] font-medium text-ggm-forest">{item.h}</h3>
            <p className="mt-2 font-body text-[14px] leading-relaxed text-ggm-muted">{item.p}</p>
          </li>
        ))}
      </ul>
    </Section>
  )
}

function Styles() {
  return (
    <Section className="bg-ggm-ivory" id="styles">
      <div className="grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-end">
        <div>
          <Eyebrow>Letter and envelope styles</Eyebrow>
          <h2 className="mt-3 font-display text-[1.75rem] font-medium leading-tight text-ggm-forest sm:text-[2.2rem]">
            Handwritten style mailers in the look that fits your brand
          </h2>
        </div>
        <p className="font-body text-[15px] leading-relaxed text-ggm-muted">
          These samples show the kind of letters and envelopes we mail. The styles and options for
          your campaign are confirmed with you in your quote. See more samples on our{' '}
          <Link href="/products" className={inlineLink}>
            products page
          </Link>
          .
        </p>
      </div>
      <ul className="mt-10 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
        {SAMPLES.map((s) => (
          <li key={s.src} className="flex flex-col overflow-hidden rounded-[1.1rem] border border-ggm-line bg-ggm-paper">
            <div className="flex aspect-[4/5] items-center justify-center bg-[#503A30] p-2.5 sm:p-4">
              <Image
                src={s.src}
                alt={s.alt}
                width={s.w}
                height={s.h}
                sizes="(min-width: 1024px) 22vw, 45vw"
                className="h-auto max-h-full w-auto max-w-full object-contain"
              />
            </div>
            <div className="p-3.5 sm:p-5">
              <h3 className="font-display text-[15px] font-medium leading-snug text-ggm-forest sm:text-[16.5px]">{s.name}</h3>
              <p className="mt-1 font-body text-[12.5px] leading-snug text-ggm-muted sm:text-[13.5px]">{s.note}</p>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  )
}

function Personalized() {
  return (
    <Section className="bg-ggm-paper">
      <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-14">
        <figure className="order-2 lg:order-1">
          <div className="overflow-hidden rounded-[1.25rem] bg-ggm-ivory p-2.5 ring-1 ring-ggm-line">
            <Image
              src="/products/env-style-a.jpg"
              alt="Sample envelope addressed in a handwritten style to a fictional recipient"
              width={1565}
              height={808}
              sizes="(min-width: 1024px) 45vw, 92vw"
              className="block h-auto w-full rounded-[0.9rem]"
            />
          </div>
          <figcaption className="mt-3 font-body text-[12.5px] text-ggm-muted">
            Illustrative sample for a fictional recipient.
          </figcaption>
        </figure>
        <div className="order-1 lg:order-2">
          <Eyebrow>Personalization</Eyebrow>
          <h2 className="mt-3 font-display text-[1.75rem] font-medium leading-tight text-ggm-forest sm:text-[2.2rem]">
            Personalized direct mail letters, addressed to each recipient
          </h2>
          <p className="mt-4 font-body text-[15.5px] leading-relaxed text-ggm-charcoal">
            Every letter goes out in an envelope addressed to its recipient in a handwritten style, so
            each one arrives as a letter to one person, even when you are mailing many.
          </p>
          <p className="mt-4 font-body text-[15px] leading-relaxed text-ggm-muted">
            Want to personalize the letter itself? Tell us when you request your quote and we will
            confirm what is possible for your campaign.
          </p>
        </div>
      </div>
    </Section>
  )
}

function Uses() {
  return (
    <Section className="bg-ggm-ivory">
      <div className="max-w-2xl">
        <Eyebrow>Who it&apos;s for</Eyebrow>
        <h2 className="mt-3 font-display text-[1.75rem] font-medium leading-tight text-ggm-forest sm:text-[2.2rem]">
          Handwritten direct mail marketing for growing businesses
        </h2>
        <p className="mt-4 font-body text-[15.5px] leading-relaxed text-ggm-muted">
          A letter suits the moments when you want a conversation rather than a quick look: an
          introduction, an invitation or a personal follow up.
        </p>
      </div>
      <ul className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {USES.map((u) => (
          <li key={u.h} className="border-t border-ggm-line pt-5">
            <h3 className="font-display text-[16.5px] font-medium text-ggm-forest">{u.h}</h3>
            <p className="mt-1.5 font-body text-[14px] leading-relaxed text-ggm-muted">{u.p}</p>
          </li>
        ))}
      </ul>
      <p className="mt-10 font-body text-[14px] font-semibold uppercase tracking-[0.12em] text-ggm-gold-ink">
        Guides for service businesses
      </p>
      <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {industryGuides.map((g) => (
          <li key={g.slug}>
            <Link
              href={`/industries/${g.slug}`}
              className="group flex min-h-[3.25rem] items-center justify-between gap-3 rounded-xl border border-ggm-line bg-ggm-paper px-4 font-body text-[14.5px] font-semibold text-ggm-forest transition hover:border-ggm-forest/40"
            >
              {g.industry}
              <ArrowRight className="h-4 w-4 shrink-0 text-ggm-gold-ink transition group-hover:translate-x-0.5" aria-hidden />
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  )
}

function RealEstate() {
  return (
    <Section className="bg-ggm-forest" id="real-estate">
      <div className="max-w-2xl">
        <Eyebrow light>Real estate</Eyebrow>
        <h2 className="mt-3 font-display text-[1.75rem] font-medium leading-tight text-ggm-ivory sm:text-[2.2rem]">
          Handwritten letters for real estate agents and investors
        </h2>
        <p className="mt-4 font-body text-[15.5px] leading-relaxed text-ggm-ivory/85">
          Real estate is built on trust in a neighborhood. A handwritten style letter, addressed to
          the owner, is a personal way to start that conversation. We discuss the audience and the areas
          you want to reach with you, or mail to your own list.
        </p>
      </div>
      <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {REAL_ESTATE.map((r) => (
          <li key={r.h} className="rounded-[1.1rem] border border-ggm-ivory/15 bg-ggm-forest-deep/40 p-6">
            <h3 className="font-display text-[17px] font-medium text-ggm-ivory">{r.h}</h3>
            <p className="mt-2 font-body text-[14px] leading-relaxed text-ggm-ivory/80">{r.p}</p>
          </li>
        ))}
      </ul>
      <p className="mt-8 max-w-3xl font-body text-[13.5px] leading-relaxed text-ggm-ivory/70">
        You approve every letter before it is printed, so you can check that the message fits the
        rules for your license and your market.
      </p>
    </Section>
  )
}

function Process() {
  return (
    <Section className="bg-ggm-paper" id="how-it-works">
      <Eyebrow>How it works</Eyebrow>
      <h2 className="mt-3 font-display text-[1.75rem] font-medium leading-tight text-ggm-forest sm:text-[2.2rem]">
        How a handwritten letter campaign comes together
      </h2>
      <ol className="mt-9 grid gap-7 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
        {STEPS.map((s) => (
          <li key={s.n} className="border-t border-ggm-line pt-5">
            <span className="font-display text-xl font-medium text-ggm-sage">{s.n}</span>
            <h3 className="mt-2 font-display text-[16.5px] font-medium text-ggm-forest">{s.h}</h3>
            <p className="mt-1.5 font-body text-[14px] leading-relaxed text-ggm-muted">{s.p}</p>
          </li>
        ))}
      </ol>
    </Section>
  )
}

function Bulk() {
  return (
    <Section className="border-y border-ggm-line/70 bg-ggm-ivory">
      <div className="grid gap-8 rounded-[1.25rem] border border-ggm-line bg-ggm-paper p-7 sm:p-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
        <div>
          <Eyebrow>Bulk handwritten letters</Eyebrow>
          <h2 className="mt-3 font-display text-[1.65rem] font-medium leading-tight text-ggm-forest sm:text-[2rem]">
            Bulk handwritten letters, quoted for your campaign
          </h2>
          <p className="mt-4 font-body text-[15px] leading-relaxed text-ggm-charcoal">
            Whether you are planning a first campaign or a large mailing, we quote each campaign on
            its own: the quantity, the letter and envelope style, the mailing list and postage. Your
            price is confirmed with you before you commit.
          </p>
          <p className="mt-4 font-body text-[15px] leading-relaxed text-ggm-charcoal">
            Prefer a format with no envelope to open? See our{' '}
            <Link href="/postcard-mailing" className={inlineLink}>
              postcard mailing service
            </Link>
            .
          </p>
        </div>
        <ul className="space-y-4 self-center border-ggm-line lg:border-l lg:pl-10">
          {['A custom quote for every campaign', 'No subscription or monthly fee', 'No long term contract'].map((t) => (
            <li key={t} className="flex items-start gap-3 font-body text-[15px] text-ggm-forest">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-ggm-gold-ink" aria-hidden />
              {t}
            </li>
          ))}
        </ul>
      </div>
    </Section>
  )
}

function WhyGgm() {
  return (
    <Section className="bg-ggm-forest">
      <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-14">
        <div>
          <Eyebrow light>Why GGM</Eyebrow>
          <h2 className="mt-3 font-display text-[1.75rem] font-medium leading-tight text-ggm-ivory sm:text-[2.2rem]">
            A fully managed handwritten mail service
          </h2>
          <p className="mt-4 font-body text-[15.5px] leading-relaxed text-ggm-ivory/85">
            With us you are not left to set up your campaign alone. We plan your campaign with you, then take care of the
            message, the list, the printing and the mailing.
          </p>
          <p className="mt-4 font-body text-[15px] leading-relaxed text-ggm-ivory/85">
            Already have a quote from another company? We&apos;d be happy to review it and see if we
            can offer a better price for comparable specifications. A lower price isn&apos;t guaranteed.
          </p>
        </div>
        <ul className="space-y-4 self-center">
          {WHY.map((w) => (
            <li key={w} className="flex items-start gap-3 border-b border-ggm-ivory/15 pb-4 font-body text-[15px] leading-relaxed text-ggm-ivory last:border-b-0">
              <Check className="mt-1 h-4 w-4 shrink-0 text-ggm-gold" aria-hidden />
              {w}
            </li>
          ))}
        </ul>
      </div>
    </Section>
  )
}

function Faq() {
  return (
    <Section className="bg-ggm-ivory">
      <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <Eyebrow>Questions</Eyebrow>
          <h2 className="mt-3 font-display text-[1.75rem] font-medium leading-tight text-ggm-forest sm:text-[2.2rem]">
            Handwritten direct mail, answered
          </h2>
        </div>
        <div className="divide-y divide-ggm-forest/15">
          {LETTER_FAQS.map((item) => (
            <details key={item.question} className="group py-4">
              <summary className="cursor-pointer py-2 font-body text-base font-semibold text-ggm-forest">{item.question}</summary>
              <p className="mt-3 max-w-2xl font-body text-sm leading-relaxed text-ggm-muted">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </Section>
  )
}

function PageStructuredData() {
  const url = `${business.siteUrl}/handwritten-letters`
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'Service',
            '@id': `${url}#service`,
            name: 'Handwritten direct mail service',
            serviceType: 'Handwritten style letter printing and mailing',
            description: DESCRIPTION,
            url,
            provider: { '@id': `${business.siteUrl}/#organization` },
            areaServed: { '@type': 'Country', name: 'United States' },
          },
          {
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: `${business.siteUrl}/` },
              { '@type': 'ListItem', position: 2, name: 'Handwritten letters', item: url },
            ],
          },
          {
            '@type': 'FAQPage',
            '@id': `${url}#faq`,
            mainEntity: LETTER_FAQS.map((faq) => ({
              '@type': 'Question',
              name: faq.question,
              acceptedAnswer: { '@type': 'Answer', text: faq.answer },
            })),
          },
        ],
      }}
    />
  )
}

export default function HandwrittenLettersPage() {
  return (
    <>
      <Hero />
      <Included />
      <Styles />
      <Personalized />
      <Uses />
      <RealEstate />
      <Process />
      <Bulk />
      <WhyGgm />
      <Faq />
      <QuoteSection>
        {/* Suspense for the same reason as on the homepage: ContactForm reads
            the query string, and this page is statically rendered. */}
        <Suspense fallback={<div className="min-h-[28rem]" aria-hidden />}>
          <ContactForm />
        </Suspense>
      </QuoteSection>
      <PageStructuredData />
    </>
  )
}
