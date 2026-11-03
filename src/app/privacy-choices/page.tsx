import type { Metadata } from 'next'
import PageHero from '@/components/brand/PageHero'
import PrivacyChoicesPanel from '@/components/privacy/PrivacyChoicesPanel'

export const metadata: Metadata = {
  alternates: { canonical: '/privacy-choices' },
  title: 'Your Privacy Choices | Green Growth Marketing',
  description: 'Turn advertising tracking on or off for this browser.',
  // A settings page, not something to rank.
  robots: { index: false, follow: true },
}

export default function PrivacyChoicesPage() {
  return (
    <>
      <PageHero compact eyebrow="Your information" title="Your Privacy Choices" description="Choose whether this website uses advertising tracking on your browser." />
      <section className="py-14 lg:py-16 px-6 lg:px-8 bg-ggm-paper">
        <div className="max-w-3xl mx-auto">
          <PrivacyChoicesPanel />
        </div>
      </section>
    </>
  )
}
