import { useCallback, useLayoutEffect, useEffect, useRef, useState } from 'react'
import { gsap, ScrollTrigger, useGSAP } from '../lib/gsap'
import { scrollToId } from '../lib/smoothScroll'
import { useActiveSection } from '../hooks/useActiveSection'
import { navLinks } from '../data/nav'
import { asset, profile } from '../data/profile'
import { Icon } from './Icon'
import { Magnetic } from './Magnetic'
import { MobileMenu } from './MobileMenu'
import { ThemeToggle } from './ThemeToggle'

const ids = navLinks.map((l) => l.id)
const useIsoLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect

export function Navbar() {
  const header = useRef<HTMLElement>(null)
  const list = useRef<HTMLUListElement>(null)
  const underline = useRef<HTMLSpanElement>(null)
  const [open, setOpen] = useState(false)
  const active = useActiveSection(ids)
  const openRef = useRef(open)
  openRef.current = open

  // Hide on scroll down, show on scroll up
  useGSAP(() => {
    const el = header.current
    if (!el) return
    let hidden = false
    const show = (v: boolean) => {
      if (hidden === !v) return
      hidden = !v
      gsap.to(el, { yPercent: v ? 0 : -110, duration: 0.35, ease: 'power3.out' })
    }
    ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => {
        if (openRef.current || el.contains(document.activeElement)) return show(true)
        show(self.scroll() < 120 || self.direction === -1)
      },
    })
    const onFocus = () => show(true)
    el.addEventListener('focusin', onFocus)
    return () => el.removeEventListener('focusin', onFocus)
  })

  // Slide the single underline to the active link
  useIsoLayoutEffect(() => {
    const bar = underline.current
    const link = active ? list.current?.querySelector<HTMLElement>(`[data-id="${active}"]`) : null
    if (!bar) return
    if (!link) {
      gsap.to(bar, { opacity: 0, duration: 0.2 })
      return
    }
    gsap.to(bar, {
      x: link.offsetLeft,
      scaleX: link.offsetWidth / 100,
      opacity: 1,
      duration: 0.45,
      ease: 'power3.out',
    })
  }, [active])

  const navigate = useCallback((id: string) => {
    setOpen(false)
    scrollToId(id)
  }, [])
  const close = useCallback(() => setOpen(false), [])

  return (
    <>
      <header ref={header} className="fixed inset-x-0 top-0 z-50">
        <div className="border-b border-line/60 bg-bg/80 backdrop-blur-md">
          <div className="container-site flex h-[4.5rem] items-center justify-between gap-4">
            <a
              href="#top"
              onClick={(e) => {
                e.preventDefault()
                navigate('top')
              }}
              className="font-display text-xl font-extrabold tracking-tight"
            >
              {profile.initials}
              <span className="text-accent" aria-hidden="true">.</span>
              <span className="sr-only">{` ${profile.name.first} ${profile.name.last}, back to top`}</span>
            </a>

            <nav aria-label="Main" className="hidden lg:block">
              <ul ref={list} className="relative flex items-center gap-1">
                {navLinks.map((l) => (
                  <li key={l.id}>
                    <a
                      data-id={l.id}
                      href={`#${l.id}`}
                      aria-current={active === l.id ? 'location' : undefined}
                      onClick={(e) => {
                        e.preventDefault()
                        navigate(l.id)
                      }}
                      className={`block px-3 py-2 font-display text-[0.95rem] font-semibold transition-colors hover:text-ink ${
                        active === l.id ? 'text-ink' : 'text-muted'
                      }`}
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
                <span
                  ref={underline}
                  aria-hidden="true"
                  className="pointer-events-none absolute bottom-0 left-0 h-0.5 w-[100px] origin-left rounded-full bg-accent opacity-0"
                />
              </ul>
            </nav>

            <div className="flex items-center gap-2">
              <ThemeToggle />
              <span className="hidden sm:inline-block">
                <Magnetic strength={0.25}>
                  <a href={asset(profile.cv)} download className="btn btn-primary min-h-11 py-2.5">
                    <Icon name="download" /> CV
                  </a>
                </Magnetic>
              </span>
              <button
                type="button"
                className="grid h-11 w-11 place-items-center rounded-full border border-line lg:hidden"
                aria-expanded={open}
                aria-controls="mobile-menu"
                aria-label={open ? 'Close menu' : 'Open menu'}
                onClick={() => setOpen((o) => !o)}
              >
                <Icon name={open ? 'close' : 'menu'} className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>
      <MobileMenu open={open} onClose={close} onNavigate={navigate} />
    </>
  )
}
