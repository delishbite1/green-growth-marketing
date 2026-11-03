import ProductZoom from '@/components/brand/ProductZoom'
import { Lightbulb, CheckCircle2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import BenefitStrip from '@/components/brand/BenefitStrip'
import type { Metadata } from 'next'
export const metadata: Metadata = { title: 'Direct Mail Products | Green Growth Marketing', description: 'Explore GGM handwritten envelopes, personalized letters and full color postcards for your next mailing.', alternates: { canonical: '/products' } }
import ProductPhoto from '@/components/brand/ProductPhoto'
import PageHero from '@/components/brand/PageHero'
import CTABanner from '@/components/shared/CTABanner'

const envelopes = [
  {
    img: '/products/env-style-a.jpg',
    name: 'Standard Envelope Style A',
    chips: ['Handwritten style', 'Return address', 'Forever stamp'],
    desc: 'The cleanest, most personal look. A real handwritten style address with a live Forever stamp, so it lands looking like a letter from a friend rather than an ad. This is the one we recommend first for winning new customers.',
    recommended: true,
  },
  {
    img: '/products/env-style-b.jpg',
    name: 'Standard Envelope Style B',
    chips: ['Handwritten style', 'Return address', 'Imprinted stamp'],
    desc: 'Same personal handwritten appearance with an imprinted postage stamp. Built for high volume campaigns where you want maximum reach without sacrificing the authentic feel.',
    recommended: false,
  },
  {
    img: '/products/env-style-c.jpg',
    name: 'Branded Envelope Style C',
    chips: ['Handwritten style', 'Your logo', 'Forever stamp'],
    desc: 'Combines the warmth of handwriting with your logo on the envelope. You get brand recognition while keeping the personal touch. Ideal for businesses with an established brand.',
    recommended: false,
  },
  {
    img: '/products/env-style-d.jpg',
    name: 'Branded Envelope Style D',
    chips: ['Handwritten style', 'Your logo', 'Imprinted stamp'],
    desc: 'Your logo paired with handwritten addressing and imprinted postage. A smart choice for scaling campaigns. You get brand visibility at the highest volume for your budget.',
    recommended: false,
  },
]

const postcards = [
  {
    img: '/products/postcard-premium.jpg',
    name: 'Large Postcard Premium',
    chips: ['6" x 11"', 'Double Sided', 'Your logo and offer', 'Forever stamp'],
    desc: 'Our largest format postcard. A 6x11" full color mailer with your offer, logo, and call to action, delivered with a live Forever stamp. It is hard to miss in a mailbox, which is why we reach for it on service businesses and local campaigns.',
    recommended: true,
  },
  {
    img: '/products/postcard-value.jpg',
    name: 'Large Postcard Value',
    chips: ['6" x 11"', 'Double Sided', 'Your logo and offer', 'Imprinted stamp'],
    desc: 'The same full size, full color 6x11" postcard with imprinted postage. Built for large scale rollouts and national campaigns. Stretch your budget while keeping a strong visual presence in every mailbox.',
    recommended: false,
  },
]

const letters = [
  { img: '/products/letter-black.jpg', name: 'Handwritten Letter Black Ink', chips: ['Cursive on lined paper', 'Black ink'], desc: 'A personal handwritten style letter on lined paper in black ink. A familiar format that gives your message a personal feel.', width: 1104, height: 1425 },
  { img: '/products/letter-blue.jpg', name: 'Handwritten Letter Blue Ink', chips: ['Cursive on lined paper', 'Blue ink'], desc: 'Same warm handwritten format in blue ink. A distinctive option for a personal message, with clear blue handwriting on lined paper.', width: 1102, height: 1428 },
  { img: '/products/flyer-color.jpg', name: 'Printed Flyer Full Color', chips: ['Full Color Print', 'Logo, offer and CTA'], desc: 'A professionally designed full color printed flyer inside the envelope. Perfect for businesses with strong visual branding, multiple services, or a specific offer that benefits from layout and imagery.', width: 1160, height: 1500 },
]

type Product = { img: string; name: string; chips: string[]; desc: string; recommended?: boolean; width?: number; height?: number }

function ProductRows({ products }: { products: Product[] }) {
  return <div className="space-y-5">{products.map(p=><article key={p.name} className="grid overflow-hidden rounded-2xl border border-ggm-forest/10 bg-ggm-paper shadow-[0_8px_30px_-24px_rgba(23,61,50,0.3)] md:grid-cols-[1fr_1fr]">
    <div className="product-photo-panel flex min-w-0 items-center justify-center bg-[#503A30] p-4 sm:p-6 [&_.product-zoom-caption]:text-[#F7EBDD]">
      <ProductZoom title={p.name} caption="View larger image">
        {p.width && p.height ? <Image src={p.img} alt={p.name} width={p.width} height={p.height} sizes="(min-width: 768px) 42vw, 90vw" className="mx-auto h-auto max-h-96 w-auto max-w-full object-contain" /> : <ProductPhoto src={p.img} alt={p.name} />}
      </ProductZoom>
    </div>
    <div className="flex min-w-0 flex-col justify-center gap-4 p-6 sm:p-8">
      <div className="flex flex-wrap items-start justify-between gap-3"><h3 className="max-w-xs text-xl font-bold leading-tight text-ggm-forest sm:text-2xl">{p.name}</h3>{p.recommended && <span className="rounded-full bg-ggm-sage-surface px-3 py-1.5 text-[10px] font-bold uppercase tracking-wide text-ggm-forest">Our recommendation</span>}</div>
      <ul className="flex flex-wrap gap-2" aria-label={`${p.name} features`}>{p.chips.map(c=><li key={c} className="rounded-md bg-ggm-ivory px-2.5 py-1 text-xs text-ggm-muted">{c}</li>)}</ul>
      <p className="text-[15px] leading-relaxed text-ggm-muted">{p.desc}</p>
    </div>
  </article>)}</div>
}

export default function ProductsPage() {
  return <div className="bg-ggm-ivory font-body">
    <PageHero eyebrow="Our products" title="A personal touch," accent="in every format." description="Explore handwritten envelopes, personalized letters and postcards. Find the details, styles and options that match your goals." />
    <BenefitStrip />
    <div className="mx-auto max-w-6xl px-5 pb-14 sm:px-8">
      <aside className="my-10 grid gap-6 rounded-2xl border border-ggm-forest/10 bg-[#EEE8DA] p-6 sm:my-14 sm:p-8 lg:grid-cols-[1.35fr_1fr]">
        <div className="flex items-start gap-4"><Lightbulb className="mt-1 h-7 w-7 shrink-0 text-ggm-forest" strokeWidth={1.4} aria-hidden /><div><h2 className="text-lg font-bold text-ggm-forest">The details that make mail personal.</h2><p className="mt-2 text-sm leading-relaxed text-ggm-muted">The handwritten address, return details and postage give your message a personal presentation before the envelope is opened. Explore the styles and finishes for your mailing.</p></div></div>
        <ul className="space-y-3 border-ggm-forest/15 lg:border-l lg:pl-8">{['Handwritten addressing','Postage options','Return address and branding','Multiple styles to choose from'].map(f=><li key={f} className="flex items-center gap-3 text-sm text-ggm-forest"><CheckCircle2 className="h-4 w-4 shrink-0 text-ggm-gold-ink" aria-hidden />{f}</li>)}</ul>
      </aside>
      <section className="pb-14"><div className="mb-7 sm:pl-6"><h2 className="text-3xl font-bold tracking-tight text-ggm-forest sm:text-4xl">Handwritten Envelopes</h2><p className="mt-3 text-base text-ggm-muted">Choose the style that fits your business and campaign goals.</p><p className="mt-2 text-base text-ggm-muted">Want us to run the whole letter campaign? See our <Link href="/handwritten-letters" className="font-semibold text-ggm-forest underline decoration-ggm-gold underline-offset-4">handwritten direct mail service</Link>.</p></div><ProductRows products={envelopes} /></section>
      <section className="border-t border-ggm-forest/15 py-14"><div className="mb-7 sm:pl-6"><h2 className="text-3xl font-bold tracking-tight text-ggm-forest sm:text-4xl">Double Sided Postcards</h2><p className="mt-3 text-base text-ggm-muted">A visual format for your message and offer.</p><p className="mt-2 text-base text-ggm-muted">Looking for a full service campaign? See our <Link href="/postcard-mailing" className="font-semibold text-ggm-forest underline decoration-ggm-gold underline-offset-4">postcard mailing service</Link>.</p></div><ProductRows products={postcards} /></section>
      <section className="border-t border-ggm-forest/15 pt-14"><div className="mb-7 sm:pl-6"><h2 className="text-3xl font-bold tracking-tight text-ggm-forest sm:text-4xl">Inside Letters</h2><p className="mt-3 text-base text-ggm-muted">From handwritten letters to full color flyers.</p><p className="mt-2 text-base text-ggm-muted">Looking for a full service campaign? See our <Link href="/handwritten-letters" className="font-semibold text-ggm-forest underline decoration-ggm-gold underline-offset-4">handwritten direct mail service</Link>.</p></div><ProductRows products={letters} /></section>
    </div>
    <CTABanner heading="Not Sure Which Product is Right for You?" subheading="Tell us your goal and budget. We'll recommend a format and discuss the details of your mailing." />
  </div>
}
