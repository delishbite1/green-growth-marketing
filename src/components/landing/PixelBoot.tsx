'use client'

import { useEffect } from 'react'
import { captureAttribution, newEventId } from '@/lib/attribution'
import { trackEvent } from '@/lib/meta/pixel'

/**
 * Runs once when the landing page mounts.
 *
 * Two jobs, both of which have to happen on arrival rather than at submit time:
 *
 *   Capture where they came from, because the utm parameters are gone from the
 *   URL the moment they navigate or refresh, and a Facebook lead attributed to
 *   nothing makes the campaign look like it produced nothing.
 *
 *   Fire ViewContent, so audiences can be built from people who read the offer
 *   and did not claim it. Those are the cheapest people to win back.
 *
 * PageView is NOT fired here. It is already in the bootstrap snippet in the
 * head, and firing it again would double every session in Ads Manager.
 *
 * Lead is NOT fired here either, and that is the rule that matters most. It
 * fires only after the server has confirmed the lead is stored. See OfferForm.
 */
export default function PixelBoot() {
  useEffect(() => {
    captureAttribution()

    // A fresh id per page view. ViewContent is not deduplicated against a
    // server twin today, but giving it one costs nothing and means adding the
    // server side later does not need this file changed.
    trackEvent('ViewContent', newEventId(), {
      content_name: '100 Free Personalized Letters',
      content_category: 'Direct Mail',
    })
    // Empty deps: once per mount, never on re-render.
  }, [])

  return null
}
