'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { gpcEnabled } from '@/lib/privacy/gpc'
import { adOptOutSaved, saveAdOptOut } from '@/lib/privacy/ad-choice'

type Status = 'checking' | 'gpc' | 'off' | 'on'

/**
 * The visitor's advertising choice for this browser. Read after mount, because
 * the cookie and the GPC signal only exist in the browser.
 */
export default function PrivacyChoicesPanel() {
  const [status, setStatus] = useState<Status>('checking')
  const [justChanged, setJustChanged] = useState<'off' | 'on' | null>(null)

  useEffect(() => {
    setStatus(gpcEnabled() ? 'gpc' : adOptOutSaved() ? 'off' : 'on')
  }, [])

  function choose(optOut: boolean) {
    saveAdOptOut(optOut)
    setStatus(optOut ? 'off' : 'on')
    setJustChanged(optOut ? 'off' : 'on')
  }

  const button =
    'inline-flex min-h-12 items-center justify-center rounded-lg bg-ggm-forest px-5 text-sm font-semibold text-ggm-ivory transition hover:bg-ggm-forest-deep'

  return (
    <div className="rounded-2xl border border-ggm-forest/10 bg-ggm-ivory p-6 sm:p-8">
      <h2 className="text-xl font-semibold text-ggm-forest">Advertising tracking on this browser</h2>

      <div aria-live="polite" className="mt-4 space-y-4 text-ggm-muted leading-relaxed">
        {status === 'checking' && <p>Checking your current choice…</p>}

        {status === 'gpc' && (
          <p data-status="gpc">
            <strong className="text-ggm-forest">Off.</strong> Your browser is sending a Global Privacy Control signal, so
            advertising tracking is already off on this website. To turn it back on, change that setting in your browser.
          </p>
        )}

        {status === 'off' && (
          <>
            <p data-status="off">
              <strong className="text-ggm-forest">Off.</strong> The Meta Pixel does not load on this browser, and we do
              not report a free letters request to Meta.
              {justChanged === 'off' && ' Your choice is saved.'}
            </p>
            <button type="button" className={button} onClick={() => choose(false)}>
              Turn advertising tracking back on
            </button>
          </>
        )}

        {status === 'on' && (
          <>
            <p data-status="on">
              <strong className="text-ggm-forest">On.</strong> The Meta Pixel helps us measure our Facebook and Instagram
              ads.
              {justChanged === 'on' && ' Your choice is saved and applies from the next page you open.'}
            </p>
            <button type="button" className={button} onClick={() => choose(true)}>
              Turn off advertising tracking
            </button>
          </>
        )}
      </div>

      <p className="mt-6 text-sm text-ggm-muted leading-relaxed">
        Your choice is saved in a cookie on this browser and device, so it lasts across visits. If you clear your cookies
        or use another browser, you will need to choose again. Google Analytics keeps running for analytics only. See our{' '}
        <Link href="/privacy#tracking" className="text-ggm-forest underline font-semibold">Privacy Policy</Link> for
        details.
      </p>
    </div>
  )
}
