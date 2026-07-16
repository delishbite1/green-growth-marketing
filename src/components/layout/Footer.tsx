import Link from 'next/link'
import { Phone, Mail, MapPin, Facebook, Instagram, Youtube } from 'lucide-react'

const services = [
  'Postcard Campaigns', 'Personalized Letters', 'Handwritten Envelopes',
  'Targeted Mailing Lists', 'Premium Printing', 'Campaign Design', 'Postage & Delivery',
]

const industries = [
  'Home Services', 'Real Estate', 'Healthcare & Dental', 'Restaurants',
  'Automotive', 'Fitness & Wellness', 'Retail', 'Financial Services',
]

const company = [
  { label: 'Home', href: '/' },
  { label: 'Industries', href: '/industries' },
  { label: 'About Us', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

export default function Footer() {
  return (
    <footer className="text-gray-300" style={{ background: 'linear-gradient(160deg, #0a1a0a 0%, #0d1b0d 40%, #0f0f1a 100%)' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 items-start">

          {/* Brand column */}
          <div className="lg:col-span-1">
            <style>{`
              @keyframes footerLogoIn {
                from { opacity: 0; transform: translateY(8px); }
                to   { opacity: 1; transform: translateY(0); }
              }
              .footer-logo-wrap {
                animation: footerLogoIn 700ms ease-out both;
                display: inline-block;
                transition: transform 0.3s ease;
                position: relative;
              }
              .footer-logo-wrap:hover { transform: scale(1.02); }
              .footer-logo-glow {
                position: absolute;
                top: 38%; left: 50%;
                transform: translate(-50%, -50%);
                width: 130%; height: 110%;
                border-radius: 50%;
                background: radial-gradient(ellipse, rgba(125,194,66,0.10) 0%, transparent 70%);
                pointer-events: none;
              }
            `}</style>
            <Link href="/" className="block mb-6 w-fit">
              <div className="footer-logo-wrap">
                <div className="footer-logo-glow" aria-hidden="true" />
                <img
                  src="/logo-transparent.png"
                  alt="Green Growth Marketing"
                  style={{
                    height: '96px',
                    width: 'auto',
                    objectFit: 'contain',
                    display: 'block',
                    position: 'relative',
                    filter: 'brightness(1.45) saturate(1.15) drop-shadow(0 4px 16px rgba(125,194,66,0.18))',
                  }}
                />
              </div>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed mb-6">
              Direct mail campaigns for businesses nationwide. We handle everything so you can focus on what you do best.
            </p>
            <div className="space-y-3 text-sm">
              <a href="tel:+18886016556" className="flex items-center gap-3 text-gray-300 hover:text-green-400 transition-colors group">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors" style={{ background: 'rgba(122,194,66,0.15)' }}>
                  <Phone className="w-4 h-4 text-green-400" />
                </div>
                (888) 601-6556
              </a>
              <a href="mailto:greengrowthmarketinginc@gmail.com" className="flex items-center gap-3 text-gray-300 hover:text-purple-400 transition-colors group">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(124,58,237,0.15)' }}>
                  <Mail className="w-4 h-4 text-purple-400" />
                </div>
                <span className="break-all text-xs">greengrowthmarketinginc@gmail.com</span>
              </a>
              <div className="flex items-center gap-3 text-gray-400">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(234,88,12,0.15)' }}>
                  <MapPin className="w-4 h-4 text-orange-400" />
                </div>
                Serving all 50 states nationwide
              </div>
            </div>
            {/* Social */}
            <div className="flex gap-3 mt-6">
              {[
                { Icon: Facebook, color: '#7dc242', bg: 'rgba(122,194,66,0.15)' },
                { Icon: Instagram, color: '#c4b5fd', bg: 'rgba(124,58,237,0.15)' },
                { Icon: Youtube, color: '#f97316', bg: 'rgba(234,88,12,0.15)' },
              ].map(({ Icon, color, bg }, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-lg flex items-center justify-center transition-all hover:scale-110" style={{ background: bg }}>
                  <Icon className="w-4 h-4" style={{ color }} />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-5 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-400 inline-block" />
              Services
            </h3>
            <ul className="space-y-2.5">
              {services.map((s) => (
                <li key={s}>
                  <Link href="/contact" className="text-sm text-gray-400 hover:text-green-400 transition-colors">
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Industries */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-5 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-purple-400 inline-block" />
              Industries
            </h3>
            <ul className="space-y-2.5">
              {industries.map((ind) => (
                <li key={ind}>
                  <Link href="/industries" className="text-sm text-gray-400 hover:text-purple-400 transition-colors">{ind}</Link>
                </li>
              ))}
              <li>
                <Link href="/industries" className="text-sm text-purple-400 hover:text-purple-300 font-semibold">View all 80+ industries →</Link>
              </li>
            </ul>
          </div>

          {/* Company + CTA */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-5 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-orange-400 inline-block" />
              Company
            </h3>
            <ul className="space-y-2.5 mb-8">
              {company.map(({ label, href }) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-gray-400 hover:text-orange-400 transition-colors">{label}</Link>
                </li>
              ))}
            </ul>

            <div className="rounded-2xl p-5 border border-white/10" style={{ background: 'linear-gradient(135deg, rgba(58,138,45,0.25), rgba(124,58,237,0.2), rgba(234,88,12,0.15))' }}>
              <p className="text-white font-bold text-sm mb-1">Ready to grow?</p>
              <p className="text-gray-400 text-xs mb-4 leading-relaxed">No commitment, no minimum order. Show us a written competitor quote and we'll beat it.</p>
              <Link href="/contact" className="block text-center text-white font-bold text-sm py-2.5 rounded-xl transition-all hover:-translate-y-0.5" style={{ background: 'linear-gradient(135deg, #3a8a2d, #7dc242)' }}>
                Get a Free Quote
              </Link>
              <a href="tel:+18886016556" className="block text-center text-green-400 hover:text-green-300 text-xs font-semibold mt-3 transition-colors">
                Or call (888) 601-6556
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} Green Growth Marketing. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-gray-300 transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-gray-300 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
