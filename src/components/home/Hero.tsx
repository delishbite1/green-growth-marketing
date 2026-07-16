import Link from 'next/link'
import Image from 'next/image'
import { ChevronRight, Phone, CheckCircle2, Star } from 'lucide-react'

const features = [
  { label: 'More Customers', color: '#16a34a' },
  { label: 'Better Results', color: '#2563eb' },
  { label: 'Great Pricing', color: '#7c3aed' },
  { label: 'Full Service', color: '#d97706' },
]

export default function Hero() {
  return (
    <section className="overflow-hidden" style={{
      marginTop: '-80px',
      paddingTop: '80px',
      background: 'radial-gradient(ellipse at 20% 60%, rgba(34,197,94,0.10) 0%, transparent 55%), radial-gradient(ellipse at 80% 20%, rgba(124,58,237,0.09) 0%, transparent 50%), radial-gradient(ellipse at 60% 80%, rgba(59,130,246,0.07) 0%, transparent 50%), #f8faf8',
    }}>
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-12 lg:py-16">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-6">

          {/* ── LEFT: real HTML text & buttons ── */}
          <div className="w-full lg:w-[48%] flex-shrink-0">

            <div className="text-green-700 text-xs font-black uppercase tracking-widest mb-5">
              🌱 Direct Mail That Delivers Results
            </div>

            <h1 className="font-black leading-[1.08] mb-5">
              <span className="block text-[2.6rem] sm:text-5xl lg:text-[3.2rem] text-gray-900 mb-1">
                More Postcards.
              </span>
              <span className="block text-[2.6rem] sm:text-5xl lg:text-[3.2rem] text-green-600 mb-1">
                More Business.
              </span>
              <span className="block text-[2.6rem] sm:text-5xl lg:text-[3.2rem] italic"
                style={{
                  fontFamily: 'Georgia, "Times New Roman", serif',
                  background: 'linear-gradient(90deg, #7c3aed, #ec4899)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>
                Better Results.
              </span>
            </h1>

            <p className="text-gray-500 text-lg leading-relaxed mb-6 max-w-lg">
              We handle everything: design, mailing lists, printing, addressing, and postage so you can focus on what you do best. We deliver results.
            </p>

            <div className="flex flex-wrap gap-x-5 gap-y-2 mb-8">
              {features.map(({ label, color }) => (
                <div key={label} className="flex items-center gap-1.5 text-sm font-semibold text-gray-700">
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0" style={{ color }} />
                  {label}
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mb-7">
              <Link
                href="/contact"
                className="flex items-center justify-center gap-2 text-white font-bold px-8 py-4 rounded-xl text-base transition-all hover:-translate-y-0.5 shadow-lg"
                style={{ background: 'linear-gradient(135deg, #2d7a1f, #4aac2e)', boxShadow: '0 8px 25px rgba(74,172,46,0.35)' }}
              >
                Get Your Free Quote <ChevronRight className="w-5 h-5" />
              </Link>
              <a
                href="tel:+18886016556"
                className="flex items-center justify-center gap-2 border-2 border-gray-200 hover:border-green-400 text-gray-700 hover:text-green-700 font-bold px-8 py-4 rounded-xl text-base transition-all bg-white"
              >
                <Phone className="w-5 h-5 text-green-600" />
                Call (888) 601-6556
              </a>
            </div>

            <div className="flex items-center gap-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ))}
              <span className="text-sm text-gray-500 font-medium">Trusted by hundreds of businesses nationwide</span>
            </div>
          </div>

          {/* ── RIGHT: mailbox + postcards image ── */}
          <div className="w-full lg:w-[52%] flex-shrink-0 relative flex items-center justify-center" style={{ overflow: 'visible' }}>

            {/* Decorative color blobs behind image */}
            <div className="absolute inset-0 pointer-events-none" aria-hidden="true" style={{ filter: 'blur(48px)', zIndex: 0 }}>
              <div className="absolute" style={{ top: '15%', left: '10%', width: '55%', height: '55%', borderRadius: '50%', background: 'radial-gradient(circle, rgba(34,197,94,0.22), transparent 70%)' }} />
              <div className="absolute" style={{ top: '10%', right: '5%', width: '50%', height: '50%', borderRadius: '50%', background: 'radial-gradient(circle, rgba(59,130,246,0.16), transparent 70%)' }} />
              <div className="absolute" style={{ bottom: '10%', right: '15%', width: '45%', height: '45%', borderRadius: '50%', background: 'radial-gradient(circle, rgba(168,85,247,0.16), transparent 70%)' }} />
              <div className="absolute" style={{ bottom: '20%', left: '5%', width: '40%', height: '40%', borderRadius: '50%', background: 'radial-gradient(circle, rgba(244,163,94,0.10), transparent 70%)' }} />
            </div>

            <style>{`
              @keyframes floatHeroImage {
                0%   { transform: perspective(1200px) rotateY(-2deg) translateY(0px); }
                50%  { transform: perspective(1200px) rotateY(-1.6deg) translateY(-10px); }
                100% { transform: perspective(1200px) rotateY(-2deg) translateY(0px); }
              }
              @media (prefers-reduced-motion: reduce) {
                .hero-mailbox { animation: none !important; }
              }
              .hero-mailbox:hover {
                transform: perspective(1200px) rotateY(-1deg) translateY(-4px) scale(1.01) !important;
                transition: transform 0.5s ease !important;
              }
            `}</style>

            <img
              src="/mailbox.png"
              alt="Green Growth Marketing direct mail postcards and letters in a mailbox"
              className="hero-mailbox relative"
              style={{
                width: '112%',
                maxWidth: '860px',
                height: 'auto',
                objectFit: 'contain',
                display: 'block',
                zIndex: 1,
                animation: 'floatHeroImage 6s ease-in-out infinite',
                filter: 'drop-shadow(0 28px 40px rgba(15,23,42,0.18))',
                mixBlendMode: 'multiply',
                transformOrigin: 'center',
                transition: 'transform 0.5s ease',
              }}
            />
          </div>

        </div>
      </div>

      {/* Stats bar */}
      <div className="border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6 grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          {[
            { value: '10K+', label: 'Businesses Served', color: '#16a34a' },
            { value: '50M+', label: 'Pieces Mailed', color: '#2563eb' },
            { value: '98%', label: 'Delivery Rate', color: '#7c3aed' },
            { value: 'A–Z', label: 'Full Service', color: '#d97706' },
          ].map(({ value, label, color }) => (
            <div key={label}>
              <div className="text-3xl font-black" style={{ color }}>{value}</div>
              <div className="text-sm text-gray-500 font-medium mt-0.5">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
