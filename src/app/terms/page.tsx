import type { Metadata } from 'next'
import Link from 'next/link'
import { business } from '@/config/business'
import CTABanner from '@/components/shared/CTABanner'

export const metadata: Metadata = {
  title: 'Terms of Service | Green Growth Marketing',
  description:
    'The terms that apply when you request a quote from or run a direct mail campaign with Green Growth Marketing.',
}

const addr = business.address

function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="text-2xl font-black text-gray-900 mt-12 mb-4">{children}</h2>
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="text-gray-600 leading-relaxed mb-4">{children}</p>
}

function UL({ children }: { children: React.ReactNode }) {
  return <ul className="list-disc pl-6 space-y-2 text-gray-600 leading-relaxed mb-4">{children}</ul>
}

export default function TermsPage() {
  return (
    <>
      {/* Hero */}
      <section
        className="py-16 lg:py-20 px-6 lg:px-8 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0d1f0d 0%, #1a4a1a 25%, #1a1040 55%, #2d1060 80%, #0d0d1f 100%)' }}
      >
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-green-500/10 blur-3xl translate-x-1/3 -translate-y-1/3" />
        </div>
        <div className="max-w-3xl mx-auto relative">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight">Terms of Service</h1>
          <p className="text-gray-300 text-lg">Last updated: {business.legalLastUpdated}</p>
        </div>
      </section>

      <section className="py-14 lg:py-16 px-6 lg:px-8 bg-white">
        <div className="max-w-3xl mx-auto">

          <P>
            These terms apply when you use this website, ask us for a quote, or run a campaign with{' '}
            {business.legalName} (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;). We have written them in plain
            English on purpose. If anything here is unclear, call us at{' '}
            <a href={business.phoneHref} className="text-green-700 underline font-semibold">{business.phone}</a> and we
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

          <H2>3. Our Price Beat Guarantee</H2>
          <P>
            This is our main promise, so here are its actual terms rather than a slogan.
          </P>
          <P>
            <strong className="text-gray-900">
              Show us a written competitor quote for the same specifications and we will beat it.
            </strong>
          </P>
          <P>For the guarantee to apply:</P>
          <UL>
            <li>The quote must be <strong>written</strong> — an email, a PDF, or a screenshot from a named competitor. We cannot price against a number quoted verbally.</li>
            <li>It must be for the <strong>same specifications</strong>: same piece size, same quantity, same paper stock, and same postage class.</li>
            <li>It must be <strong>current</strong>, and from a company actually able to fulfil it in the United States.</li>
            <li>It must be an <strong>all-in</strong> comparison. If their price excludes design, list, postage, or addressing and ours includes them, we will compare the totals for the same work.</li>
          </UL>
          <P>
            Where those conditions are met, we will beat the price. That can mean a lower total for the same volume, or
            more pieces mailed for the same budget — your choice.
          </P>
          <P>
            We reserve the right to decline where a quote cannot be verified, or where it is below our own cost of
            postage — nobody can beat the USPS on what they charge us to carry your mail.
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

          <H2>5. No Minimum, No Contract</H2>
          <P>
            There is no minimum order and no long-term contract. You can work with us campaign by campaign. We would
            rather earn your repeat business than lock you into it.
          </P>

          <H2>6. Artwork, Proofs, and Approval</H2>
          <UL>
            <li>We will design your piece from scratch, or print from artwork you supply.</li>
            <li>You will receive a proof before anything is printed. <strong>Nothing goes to print until you approve it.</strong></li>
            <li>
              <strong className="text-gray-900">Once you approve a proof, you own that approval.</strong> Printing is not
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
            <strong className="text-gray-900">
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
            <Link href="/privacy" className="text-green-700 underline font-semibold">
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
          <address className="not-italic text-gray-600 leading-relaxed mb-4">
            <strong className="text-gray-900">{business.legalName}</strong>
            <br />
            {addr.line1}, {addr.line2}
            <br />
            {addr.city}, {addr.state} {addr.zip}
            <br />
            {addr.country}
            <br />
            <br />
            Email: <a href={`mailto:${business.email}`} className="text-green-700 underline break-all">{business.email}</a>
            <br />
            Phone: <a href={business.phoneHref} className="text-green-700 underline">{business.phone}</a>
          </address>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              See also our{' '}
              <Link href="/privacy" className="text-green-700 underline font-semibold">
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
