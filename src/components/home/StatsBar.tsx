import AnimatedCounter from '@/components/shared/AnimatedCounter'
import { Users, Send, CheckCircle, TrendingUp } from 'lucide-react'

const stats = [
  { icon: Users, value: 10000, suffix: '+', label: 'Businesses Served', color: '#7dc242', bg: 'rgba(122,194,66,0.12)', gradient: 'linear-gradient(90deg, #7dc242, #a8e063)' },
  { icon: Send, value: 50, suffix: 'M+', label: 'Pieces Mailed', color: '#c4b5fd', bg: 'rgba(196,181,253,0.12)', gradient: 'linear-gradient(90deg, #c4b5fd, #9333ea)' },
  { icon: CheckCircle, value: 98, suffix: '%', label: 'USPS Delivery Rate', color: '#fb923c', bg: 'rgba(251,146,60,0.12)', gradient: 'linear-gradient(90deg, #fb923c, #ea580c)' },
  { icon: TrendingUp, value: 5, suffix: 'x', label: 'Average ROI', color: '#7dc242', bg: 'rgba(122,194,66,0.12)', gradient: 'linear-gradient(90deg, #a8e063, #7dc242)' },
]

export default function StatsBar() {
  return (
    <section className="py-16 px-6 lg:px-8" style={{ background: 'linear-gradient(135deg, #0d1b0d, #0d0d1f, #1a0a2e)' }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map(({ icon: Icon, value, suffix, label, color, bg, gradient }) => (
            <div key={label} className="text-center group">
              <div className="flex justify-center mb-3">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110" style={{ background: bg }}>
                  <Icon className="w-6 h-6" style={{ color }} />
                </div>
              </div>
              <div className="text-3xl lg:text-4xl font-black mb-1 text-transparent bg-clip-text" style={{ backgroundImage: gradient }}>
                <AnimatedCounter end={value} suffix={suffix} />
              </div>
              <div className="text-white/40 text-sm font-medium">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
