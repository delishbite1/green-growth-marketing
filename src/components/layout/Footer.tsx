import Link from 'next/link'
import { Phone, Mail, MapPin, ArrowUpRight } from 'lucide-react'
import { business } from '@/config/business'

const groups = [
  { title: 'Our services', links: [
    { label: 'Handwritten Letters', href: '/handwritten-letters' },
    { label: 'Handwritten Envelopes', href: '/products' },
    { label: 'Postcards', href: '/postcard-mailing' },
    { label: 'Mailing Lists & Printing', href: '/contact' },
  ] },
  { title: 'Explore GGM', links: [
    { label: 'Industries', href: '/industries' },
    { label: 'About Us', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ] },
]

export default function Footer() {
  return (
    <footer className="brand-controls border-t border-ggm-line bg-ggm-ivory font-body text-ggm-forest">
      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-14">
        <div className="flex flex-col items-start justify-between gap-5 border-b border-ggm-forest/15 pb-8 sm:flex-row sm:items-center">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-ggm-gold-ink">Let’s talk direct mail</p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">Bring a personal touch to your next campaign.</h2>
          </div>
          <Link href="/contact#quote-form" className="inline-flex min-h-12 shrink-0 items-center justify-center gap-3 rounded-lg bg-ggm-forest px-5 text-sm font-semibold text-ggm-ivory transition hover:bg-ggm-forest-deep">Get a Free Quote <ArrowUpRight className="h-4 w-4" aria-hidden /></Link>
        </div>

        <div className="grid gap-8 pt-8 lg:grid-cols-[1.1fr_1fr_1.1fr] lg:gap-12">
          <div>
            <Link href="/" aria-label="Green Growth Marketing, homepage" className="inline-flex flex-col text-ggm-forest">
              <span className="font-display text-4xl font-medium leading-none tracking-wide">GGM</span>
              <span aria-hidden className="mt-2 text-[8px] font-semibold uppercase tracking-[0.2em]">Green Growth Marketing</span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-ggm-muted">Personalized letters, handwritten envelopes and postcards. Design, printing and mailing, brought together for your business.</p>
          </div>

          <div className="grid grid-cols-2 gap-5">
            {groups.map(group => (
              <nav key={group.title} aria-label={`Footer ${group.title}`}>
                <h3 className="mb-3 text-xs font-bold uppercase tracking-[0.12em]">{group.title}</h3>
                <ul className="space-y-1">
                  {group.links.map(link => <li key={link.label}><Link href={link.href} className="inline-flex min-h-10 items-center text-sm leading-snug text-ggm-muted underline-offset-4 transition hover:text-ggm-forest hover:underline">{link.label}</Link></li>)}
                </ul>
              </nav>
            ))}
          </div>

          <div>
            <h3 className="mb-3 text-xs font-bold uppercase tracking-[0.12em]">Get in touch</h3>
            <address className="space-y-3 text-sm not-italic leading-relaxed text-ggm-muted">
              <a href="tel:+18886016556" className="flex min-h-10 items-center gap-3 hover:text-ggm-forest"><Phone className="h-4 w-4 shrink-0 text-ggm-forest" aria-hidden />(888) 601-6556</a>
              <a href="mailto:greengrowthmarketinginc@gmail.com" className="flex min-h-10 items-center gap-3 hover:text-ggm-forest"><Mail className="h-4 w-4 shrink-0 text-ggm-forest" aria-hidden /><span className="break-all">greengrowthmarketinginc@gmail.com</span></a>
              <p className="flex items-start gap-3"><MapPin className="mt-1 h-4 w-4 shrink-0 text-ggm-forest" aria-hidden /><span>{business.address.line1}, {business.address.line2}<br />{business.address.city}, {business.address.state} {business.address.zip}</span></p>
            </address>
          </div>
        </div>
      </div>
      <div className="border-t border-ggm-forest/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-5 text-xs leading-relaxed text-ggm-muted sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>© {new Date().getFullYear()} {business.legalName}. All rights reserved.</p>
          <div className="flex gap-6"><Link href="/privacy" className="py-2 hover:underline">Privacy Policy</Link><Link href="/terms" className="py-2 hover:underline">Terms of Service</Link></div>
        </div>
      </div>
    </footer>
  )
}
