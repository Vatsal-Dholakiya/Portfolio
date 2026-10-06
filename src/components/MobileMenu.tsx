import { useEffect, useRef } from 'react'
import { AnimatePresence, m } from 'motion/react'
import { navLinks } from '../data/nav'
import { asset, profile } from '../data/profile'
import { startScroll, stopScroll } from '../lib/smoothScroll'

type Props = { open: boolean; onClose: () => void; onNavigate: (id: string) => void }

export function MobileMenu({ open, onClose, onNavigate }: Props) {
  const first = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    if (!open) return
    stopScroll()
    document.body.style.overflow = 'hidden'
    first.current?.focus()
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => {
      startScroll()
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <m.div
          id="mobile-menu"
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-0 top-[4.5rem] bottom-0 z-40 overflow-y-auto bg-bg px-4 pb-10 pt-6 lg:hidden"
        >
          <nav aria-label="Mobile">
            <ul className="flex flex-col">
              {navLinks.map((l, i) => (
                <m.li
                  key={l.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.04, duration: 0.3 }}
                  className="border-b border-line"
                >
                  <a
                    ref={i === 0 ? first : undefined}
                    href={`#${l.id}`}
                    onClick={(e) => {
                      e.preventDefault()
                      onNavigate(l.id)
                    }}
                    className="block py-4 font-display text-3xl font-extrabold"
                  >
                    {l.label}
                  </a>
                </m.li>
              ))}
            </ul>
            <a href={asset(profile.cv)} download className="btn btn-primary mt-8">
              Download CV
            </a>
          </nav>
        </m.div>
      )}
    </AnimatePresence>
  )
}
