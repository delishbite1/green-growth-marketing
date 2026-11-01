import PageHero from '@/components/brand/PageHero'
import type { Metadata } from 'next'
import Link from 'next/link'
import { business } from '@/config/business'
import CTABanner from '@/components/shared/CTABanner'

export const metadata: Metadata = {
  alternates: { canonical: '/terms' },
  title: 'Terms of Service | Green Growth Marketing',
  description:
    'The terms that apply when you request a quote from or run a direct mail campaign with Green Growth Marketing.',
}

const addr = business.address

function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="text-2xl font-semibold text-ggm-forest mt-12 mb-4">{children}</h2>
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="text-ggm-muted leading-relaxed mb-4">{children}</p>
}

function UL({ children }: { children: React.ReactNode }) {
  return <ul className="list-disc pl-6 space-y-2 text-ggm-muted leading-relaxed mb-4">{children}</ul>
}

export default function TermsPage() {
  return (
    <>
      {/* Hero */}
      <PageHero compact eyebrow="Working together" title="Terms of Service" description="The terms that apply to quotes and direct mail campaigns with Green Growth Marketing." />

      <section className="py-14 lg:py-16 px-6 lg:px-8 bg-ggm-paper">
        <div className="max-w-3xl mx-auto">
          <p className="mb-8 text-sm text-ggm-muted">Last updated: October 16, 2026</p>

          <P>
            These terms apply when you use this website, ask us for a quote, or run a campaign with{' '}
            {business.legalName} (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;). We have written them in plain
            English on purpose. If anything here is unclear, call us at{' '}
            <a href={business.phoneHref} className="text-ggm-forest underline font-semibold">{business.phone}</a> and we
            will explain it.
          </P>

          <H2>1. What We Do</H2>
          <P>
            We are a full-service direct mail company. We design, print, address, stamp, and mail postcards, letters, and
            handwritten envelopes on your behalf, and we can build the mailing list that they go to.
          </P>

          <H2>2. Quotes and Pricing</H2>
          <UL>
            <li>We do not publish prices. Every campaign is quoted individually, because size, quantity, paper, postage class, and audience all change the cost.</li>
            <li>A quote is an offer, not a contract. Nothing is owed until you approve it in writing (email counts).</li>
            <li>Quotes are valid for 30 days unless we say otherwise, because postage and paper costs move.</li>
            <li>Prices are quoted in US dollars.</li>
          </UL>

          <H2>3. Comparing Quotes</H2>
          <P>
            We welcome quotes from other companies and can review them to see whether we can offer a better price.
            Comparisons consider the format, quantity, paper stock, addressing, mailing list and postage requirements.
            A lower price is not guaranteed. Any offer we make will be set out in your individual quote.
          </P>
          <H2>4. The Free Postcards Offer</H2>
          <P>Where we advertise 1,000 free postcards, these are the terms:</P>
          <UL>
            <li>It applies to <strong>new customers only</strong>, on a first order.</li>
            <li>It requires a paid order of <strong>3,000 pieces or more</strong>.</li>
            <li>The free pieces are the same design and specification as the paid order. They are not a separate campaign.</li>
            <li>One per business. It cannot be combined with another offer.</li>
            <li>We may withdraw or change the offer at any time, but not on an order you have already approved.</li>
          </UL>

          <H2>5. Flexible Campaign Planning</H2>
          <P>
            We offer flexible campaign planning without a long-term contract. Quantities, pricing and the scope of work are agreed in your individual campaign quote.
          </P>

          <H2>6. Artwork, Proofs, and Approval</H2>
          <UL>
            <li>We will design your piece from scratch, or print from artwork you supply.</li>
            <li>You will receive a proof before anything is printed. <strong>Nothing goes to print until you approve it.</strong></li>
            <li>
              <strong className="text-ggm-forest">Once you approve a proof, you own that approval.</strong> Printing is not
              reversible, so we cannot refund or reprint for an error that was present in a proof you signed off on.
              Please read proofs carefully, especially phone numbers, offers, and expiry dates.
            </li>
            <li>If we make a production error that was not in the approved proof, we will reprint and remail it at our cost.</li>
          </UL>

          <H2>7. Who Owns the Artwork</H2>
          <UL>
            <li><strong>Artwork you supply</strong> stays yours. You confirm you have the right to use it, including any photos, fonts, and logos in it.</li>
            <li><strong>Artwork we design for your paid campaign</strong> becomes yours to use once the campaign is paid for.</li>
            <li>We may show finished work as a sample of what we do, unless you ask us not to. Just tell us and we will not.</li>
          </UL>

          <H2>8. Your Content and Your List</H2>
          <P>
            You are responsible for what your mail says and who it goes to. By approving a campaign you confirm that:
          </P>
          <UL>
            <li>Your offer and claims are accurate, and you can substantiate them.</li>
            <li>Your content is lawful and does not infringe anyone else&rsquo;s rights.</li>
            <li>If you supply your own mailing list, you have the right to mail to it.</li>
          </UL>
          <P>
            We will not knowingly print or mail anything unlawful, deceptive, or hateful, and we may decline a campaign
            at our discretion.
          </P>

          <H2>9. Delivery Times</H2>
          <P>
            We will always give you a production and mailing timeline, and we work hard to hit it. But once your mail is
            handed to the United States Postal Service, delivery is in their hands, not ours. Weather, holidays, and USPS
            backlogs can affect timing. We cannot guarantee a delivery date and we are not liable for USPS delays.
          </P>

          <H2>10. Results</H2>
          <P>
            We will help you target well and design well, and we will tell you honestly what we think will work. But
            direct mail results depend on your offer, your market, your pricing, your timing, and how you handle the calls
            it generates — most of which is not in our control.
          </P>
          <P>
            <strong className="text-ggm-forest">
              We do not guarantee any particular response rate, number of leads, or return on investment,
            </strong>{' '}
            and you should be sceptical of anyone in this industry who does.
          </P>

          <H2>11. Payment</H2>
          <UL>
            <li>Payment terms are set out in your quote.</li>
            <li>Because printing and postage are bought specifically for your job, an approved order cannot generally be cancelled once production has started.</li>
            <li>Postage is paid to the USPS on your behalf and is not refundable once purchased.</li>
          </UL>

          <H2>12. Limitation of Liability</H2>
          <P>
            To the fullest extent allowed by law, our total liability for any claim relating to a campaign is limited to
            the amount you paid us for that campaign.
          </P>
          <P>
            We are not liable for indirect or consequential losses, including lost profits, lost business, or lost
            opportunity.
          </P>
          <P>Nothing in these terms limits any liability that cannot lawfully be limited.</P>

          <H2>13. Privacy</H2>
          <P>
            How we handle your information is set out in our{' '}
            <Link href="/privacy" className="text-ggm-forest underline font-semibold">
              Privacy Policy
            </Link>
            . We do not sell or share your personal information.
          </P>

          <H2>14. Changes to These Terms</H2>
          <P>
            We may update these terms. The &ldquo;Last updated&rdquo; date at the top will always tell you when. The terms
            that apply to your campaign are the ones in force when you approved your quote.
          </P>

          <H2>15. Governing Law</H2>
          <P>
            These terms are governed by the laws of the State of Texas, without regard to its conflict of laws rules.
          </P>

          <H2>16. Contact Us</H2>
          <address className="not-italic text-ggm-muted leading-relaxed mb-4">
            <strong className="text-ggm-forest">{business.legalName}</strong>
            <br />
            {addr.line1}, {addr.line2}
            <br />
            {addr.city}, {addr.state} {addr.zip}
            <br />
            {addr.country}
            <br />
            <br />
            Email: <a href={`mailto:${business.email}`} className="text-ggm-forest underline break-all">{business.email}</a>
            <br />
            Phone: <a href={business.phoneHref} className="text-ggm-forest underline">{business.phone}</a>
          </address>

          <div className="mt-12 pt-8 border-t border-ggm-line">
            <p className="text-sm text-ggm-muted">
              See also our{' '}
              <Link href="/privacy" className="text-ggm-forest underline font-semibold">
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  )
}
