import { campaignFaqs as questions } from '@/data/campaign-faqs'

export default function CampaignFAQ() {
  return <section className="bg-ggm-ivory px-5 py-14 sm:px-8 sm:py-20"><div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.8fr_1.2fr]"><div><p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ggm-gold-ink">A little more clarity</p><h2 className="mt-3 font-body text-3xl font-semibold tracking-tight text-ggm-forest">Before your first mailing.</h2></div><div className="divide-y divide-ggm-forest/15">{questions.map(item => <details key={item.question} className="group py-4"><summary className="cursor-pointer py-2 font-body text-base font-semibold text-ggm-forest">{item.question}</summary><p className="mt-3 max-w-2xl font-body text-sm leading-relaxed text-ggm-muted">{item.answer}</p></details>)}</div></div></section>
}
