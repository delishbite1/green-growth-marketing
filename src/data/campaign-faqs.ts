/**
 * The homepage FAQ that visitors actually see, in one place.
 *
 * CampaignFAQ renders this list and FaqStructuredData turns the same list into
 * FAQPage markup, so the schema can never say more than the page does. Google
 * treats FAQ markup that does not match the visible answers as misleading.
 *
 * The older list in faqs.ts is no longer on any page and must not feed the
 * schema again: it still carries an unconditional price beat promise that the
 * site no longer makes.
 *
 * A plain module with no 'use client', so both a server component and the
 * schema can import the array as a value.
 */

import type { Faq } from '@/data/faqs'

export const campaignFaqs: Faq[] = [
  { question: 'What can I send with GGM?', answer: 'Explore personalized letters, handwritten envelopes and full color postcards. We can discuss the format, addressing and postage options for your mailing.' },
  { question: 'What details should I share for a quote?', answer: 'Tell us about your business, the audience and area you want to reach, your preferred format and approximate quantity. If you are still exploring, share what you know and we can discuss the next steps.' },
  { question: 'Can we discuss artwork or a mailing list I already have?', answer: 'Yes. Tell us what materials you already have so we can review them together and confirm what is needed for your campaign.' },
  { question: 'Is a long-term contract required?', answer: 'Our campaign planning is flexible, with no long-term contract. The scope, quantity and pricing are set out in your campaign quote.' },
  { question: 'Can I share a quote from another company?', answer: 'Absolutely. We would be happy to review it and see if we can offer a better price for comparable specifications.' },
]
