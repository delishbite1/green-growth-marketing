import { Building2, Home, HeartPulse, BriefcaseBusiness, Car, Utensils, GraduationCap, ShoppingBag, Sparkles, Wind, Paintbrush, Wrench, Trees, Sun, Droplets, Zap, Layers } from 'lucide-react'

export default function IndustryIcon({ name, category, className = 'h-6 w-6' }: { name: string; category: string; className?: string }) {
  const categories = { 'Home & Property': Home, 'Health & Wellness': HeartPulse, 'Professional Services': BriefcaseBusiness, 'Real Estate': Building2, Automotive: Car, 'Food & Entertainment': Utensils, Education: GraduationCap, 'Retail & Lifestyle': ShoppingBag }
  const specific = [
    { match: /HVAC|heating/i, icon: Wind },
    { match: /asphalt|flooring/i, icon: Layers },
    { match: /clean|carpet|pressure/i, icon: Sparkles },
    { match: /paint|design/i, icon: Paintbrush },
    { match: /plumb|pool/i, icon: Droplets },
    { match: /solar/i, icon: Sun },
    { match: /tree|landscap/i, icon: Trees },
    { match: /electric/i, icon: Zap },
    { match: /contractor|repair/i, icon: Wrench },
  ]
  const Icon = specific.find(item => item.match.test(name))?.icon ?? categories[category as keyof typeof categories] ?? Building2
  return <Icon className={className} strokeWidth={1.4} aria-hidden="true" />
}
