import { MessageSquare, Palette, Truck, TrendingUp } from 'lucide-react'

const steps = [
  { number: '01', icon: MessageSquare, title: 'Tell Us Your Goals', description: "Call us or send the form, and a real person gets back to you the same business day to understand your business, your ideal customer, and what you want to achieve. Never a bot.", color: '#7dc242', numColor: 'rgba(122,194,66,0.28)' },
  { number: '02', icon: Palette, title: 'We Design & Target', description: 'Our team creates your artwork (or uses yours) and builds a precision-targeted mailing list to reach exactly the right people.', color: '#c4b5fd', numColor: 'rgba(196,181,253,0.28)' },
  { number: '03', icon: Truck, title: 'Print, Mail & Deliver', description: 'We print, address, apply postage, and drop your campaign at the USPS. You do nothing. We handle it all.', color: '#fb923c', numColor: 'rgba(251,146,60,0.28)' },
  { number: '04', icon: TrendingUp, title: 'Watch Your Business Grow', description: 'Your mail lands and the calls start. We talk through what came back and sharpen the next drop, so every campaign works harder than the last.', color: '#7dc242', numColor: 'rgba(122,194,66,0.28)' },
]

export default function HowItWorks() {
  return (
    <section className="section-padding relative overflow-hidden" id="how-it-works" style={{ background: 'linear-gradient(135deg, #0d1b0d 0%, #0d0d1f 50%, #1a0a2e 100%)' }}>
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-20 translate-x-1/3 -translate-y-1/3" style={{ background: 'radial-gradient(circle, #7dc242, transparent)' }} />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-20" style={{ background: 'radial-gradient(circle, #9333ea, transparent)' }} />
        <div className="absolute top-1/2 right-1/3 w-64 h-64 rounded-full blur-3xl opacity-15" style={{ background: 'radial-gradient(circle, #ea580c, transparent)' }} />
      </div>

      <div className="container-max relative">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-bold px-4 py-2 rounded-full mb-4 border border-white/10" style={{ background: 'rgba(122,194,66,0.1)', color: '#a8e063' }}>
            Simple Process
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">From Idea to Mailbox in Days</h2>
          <p className="text-white/50 text-lg leading-relaxed">We've streamlined direct mail so it's faster, easier, and more effective than ever.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map(({ number, icon: Icon, title, description, color, numColor }, i) => (
            <div key={title} className="relative group">
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-full w-full h-px z-10 -translate-y-1/2 opacity-20" style={{ background: `linear-gradient(90deg, ${color}, transparent)` }} />
              )}
              <div className="rounded-2xl border border-white/8 hover:border-white/20 p-6 transition-all duration-300 h-full" style={{ background: 'rgba(255,255,255,0.11)' }}>
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${color}20`, border: `1px solid ${color}30` }}>
                    <Icon className="w-6 h-6" style={{ color }} />
                  </div>
                  <div className="text-5xl font-black leading-none pt-1" style={{ color: numColor, WebkitTextStroke: `1px ${color}40` }}>{number}</div>
                </div>
                <h3 className="text-white font-bold text-base mb-2.5">{title}</h3>
                <p className="text-white/45 text-sm leading-relaxed">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
