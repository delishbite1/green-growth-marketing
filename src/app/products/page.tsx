import CTABanner from '@/components/shared/CTABanner'

const envelopes = [
  {
    img: 'https://i.imgur.com/ifSNnjk.jpeg',
    name: 'Standard Envelope Style A',
    chips: ['Handwritten style', 'Return address', 'Forever stamp'],
    desc: 'The cleanest, most trusted look. A real handwritten style address with a live Forever stamp, indistinguishable from personal mail. Recipients always open it. Our top choice for client acquisition campaigns.',
    popular: true,
  },
  {
    img: 'https://i.imgur.com/uAl8tLi.jpeg',
    name: 'Standard Envelope Style B',
    chips: ['Handwritten style', 'Return address', 'Imprinted stamp'],
    desc: 'Same personal handwritten appearance with an imprinted postage stamp. Perfect for high volume campaigns where you want maximum reach without sacrificing the authentic feel.',
    popular: false,
  },
  {
    img: 'https://i.imgur.com/lLiJTlJ.jpeg',
    name: 'Branded Envelope Style C',
    chips: ['Handwritten style', 'Your logo', 'Forever stamp'],
    desc: 'Combines the warmth of handwriting with your logo on the envelope. Builds instant brand recognition while keeping the personal touch that drives opens. Ideal for businesses with an established brand.',
    popular: false,
  },
  {
    img: 'https://i.imgur.com/1DjFMy3.jpeg',
    name: 'Branded Envelope Style D',
    chips: ['Handwritten style', 'Your logo', 'Imprinted stamp'],
    desc: 'Your logo paired with handwritten addressing and imprinted postage. A smart choice for scaling campaigns. You get brand visibility at the highest volume for your budget.',
    popular: false,
  },
]

const postcards = [
  {
    img: 'https://i.imgur.com/KjuAyR6.jpeg',
    name: 'Large Postcard Premium',
    chips: ['6" x 11"', 'Double Sided', 'Your logo and offer', 'Forever stamp'],
    desc: 'Our largest format postcard. A 6x11" full color mailer with your offer, logo, and call to action, delivered with a live Forever stamp. Proven to generate the highest response rates for service businesses and local campaigns.',
    bestseller: true,
  },
  {
    img: 'https://i.imgur.com/r152TaL.jpeg',
    name: 'Large Postcard Value',
    chips: ['6" x 11"', 'Double Sided', 'Your logo and offer', 'Imprinted stamp'],
    desc: 'The same full size, full color 6x11" postcard with imprinted postage. Best for large scale rollouts and national campaigns. Stretch your budget while maintaining a strong visual presence in every mailbox.',
    bestseller: false,
  },
]

const letters = [
  {
    img: 'https://i.imgur.com/lJD3qg7.jpeg',
    name: 'Handwritten Letter Black Ink',
    chips: ['Cursive on lined paper', 'Black ink'],
    desc: 'A personal handwritten style letter on lined paper in black ink. Creates an authentic connection that printed materials simply cannot match. Readers feel like someone took time to write to them specifically.',
  },
  {
    img: 'https://i.imgur.com/lJD3qg7.jpeg',
    name: 'Handwritten Letter Blue Ink',
    chips: ['Cursive on lined paper', 'Blue ink'],
    desc: 'Same warm handwritten format in blue ink. The color most associated with a genuine, personal signature. Small detail, big psychological impact on how the recipient perceives your message.',
  },
  {
    img: 'https://i.imgur.com/lJD3qg7.jpeg',
    name: 'Printed Flyer Full Color',
    chips: ['Full Color Print', 'Logo, offer and CTA'],
    desc: 'A professionally designed full color printed flyer inside the envelope. Perfect for businesses with strong visual branding, multiple services, or a specific offer that benefits from layout and imagery.',
  },
]

