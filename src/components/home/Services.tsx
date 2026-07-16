import { Mail, FileText, PenLine, Users, Printer, Zap } from 'lucide-react'
import Link from 'next/link'

const services = [
  {
    icon: PenLine,
    title: 'Handwritten Envelopes',
    description: 'Real pen-and-ink handwritten addresses that stand out in any mailbox. Open rates dramatically higher than printed envelopes.',
    iconColor: '#ea580c', iconBg: '#fff7ed', borderColor: '#fed7aa', pill: 'Most Popular', pillStyle: { background: '#fef3c7', color: '#b45309' },
  },
  {
    icon: FileText,
    title: 'Personalized Letters',
    description: "Variable-data letters with each recipient's name, address, and custom offer. Personal touch at scale, proven to outperform generic mail.",
    iconColor: '#7c3aed', iconBg: '#faf5ff', borderColor: '#ddd6fe', pill: null, pillStyle: {},
  },
  {
    icon: Mail,
    title: 'Postcard Campaigns',
    description: 'Eye-catching full-color postcards in every standard size. High-impact design that drives calls, foot traffic, and conversions.',
    iconColor: '#3a8a2d', iconBg: '#f0fdf4', borderColor: '#bbf7d0', pill: null, pillStyle: {},
  },
  {
    icon: Users,
    title: 'Targeted Mailing Lists',
    description: 'Precision-targeted lists by ZIP code, demographics, income level, homeowner status, industry, and hundreds of other filters.',
    iconColor: '#2563eb', iconBg: '#eff6ff', borderColor: '#bfdbfe', pill: null, pillStyle: {},
  },
  {
    icon: Printer,
    title: 'Premium Printing',
    description: 'Full-color, high-resolution printing on premium stocks. UV coating, gloss, matte, and specialty finishes available.',
    iconColor: '#0d9488', iconBg: '#f0fdfa', borderColor: '#99f6e4', pill: null, pillStyle: {},
  },
  {
    icon: Zap,
    title: 'Full Campaign Management',
    description: 'From concept to delivery, we handle design, copywriting, printing, addressing, postage, and USPS mail drop. You do nothing.',
    iconColor: '#d97706', iconBg: '#fffbeb', borderColor: '#fde68a', pill: 'Best Value', pillStyle: { background: '#fef3c7', color: '#b45309' },
  },
]

export default function Services() {
  return (
    <section className="section-padding bg-white">
      <div className="container-max">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-bold px-4 py-2 rounded-full mb-4 border" style={{ background: '#f0fdf4', color: '#15803d', borderColor: '#bbf7d0' }}>
            Everything You Need
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
            One Partner.{' '}
            <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(90deg, #3a8a2d, #7dc242)' }}>Every Service.</span>
          </h2>
          <p className="text-gray-500 text-lg leading-relaxed">
            We handle the entire direct mail process under one roof. No vendor juggling, no hidden costs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map(({ icon: Icon, title, description, iconColor, iconBg, borderColor, pill, pillStyle }) => (
            <div
              key={title}
              className="group relative rounded-2xl border-2 bg-white p-7 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              style={{ borderColor }}
            >
              {pill && (
                <div className="absolute top-5 right-5 text-[10px] font-bold px-2.5 py-1 rounded-full" style={pillStyle}>{pill}</div>
              )}
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300" style={{ background: iconBg }}>
                <Icon className="w-6 h-6" style={{ color: iconColor }} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2.5">{title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/contact" className="inline-flex items-center gap-2 text-white font-bold px-6 py-3 rounded-xl transition-all duration-200 text-sm shadow-md hover:shadow-lg hover:-translate-y-0.5" style={{ background: 'linear-gradient(135deg, #3a8a2d, #7dc242)' }}>
            Talk to a Direct Mail Expert
          </Link>
        </div>
      </div>
    </section>
  )
}
