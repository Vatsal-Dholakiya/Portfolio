import Lenis from 'lenis'
import { prefersReducedMotion } from './env'

let lenis: Lenis | null = null

/** Starts Lenis smooth scrolling (skipped with reduced motion). Returns a cleanup that destroys it. */
export function initSmoothScroll() {
  if (prefersReducedMotion()) return () => {}
  lenis = new Lenis({ duration: 1.1, easing: (t) => 1 - Math.pow(1 - t, 4) })
  let frame = requestAnimationFrame(function raf(time) {
    lenis?.raf(time)
    frame = requestAnimationFrame(raf)
  })
  return () => {
    cancelAnimationFrame(frame)
    lenis?.destroy()
    lenis = null
  }
}

/** Scrolls to a section id (or "top"), below the sticky navbar, and moves keyboard focus there. */
export function scrollToId(id: string) {
  const target = id === 'top' ? document.body : document.getElementById(id)
  if (!target) return
  lockScroll(false) // a menu link may be clicked while the menu has scrolling locked
  if (lenis) {
    // Lenis applies the section's CSS scroll-margin-top (the navbar offset)
    lenis.scrollTo(id === 'top' ? 0 : target)
  } else if (id === 'top') {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
  } else {
    target.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
  }
  history.replaceState(null, '', id === 'top' ? location.pathname + location.search : `#${id}`)
  if (id !== 'top') target.focus({ preventScroll: true })
}

/** Locks page scrolling (menu and modal). */
export function lockScroll(locked: boolean) {
  document.documentElement.style.overflow = locked ? 'hidden' : ''
  if (locked) lenis?.stop()
  else lenis?.start()
}

/** Handles every in-page anchor link (href="#id") through scrollToId. */
export function onAnchorClick(e: MouseEvent) {
  if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
  const link = (e.target as Element | null)?.closest?.('a[href^="#"]')
  if (!link) return
  const id = link.getAttribute('href')!.slice(1)
  if (!id || (id !== 'top' && !document.getElementById(id))) return
  e.preventDefault()
  scrollToId(id)
}
