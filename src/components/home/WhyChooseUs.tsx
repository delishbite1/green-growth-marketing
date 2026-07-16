import { BadgeCheck, Headphones, Layers, ShieldCheck, Clock, Trophy } from 'lucide-react'

const reasons = [
  { icon: Trophy, title: 'Guaranteed Best Price', description: "Show us a written competitor quote for the same specs and we'll beat it. Same budget means more pieces mailed. Same volume means lower cost.", highlight: true },
  { icon: Layers, title: 'A to Z Full Service', description: 'Design, list, print, address, stamp, and mail. Handled by us. No need to manage multiple vendors or coordinate logistics.', highlight: false, color: '#7c3aed', bg: '#faf5ff' },
  { icon: BadgeCheck, title: 'No Minimum Order', description: 'Start with 100 pieces or a million. We work with businesses of every size, from solo entrepreneurs to national enterprises.', highlight: false, color: '#ea580c', bg: '#fff7ed' },
  { icon: ShieldCheck, title: 'No Long-Term Contract', description: "Work with us campaign by campaign. We earn your repeat business by delivering results, not by locking you in.", highlight: false, color: '#2563eb', bg: '#eff6ff' },
  { icon: Clock, title: 'Fast Turnaround', description: 'Industry-leading production speeds. We respond to quotes within hours and get your campaign in the mail without delays.', highlight: false, color: '#0d9488', bg: '#f0fdfa' },
  { icon: Headphones, title: 'Personal Expert Guidance', description: "A real human walks you through everything, from strategy and targeting to creative and tracking. Not a self-serve portal.", highlight: false, color: '#d97706', bg: '#fffbeb' },
]

export default function WhyChooseUs() {
  return (
    <section className="section-padding" style={{ background: 'linear-gradient(135deg, #fafffe 0%, #f5f3ff 50%, #fff7ed 100%)' }}>
      <div className="container-max">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-bold px-4 py-2 rounded-full mb-4 border" style={{ background: '#faf5ff', color: '#7c3aed', borderColor: '#ddd6fe' }}>
            Why Green Growth Marketing
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
            The Direct Mail Partner That{' '}
            <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(90deg, #3a8a2d, #7c3aed)' }}>
              Actually Delivers
            </span>
          </h2>
          <p className="text-gray-500 text-lg leading-relaxed">
            We exist to give every business access to professional, affordable direct mail that gets real results.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map(({ icon: Icon, title, description, highlight, color, bg }) => (
            <div
              key={title}
              className="relative rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              style={highlight
                ? { background: 'linear-gradient(135deg, #1a5c1a 0%, #3a8a2d 50%, #7c3aed 100%)', boxShadow: '0 20px 50px rgba(58,138,45,0.25)' }
                : { background: 'white', border: '2px solid #f1f5f9' }}
            >
              {highlight && (
                <div className="absolute top-4 right-4 text-[10px] font-bold px-2.5 py-1 rounded-full" style={{ background: 'rgba(255,255,255,0.2)', color: '#fff' }}>
                  Our Promise
                </div>
              )}
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ background: highlight ? 'rgba(255,255,255,0.2)' : bg }}>
                <Icon className="w-6 h-6" style={{ color: highlight ? '#fff' : color }} />
              </div>
              <h3 className={`text-lg font-bold mb-2.5 ${highlight ? 'text-white' : 'text-gray-900'}`}>{title}</h3>
              <p className={`text-sm leading-relaxed ${highlight ? 'text-white/75' : 'text-gray-500'}`}>{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
