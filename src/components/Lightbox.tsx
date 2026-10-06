import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, m } from 'motion/react'
import type { Certificate } from '../data/profile'
import { asset } from '../data/profile'
import { startScroll, stopScroll } from '../lib/smoothScroll'
import { Icon } from './Icon'

type Props = { cert: Certificate | null; onClose: () => void }

/** Full-size certificate viewer. Focus is trapped inside; Escape or the backdrop closes it. */
export function Lightbox({ cert, onClose }: Props) {
  const dialog = useRef<HTMLDivElement>(null)
  const closeBtn = useRef<HTMLButtonElement>(null)
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  useEffect(() => {
    if (!cert) return
    const opener = document.activeElement as HTMLElement | null
    const root = document.getElementById('root')
    root?.setAttribute('inert', '')
    stopScroll()
    document.body.style.overflow = 'hidden'
    closeBtn.current?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
      }
      if (e.key === 'Tab' && dialog.current) {
        const items = dialog.current.querySelectorAll<HTMLElement>('a[href], button')
        const first = items[0]
        const last = items[items.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      root?.removeAttribute('inert')
      startScroll()
      document.body.style.overflow = ''
      opener?.focus()
    }
  }, [cert, onClose])

  if (!mounted) return null

  return createPortal(
    <AnimatePresence>
      {cert && (
        <m.div
          key="lightbox"
          className="fixed inset-0 z-[80] grid place-items-center bg-black/80 p-4 backdrop-blur-sm md:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
        >
          <m.div
            ref={dialog}
            role="dialog"
            aria-modal="true"
            aria-labelledby="lightbox-title"
            className="card flex max-h-full w-full max-w-4xl flex-col overflow-hidden"
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 border-b border-line p-4 md:p-5">
              <div>
                <h2 id="lightbox-title" className="font-display text-lg font-extrabold leading-tight md:text-xl">
                  {cert.title}
                </h2>
                <p className="mt-1 text-sm text-muted">
                  {cert.issuer}, {cert.date}
                </p>
              </div>
              <button
                ref={closeBtn}
                type="button"
                onClick={onClose}
                aria-label="Close certificate"
                className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-line hover:border-accent"
              >
                <Icon name="close" />
              </button>
            </div>
            <div className="min-h-0 flex-1 overflow-auto bg-bg p-3 md:p-4">
              <img
                src={asset(cert.image)}
                alt={`Certificate: ${cert.title}, ${cert.issuer}, ${cert.date}`}
                width={1600}
                height={1131}
                className="mx-auto h-auto max-h-[70vh] w-auto rounded-lg object-contain"
              />
            </div>
            <div className="border-t border-line p-4 md:p-5">
              <a href={cert.url} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                Verify certificate <Icon name="arrow" className="h-3.5 w-3.5" />
              </a>
            </div>
          </m.div>
        </m.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
