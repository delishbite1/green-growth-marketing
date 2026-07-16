import type { Metadata } from 'next'
import IndustriesGrid from '@/components/industries/IndustriesGrid'
import CTABanner from '@/components/shared/CTABanner'

export const metadata: Metadata = {
  title: 'Industries We Serve | Green Growth Marketing',
  description:
    'Direct mail marketing campaigns for 80+ industries, from home services to healthcare, real estate, restaurants, and more. Custom campaigns for any business type.',
}

export default function IndustriesPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-20 lg:py-28 px-6 lg:px-8 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0d1f0d 0%, #1a4a1a 25%, #1a1040 55%, #2d1060 80%, #0d0d1f 100%)' }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-green-500/10 blur-3xl translate-x-1/3 -translate-y-1/3" />
          <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-violet-500/10 blur-3xl -translate-x-1/3 translate-y-1/3" />
        </div>
        <div className="max-w-4xl mx-auto text-center relative">
          <div className="inline-flex items-center gap-2 bg-green-500/15 border border-green-500/25 text-green-300 text-xs font-bold px-4 py-2 rounded-full mb-6">
            80+ Industries
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-5 leading-tight">
            Direct Mail for{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-300">
              Every Industry
            </span>
          </h1>
          <p className="text-gray-300 text-lg leading-relaxed max-w-2xl mx-auto">
            Whether you&rsquo;re a solo contractor or a national chain, we have the targeting to get your message in front of the right customers. Click any industry to learn more.
          </p>
        </div>
      </section>

      {/* Grid section */}
      <section className="py-14 px-6 lg:px-8 bg-gray-50 min-h-screen">
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