export default function ProductsPage() {
  return (
    <div>
      {/* Hero */}
      <section
        className="relative overflow-hidden text-white text-center py-20 px-6"
        style={{ background: 'linear-gradient(135deg, #1a5c1a 0%, #0d2b0d 50%, #1a0a2e 100%)' }}
      >
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(ellipse at 30% 50%, rgba(124,194,66,0.12) 0%, transparent 60%), radial-gradient(ellipse at 75% 30%, rgba(124,58,237,0.15) 0%, transparent 55%)'
        }} />
        <div className="relative max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-4 py-1.5 text-xs font-bold tracking-widest uppercase text-green-300 mb-6">
            🌱 Direct Mail Products
          </div>
          <h1 className="text-4xl md:text-5xl font-black leading-tight mb-4">
            What We <span style={{ background: 'linear-gradient(90deg,#7dc242,#a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Actually Mail</span> for You
          </h1>
          <p className="text-lg text-white/70 leading-relaxed">
            Every piece is handcrafted and mailed on your behalf. From design to your customers' mailboxes. These are our most proven formats.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Envelopes */}
        <section className="py-16">
          <div className="rounded-2xl border border-green-100 p-6 mb-10" style={{ background: 'linear-gradient(135deg, #f0fdf4, #faf5ff)' }}>
            <div className="flex gap-4 items-start">
              <span className="text-3xl flex-shrink-0 mt-0.5">💡</span>
              <div>
                <h3 className="font-bold text-green-800 mb-1">Why handwritten envelopes get opened</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  In a world of digital noise, a real handwritten envelope stands out. Studies show handwritten mail has a 99% open rate, far higher than email or printed flyers. That's why our envelope campaigns consistently deliver the highest return on investment for our clients.
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0" style={{ background: 'linear-gradient(135deg,#dcfce7,#bbf7d0)' }}>✉️</div>
            <div>
              <h2 className="text-2xl font-black text-gray-900">Handwritten Envelopes</h2>
              <p className="text-gray-500 text-sm mt-0.5">Our #1 most requested product. Feels personal, gets opened.</p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            {envelopes.map((p) => (
              <div key={p.name} className={`rounded-2xl overflow-hidden border bg-white shadow-sm hover:-translate-y-1 transition-transform ${p.popular ? 'border-green-400' : 'border-gray-200'}`}>
                <img src={p.img} alt={p.name} className="w-full object-cover" style={{ aspectRatio: '4/3' }} />
                <div className="p-5 flex flex-col gap-3">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-bold text-gray-900">{p.name}</h3>
                    {p.popular && <span className="text-xs font-bold uppercase tracking-wide bg-green-100 text-green-700 px-3 py-1 rounded-full whitespace-nowrap">Most Popular</span>}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {p.chips.map(c => <span key={c} className="text-xs bg-gray-50 border border-gray-200 rounded-md px-2 py-0.5 text-gray-500">{c}</span>)}
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Postcards */}
        <section className="py-16 border-t border-gray-100">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0" style={{ background: 'linear-gradient(135deg,#dbeafe,#bfdbfe)' }}>📮</div>
            <div>
              <h2 className="text-2xl font-black text-gray-900">Double Sided Postcards</h2>
              <p className="text-gray-500 text-sm mt-0.5">Bold, visual, and impossible to ignore</p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            {postcards.map((p) => (
              <div key={p.name} className={`rounded-2xl overflow-hidden border bg-white shadow-sm hover:-translate-y-1 transition-transform ${p.bestseller ? 'border-green-400' : 'border-gray-200'}`}>
                <img src={p.img} alt={p.name} className="w-full object-cover" style={{ aspectRatio: '4/3' }} />
                <div className="p-5 flex flex-col gap-3">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-bold text-gray-900">{p.name}</h3>
                    {p.bestseller && <span className="text-xs font-bold uppercase tracking-wide bg-orange-100 text-orange-700 px-3 py-1 rounded-full whitespace-nowrap">Best Seller</span>}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {p.chips.map(c => <span key={c} className="text-xs bg-gray-50 border border-gray-200 rounded-md px-2 py-0.5 text-gray-500">{c}</span>)}
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Inside Letters */}
        <section className="py-16 border-t border-gray-100">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0" style={{ background: 'linear-gradient(135deg,#ede9fe,#ddd6fe)' }}>📝</div>
            <div>
              <h2 className="text-2xl font-black text-gray-900">Inside Letters</h2>
              <p className="text-gray-500 text-sm mt-0.5">What's inside the envelope. The message that closes the deal.</p>
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-5">
            {letters.map((p) => (
              <div key={p.name} className="rounded-2xl overflow-hidden border border-gray-200 bg-white shadow-sm hover:-translate-y-1 transition-transform">
                <img src={p.img} alt={p.name} className="w-full object-cover" style={{ aspectRatio: '4/3' }} />
                <div className="p-5 flex flex-col gap-3">
                  <h3 className="font-bold text-gray-900">{p.name}</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {p.chips.map(c => <span key={c} className="text-xs bg-gray-50 border border-gray-200 rounded-md px-2 py-0.5 text-gray-500">{c}</span>)}
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>

      <CTABanner
        heading="Not Sure Which Product is Right for You?"
        subheading="Tell us your goal and budget. We'll recommend the best format and handle everything from design to delivery."
      />
    </div>
  )
}
