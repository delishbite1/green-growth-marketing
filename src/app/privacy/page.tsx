import PageHero from '@/components/brand/PageHero'
import type { Metadata } from 'next'
import Link from 'next/link'
import { business } from '@/config/business'
import CTABanner from '@/components/shared/CTABanner'

export const metadata: Metadata = {
  alternates: { canonical: '/privacy' },
  title: 'Privacy Policy | Green Growth Marketing',
  description:
    'How Green Growth Marketing collects, uses, and protects your personal information. We do not sell or share your information.',
}

const addr = business.address

function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="text-2xl font-semibold text-ggm-forest mt-12 mb-4 scroll-mt-28">{children}</h2>
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="text-ggm-muted leading-relaxed mb-4">{children}</p>
}

function UL({ children }: { children: React.ReactNode }) {
  return <ul className="list-disc pl-6 space-y-2 text-ggm-muted leading-relaxed mb-4">{children}</ul>
}

export default function PrivacyPage() {
  return (
    <>
      {/* Hero */}
      <PageHero compact eyebrow="Your information" title="Privacy Policy" description="How we handle information shared with Green Growth Marketing." />

      <section className="py-14 lg:py-16 px-6 lg:px-8 bg-ggm-paper">
        <div className="max-w-3xl mx-auto">
          <p className="mb-8 text-sm text-ggm-muted">Last updated: {business.legalLastUpdated}</p>

          <P>
            {business.legalName} (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) helps businesses run direct mail
            campaigns. This policy explains what personal information we collect, why we collect it, and what you can do
            about it. We have tried to write it in plain English rather than legal language.
          </P>

          <P>It covers two different groups of people:</P>
          <UL>
            <li><strong>Business visitors</strong> — people who visit this website or ask us for a quote.</li>
            <li>
              <strong>Mail recipients</strong> — people who received a postcard or letter that we mailed on behalf of one
              of our clients.
            </li>
          </UL>
          <P>
            If you received mail from us and want it to stop, skip to{' '}
            <a href="#received-mail" className="text-ggm-forest underline font-semibold">
              If You Received Mail From Us
            </a>
            .
          </P>

          <H2>1. Who We Are</H2>
          <address className="not-italic text-ggm-muted leading-relaxed mb-4">
            <strong className="text-ggm-forest">{business.legalName}</strong>
            <br />
            {addr.line1}
            <br />
            {addr.line2}
            <br />
            {addr.city}, {addr.state} {addr.zip}
            <br />
            {addr.country}
            <br />
            <br />
            Phone: <a href={business.phoneHref} className="text-ggm-forest underline">{business.phone}</a>
            <br />
            Email: <a href={`mailto:${business.email}`} className="text-ggm-forest underline break-all">{business.email}</a>
          </address>
          <P>We serve businesses throughout the United States.</P>

          <H2>2. Information We Collect From You</H2>
          <P>
            <strong className="text-ggm-forest">When you request a quote</strong>, we ask you for:
          </P>
          <UL>
            <li>Your first and last name</li>
            <li>Your business name and industry</li>
            <li>Your phone number and email address</li>
            <li>Your business street address, city, state, and ZIP code</li>
            <li>Which services you are interested in</li>
            <li>Your approximate budget (optional)</li>
            <li>Any additional details you choose to tell us (optional)</li>
          </UL>
          <P>
            You give us this information voluntarily. If you would rather not, you can simply call us at{' '}
            <a href={business.phoneHref} className="text-ggm-forest underline font-semibold">{business.phone}</a> instead.
          </P>
          <P>
            <strong className="text-ggm-forest">When you call us</strong>, we keep a record of your phone number and what we
            discussed, so we can prepare your quote.
          </P>
          <P>
            <strong className="text-ggm-forest">Automatically</strong>, our website host records standard technical
            information such as your IP address, browser type, and the pages you viewed. This is ordinary server activity
            and we use it only to keep the site running and secure. We also record the date, time, and IP address when you
            tick the consent box on our form, as a record that you asked us to contact you.
          </P>
          <P>
            <strong className="text-ggm-forest">What we do not collect:</strong> we do not ask for and do not want your
            Social Security number, bank account, credit card, or any government ID. Please never send those to us by
            email or through this website.
          </P>

          <H2>3. Why We Use It</H2>
          <P>We use your information only to:</P>
          <UL>
            <li>Prepare and send you a custom quote</li>
            <li>Contact you about your request, by phone, text, or email</li>
            <li>Run and deliver your direct mail campaign if you become a client</li>
            <li>Keep records for accounting and legal reasons</li>
            <li>Respond to your questions</li>
          </UL>
          <P>
            <strong className="text-ggm-forest">Consent to contact you.</strong> When you submit our quote form you tick a
            box asking us to get back to you, and when you call us you are asking the same thing. We will contact you at
            the phone number and email you gave us in order to do that. You can tell us to stop at any time — say so on a
            call, or email us — and we will honor it. Consent is never a condition of buying anything from us.
          </P>

          <H2>4. We Do Not Sell Your Information</H2>
          <P>We do not sell, rent, or trade your personal information to anyone.</P>
          <P>We do not share it with other marketers.</P>
          <P>We do not use your information to send you mail on behalf of other companies.</P>

          <H2>5. Who We Share It With</H2>
          <P>To actually deliver your campaign, we have to share some information with the companies that do the work:</P>
          <UL>
            <li><strong>Printing partners</strong> — to print your postcards and letters</li>
            <li><strong>The United States Postal Service</strong> — to physically deliver your mail</li>
            <li><strong>Our website host and email provider</strong> — which operate this website and deliver the message you send us through it</li>
            <li><strong>Professional advisors</strong> — our accountant or lawyer, if we are legally required to</li>
          </UL>
          <P>
            Each of these only receives what they need to do their job. They are not allowed to use your information for
            their own marketing.
          </P>
          <P>We will also disclose information if we are legally required to, for example by a valid court order.</P>

          <H2>6. Cookies and Tracking</H2>
          <P>
            This website does not use advertising cookies, tracking pixels, or third-party analytics. We do not track you
            across other websites. If that ever changes, we will update this policy and say so clearly before we start.
          </P>

          <H2>7. How Long We Keep It</H2>
          <UL>
            <li><strong>If you do not become a client:</strong> we keep your quote request for up to 2 years, in case you come back to us.</li>
            <li><strong>If you become a client:</strong> we keep your records for 7 years, which is standard for business and tax records.</li>
          </UL>
          <P>You can ask us to delete your information sooner. See Section 9.</P>

          <H2>8. How We Protect It</H2>
          <P>
            We use industry-standard measures to protect your information, including an encrypted connection (HTTPS) on
            this website, and limiting access to the small number of people on our team who need it.
          </P>
          <P>
            We should be honest with you: no method of transmission over the internet is 100% secure. We do our best, but
            we cannot guarantee absolute security. That is why we ask you never to send us financial or government ID
            information.
          </P>

          <H2>9. Your Rights</H2>
          <P>Wherever you live in the United States, you can ask us to:</P>
          <UL>
            <li><strong>Tell you</strong> what personal information we have about you</li>
            <li><strong>Correct</strong> anything that is wrong</li>
            <li><strong>Delete</strong> your information</li>
            <li><strong>Stop contacting you</strong></li>
          </UL>
          <P>
            To make any of these requests, email{' '}
            <a href={`mailto:${business.email}`} className="text-ggm-forest underline break-all font-semibold">{business.email}</a>{' '}
            or call{' '}
            <a href={business.phoneHref} className="text-ggm-forest underline font-semibold">{business.phone}</a>. We will
            respond within 45 days. We will not charge you, and we will not treat you differently for asking.
          </P>
          <P>
            <strong className="text-ggm-forest">If you live in California</strong>, the California Consumer Privacy Act
            gives you these specific rights:
          </P>
          <UL>
            <li>The right to know what personal information we collect, use, and disclose</li>
            <li>The right to delete personal information we collected from you</li>
            <li>The right to correct inaccurate personal information</li>
            <li>The right to opt out of the sale or sharing of your personal information</li>
            <li>The right not to be discriminated against for exercising these rights</li>
          </UL>
          <P>
            <strong className="text-ggm-forest">
              We do not sell or share your personal information as those terms are defined by the CCPA.
            </strong>{' '}
            Because of that, there is no &ldquo;Do Not Sell or Share My Personal Information&rdquo; link on this site. If
            that ever changes, we will update this policy and add one.
          </P>
          <P>
            Residents of other states with privacy laws, including Colorado, Connecticut, Virginia, Utah, Texas, and
            Oregon, have similar rights, and we honor them the same way.
          </P>

          <span id="received-mail" className="block scroll-mt-28" aria-hidden="true" />
          <H2>10. If You Received Mail From Us</H2>
          <P>If a postcard or letter arrived at your home and you do not know why:</P>
          <P>
            We are a direct mail company. A business hired us to print and mail it.{' '}
            <strong className="text-ggm-forest">We do not own or maintain a list of you personally.</strong> The mailing
            list came either from that business&rsquo;s own customer records, or from a licensed list provider that
            sources publicly available and commercially available information, such as property records and consumer
            marketing databases.
          </P>
          <P>
            <strong className="text-ggm-forest">To stop receiving our mail</strong>, email{' '}
            <a href={`mailto:${business.email}`} className="text-ggm-forest underline break-all font-semibold">{business.email}</a>{' '}
            or call{' '}
            <a href={business.phoneHref} className="text-ggm-forest underline font-semibold">{business.phone}</a> with the
            name and address exactly as printed on the mail piece. We will remove you from future mailings we handle, and
            we will pass your request to the business that hired us.
          </P>
          <P>
            Please allow up to 30 days, since campaigns are often already printed and in the mail before a request
            arrives.
          </P>
          <P>
            You can also reduce marketing mail generally by registering with the Data &amp; Marketing Association at{' '}
            <a
              href="https://dmachoice.thedma.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-ggm-forest underline font-semibold"
            >
              dmachoice.org
            </a>
            .
          </P>

          <H2>11. Children</H2>
          <P>
            This website is for businesses. It is not directed at children, and we do not knowingly collect information
            from anyone under 16. If you believe a child has given us information, contact us and we will delete it.
          </P>

          <H2>12. Links to Other Sites</H2>
          <P>
            Our website may link to other websites. We are not responsible for their privacy practices. Please read their
            policies before giving them your information.
          </P>

          <H2>13. Changes to This Policy</H2>
          <P>
            If we change this policy, we will update the &ldquo;Last updated&rdquo; date at the top. If the change is
            significant, we will say so clearly on this page.
          </P>

          <H2>14. Contact Us</H2>
          <P>Questions about this policy, or about your information:</P>
          <address className="not-italic text-ggm-muted leading-relaxed mb-4">
            <strong className="text-ggm-forest">{business.legalName}</strong>
            <br />
            {addr.line1}, {addr.line2}
            <br />
            {addr.city}, {addr.state} {addr.zip}
            <br />
            Email: <a href={`mailto:${business.email}`} className="text-ggm-forest underline break-all">{business.email}</a>
            <br />
            Phone: <a href={business.phoneHref} className="text-ggm-forest underline">{business.phone}</a>
          </address>

          <div className="mt-12 pt-8 border-t border-ggm-line">
            <p className="text-sm text-ggm-muted">
              See also our{' '}
              <Link href="/terms" className="text-ggm-forest underline font-semibold">
                Terms of Service
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
