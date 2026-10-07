import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, m } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { content, nav } from '../data/content'
import { EASE } from '../lib/env'
import { lockScroll } from '../lib/scroll'
import { useActiveSection } from '../hooks/useActiveSection'
import { useFocusTrap } from '../hooks/useFocusTrap'
import { Monogram } from './ui/Monogram'

const ids = nav.map((n) => n.id)

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const active = useActiveSection(ids)
  const menuRef = useRef<HTMLDivElement>(null)
  const close = useCallback(() => setOpen(false), [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    lockScroll(open)
    return () => lockScroll(false)
  }, [open])

  // Close the overlay if the window grows to desktop size
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const onChange = () => mq.matches && setOpen(false)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  useFocusTrap(menuRef, open, close)

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Frosted layer fades in after 40px of scrolling (opacity only) */}
      <div
        aria-hidden="true"
        className={`absolute inset-0 border-b border-border bg-surface/85 backdrop-blur-xl transition-opacity duration-500 ${
          scrolled || open ? 'opacity-100' : 'opacity-0'
        }`}
      />
      <div className="container-x relative flex h-[4.5rem] items-center justify-between gap-6">
        <a href="#top" className="relative z-[60] flex items-center gap-3 rounded-xl" aria-label={`${content.name.first} ${content.name.last}, back to top`}>
          <Monogram />
        </a>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) => {
              const isActive = active === item.id
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    aria-current={isActive ? 'location' : undefined}
                    className={`relative block rounded-lg px-3.5 py-2 text-[0.9375rem] font-medium transition-colors duration-300 hover:text-text ${
                      isActive ? 'text-text' : 'text-muted'
                    }`}
                  >
                    {item.label}
                    <span
                      aria-hidden="true"
                      className={`bg-gradient absolute inset-x-3.5 -bottom-0.5 h-0.5 origin-left rounded-full transition-[opacity,transform] duration-500 ease-out-expo ${
                        isActive ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'
                      }`}
                    />
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>

        <button
          type="button"
          className="icon-btn relative z-[60] lg:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <m.div
            ref={menuRef}
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="fixed inset-0 z-[55] flex flex-col bg-bg/95 px-5 pb-10 pt-24 backdrop-blur-xl lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.25, ease: EASE } }}
            transition={{ duration: 0.35, ease: EASE }}
          >
            <nav aria-label="Mobile" className="flex-1 overflow-y-auto">
              <ul className="flex flex-col">
                {nav.map((item, i) => (
                  <m.li
                    key={item.id}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, transition: { duration: 0.2 } }}
                    transition={{ duration: 0.5, ease: EASE, delay: 0.05 + i * 0.05 }}
                    className="border-b border-border"
                  >
                    <a
                      href={`#${item.id}`}
                      onClick={close}
                      className="flex items-baseline gap-4 py-4 font-display text-[1.75rem] font-bold text-text"
                    >
                      <span className="font-mono text-sm font-normal text-accent">{String(i + 1).padStart(2, '0')}.</span>
                      {item.label}
                    </a>
                  </m.li>
                ))}
              </ul>
            </nav>
          </m.div>
        )}
      </AnimatePresence>
    </header>
  )
}
