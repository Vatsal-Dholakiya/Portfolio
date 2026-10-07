import { useEffect, useRef, useState, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, m } from 'framer-motion'
import { X } from 'lucide-react'
import { EASE } from '../../lib/env'
import { lockScroll } from '../../lib/scroll'
import { useFocusTrap } from '../../hooks/useFocusTrap'

/** Accessible dialog: focus trapped, Escape or backdrop click closes, page behind is inert and does not scroll. */
export function Modal({
  open,
  onClose,
  labelledBy,
  children,
}: {
  open: boolean
  onClose: () => void
  labelledBy: string
  children: ReactNode
}) {
  const panel = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)
  useFocusTrap(panel, open, onClose)

  useEffect(() => {
    // Portals need the DOM; this flips once after hydration
    const id = requestAnimationFrame(() => setMounted(true))
    return () => cancelAnimationFrame(id)
  }, [])

  useEffect(() => {
    if (!open) return
    const root = document.getElementById('root')
    root?.setAttribute('inert', '')
    lockScroll(true)
    return () => {
      root?.removeAttribute('inert')
      lockScroll(false)
    }
  }, [open])

  if (!mounted) return null
  return createPortal(
    <AnimatePresence>
      {open && (
        <m.div
          key="backdrop"
          className="fixed inset-0 z-[80] grid place-items-center bg-bg/80 p-4 backdrop-blur-md sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: EASE }}
          onMouseDown={(e) => e.target === e.currentTarget && onClose()}
        >
          <m.div
            ref={panel}
            role="dialog"
            aria-modal="true"
            aria-labelledby={labelledBy}
            className="relative flex max-h-full w-full max-w-3xl flex-col overflow-hidden rounded-[1.25rem] border border-border-strong bg-surface"
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            <button type="button" onClick={onClose} aria-label="Close" className="icon-btn absolute right-4 top-4 z-10">
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
            <div className="overflow-y-auto">{children}</div>
          </m.div>
        </m.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
