'use client'

import { useEffect, useState, useCallback } from 'react'
import { X, Mail, Send, Target, Palette, Printer, MapPin, Star, ShieldCheck, CheckCircle, TrendingUp, Phone } from 'lucide-react'
import Link from 'next/link'

const features = [
  { icon: Target,  color: '#159447', bg: 'rgba(21,148,71,0.12)',  label: 'Targeted Mail',        desc: 'Reach the right audience.' },
  { icon: Palette, color: '#1B73FF', bg: 'rgba(27,115,255,0.12)', label: 'Eye-Catching Design',  desc: 'Stand out in every mailbox.' },
  { icon: Printer, color: '#7A3DF0', bg: 'rgba(122,61,240,0.12)', label: 'Premium Printing',     desc: 'High quality every time.' },
  { icon: MapPin,  color: '#F59E0B', bg: 'rgba(245,158,11,0.12)', label: 'Door to Door Delivery', desc: 'We handle postage for you.' },
]

const trustItems = [
  { icon: ShieldCheck, label: 'Trusted by Businesses Across the U.S.' },
  { icon: CheckCircle, label: 'High Quality Printing' },
  { icon: CheckCircle, label: 'Fast Turnaround' },
  { icon: CheckCircle, label: 'Exceptional Service' },
]

export default function PopupOffer() {
  const [isVisible, setIsVisible] = useState(false)
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [focused, setFocused] = useState(false)

  useEffect(() => {
    const dismissed = sessionStorage.getItem('popup-dismissed')
    if (dismissed) return
    const timer = setTimeout(() => setIsVisible(true), 3500)
    return () => clearTimeout(timer)
  }, [])

  const dismiss = useCallback(() => {
    setIsVisible(false)
    sessionStorage.setItem('popup-dismissed', '1')
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') dismiss() }
    if (isVisible) document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [isVisible, dismiss])

  useEffect(() => {
    document.body.style.overflow = isVisible ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isVisible])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setSubmitted(true)
    setTimeout(dismiss, 3000)
  }

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-3 sm:p-4" role="dialog" aria-modal="true" aria-label="Exclusive offer">
      {/* Backdrop */}
      <div className="absolute inset-0" style={{ background: 'rgba(9,28,59,0.72)', backdropFilter: 'blur(4px)' }} onClick={dismiss} aria-hidden="true" />

      {/* Modal */}
      <div className="relative w-full flex flex-col overflow-hidden" style={{ maxWidth: '820px', maxHeight: '94vh', overflowY: 'auto', borderRadius: '24px', background: '#fff', boxShadow: '0 32px 80px rgba(9,28,59,0.28)', animation: 'popupIn 0.28s cubic-bezier(0.34,1.56,0.64,1) both' }}>

        <style>{`
          @keyframes popupIn    { from { opacity:0; transform:scale(0.93) translateY(12px) } to { opacity:1; transform:scale(1) translateY(0) } }
          @keyframes floatBox   { 0%,100% { transform:translateY(0) } 50% { transform:translateY(-7px) } }
          @keyframes cardFloat1 { 0%,100% { transform:rotate(-9deg) translateY(0) } 50% { transform:rotate(-9deg) translateY(-6px) } }
          @keyframes cardFloat2 { 0%,100% { transform:rotate(7deg) translateY(0) } 50% { transform:rotate(7deg) translateY(-8px) } }
        `}</style>

        {/* Close */}
        <button onClick={dismiss} aria-label="Close" className="absolute top-3 right-3 z-30 w-9 h-9 rounded-full bg-white flex items-center justify-center hover:scale-110 transition-transform" style={{ boxShadow: '0 4px 14px rgba(0,0,0,0.15)' }}>
          <X className="w-4 h-4" style={{ color: '#091C3B' }} />
        </button>

        <div className="flex flex-col lg:flex-row">

          {/* ── LEFT ── */}
          <div className="flex-1 px-6 pt-6 pb-4 lg:px-8 lg:pt-8">
            {submitted ? (
              <div className="flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ background: 'rgba(21,148,71,0.12)' }}>
                  <CheckCircle className="w-8 h-8" style={{ color: '#159447' }} />
                </div>
                <h3 className="font-black text-2xl mb-2" style={{ color: '#091C3B' }}>You're In!</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-5 max-w-xs">We'll reach out shortly to get your 1,000 free postcards rolling.</p>
                <Link href="/contact" onClick={dismiss} className="inline-flex items-center gap-2 text-white font-bold px-6 py-2.5 rounded-xl text-sm" style={{ background: 'linear-gradient(135deg, #159447, #30C257)' }}>
                  Get a Full Quote
                </Link>
              </div>
            ) : (
              <>
                {/* Logo */}
                <img src="/logo.png" alt="Green Growth Marketing" style={{ height: '58px', width: '190px', objectFit: 'contain', objectPosition: 'left center', mixBlendMode: 'multiply', marginBottom: '14px' }} />

                {/* Headline */}
                <div className="font-black leading-[1.0] mb-4" style={{ fontSize: 'clamp(2rem, 4.5vw, 2.9rem)' }}>
                  <span style={{ color: '#091C3B', display: 'block' }}>GET 1,000</span>
                  <span style={{ color: '#159447', display: 'block' }}>FREE POSTCARDS</span>
                </div>

                {/* Badge */}
                <div className="inline-flex items-center gap-2 text-white font-black text-[11px] px-4 py-2 rounded-full mb-3" style={{ background: 'linear-gradient(90deg, #1B73FF, #7A3DF0)', letterSpacing: '0.05em' }}>
                  <Star className="w-2.5 h-2.5 fill-white" aria-hidden="true" />
                  EXCLUSIVE OFFER FOR NEW CUSTOMERS
                  <Star className="w-2.5 h-2.5 fill-white" aria-hidden="true" />
                </div>

                {/* Desc */}
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  Grow your business faster with high impact direct mail that{' '}
                  <span className="font-bold" style={{ color: '#159447' }}>gets noticed.</span>
                </p>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-2.5 mb-3">
                  <div className="flex items-center gap-2.5 rounded-xl px-3.5 py-3 transition-all duration-200" style={{ border: focused ? '2px solid #159447' : '2px solid #d1fae5', background: focused ? '#f0fdf4' : '#fff', boxShadow: focused ? '0 0 0 3px rgba(21,148,71,0.10)' : 'none' }}>
                    <Mail className="w-4 h-4 flex-shrink-0" style={{ color: focused ? '#159447' : '#9ca3af' }} aria-hidden="true" />
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} placeholder="Enter your business email" required aria-label="Business email" className="flex-1 text-sm outline-none bg-transparent text-gray-800 placeholder-gray-400" />
                  </div>
                  <button type="submit" className="w-full flex items-center justify-center gap-2 text-white font-black py-3.5 rounded-xl text-sm uppercase tracking-wide transition-all duration-200 hover:-translate-y-0.5"
                    style={{ background: 'linear-gradient(135deg, #159447 0%, #30C257 100%)', boxShadow: '0 8px 22px rgba(21,148,71,0.32)', letterSpacing: '0.05em' }}
                    onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 14px 32px rgba(21,148,71,0.45)' }}
                    onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 8px 22px rgba(21,148,71,0.32)' }}>
                    <Send className="w-3.5 h-3.5" aria-hidden="true" />
                    CLAIM MY 1,000 FREE POSTCARDS →
                  </button>
                </form>

                {/* Privacy */}
                <p className="text-xs text-gray-400 text-center mb-5 flex items-center justify-center gap-1">
                  <ShieldCheck className="w-3 h-3" aria-hidden="true" />
                  We respect your privacy. Your information is never shared or sold.
                </p>

                {/* Features */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {features.map(({ icon: Icon, color, bg, label, desc }) => (
                    <div key={label} className="flex flex-col gap-1.5 p-2.5 rounded-xl" style={{ background: '#f8fafc' }}>
                      <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: bg }}>
                        <Icon className="w-3.5 h-3.5" style={{ color }} aria-hidden="true" />
                      </div>
                      <div className="text-[11px] font-black text-gray-900 leading-tight">{label}</div>
                      <div className="text-[10px] text-gray-500 leading-snug">{desc}</div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* ── RIGHT: Illustration ── */}
          <div className="hidden lg:flex flex-col items-center justify-center relative overflow-hidden flex-shrink-0"
            style={{ width: '320px', background: 'linear-gradient(155deg, #0d3d20 0%, #159447 45%, #30C257 75%, #7ee8a2 100%)' }}>

            {/* Glow blobs */}
            <div className="absolute top-0 right-0 w-48 h-48 rounded-full opacity-20 pointer-events-none" style={{ background: 'radial-gradient(circle, #fff, transparent)', transform: 'translate(30%,-30%)' }} />
            <div className="absolute bottom-0 left-0 w-36 h-36 rounded-full opacity-15 pointer-events-none" style={{ background: 'radial-gradient(circle, #fff, transparent)', transform: 'translate(-30%,30%)' }} />

            <div className="relative flex flex-col items-center justify-center w-full py-8 px-5" style={{ minHeight: '460px' }}>

              {/* Postcard 1 — dark themed */}
              <div className="absolute" style={{ top: '6%', left: '4%', animation: 'cardFloat1 3.5s ease-in-out infinite', zIndex: 2 }}>
                <div className="rounded-2xl overflow-hidden shadow-2xl" style={{ width: '130px', background: '#091C3B' }}>
                  <div className="p-3">
                    <div className="flex items-center gap-1 mb-2">
                      <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                        <TrendingUp className="w-2.5 h-2.5 text-white" />
                      </div>
                      <span className="text-white text-[8px] font-black tracking-wide">GREEN GROWTH</span>
                    </div>
                    <div className="rounded-lg p-2 mb-2" style={{ background: 'linear-gradient(135deg, #0f3d1f, #1a6b35)' }}>
                      <div className="text-green-400 text-[11px] font-black leading-tight">GROW YOUR</div>
                      <div className="text-white text-[14px] font-black leading-tight">BUSINESS</div>
                      <div className="text-green-300 text-[11px] font-black leading-tight">FASTER.</div>
                    </div>
                    <div className="text-gray-500 text-[7px] font-medium leading-tight">Direct mail that gets results for local businesses.</div>
                  </div>
                </div>
              </div>

              {/* Postcard 2 — white themed */}
              <div className="absolute" style={{ top: '5%', right: '3%', animation: 'cardFloat2 4s ease-in-out infinite', zIndex: 2 }}>
                <div className="rounded-2xl overflow-hidden shadow-2xl" style={{ width: '125px', background: '#fff' }}>
                  <div className="p-3">
                    <div className="flex items-center gap-1 mb-1.5">
                      <div className="w-3.5 h-3.5 rounded-full bg-green-600 flex items-center justify-center flex-shrink-0">
                        <TrendingUp className="w-2 h-2 text-white" />
                      </div>
                      <span className="text-gray-800 text-[7px] font-black">Green Growth</span>
                    </div>
                    <div className="rounded-lg p-2 mb-1.5" style={{ background: 'linear-gradient(135deg, #f0fdf4, #dcfce7)' }}>
                      <div className="text-gray-900 text-[9px] font-black leading-tight">MORE CUSTOMERS.</div>
                      <div className="text-gray-900 text-[9px] font-black leading-tight">BETTER RESULTS.</div>
                      <div className="text-green-600 text-[9px] font-black leading-tight">BIGGER GROWTH.</div>
                    </div>
                    <div className="text-gray-400 text-[7px]">Let's grow your business together.</div>
                  </div>
                </div>
              </div>

              {/* Gift box */}
              <div className="relative z-10" style={{ animation: 'floatBox 4s ease-in-out infinite', marginTop: '55px' }}>
                <div className="relative" style={{ width: '180px', height: '155px' }}>
                  {/* Box body */}
                  <div className="absolute bottom-0 left-0 right-0 rounded-b-2xl" style={{ height: '115px', background: 'linear-gradient(160deg, #1a7a3d, #0f5a2e)', boxShadow: '0 18px 40px rgba(0,0,0,0.4)' }}>
                    <div className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2" style={{ width: '24px', background: 'linear-gradient(180deg, #5dde7a, #30C257, #1a9e45)', borderRadius: '2px' }} />
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <div className="text-white font-black" style={{ fontSize: '36px', lineHeight: 1, textShadow: '0 2px 8px rgba(0,0,0,0.3)' }}>1,000</div>
                      <div className="text-green-200 font-bold text-xs tracking-wide mt-1">FREE POSTCARDS</div>
                    </div>
                  </div>
                  {/* Box lid */}
                  <div className="absolute top-0 left-[-8px] right-[-8px] rounded-xl" style={{ height: '44px', background: 'linear-gradient(160deg, #22a052, #159447)', boxShadow: '0 -4px 16px rgba(0,0,0,0.2)' }}>
                    <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2" style={{ height: '24px', background: 'linear-gradient(90deg, #5dde7a, #30C257, #1a9e45)', borderRadius: '2px' }} />
                    {/* Bow */}
                    <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 flex items-center" style={{ zIndex: 5 }}>
                      <div style={{ width: '30px', height: '22px', background: 'linear-gradient(135deg, #7ee8a2, #30C257)', borderRadius: '50% 0 50% 50%', transform: 'rotate(-20deg)', boxShadow: '0 2px 6px rgba(0,0,0,0.2)' }} />
                      <div style={{ width: '14px', height: '14px', borderRadius: '50%', background: 'linear-gradient(135deg, #5dde7a, #1a9e45)', zIndex: 2, boxShadow: '0 2px 6px rgba(0,0,0,0.3)', flexShrink: 0 }} />
                      <div style={{ width: '30px', height: '22px', background: 'linear-gradient(135deg, #30C257, #7ee8a2)', borderRadius: '0 50% 50% 50%', transform: 'rotate(20deg)', boxShadow: '0 2px 6px rgba(0,0,0,0.2)' }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Postcard stack */}
              <div className="relative mt-3 z-10" style={{ width: '200px', height: '58px' }}>
                {[3,2,1,0].map((i) => (
                  <div key={i} className="absolute rounded-xl" style={{ left:`${i*4}px`, right:`${i*4}px`, top:`${i*4}px`, height:'50px', background: i===0 ? '#fff' : `rgba(255,255,255,${0.35+i*0.15})`, boxShadow:'0 3px 10px rgba(0,0,0,0.14)', zIndex: 4-i }}>
                    {i===0 && (
                      <div className="flex items-center h-full px-3 gap-2">
                        <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                          <TrendingUp className="w-3 h-3 text-green-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-gray-900 text-[8px] font-black leading-tight truncate">GROW YOUR BUSINESS FASTER</div>
                          <div className="text-gray-500 text-[7px] leading-tight">We help businesses get more customers.</div>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <div className="text-green-600 text-[7px] font-black">BETTER</div>
                          <div className="text-green-600 text-[7px] font-black">RESULTS.</div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-3 text-center z-10">
                <div className="text-white/70 text-[10px] font-semibold tracking-wide">Premium Direct Mail Campaigns</div>
              </div>
            </div>
          </div>
        </div>

        {/* ── TRUST BAR ── */}
        <div className="flex items-center justify-center flex-wrap gap-x-5 gap-y-1.5 px-5 py-3" style={{ background: '#091C3B', borderRadius: '0 0 24px 24px' }}>
          {trustItems.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-1.5 text-[11px] text-gray-300 font-medium">
              <Icon className="w-3 h-3 flex-shrink-0" style={{ color: '#30C257' }} aria-hidden="true" />
              {label}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
