import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import FloatingCallButton from '@/components/shared/FloatingCallButton'
import PopupOffer from '@/components/shared/PopupOffer'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Green Growth Marketing | Direct Mail That Delivers Results',
  description:
    'Full service direct mail campaigns for businesses nationwide. Postcards, personalized letters, handwritten envelopes. Design, printing, mailing lists, and postage all included.',
  keywords:
    'direct mail marketing, postcards, mailing lists, printing, personalized letters, handwritten envelopes, business marketing USA',
  openGraph: {
    title: 'Green Growth Marketing | Direct Mail That Delivers Results',
    description:
      'Full-service direct mail campaigns. We handle design, printing, mailing lists, and postage so you can focus on growing your business.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans">
        <Navbar />
        <PopupOffer />
        <main>{children}</main>
        <Footer />
        <FloatingCallButton />
      </body>
    </html>
  )
}
