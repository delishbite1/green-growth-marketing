import PageHero from '@/components/brand/PageHero'
import type { Metadata } from 'next'
import IndustriesGrid from '@/components/industries/IndustriesGrid'
import CTABanner from '@/components/shared/CTABanner'

export const metadata: Metadata = {
  alternates: { canonical: '/industries' },
  title: 'Industries We Serve | Green Growth Marketing',
  description:
    'Direct mail marketing campaigns for 80+ industries, from home services to healthcare, real estate, restaurants, and more. Custom campaigns for any business type.',
}

export default function IndustriesPage() {
  return (
    <>
      {/* Hero */}
      <PageHero eyebrow="Industries we serve" title="Your business. Your neighborhood. Your message." description="Explore campaign ideas for your industry and find a direct mail approach that fits your audience." />

      {/* Grid section */}
      <section className="py-14 px-6 lg:px-8 bg-ggm-ivory min-h-screen">
        <div className="max-w-7xl mx-auto">
          <IndustriesGrid />
        </div>
      </section>

      <CTABanner
        heading="Don't See Your Industry?"
        subheading="We work with businesses in every sector. If you can mail it, we can handle it. Get a custom quote for your industry today."
      />
    </>
  )
}
