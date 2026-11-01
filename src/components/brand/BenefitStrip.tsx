import { Home, Mail, Printer, Store } from 'lucide-react'

export default function BenefitStrip() {
  return <section aria-label="Direct mail services" className="border-b border-ggm-line bg-ggm-ivory px-4 py-6 sm:px-8 sm:py-8"><ul className="mx-auto grid max-w-7xl grid-cols-2 gap-y-6 text-center text-xs font-semibold text-ggm-forest sm:grid-cols-4 sm:text-sm">{[{icon:Home,label:'Reach the right homes'},{icon:Mail,label:'Personalized & handwritten'},{icon:Printer,label:'Design, print & mail'},{icon:Store,label:'Build local connections'}].map(({icon:Icon,label})=><li key={label} className="flex flex-col items-center gap-3 border-ggm-forest/20 px-4 odd:border-r sm:border-r sm:last:border-0"><Icon className="h-8 w-8 sm:h-10 sm:w-10" strokeWidth={1.5} aria-hidden /><span className="max-w-36">{label}</span></li>)}</ul></section>
}
