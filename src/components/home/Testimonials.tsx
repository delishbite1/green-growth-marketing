import { Star, Quote } from 'lucide-react'

const testimonials = [
  { name: 'Sarah J.', role: 'Owner', company: 'Bright Clean Services', content: 'Green Growth Marketing helped us reach more customers than we ever thought possible. The quality, service, and results are unmatched! We went from 3 crews to 9 in under a year.', rating: 5, initials: 'SJ', accent: '#7dc242', bg: '#f0fdf4' },
  { name: 'Marcus T.', role: 'Marketing Director', company: 'Apex Roofing Co.', content: "Nothing comes close to the cost-per-lead we get from our postcard campaigns with Green Growth. The price they gave us was 30% below what we were paying elsewhere.", rating: 5, initials: 'MT', accent: '#7c3aed', bg: '#faf5ff' },
  { name: 'Dr. Lisa Reyes', role: 'Owner', company: 'Reyes Family Dental', content: "We mailed to 5,000 households within 5 miles and booked 47 new patients in the first month. The ROI was incredible. Their team held our hand through the entire process.", rating: 5, initials: 'LR', accent: '#ea580c', bg: '#fff7ed' },
  { name: 'Kevin B.', role: 'Broker', company: 'Premier Real Estate Group', content: 'Green Growth built our lists, designed our just-sold cards, and handled all the mailing. We close 2-3 extra listings per month directly from these campaigns.', rating: 5, initials: 'KB', accent: '#2563eb', bg: '#eff6ff' },
  { name: 'Priya S.', role: 'Founder', company: 'Studio 7 Fitness', content: "We launched our new location with a 10,000-piece postcard drop and had lines out the door on opening weekend. Already planning our next campaign.", rating: 5, initials: 'PS', accent: '#0d9488', bg: '#f0fdfa' },
  { name: 'Tom H.', role: 'Owner', company: 'H&H HVAC Services', content: 'Seasonal reminders sent to 8,000 homeowners tripled our spring tune-up bookings. Simple, effective, and a price that made sense for a small business like ours.', rating: 5, initials: 'TH', accent: '#d97706', bg: '#fffbeb' },
]

export default function Testimonials() {
  return (
    <section className="section-padding bg-white">
      <div className="container-max">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-bold px-4 py-2 rounded-full mb-4 border" style={{ background: '#fffbeb', color: '#b45309', borderColor: '#fde68a' }}>
            What Clients Say
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">Real Results From Real Businesses</h2>
          <div className="flex items-center justify-center gap-1 mt-3">
            {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current text-amber-400" />)}
            <span className="text-sm font-semibold text-gray-600 ml-2">4.9 out of 5 (1,200+ reviews)</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map(({ name, role, company, content, rating, initials, accent, bg }) => (
            <div key={name} className="bg-white border-2 rounded-2xl p-7 hover:shadow-xl hover:-translate-y-1 transition-all duration-300" style={{ borderColor: `${accent}30` }}>
              <div className="flex items-start justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: bg }}>
                    <span className="font-bold text-sm" style={{ color: accent }}>{initials}</span>
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 text-sm">{name}</div>
                    <div className="text-xs text-gray-400">{role}, {company}</div>
                  </div>
                </div>
                <Quote className="w-7 h-7 flex-shrink-0 opacity-20" style={{ color: accent }} />
              </div>
              <div className="flex gap-0.5 mb-4">
                {[...Array(rating)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current text-amber-400" />)}
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">&ldquo;{content}&rdquo;</p>
              <div className="mt-4 pt-4 border-t" style={{ borderColor: `${accent}20` }}>
                <div className="w-8 h-1 rounded-full" style={{ background: accent }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
