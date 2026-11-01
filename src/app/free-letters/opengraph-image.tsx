import { ImageResponse } from 'next/og'

/**
 * The social preview card, generated rather than uploaded.
 *
 * This is what appears when the landing page URL is pasted into Messenger,
 * WhatsApp, a Slack channel or a text message, which happens more than people
 * expect: a business owner who is interested sends the link to their partner
 * before deciding. A link with no image renders as a bare grey box and looks
 * like something nobody should tap.
 *
 * Drawn in code so it can never drift from the offer. When the number changes
 * from 100 to 200, it changes here in one place, and there is no forgotten JPG
 * in the public folder still promising the old deal.
 *
 * Deliberately plain: system fonts, flat colour, no photograph. Preview cards
 * are rendered at about 500px wide in a chat window, and the only thing that
 * has to survive that is the number and the words.
 */

export const runtime = 'edge'
export const alt =
  '100 free personalized letters with Forever Stamps from Green Growth Marketing'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          background: 'linear-gradient(150deg, #f0fdf4 0%, #faf5ff 100%)',
        }}
      >
        <div
          style={{
            display: 'flex',
            fontSize: 26,
            fontWeight: 700,
            letterSpacing: 4,
            textTransform: 'uppercase',
            color: '#3a8a2d',
            marginBottom: 24,
          }}
        >
          Green Growth Marketing
        </div>

        <div style={{ display: 'flex', fontSize: 130, fontWeight: 900, color: '#0d1117', lineHeight: 1 }}>
          100 FREE
        </div>

        <div
          style={{
            display: 'flex',
            fontSize: 78,
            fontWeight: 900,
            color: '#3a8a2d',
            lineHeight: 1.05,
            marginTop: 6,
          }}
        >
          PERSONALIZED LETTERS
        </div>

        <div
          style={{
            display: 'flex',
            alignSelf: 'flex-start',
            marginTop: 30,
            padding: '14px 28px',
            borderRadius: 12,
            background: '#1a5c1a',
            color: '#ffffff',
            fontSize: 32,
            fontWeight: 800,
            letterSpacing: 1,
          }}
        >
          WITH FOREVER STAMPS
        </div>

        <div style={{ display: 'flex', marginTop: 36, fontSize: 30, color: '#64748b' }}>
          Printing, addressing, postage and mailing included. No contract required.
        </div>
      </div>
    ),
    size,
  )
}
