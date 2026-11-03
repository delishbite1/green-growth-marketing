import PageHero from '@/components/brand/PageHero'
import type { Metadata } from 'next'
import Link from 'next/link'
import { business } from '@/config/business'
import CTABanner from '@/components/shared/CTABanner'

export const metadata: Metadata = {
  alternates: { canonical: '/privacy' },
  title: 'Privacy Policy | Green Growth Marketing',
  description:
    'How Green Growth Marketing collects, uses, and protects your personal information, the tools this website uses, and the choices you have.',
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

          <P>
            This policy applies to our public website at greengrowthmarketinginc.com, to requests made through it, and to
            the mail and outreach described in Section 10. It does not cover our client portal, the separate signed in
            area our clients use to manage their campaigns. Privacy information for the portal is handled separately.
          </P>

          <P>It covers three different groups of people:</P>
          <UL>
            <li><strong>Business visitors:</strong> people who visit this website or ask us for a quote.</li>
            <li>
              <strong>Mail recipients:</strong> people who received a postcard or letter that we mailed on behalf of one
              of our clients.
            </li>
            <li>
              <strong>Business contacts:</strong> owners and managers of businesses that we contact about our own
              services.
            </li>
          </UL>
          <P>
            If you received mail or a call from us and want it to stop, skip to{' '}
            <a href="#received-mail" className="text-ggm-forest underline font-semibold">
              If We Contacted You or Mailed You
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
            and we use it to keep the site running and secure. When you agree on one of our forms that we may contact
            you, we also record the date, time, and IP address, as a record that you asked us to contact you. Our
            analytics and advertising tools also collect information about your visit; Section 6 explains them.
          </P>
          <P>
            <strong className="text-ggm-forest">When you request free letters or postcards</strong>, we ask for your name,
            business name, email address, and phone number, and details of the mailing you want, such as the ZIP codes or
            cities to mail, a preferred date, your industry and website, and any instructions. We also record how you
            reached us, such as the page you arrived on, the website that referred you, and the campaign tags or ad click
            identifier in the link you followed, so we know which of our ads and mailings work, and your browser type.
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
            <li>Understand how this website is used and measure our advertising, as described in Section 6</li>
          </UL>
          <P>
            <strong className="text-ggm-forest">Consent to contact you.</strong> When you submit our quote form you tick a
            box asking us to get back to you, and when you call us you are asking the same thing. We will contact you at
            the phone number and email you gave us in order to do that. You can tell us to stop at any time, on a call or
            by email, and we will honor it. Consent is never a condition of buying anything from us.
          </P>

          <H2>4. We Do Not Sell Your Information</H2>
          <P>We do not sell, rent, or trade your personal information for money.</P>
          <P>We do not give your name, email address, phone number, or mailing address to other marketers.</P>
          <P>We do not use your information to send you mail on behalf of other companies.</P>
          <P>
            One thing works differently: the Meta Pixel on this website sends Meta information about your visit, and Meta
            can also use that information for its own purposes, including advertising. Some state privacy laws call this
            &ldquo;sharing&rdquo; or &ldquo;targeted advertising&rdquo;. Section 6 explains what is sent and how to turn it
            off.
          </P>

          <H2>5. Who We Share It With</H2>
          <P>We use these companies to run this website and our business, and to deliver your campaign:</P>
          <UL>
            <li>
              <strong>Vercel</strong> hosts this website and processes every request you send through it, including your
              IP address and browser type.
            </li>
            <li>
              <strong>Supabase</strong> is our database provider. It stores free letters and postcard requests made on
              this website: your contact and business details, the mailing you asked for, how you reached us, your browser
              type, and the date, time, and IP address of your consent.
            </li>
            <li>
              <strong>Resend</strong> sends our team an email with the details of each request you submit on this
              website.
            </li>
            <li>
              <strong>Google (Gmail)</strong> hosts our team&rsquo;s email. Quote requests and request notifications
              arrive there, and our emails with you are kept there.
            </li>
            <li>
              <strong>Our printing provider</strong> receives the artwork and the mailing list for each client campaign so
              it can print, address, and mail the postcards and letters.
            </li>
            <li><strong>The United States Postal Service:</strong> to physically deliver your mail</li>
            <li><strong>Professional advisors:</strong> our accountant or lawyer, if we are legally required to</li>
          </UL>
          <P>We give each of them only the information needed for the service they provide to us.</P>
          <P>This website also uses analytics and advertising tools from three companies:</P>
          <UL>
            <li><strong>Vercel:</strong> website analytics, without cookies</li>
            <li><strong>Google:</strong> Google Analytics, used for analytics only</li>
            <li>
              <strong>Meta:</strong> the Meta Pixel and, for free letters requests, a report that the request was made, used
              to measure our Facebook and Instagram ads
            </li>
          </UL>
          <P>
            Google and Meta handle the information they receive under their own terms and privacy policies. Section 6
            explains what each tool collects and the choices you have.
          </P>
          <P>We will also disclose information if we are legally required to, for example by a valid court order.</P>

          <span id="tracking" className="block scroll-mt-28" aria-hidden="true" />
          <H2>6. Cookies and Tracking</H2>
          <P>
            We use three tools on this website, and for free letters requests our server also reports to Meta. Here is
            what each one does.
          </P>
          <UL>
            <li>
              <strong>Vercel Web Analytics</strong>, from the company that hosts this website, counts page visits. It does
              not use cookies.
            </li>
            <li>
              <strong>Google Analytics 4</strong> shows us which pages are visited, how visitors found the site, and
              whether someone sent us a request or tapped our phone number. It uses cookies set by this website. We use it
              for analytics only: its advertising features, Google Signals and ad personalization are turned off. We never
              send Google your name, email address, phone number, or anything you type into a form.
            </li>
            <li>
              <strong>The Meta Pixel</strong> tells Meta, the company behind Facebook and Instagram, which pages of this
              website you visit, so we can measure and improve our ads on those platforms. It uses cookies, and Meta may
              connect this information with a Facebook or Instagram account.
            </li>
            <li>
              <strong>Meta Conversions API.</strong> If you request our free letters offer, our server may also report
              to Meta that a request was made, so Meta can match it to the ad you saw. The report contains your email
              address, phone number, and first and last name in scrambled (hashed) form, and the country (United States),
              also hashed. It also contains, not hashed: your IP address, your browser&rsquo;s user agent (its name and
              version), the address of the page you were on, the time of the request, the Meta browser identifier
              stored in the <code>_fbp</code> cookie if your browser has one, and, if you arrived by clicking a Meta ad,
              the click identifier from that link (<code>fbc</code>). It does not contain your business name, the ZIP
              code you entered, or anything else you typed.
            </li>
          </UL>
          <P>
            These tools collect technical information such as your browser and device type, your approximate location
            based on your IP address, the pages you view, and how you arrived.
          </P>
          <P>
            <strong className="text-ggm-forest">Your choices.</strong>
          </P>
          <UL>
            <li>
              <strong>Your Privacy Choices.</strong> On our{' '}
              <Link href="/privacy-choices" className="text-ggm-forest underline font-semibold">Your Privacy Choices</Link>{' '}
              page you can turn off advertising tracking on your browser, and turn it back on later. When it is off, the
              Meta Pixel does not load and we do not report a free letters request to Meta. The page reloads when you
              change your choice, so it applies right away, and turning tracking off also deletes the Meta cookies this
              website set on that browser. It does not change information Meta already received before you turned it
              off. We remember your choice with a cookie on that browser, so it lasts across visits until you change it
              or clear your cookies.
            </li>
            <li>
              <strong>Global Privacy Control (GPC).</strong> If your browser sends a GPC signal, we treat it the same way,
              automatically, even if you have not visited that page. Google Analytics and Vercel Web Analytics still
              run, because we use them only to understand how this website is used, not for advertising. Firefox, Brave and
              DuckDuckGo are among the browsers that support GPC. Our website reads the signal with JavaScript; if
              JavaScript is turned off, none of these three tools load.
            </li>
            <li>
              <strong>Google Analytics opt out.</strong> Google offers a browser add on that stops Google Analytics on
              every website:{' '}
              <a href="https://tools.google.com/dlpage/gaoptout" className="text-ggm-forest underline break-all" rel="noopener noreferrer" target="_blank">
                tools.google.com/dlpage/gaoptout
              </a>
              .
            </li>
            <li>
              <strong>Cookies and ad settings.</strong> You can block or delete cookies in your browser, and most browsers
              and ad blockers can block the Meta Pixel. You can also control how Meta uses your activity for ads in your
              Facebook or Instagram ad settings.
            </li>
          </UL>
          <P>
            This website does not respond to Do Not Track signals, which most browsers no longer support. It does respond
            to Global Privacy Control as described above.
          </P>

          <H2>7. How Long We Keep It</H2>
          <UL>
            <li><strong>If you do not become a client:</strong> we keep your quote request for up to 2 years, in case you come back to us.</li>
            <li><strong>If you become a client:</strong> we keep your records for 7 years, which is standard for business and tax records.</li>
            <li><strong>Free letters and postcard requests</strong> made on this website: our retention period is 24 months from the date we receive them.</li>
            <li>
              <strong>Google Analytics:</strong> we have set its event and user data retention to 14 months. That setting does not cover every kind of Google Analytics data; for example, Google keeps
              summary reports under its own policies.
            </li>
            <li><strong>Your Privacy Choices:</strong> the cookie that remembers your choice lasts about 400 days, or until you clear your cookies.</li>
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
            <strong className="text-ggm-forest">We do not sell your personal information for money.</strong> Our use of
            the Meta Pixel and the Meta Conversions API may count as &ldquo;sharing&rdquo; personal information for cross context behavioral
            advertising under California law. You can opt out of that sharing on our{' '}
            <Link href="/privacy-choices" className="text-ggm-forest underline font-semibold">Your Privacy Choices</Link>{' '}
            page, or by turning on Global Privacy Control in your browser, as described in{' '}
            <a href="#tracking" className="text-ggm-forest underline font-semibold">Section 6</a>. Either way, the Meta
            Pixel does not load on that browser and we do not report a free letters request to Meta.
          </P>
          <P>
            Residents of other states with privacy laws, including Colorado, Connecticut, Virginia, Utah, Texas, and
            Oregon, have similar rights, including the right to opt out of targeted advertising, and we honor them the
            same way. Your Privacy Choices and Global Privacy Control work the same for every visitor, wherever you live.
          </P>

          <span id="received-mail" className="block scroll-mt-28" aria-hidden="true" />
          <H2>10. If We Contacted You or Mailed You</H2>
          <P>
            <strong className="text-ggm-forest">Mail we send for our clients.</strong> If a postcard or letter from one of
            our clients arrived and you do not know why: we are a direct mail company, and a business hired us to print and
            mail it. The mailing list came either from that business&rsquo;s own customer records, or from a list we put
            together for that campaign from public records, such as county property records. We use a client&rsquo;s
            mailing list to produce and mail that client&rsquo;s campaign. To do that, we send the list to our printing
            provider, which prints, addresses, and mails the postcards and letters. Client mailing lists are different from
            the business contact records we use for our own outreach, described next.
          </P>
          <P>
            <strong className="text-ggm-forest">Our own outreach to businesses.</strong> We also contact businesses that may
            want direct mail, by mail and by phone. To do that, we build business contact records from public and online
            sources: state contractor license records, state business registrations, company websites, online business
            listings and maps, and public social media pages. A record can include the business name, the name and title
            of an owner or manager, the business mailing address, phone number, business email address, website, trade,
            and license details, along with our own notes, such as when we mailed or called and how the conversation went.
            We keep these records in our own customer relationship database.
          </P>
          <P>
            We use these records only for our own marketing, business development, and prospecting. We do not sell them,
            and we do not provide them to clients for their mailing campaigns. Our technology and service providers, such as our database and email
            providers, process these records as needed to provide their services to us.
          </P>
          <P>
            <strong className="text-ggm-forest">To stop our mail or calls</strong>, email{' '}
            <a href={`mailto:${business.email}`} className="text-ggm-forest underline break-all font-semibold">{business.email}</a>{' '}
            or call{' '}
            <a href={business.phoneHref} className="text-ggm-forest underline font-semibold">{business.phone}</a> with the
            name and address exactly as printed on the mail piece. For mail we sent for a client, we will remove you from
            future mailings we handle, and we will pass your request to the business that hired us. For our own outreach,
            we will mark your record so we do not contact you again.
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
