import IndustryIcon from '@/components/industries/IndustryIcon'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Phone, Check } from 'lucide-react'
import { business } from '@/config/business'
import { industryGuides, guideBySlug } from '@/data/industry-guides'
import { industries } from '@/data/industries'

/**
 * One page per trade GGM actually sells to.
 *
 * Somebody typing "direct mail for roofers" is a customer, not a browser, and
 * until now the only thing on this site that could answer them was a modal
 * inside /industries that Google cannot see or link to. These pages are the
 * whole organic play: long tail, low competition, and unambiguously commercial.
 *
 * Only trades with a written guide get a page. That limit is the point rather
 * than laziness. Eighty two pages differing by one swapped sentence is thin
 * content, Google treats a set of those as doorway pages, and the penalty lands
 * on the whole site rather than on the weak pages. Ten real ones beat eighty
 * two templates, and the eleventh is written when somebody writes it.
 */

export function generateStaticParams() {
  return industryGuides.map((g) => ({ slug: g.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const guide = guideBySlug((await params).slug)
  if (!guide) return {}

  return {
    title: `${guide.title} | ${business.shortName}`,
    description: guide.metaDescription,
    // Relative, resolved against metadataBase in the root layout, so the apex
    // domain is used and these never inherit the dead www host.
    alternates: { canonical: `/industries/${guide.slug}` },
    openGraph: {
      title: guide.title,
      description: guide.metaDescription,
      url: `/industries/${guide.slug}`,
      type: 'article',
    },
  }
}

/** A heading and its prose, so the page body stays readable below. */
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className="text-xl font-bold tracking-tight text-ggm-forest sm:text-2xl">{title}</h2>
      <p className="mt-3 text-[15px] leading-relaxed text-ggm-muted">{children}</p>
    </section>
  )
}

export default async function IndustryGuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const guide = guideBySlug((await params).slug)
  if (!guide) notFound()

  // The icon and the campaign ideas already exist on the hub entry. Reusing
  // them keeps one description of each trade rather than two that drift.
  const entry = industries.find((i) => i.name === guide.industry)

  return (
    <div className="mx-auto max-w-3xl px-5 py-12 sm:py-16">
      <Link
        href="/industries"
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-ggm-muted transition hover:text-ggm-forest"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden />
        All industries
      </Link>

      <header className="mt-6 rounded-3xl border border-ggm-forest/10 bg-ggm-forest p-6 sm:p-9">
        {entry && (
          <div className="mb-3 text-4xl" aria-hidden>
            <IndustryIcon name={entry.name} category={entry.category} className="h-9 w-9 text-ggm-gold" />
          </div>
        )}
        <h1 className="text-3xl font-bold tracking-tight text-ggm-ivory sm:text-4xl">
          {guide.title}
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-ggm-ivory/85">{guide.intro}</p>
      </header>

      <Section title="Who to mail">{guide.audience}</Section>
      <Section title="When to mail">{guide.timing}</Section>
      <Section title="What to put on it">{guide.message}</Section>
      <Section title="How many to send">{guide.volume}</Section>

      <section className="mt-10">
        <h2 className="text-xl font-bold tracking-tight text-ggm-forest sm:text-2xl">
          Campaigns that work for {guide.industry.toLowerCase()}
        </h2>
        <ul className="mt-4 space-y-2.5">
          {guide.ideas.map((idea) => (
            <li key={idea} className="flex items-start gap-3">
              <Check className="mt-0.5 h-5 w-5 shrink-0 text-ggm-forest" aria-hidden />
              <span className="text-[15px] leading-relaxed text-gray-700">{idea}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* The guarantee, in the conditional form used everywhere else on the
          site. The unconditional version was removed before launch and must not
          creep back in one page at a time. */}
      <section className="mt-12 rounded-2xl bg-ggm-sage-surface p-6 sm:p-8">
        <h2 className="text-xl font-bold tracking-tight text-ggm-forest sm:text-2xl">
          We handle all of it
        </h2>
        <p className="mt-3 text-[15px] leading-relaxed text-ggm-muted">
          Design, the mailing list, printing, addressing, postage and the trip to USPS. You
          review the artwork with us as your campaign takes shape. Planning is flexible,
          with no long-term contract. Have a quote from another company? We would be happy
          to review it and see if we can offer a better price for comparable specifications.
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link
            href={`/contact?industry=${encodeURIComponent(guide.industry)}#quote-form`}
            className="inline-flex items-center justify-center rounded-xl bg-ggm-forest px-6 py-3 text-sm font-bold text-white transition hover:bg-ggm-forest"
          >
            Get a free quote
          </Link>
          <a
            href={business.phoneHref}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-300 bg-ggm-paper px-6 py-3 text-sm font-bold text-gray-700 transition hover:bg-ggm-ivory"
          >
            <Phone className="h-4 w-4" aria-hidden />
            {business.phone}
          </a>
        </div>
      </section>

      {/* Internal links. A page with no way out is a page Google reads as a dead
          end, and these are the closest trades a visitor might also be. */}
      <nav className="mt-12 border-t border-ggm-line pt-6">
        <h2 className="text-xs font-bold uppercase tracking-wide text-gray-400">
          Other trades we mail for
        </h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {industryGuides
            .filter((g) => g.slug !== guide.slug)
            .map((g) => (
              <Link
                key={g.slug}
                href={`/industries/${g.slug}`}
                className="rounded-full border border-ggm-line px-3 py-1.5 text-[13px] font-medium text-ggm-muted transition hover:border-ggm-sage hover:text-ggm-forest"
              >
                {g.industry}
              </Link>
            ))}
        </div>
      </nav>
    </div>
  )
}
