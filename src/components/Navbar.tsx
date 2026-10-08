import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, m } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { nav, person } from '../data/content'
import { EASE } from '../lib/animations'
import { gsap, ScrollTrigger, useGSAP } from '../lib/gsap'
import { lockScroll } from '../lib/lenis'
import { announceOverlay, onOtherOverlay } from '../lib/overlay'
import { useActiveSection } from '../hooks/useActiveSection'
import { useFocusTrap } from '../hooks/useFocusTrap'
import { Monogram } from './ui/Monogram'

const ids = nav.links.map((l) => l.id)

/** Live clock for the configured time zone. Renders "--:--" until mounted (pre-rendered HTML stays stable). */
function LocalTime() {
  const [time, setTime] = useState('--:--')
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: person.timeZone })
    const update = () => setTime(fmt.format(new Date()))
    const first = window.setTimeout(update, 0)
    const id = window.setInterval(update, 15_000)
    return () => {
      window.clearTimeout(first)
      window.clearInterval(id)
    }
  }, [])
  return <span className="tabular-nums">{time}</span>
}

/** Battery icon whose charge follows page scroll progress. */
function Battery() {
  const fill = useRef<SVGRectElement>(null)
  useGSAP(() => {
    gsap.fromTo(
      fill.current,
      { scaleX: 0 },
      { scaleX: 1, ease: 'none', transformOrigin: 'left center', scrollTrigger: { start: 0, end: 'max', scrub: 0.3 } },
    )
  })
  return (
    <svg viewBox="0 0 26 13" className="h-[13px] w-[26px]" role="img" aria-label={nav.progressLabel}>
      <rect x="0.5" y="0.5" width="22" height="12" rx="3" fill="none" stroke="rgba(237,238,233,0.45)" />
      <rect x="23.5" y="4" width="2" height="5" rx="1" fill="rgba(237,238,233,0.45)" />
      <rect ref={fill} x="2.5" y="2.5" width="18" height="8" rx="1.5" fill="#2EE6A6" />
    </svg>
  )
}

