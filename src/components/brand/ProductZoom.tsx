'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'
import { X, ZoomIn } from 'lucide-react'

export default function ProductZoom({ title, children, caption }: { title: string; children: ReactNode; caption?: string }) {
  const [open, setOpen] = useState(false)
  const dialog = useRef<HTMLDialogElement>(null)
  useEffect(() => {
    if (!open) return
    const previousOverflow = document.body.style.overflow
    dialog.current?.showModal()
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = previousOverflow }
  }, [open])
  const close = () => { dialog.current?.close(); setOpen(false) }
  return <>
    <button type="button" onClick={() => setOpen(true)} aria-label={`Enlarge ${title}`} className="group relative block w-full cursor-zoom-in text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ggm-forest">
      {children}
      {caption && <span className="product-zoom-caption mt-4 block font-body text-sm font-semibold text-ggm-forest underline underline-offset-4">{caption} <span aria-hidden>→</span></span>}
      <span aria-hidden className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-none border border-ggm-line bg-ggm-paper/95 text-ggm-forest"><ZoomIn className="h-4 w-4" /></span>
    </button>
    <dialog ref={dialog} onClose={() => setOpen(false)} onClick={event => { if (event.target === event.currentTarget) close() }} aria-label={title} className="m-auto w-[94vw] max-w-4xl rounded-2xl border border-ggm-line bg-ggm-ivory p-0 text-ggm-forest backdrop:bg-black/60">
      {open && <><div className="flex items-center justify-between gap-4 border-b border-ggm-line px-5 py-3"><p className="font-body text-sm font-semibold">{title}</p><button autoFocus type="button" onClick={close} aria-label="Close enlarged image" className="flex h-11 w-11 items-center justify-center rounded-lg hover:bg-ggm-sage-surface"><X className="h-5 w-5" aria-hidden /></button></div><div className="max-h-[75vh] overflow-auto p-3 sm:p-6">{children}</div></>}
    </dialog>
  </>
}
