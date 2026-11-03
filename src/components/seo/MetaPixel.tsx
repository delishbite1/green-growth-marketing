import Script from 'next/script'
import { pixelId, pixelScript } from '@/lib/meta/pixel'

/**
 * The Meta Pixel bootstrap, in exactly one place.
 *
 * This markup used to live inside the /free-letters layout, so only that one
 * page reported anything. Every other page, including the homepage and the
 * contact page where the quote form lives, was invisible to Meta. The Facebook
 * ad that started on 2 September was therefore being judged on nothing.
 *
 * It has been MOVED here rather than copied. That distinction matters: the
 * snippet fires PageView itself, so having it in the root layout and in the
 * landing page layout would double every session in Ads Manager and quietly
 * halve every cost per result. PixelBoot.tsx carries the same warning for the
 * same reason.
 *
 * Renders nothing at all when NEXT_PUBLIC_META_PIXEL_ID is absent or is not
 * digits, which is the state today. That is deliberate: a page must not break
 * because a marketing tag has not been configured yet, and this can therefore
 * be deployed before Inbar has fetched the id from Events Manager.
 */
export function MetaPixel() {
  const id = pixelId()
  if (!id) return null

  return (
    <>
      <Script
        id="meta-pixel"
        strategy="afterInteractive"
        // The snippet queues calls until the library loads, so afterInteractive
        // costs no events and keeps the tag off the critical rendering path. On
        // a phone over cellular that is the difference a visitor feels.
        dangerouslySetInnerHTML={{ __html: pixelScript(id) }}
      />
      {/* No <noscript> image fallback. Without JavaScript the page cannot read
          Global Privacy Control, so that image would report visitors who opted
          out. See lib/privacy/gpc.ts. */}
    </>
  )
}
