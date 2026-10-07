import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, m } from 'framer-motion'
import { FileText, Menu, X } from 'lucide-react'
import { asset, nav, person } from '../data/content'
import { EASE } from '../lib/animations'
import { lockScroll } from '../lib/lenis'
import { announceOverlay, onOtherOverlay } from '../lib/overlay'
import { useActiveSection } from '../hooks/useActiveSection'
import { useFocusTrap } from '../hooks/useFocusTrap'
import { Monogram } from './ui/Monogram'

const ids = nav.links.map((l) => l.id)

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const active = useActiveSection(ids)
  const menuRef = useRef<HTMLDivElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const close = useCallback(() => setOpen(false), [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    announceOverlay('menu')
    const unlock = lockScroll()
    return unlock
  }, [open])

  // Close if another overlay opens, or if the window grows to desktop width
  useEffect(() => onOtherOverlay('menu', close), [close])
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')
    const onChange = () => mq.matches && setOpen(false)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  useFocusTrap(menuRef, open, close, toggleRef)

  const cv = asset(person.links.cv)

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Frosted layer fades in after 40px of scrolling (opacity only) */}
      <div
        aria-hidden="true"
        className={`absolute inset-0 border-b border-border bg-surface/70 backdrop-blur-xl transition-opacity duration-500 ${
          scrolled || open ? 'opacity-100' : 'opacity-0'
        }`}
      />
      <div className="container-x relative flex h-[var(--nav-h)] items-center justify-between gap-4">
        <a href="#home" className="relative z-[60] shrink-0 rounded-xl" aria-label={nav.homeLabel}>
          <Monogram />
        </a>

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-0.5 lg:gap-1">
            {nav.links.map((item) => {
              const isActive = active === item.id
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    aria-current={isActive ? 'location' : undefined}
                    className={`relative block rounded-lg px-2 py-2 text-[0.875rem] font-medium transition-colors duration-300 hover:text-text lg:px-3.5 lg:text-[0.9375rem] ${
                      isActive ? 'text-text' : 'text-muted'
                    }`}
                  >
                    {item.label}
                    <span
                      aria-hidden="true"
                      className={`bg-gradient ease-out-expo absolute inset-x-2 -bottom-0.5 h-0.5 origin-left rounded-full transition-[opacity,transform] duration-500 lg:inset-x-3.5 ${
                        isActive ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'
                      }`}
                    />
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="relative z-[60] flex items-center gap-2">
          <a
            href={cv}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden h-10 items-center gap-2 rounded-xl border border-border-strong px-3.5 text-sm font-medium text-text transition-colors hover:border-primary-soft hover:bg-surface-2 md:inline-flex"
          >
            <FileText className="h-4 w-4" aria-hidden="true" />
            {nav.resumeLabel}
          </a>
          <button
            ref={toggleRef}
            type="button"
            className="icon-btn md:hidden"
            aria-label={open ? nav.closeMenu : nav.openMenu}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <m.div
            ref={menuRef}
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label={nav.menuLabel}
            className="fixed inset-0 z-[55] flex flex-col bg-bg/95 px-5 pt-24 pb-10 backdrop-blur-xl md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.25, ease: EASE } }}
            transition={{ duration: 0.35, ease: EASE }}
            // A tap on empty space (outside the links) closes the menu
            onClick={(e) => {
              if (!(e.target as Element).closest('a, button')) close()
            }}
          >
            <nav aria-label="Mobile" className="flex-1 overflow-y-auto">
              <ul className="flex flex-col">
                {nav.links.map((item, i) => (
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
                      aria-current={active === item.id ? 'location' : undefined}
                      className="flex items-baseline gap-4 py-4 font-display text-[1.75rem] font-bold text-text"
                    >
                      <span className="font-mono text-sm font-normal text-accent">{String(i + 1).padStart(2, '0')}.</span>
                      {item.label}
                    </a>
                  </m.li>
                ))}
              </ul>
              <m.a
                href={cv}
                target="_blank"
                rel="noopener noreferrer"
                onClick={close}
                className="btn btn-outline mt-8"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, transition: { duration: 0.2 } }}
                transition={{ duration: 0.5, ease: EASE, delay: 0.45 }}
              >
                <FileText className="h-5 w-5" aria-hidden="true" />
                {nav.resumeLabel}
              </m.a>
            </nav>
          </m.div>
        )}
      </AnimatePresence>
    </header>
  )
}
