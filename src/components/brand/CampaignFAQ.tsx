const questions = [
  { question: 'What can I send with GGM?', answer: 'Explore personalized letters, handwritten envelopes and full color postcards. We can discuss the format, addressing and postage options for your mailing.' },
  { question: 'What details should I share for a quote?', answer: 'Tell us about your business, the audience and area you want to reach, your preferred format and approximate quantity. If you are still exploring, share what you know and we can discuss the next steps.' },
  { question: 'Can we discuss artwork or a mailing list I already have?', answer: 'Yes. Tell us what materials you already have so we can review them together and confirm what is needed for your campaign.' },
  { question: 'Is a long-term contract required?', answer: 'Our campaign planning is flexible, with no long-term contract. The scope, quantity and pricing are set out in your campaign quote.' },
  { question: 'Can I share a quote from another company?', answer: 'Absolutely. We would be happy to review it and see if we can offer a better price for comparable specifications.' },
]

export default function CampaignFAQ() {
  return <section className="bg-ggm-ivory px-5 py-14 sm:px-8 sm:py-20"><div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.8fr_1.2fr]"><div><p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ggm-gold-ink">A little more clarity</p><h2 className="mt-3 font-body text-3xl font-semibold tracking-tight text-ggm-forest">Before your first mailing.</h2></div><div className="divide-y divide-ggm-forest/15">{questions.map(item => <details key={item.question} className="group py-4"><summary className="cursor-pointer py-2 font-body text-base font-semibold text-ggm-forest">{item.question}</summary><p className="mt-3 max-w-2xl font-body text-sm leading-relaxed text-ggm-muted">{item.answer}</p></details>)}</div></div></section>
}
