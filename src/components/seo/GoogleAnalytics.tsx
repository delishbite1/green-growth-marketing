import Script from 'next/script'
import { gaMeasurementId, gaScript } from '@/lib/analytics/ga'
import AnalyticsClicks from '@/components/seo/AnalyticsClicks'

/**
 * GA4, in exactly one place, like MetaPixel. The bootstrap decides in the
 * browser whether this is the live domain; see lib/analytics/ga.ts.
 */
export function GoogleAnalytics() {
  const id = gaMeasurementId()
  if (!id) return null

  return (
    <>
      <Script id="ga4" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: gaScript(id) }} />
      <AnalyticsClicks />
    </>
  )
}
