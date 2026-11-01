import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function PageHero({ eyebrow, title, accent, description, compact = false }: { eyebrow: string; title: string; accent?: string; description: string; compact?: boolean }) {
  return <section className="relative isolate overflow-hidden bg-[#062F25] font-body text-ggm-ivory">
    {!compact && <><Image src="/products/direct-mail-hero-v3.jpg" alt="Illustrative arrangement of handwritten mail, a stamped envelope and postcards" width={1086} height={1448} priority sizes="(min-width: 1024px) 55vw, 100vw" className="pointer-events-none absolute inset-y-0 right-0 -z-20 h-full w-full object-cover object-[center_65%] lg:w-[60%]" /><div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(3,28,20,0.96)_0%,rgba(3,28,20,0.88)_40%,rgba(3,28,20,0.35)_100%)] lg:bg-[linear-gradient(90deg,#062F25_25%,rgba(6,47,37,0.75)_48%,rgba(6,47,37,0)_80%)]" /></>}
    <div className={`mx-auto max-w-7xl px-6 sm:px-8 ${compact ? 'py-10 sm:py-14' : 'py-10 sm:py-16 lg:py-20'}`}>
      <div className={compact ? 'max-w-3xl' : 'max-w-xl lg:max-w-[52%]'}>
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#D1B575]">{eyebrow}</p>
        <h1 className="mt-4 text-[2rem] font-bold leading-[1.06] tracking-[-0.035em] sm:text-4xl lg:text-5xl">{title}{accent && <><br /><span className="text-[#D1B575]">{accent}</span></>}</h1>
        <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-white/90 sm:text-lg">{description}</p>
        {!compact && <Link href="/contact#quote-form" className="mt-6 inline-flex min-h-12 items-center justify-center gap-3 rounded-xl border border-white/20 bg-ggm-forest px-6 py-3 text-sm font-semibold text-white transition hover:bg-ggm-forest-deep">Get a Free Quote <ArrowRight className="h-4 w-4" aria-hidden /></Link>}
      </div>
    </div>
  </section>
}
