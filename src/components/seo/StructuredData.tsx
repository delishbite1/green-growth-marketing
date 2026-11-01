import { business } from '@/config/business'
import { faqs } from '@/data/faqs'

/**
 * What this business is, in the form search engines read.
 *
 * The site had no structured data of any kind before 3 Sep 2026. Without it a
 * crawler has to infer the company name, the phone number and what is sold from
 * prose, and it usually gets some of that wrong. This states it outright.
 *
 * ---------------------------------------------------------------------------
 * Organization, NOT LocalBusiness, and that is a considered choice.
 *
 * LocalBusiness asks for a street address, and the only one on file is a
 * virtual mailbox with a PMB number, used for the legal pages. Publishing that
 * as a place of business is the same mistake that gets a Google Business
 * Profile suspended, and it would also fight whatever real address the profile
 * is eventually verified at.
 *
 * So this claims a company that serves the United States and gives the ways to
 * reach it, which is all true, and stays silent about a storefront rather than
 * inventing one. Once the Business Profile is verified at a real address, this
 * can become LocalBusiness and say the same thing the profile says.
 *
 * ---------------------------------------------------------------------------
 * The FAQ schema reads the same array the page renders, from src/data/faqs.ts.
 * Google explicitly penalises FAQ markup that does not match the visible page,
 * so a second copy of these answers would be a liability. If a question is
 * removed from the page it must disappear from here, and sharing the source is
 * what guarantees it does.
 */
export function StructuredData() {
  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${business.siteUrl}/#organization`,
        name: business.legalName,
        alternateName: business.shortName,
        url: business.siteUrl,
        logo: `${business.siteUrl}/logo.png`,
        image: `${business.siteUrl}/logo.png`,
        email: business.email,
        telephone: business.phoneHref.replace('tel:', ''),
        description:
          'Full service direct mail campaigns for businesses nationwide. Postcards, ' +
          'personalized letters and handwritten envelopes, with design, printing, ' +
          'mailing lists and postage included.',
        areaServed: { '@type': 'Country', name: 'United States' },
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: business.phoneHref.replace('tel:', ''),
          email: business.email,
          contactType: 'sales',
          areaServed: 'US',
          availableLanguage: ['English'],
        },
      },
      {
        '@type': 'WebSite',
        '@id': `${business.siteUrl}/#website`,
        url: business.siteUrl,
        name: business.shortName,
        publisher: { '@id': `${business.siteUrl}/#organization` },
        inLanguage: 'en-US',
      },
      {
        '@type': 'FAQPage',
        '@id': `${business.siteUrl}/#faq`,
        mainEntity: faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: { '@type': 'Answer', text: faq.answer },
        })),
      },
    ],
  }

  return (
    <script
      type="application/ld+json"
      // Escaping the angle bracket is not decoration. Without it, a stray
      // "</script>" appearing inside any answer would close this tag early and
      // let whatever followed run as markup. The content is ours today, which
      // is exactly the assumption that stops being true later.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(graph).replace(/</g, '\\u003c'),
      }}
    />
  )
}
