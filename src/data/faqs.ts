/**
 * The homepage FAQ, in one place.
 *
 * Lifted out of FAQ.tsx on 3 Sep 2026 so the structured data and the visible
 * accordion read the same source. Google penalises FAQ schema that does not
 * match what a visitor actually sees on the page, so two copies of this list
 * would be a liability rather than a duplication annoyance.
 *
 * A plain module with no 'use client', deliberately. FAQ.tsx is a client
 * component, and every export of a client module reaches a server component as
 * a reference proxy rather than as its value, so the schema could not have
 * imported the array from there.
 */

export type Faq = { question: string; answer: string }

export const faqs: Faq[] = [
  {
    question: 'How does the direct mail process work?',
    answer:
      "It's simple. You tell us your goals, budget, and target audience. We handle the rest: design, list building, printing, addressing, and mailing. You get a proof to approve before anything goes to print, and we give you a tracking timeline so you know exactly when your mail hits.",
  },
  {
    question: 'Do I need a minimum order quantity?',
    answer:
      'No minimum. We work with orders of any size, from 100 pieces for a neighborhood test to millions for a national rollout. Pricing scales with volume, so larger campaigns get even better rates.',
  },
  {
    question: 'How long does it take from quote to delivery?',
    answer:
      "Quotes come back the same business day. Once you approve the design and give the go-ahead, standard production is 5–7 business days plus USPS transit time (typically 3–5 days). We also offer rush production for time-sensitive campaigns.",
  },
  {
    question: "Can you help with design if I don't have artwork?",
    answer:
      "Absolutely. Our design team creates high-converting direct mail pieces from scratch. We just need your logo, brand colors, offer, and target audience. If you have your own design, we can print from your files too.",
  },
  {
    question: "I don't have a mailing list. Can you build one for me?",
    answer:
      "Yes, and it's included. We build precision-targeted lists using filters like ZIP code, income, home value, age, business type, and buying behavior, so your mail reaches the people most likely to actually respond.",
  },
  {
    question: "How does your price beat guarantee work?",
    answer:
      "Get a written quote from any competitor for the same specs (size, quantity, paper stock, postage class) and send it to us. We'll beat it. That's the whole guarantee. Same budget means more pieces in more mailboxes. Same volume means you pay less.",
  },
  {
    question: 'Do you handle postage and USPS mailing?',
    answer:
      "Everything. We sort your mail, prep it for USPS specifications, apply postage, and drop it at a USPS facility. You don't touch a single piece. Your campaign goes from our facility directly to your customers' mailboxes.",
  },
]