export function Navbar() {
  const [open, setOpen] = useState(false)
  const active = useActiveSection(ids)
  const header = useRef<HTMLElement>(null)
  const list = useRef<HTMLUListElement>(null)
  const underline = useRef<HTMLSpanElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const openRef = useRef(open)
  const close = useCallback(() => setOpen(false), [])

  useEffect(() => {
    openRef.current = open
  }, [open])

  // Hide on scroll down, show on scroll up (transform only)
  useGSAP(() => {
    const el = header.current
    if (!el) return
    let hidden = false
    const show = (visible: boolean) => {
      if (hidden === !visible) return
      hidden = !visible
      gsap.to(el, { yPercent: visible ? 0 : -110, duration: 0.45, ease: 'expo.out' })
    }
    // After an in-page link jump the bar stays visible (the next link is one click away) until the visitor scrolls themselves
    let jumped = false
    ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => {
        if (openRef.current || el.contains(document.activeElement) || jumped) return show(true)
        show(self.scroll() < 160 || self.direction === -1)
      },
    })
    const onFocus = () => show(true)
    const onClick = (e: MouseEvent) => {
      if ((e.target as Element).closest?.('a[href^="#"]')) jumped = true
    }
    const onUserScroll = () => {
      jumped = false
    }
    const userEvents = ['wheel', 'touchmove', 'keydown'] as const
    el.addEventListener('focusin', onFocus)
    document.addEventListener('click', onClick, true)
    userEvents.forEach((type) => window.addEventListener(type, onUserScroll, { passive: true }))
    return () => {
      el.removeEventListener('focusin', onFocus)
      document.removeEventListener('click', onClick, true)
      userEvents.forEach((type) => window.removeEventListener(type, onUserScroll))
    }
  })

  // One underline slides to the active link; re-measured when fonts load or the window resizes
  useEffect(() => {
    const place = (animate: boolean) => {
      const bar = underline.current
      const link = active ? list.current?.querySelector<HTMLElement>(`a[href="#${active}"]`) : null
      if (!bar) return
      if (!link) {
        gsap.to(bar, { opacity: 0, duration: 0.25 })
        return
      }
      gsap.to(bar, { x: link.offsetLeft, scaleX: link.offsetWidth / 100, opacity: 1, duration: animate ? 0.5 : 0, ease: 'expo.out' })
    }
    place(true)
    const replace = () => place(false)
    window.addEventListener('resize', replace)
    void document.fonts.ready.then(replace)
    return () => window.removeEventListener('resize', replace)
  }, [active])

  useEffect(() => {
    if (!open) return
    announceOverlay('menu')
    return lockScroll()
  }, [open])
  useEffect(() => onOtherOverlay('menu', close), [close])
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const onChange = () => mq.matches && setOpen(false)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  useFocusTrap(menuRef, open, close, toggleRef)

  return (
    <>
      <header ref={header} className="fixed inset-x-0 top-0 z-50">
        <div aria-hidden="true" className="absolute inset-0 border-b border-line bg-void/70 backdrop-blur-xl" />
        <div className="container-x relative flex h-[var(--nav-h)] items-center justify-between gap-4">
          <a
            href="#home"
            className="relative z-[60] flex shrink-0 items-center gap-3 rounded-xl"
            aria-label={nav.homeLabel}
            data-cursor="Top"
          >
            <Monogram className="h-8 w-8" />
            <span className="label hidden text-bone xl:inline">
              {person.firstName} {person.lastName}
            </span>
          </a>

          <nav aria-label="Main" className="hidden lg:block">
            <ul ref={list} className="relative flex items-center gap-1">
              {nav.links.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    aria-current={active === item.id ? 'location' : undefined}
                    className={`block px-2.5 py-2 font-mono xl:px-3 text-[0.75rem] tracking-[0.12em] uppercase transition-colors duration-300 hover:text-bone ${
                      active === item.id ? 'text-bone' : 'text-ash'
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <span
                ref={underline}
                aria-hidden="true"
                className="pointer-events-none absolute bottom-0.5 left-0 h-px w-[100px] origin-left bg-emerald opacity-0"
              />
            </ul>
          </nav>

          <div className="relative z-[60] flex items-center gap-3 sm:gap-4">
            <span className="label hidden items-center gap-3 text-mist sm:flex" aria-label={`Local time in ${person.location}`}>
              <LocalTime />
              <Battery />
            </span>
            <button
              ref={toggleRef}
              type="button"
              className="icon-btn lg:hidden"
              aria-label={open ? nav.closeMenu : nav.openMenu}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((o) => !o)}
            >
              {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
            </button>
          </div>
        </div>
      </header>
      {/* Outside the header: the header moves (hide on scroll), which would trap a fixed child inside it */}
      <AnimatePresence>
        {open && (
          <m.div
            ref={menuRef}
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label={nav.menuLabel}
            className="fixed inset-0 z-[45] flex flex-col bg-void/97 px-5 pt-24 pb-10 backdrop-blur-xl lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.25, ease: EASE } }}
            transition={{ duration: 0.35, ease: EASE }}
            onClick={(e) => {
              if (!(e.target as Element).closest('a, button')) close()
            }}
          >
            <nav aria-label="Mobile" className="flex-1 overflow-y-auto">
              <ul className="flex flex-col">
                {nav.links.map((item, i) => (
                  <m.li
                    key={item.id}
                    initial={{ opacity: 0, y: 28 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, transition: { duration: 0.2 } }}
                    transition={{ duration: 0.6, ease: EASE, delay: 0.05 + i * 0.05 }}
                    className="border-b border-line"
                  >
                    <a
                      href={`#${item.id}`}
                      onClick={close}
                      className="flex items-baseline justify-between py-4 font-display text-[2.4rem] leading-none font-extrabold tracking-[-0.04em] text-bone"
                    >
                      {item.label}
                      <span className="font-mono text-xs font-normal tracking-normal text-emerald">{String(i + 1).padStart(2, '0')}</span>
                    </a>
                  </m.li>
                ))}
              </ul>
            </nav>
          </m.div>
        )}
      </AnimatePresence>
    </>
  )
}
