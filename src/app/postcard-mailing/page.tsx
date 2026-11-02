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
import { PACKAGES } from '@/lib/postcards/packages'

/*
 * Postcard mailing service, the search landing page for the postcard offer.
 *
 * Planned in GGM-SEO-POSTCARD-MAILING-STRATEGY-2026-11-02.md: primary keyword
 * "postcard mailing service", for businesses comparing full service vendors.
 * /postcards stays the noindex request form for paid traffic; this page
 * explains the service and sends people either to that form or to the quote
 * form below, both unchanged.
 *
 * GGM mails postcards in more than one size. PACKAGES is the approved price
 * list for 9 × 11 campaigns ONLY, so every price here is labelled 9 × 11 and
 * other sizes are quoted. Nothing on this page states a response rate, a
 * delivery time, a targeting filter beyond the area chosen, tracking or a
 * price guarantee, because none of those is confirmed for postcards.
 */

const TITLE = 'Postcard Mailing Services: Designed, Printed & Mailed | GGM'
const DESCRIPTION =
  'Full service postcard mailing for U.S. businesses. We design, print and mail your postcards to a targeted homeowner list. 9 × 11 campaigns from $640.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/postcard-mailing' },
  openGraph: { title: TITLE, description: DESCRIPTION, type: 'website', url: '/postcard-mailing', siteName: business.shortName },
}

const count = (n: number) => n.toLocaleString('en-US')
const dollars = (cents: number) =>
  `$${(cents / 100).toLocaleString('en-US', { minimumFractionDigits: cents % 100 ? 2 : 0 })}`

const INCLUDED = [
  { h: 'Postcard design', p: 'Our team designs your postcard around your offer and brand. Already have artwork? We can work from your files.' },
  { h: 'A targeted homeowner list', p: 'We prepare a mailing list of homeowners in the area you want to reach, or mail to a list you already have.' },
  { h: 'Full color printing', p: 'Your postcard is printed in full color on both sides, ready for the mail.' },
  { h: 'Postage and mailing', p: 'We apply postage and send your postcards, so nothing passes through your office.' },
]

const STEPS = [
  { n: '01', h: 'Tell us about your campaign', p: 'Share your business, the area you want to reach, the size you have in mind and an approximate quantity.' },
  { n: '02', h: 'Review your quote', p: 'We confirm your price for the size, quantity, mailing list and postage your campaign needs.' },
  { n: '03', h: 'Approve your design and list', p: 'We prepare the design and the mailing audience with you. Nothing is printed or mailed until you approve.' },
  { n: '04', h: 'Printing and mailing', p: 'We coordinate printing, addressing and mailing according to the agreed campaign details.' },
]

const WHY = [
  'One team from design to the mailbox, with no separate printer, list broker or mail house to manage',
  'A real person who knows your campaign and answers your questions',
  'Each price is for one campaign, with no long term contract',
  'You approve the design and mailing audience before anything is printed',
]

