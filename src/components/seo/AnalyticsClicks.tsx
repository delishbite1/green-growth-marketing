'use client'

import { useEffect } from 'react'
import { gaEvent } from '@/lib/analytics/ga'

/**
 * Phone and quote CTA clicks, from one listener on the document rather than a
 * handler on each of the many links. A link added later is counted without
 * touching it. Only the link's own label and destination are sent, never
 * anything a visitor typed.
 */

// The pages and anchors that lead to a quote or an order. These are the primary CTAs.
const CTA_PATHS = ['/contact', '/postcards']
const CTA_HASHES = ['#quote', '#quote-form']

function location(el: Element): string {
  if (el.closest('header, nav')) return 'header'
  if (el.closest('footer')) return 'footer'
  if (el.closest('[role="dialog"]')) return 'popup'
  return 'page'
}

export default function AnalyticsClicks() {
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const a = (e.target as Element | null)?.closest?.('a[href]') as HTMLAnchorElement | null
      if (!a) return
      const href = a.getAttribute('href') ?? ''

      if (href.startsWith('tel:')) {
        gaEvent({ name: 'phone_click', params: { link_location: location(a) } })
        return
      }

      const url = new URL(a.href, window.location.href)
      if (url.origin !== window.location.origin) return
      if (CTA_PATHS.includes(url.pathname) || CTA_HASHES.includes(url.hash)) {
        gaEvent({
          name: 'cta_click',
          params: {
            link_location: location(a),
            link_text: (a.textContent ?? '').replace(/\s+/g, ' ').trim().slice(0, 100),
            link_destination: url.pathname + url.hash,
          },
        })
      }
    }
    // Capture phase, so a link that stops propagation is still counted.
    document.addEventListener('click', onClick, true)
    return () => document.removeEventListener('click', onClick, true)
  }, [])

  return null
}
