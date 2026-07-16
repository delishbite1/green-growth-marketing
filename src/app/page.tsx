import Hero from '@/components/home/Hero'
import Services from '@/components/home/Services'
import WhyChooseUs from '@/components/home/WhyChooseUs'
import Guarantee from '@/components/home/Guarantee'
import FAQ from '@/components/home/FAQ'
import CTABanner from '@/components/shared/CTABanner'
import HowItWorks from '@/components/home/HowItWorks'

export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <HowItWorks />
      <WhyChooseUs />
      <Guarantee />
      <FAQ />
      <CTABanner />
    </>
  )
}