// The visible FAQ and the FAQPage markup both read this array, so they match word for word.
const POSTCARD_FAQS = [
  {
    question: 'What does your postcard mailing service include?',
    answer:
      'Postcard design, a targeted homeowner mailing list, full color printing, postage and mailing. You approve the design and the mailing audience before anything is printed.',
  },
  {
    question: 'What postcard sizes do you offer?',
    answer:
      'We print and mail postcards in several sizes. The campaign prices on this page are for 9 × 11 postcards. Other sizes, including the 6 × 11 formats on our products page, are quoted for each campaign.',
  },
  {
    question: 'Can I use my own mailing list or artwork?',
    answer:
      'Yes. Tell us what you already have and you can share your list or files with us once your campaign is set up.',
  },
  {
    question: 'Is this a monthly subscription?',
    answer:
      'No. Each price is for a single campaign, with no subscription, no monthly fee and no long term contract.',
  },
  {
    question: 'Do I pay anything when I request a campaign?',
    answer:
      'No. Sending a request is free and does not place an order. We discuss your price and payment terms with you directly before you commit.',
  },
  {
    question: 'When will my postcards mail?',
    answer:
      'We agree the timing with you. Nothing prints before you approve your final design and mailing audience.',
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

function Hero() {
  return (
    <section className="border-b border-ggm-line/70 bg-ggm-ivory px-5 pb-14 pt-10 sm:px-8 sm:pb-20 sm:pt-16">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
        <div>
          <Eyebrow>Postcard mailing service</Eyebrow>
          <h1 className="mt-4 font-display text-[2.15rem] font-medium leading-[1.08] tracking-[-0.01em] text-ggm-forest sm:text-[2.9rem] lg:text-[3.2rem]">
            Postcard mailing services, designed, printed and mailed for you
          </h1>
          <p className="mt-5 max-w-xl font-body text-[16px] leading-relaxed text-ggm-charcoal sm:text-[17px]">
            We run your postcard campaign from first draft to the mailbox: the design, a targeted
            homeowner list, full color printing and postage, handled by one team for businesses
            across the United States.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="#quote" className={quoteButton}>
              Get a Free Quote <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <Link href="#pricing" className={quietButton}>
              See 9 × 11 pricing
            </Link>
          </div>
          <a href={business.phoneHref} className="mt-5 inline-flex min-h-11 items-center gap-2 font-body text-[15px] font-semibold text-ggm-forest">
            <Phone className="h-4 w-4" aria-hidden /> Prefer to talk? {business.phone}
          </a>
        </div>
        <figure>
          <div className="overflow-hidden rounded-[1.25rem] bg-ggm-paper p-2.5 shadow-[0_2px_4px_rgba(16,42,35,0.08),0_30px_60px_-30px_rgba(16,42,35,0.45)] ring-1 ring-ggm-line">
            <Image
              src="/products/postcard-premium-card.jpg"
              alt="Sample 9 by 11 inch postcard design for a roofing company"
              width={1345}
              height={858}
              priority
              sizes="(min-width: 1024px) 45vw, 92vw"
              className="block h-auto w-full rounded-[0.9rem]"
            />
          </div>
          <figcaption className="mt-3 font-body text-[12.5px] text-ggm-muted">
            Sample 9 × 11 design. The business details shown are not GGM&apos;s.
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
          Postcard printing and mailing services, handled end to end
        </h2>
        <p className="mt-4 font-body text-[15.5px] leading-relaxed text-ggm-muted">
          Instead of splitting your campaign between a designer, a list provider and a printer,
          you work with one team that brings it all together, with one price to approve.
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

function Sizes() {
  return (
    <Section className="bg-ggm-ivory">
      <div className="grid gap-8 rounded-[1.25rem] border border-ggm-line bg-ggm-paper p-7 sm:p-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
        <div>
          <Eyebrow>Postcard sizes</Eyebrow>
          <h2 className="mt-3 font-display text-[1.65rem] font-medium leading-tight text-ggm-forest sm:text-[2rem]">
            Oversized postcards, and other sizes when your campaign needs them
          </h2>
          <p className="mt-4 font-body text-[15px] leading-relaxed text-ggm-charcoal">
            Our 9 × 11 postcard is a large format with room for your offer, your photography and
            a clear call to action. It is the size our campaign pricing is built on.
          </p>
          <p className="mt-4 font-body text-[15px] leading-relaxed text-ggm-charcoal">
            We also print and mail other postcard sizes, including the 6 × 11 formats on our{' '}
            <Link href="/products" className="font-semibold text-ggm-forest underline decoration-ggm-gold underline-offset-4">
              products page
            </Link>
            , as well as custom campaigns. Those are quoted for each campaign.
          </p>
        </div>
        <ul className="space-y-4 self-center border-ggm-line lg:border-l lg:pl-10">
          {['9 × 11 campaigns with set pricing', 'Other sizes quoted per campaign', 'Custom campaign options by quote'].map((t) => (
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

function WhoItsFor() {
  return (
    <Section className="bg-ggm-ivory pt-0 sm:pt-0">
      <div className="max-w-2xl">
        <Eyebrow>Who it&apos;s for</Eyebrow>
        <h2 className="mt-3 font-display text-[1.75rem] font-medium leading-tight text-ggm-forest sm:text-[2.2rem]">
          Targeted postcard marketing for service businesses
        </h2>
        <p className="mt-4 font-body text-[15.5px] leading-relaxed text-ggm-muted">
          A postcard needs no opening: your offer is in front of the homeowner the moment the mail
          is picked up. That suits local service businesses announcing a new service, reaching a
          new area, mailing ahead of their busy season or staying in touch with past customers.
        </p>
      </div>
      <ul className="mt-9 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
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
      <Link href="/industries" className="mt-6 inline-flex min-h-11 items-center gap-2 font-body text-[14.5px] font-semibold text-ggm-forest underline decoration-ggm-gold underline-offset-4">
        See all industries <ArrowRight className="h-4 w-4" aria-hidden />
      </Link>
    </Section>
  )
}

function Process() {
  return (
    <Section className="bg-ggm-paper" id="how-it-works">
      <Eyebrow>How it works</Eyebrow>
      <h2 className="mt-3 font-display text-[1.75rem] font-medium leading-tight text-ggm-forest sm:text-[2.2rem]">
        How a postcard campaign comes together
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

function Pricing() {
  return (
    <Section className="border-y border-ggm-line/70 bg-ggm-ivory" id="pricing">
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
        <div>
          <Eyebrow>Bulk postcard mailing</Eyebrow>
          <h2 className="mt-3 font-display text-[1.75rem] font-medium leading-tight text-ggm-forest sm:text-[2.2rem]">
            9×11 Postcard Campaign Pricing
          </h2>
          <p className="mt-4 font-body text-[15.5px] leading-relaxed text-ggm-charcoal">
            Each price covers one 9 × 11 campaign, including design, a targeted homeowner list,
            full color printing and postage. It is a one time campaign price, with no subscription
            and no monthly fee.
          </p>
          <p className="mt-4 font-body text-[14px] leading-relaxed text-ggm-muted">
            These prices apply to 9 × 11 postcards only. Other sizes and custom campaigns are
            quoted. Prices are estimates; your final price, including any applicable sales tax, is
            confirmed with you before you commit.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
            <Link href="/postcards" className={quoteButton}>
              Start a 9 × 11 campaign <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <Link href="#quote" className={quietButton}>
              Quote another size
            </Link>
          </div>
        </div>

        <div className="overflow-hidden rounded-[1.25rem] bg-ggm-paper shadow-[0_1px_2px_rgba(23,61,50,0.05),0_22px_44px_-30px_rgba(23,61,50,0.35)] ring-1 ring-ggm-line">
          <table className="w-full font-body [font-variant-numeric:lining-nums_tabular-nums]">
            <caption className="sr-only">9 × 11 postcard campaign prices, printing and postage included</caption>
            <thead>
              <tr className="bg-ggm-forest text-left text-[11px] font-semibold uppercase tracking-[0.14em] text-ggm-ivory">
                <th scope="col" className="px-5 py-3.5 sm:px-6">Postcards</th>
                <th scope="col" className="px-3 py-3.5 text-right">Per postcard</th>
                <th scope="col" className="px-5 py-3.5 text-right sm:px-6">Campaign total</th>
              </tr>
            </thead>
            <tbody>
              {PACKAGES.map((pkg) => (
                <tr key={pkg.quantity} className="border-t border-ggm-line first:border-t-0">
                  <th scope="row" className="px-5 py-3.5 text-left text-[15px] font-semibold text-ggm-forest sm:px-6">
                    {count(pkg.quantity)}
                  </th>
                  <td className="px-3 py-3.5 text-right text-[14.5px] text-ggm-muted">{dollars(pkg.unitPriceCents)}</td>
                  <td className="px-5 py-3.5 text-right font-display text-[19px] font-medium text-ggm-forest sm:px-6">
                    {dollars(pkg.totalCents)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
            Choosing among postcard mailing companies
          </h2>
          <p className="mt-4 font-body text-[15.5px] leading-relaxed text-ggm-ivory/85">
            With us you are not left to work it out alone. We plan your campaign with you, then
            take care of the design, the list, the printing and the mailing.
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
            Postcard mailing, answered
          </h2>
        </div>
        <div className="divide-y divide-ggm-forest/15">
          {POSTCARD_FAQS.map((item) => (
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
  const url = `${business.siteUrl}/postcard-mailing`
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'Service',
            '@id': `${url}#service`,
            name: 'Postcard mailing service',
            serviceType: 'Postcard printing and mailing',
            description: DESCRIPTION,
            url,
            provider: { '@id': `${business.siteUrl}/#organization` },
            areaServed: { '@type': 'Country', name: 'United States' },
          },
          {
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: `${business.siteUrl}/` },
              { '@type': 'ListItem', position: 2, name: 'Postcard mailing', item: url },
            ],
          },
          {
            '@type': 'FAQPage',
            '@id': `${url}#faq`,
            mainEntity: POSTCARD_FAQS.map((faq) => ({
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

export default function PostcardMailingPage() {
  return (
    <>
      <Hero />
      <Included />
      <Sizes />
      <WhoItsFor />
      <Process />
      <Pricing />
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
