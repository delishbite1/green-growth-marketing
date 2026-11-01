import { Suspense } from 'react'
import ContactForm from '@/components/contact/ContactForm'
import Hero from '@/components/home/ApprovedHero'
import {
  WhatWeSend,
  Industries,
  HowItWorks,
  QuoteSection,
} from '@/components/home/brand/Sections'
import CampaignFAQ from '@/components/brand/CampaignFAQ'

/**
 * The homepage, reordered around the questions a business owner asks.
 *
 * The old order was hero, services, how it works, why us, built for volume,
 * guarantee, FAQ, CTA: eight sections, several of them arguing that GGM is
 * good before the page had said who it is for, and no way to ask for a price
 * without leaving for /contact.
 *
 * This runs: what is this, what exactly do you send, is it for me, why would
 * it work, how do I start, what is the offer, and then the form itself. The
 * single biggest change is the last one. The quote form now lives on the
 * homepage rather than one click away, because every click between wanting a
 * price and asking for one loses people who were willing.
 *
 * FAQ and the closing CTA banner are gone from this page rather than restyled.
 * The FAQ answered objections the new copy answers where they arise, and a
 * closing CTA banner directly under a form is asking twice.
 *
 * Nothing about routing, submission or tracking changed. ContactForm is the
 * same component /contact renders and posts the same payload to /api/quote.
 * The old sections are still on disk and still used by the pages that have not
 * been redesigned yet.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <WhatWeSend />
      <Industries />
      <HowItWorks />
      <CampaignFAQ />
      <QuoteSection>
        {/*
          Suspense, because ContactForm reads useSearchParams() to capture the
          UTM parameters a visitor arrived with. On /contact that was fine; the
          homepage is statically rendered, and Next refuses to prerender a page
          that reads the query string without a boundary. Wrapping it keeps the
          page static AND keeps the attribution exactly as it was, which
          matters: those parameters are what ties a lead back to the ad that
          produced it.
        */}
        <Suspense fallback={<div className="min-h-[28rem]" aria-hidden />}>
          <ContactForm />
        </Suspense>
      </QuoteSection>
    </>
  )
}
