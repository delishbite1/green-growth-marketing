import { Plus_Jakarta_Sans } from 'next/font/google'

const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'], weight: ['400', '600', '700', '800'] })

const tiles = [
  {
    title: 'In-House Production',
    body: 'Print, address, and mail under one roof.',
    icon: (
      <>
        <path d="M6 9V4h9l1 5" />
        <path d="M4 9h16a1 1 0 0 1 1 1v6h-3v3H6v-3H3v-6a1 1 0 0 1 1-1z" />
        <path d="M8 16h8" />
        <circle cx="17.5" cy="11.5" r=".6" fill="currentColor" stroke="none" />
      </>
    ),
  },
  {
    title: 'Millions of Pieces',
    body: 'Produced every month.',
    icon: (
      <>
        <rect x="3" y="6" width="18" height="13" rx="2" />
        <path d="M3.5 7.5 12 13l8.5-5.5" />
      </>
    ),
  },
  {
    title: 'No Volume Too Large',
    body: 'Scale up without switching vendors.',
    icon: (
      <>
        <path d="M4 19V5" />
        <path d="M4 19h16" />
        <path d="M7 15l4-4 3 3 5-6" />
        <path d="M19 8h-3M19 8v3" />
      </>
    ),
  },
  {
    title: 'On Time, at Scale',
    body: 'Big drops that still hit your calendar.',
    icon: (
      <>
        <circle cx="12" cy="13" r="8" />
        <path d="M12 9v4l2.5 2" />
        <path d="M9 2h6" />
      </>
    ),
  },
]

export default function BuiltForVolume() {
  return (
    <section
      className={`${jakarta.className} relative overflow-hidden px-6 lg:px-8 py-16 lg:py-20`}
      style={{ background: 'linear-gradient(135deg, #d6f2c4 0%, #e5ddff 52%, #ffe2cc 100%)' }}
    >
      {/* soft brand-color blobs */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div className="absolute" style={{ top: '-30%', left: '-8%', width: '520px', height: '520px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(58,138,45,0.28), transparent 62%)' }} />
        <div className="absolute" style={{ bottom: '-40%', right: '-6%', width: '560px', height: '560px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,58,237,0.20), transparent 62%)' }} />
        <div className="absolute" style={{ top: '18%', right: '20%', width: '300px', height: '300px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(234,88,12,0.16), transparent 65%)' }} />
      </div>

      <div className="relative max-w-6xl mx-auto">
        <span
          className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold uppercase"
          style={{ letterSpacing: '2.5px', color: '#2d7a1f', background: '#e6f4e0', border: '1px solid #cbe6bf' }}
        >
          Built for Volume
        </span>

        <h2 className="font-extrabold mt-5 mb-4" style={{ color: '#10241a', fontSize: 'clamp(1.9rem, 4vw, 2.6rem)', lineHeight: 1.08, letterSpacing: '-1px' }}>
          No Order Is{' '}
          <span style={{ background: 'linear-gradient(90deg, #3a8a2d, #7dc242)', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Too Big.
          </span>
        </h2>

        <p className="max-w-3xl" style={{ color: '#45564c', fontSize: '1.075rem', lineHeight: 1.6 }}>
          We run high-volume printing and mailing in-house, so your campaign ships complete and on time,
          whether it&rsquo;s 5,000 pieces or 500,000. High-volume mailers: your numbers don&rsquo;t scare
          us. They&rsquo;re exactly what we&rsquo;re built for.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-[18px] mt-11">
          {tiles.map((t) => (
            <div
              key={t.title}
              className="rounded-[18px] p-6"
              style={{ background: '#fff', border: '1px solid #e4ebe2', boxShadow: '0 2px 12px rgba(20,40,20,0.04)' }}
            >
              <div
                className="flex items-center justify-center rounded-[13px] mb-4"
                style={{ width: '46px', height: '46px', background: '#eef7e8', color: '#2d7a1f' }}
              >
                <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  {t.icon}
                </svg>
              </div>
              <h3 className="font-bold mb-1.5" style={{ color: '#13301c', fontSize: '1rem', letterSpacing: '-0.2px' }}>{t.title}</h3>
              <p style={{ color: '#6a7a6f', fontSize: '0.85rem', lineHeight: 1.55 }}>{t.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
