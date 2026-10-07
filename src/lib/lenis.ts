import Lenis from 'lenis'
import { prefersReducedMotion } from './helpers'

let lenis: Lenis | null = null
let locks = 0

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

/**
 * Scrolls to a section id ("home" = top). The navbar offset comes from each section's CSS scroll-margin-top,
 * which both Lenis and native scrolling respect.
 */
export function scrollToId(id: string, { updateHash = true, focus = true, instant = false } = {}) {
  const target = document.getElementById(id)
  if (!target) return
  forceUnlock()
  const top = id === 'home'
  if (lenis && !instant) lenis.scrollTo(top ? 0 : target)
  else if (top) window.scrollTo({ top: 0, behavior: instant || prefersReducedMotion() ? 'auto' : 'smooth' })
  else target.scrollIntoView({ behavior: instant || prefersReducedMotion() ? 'auto' : 'smooth' })
  if (updateHash) history.pushState(null, '', top ? location.pathname + location.search : `#${id}`)
  if (focus) target.focus({ preventScroll: true })
}

/** Locks page scrolling while an overlay is open; the scroll position is kept. */
export function lockScroll() {
  locks++
  document.documentElement.style.overflow = 'hidden'
  lenis?.stop()
  return () => {
    locks = Math.max(0, locks - 1)
    if (locks === 0) {
      document.documentElement.style.overflow = ''
      lenis?.start()
    }
  }
}

function forceUnlock() {
  if (locks > 0) return // an overlay is still open; its own cleanup unlocks
  document.documentElement.style.overflow = ''
  lenis?.start()
}

/** Routes every in-page anchor (href="#id") through scrollToId. */
export function onAnchorClick(e: MouseEvent) {
  if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
  const link = (e.target as Element | null)?.closest?.('a[href^="#"]')
  if (!link) return
  const id = link.getAttribute('href')!.slice(1)
  if (!id || !document.getElementById(id)) return
  e.preventDefault()
  scrollToId(id)
}

/** Browser back/forward between section hashes. */
export function onPopState() {
  const id = location.hash.slice(1) || 'home'
  scrollToId(id, { updateHash: false, focus: false })
}

/** Replaces the hash for the section in view without scrolling or adding history entries. */
export function replaceHash(id: string | null) {
  const url = id && id !== 'home' ? `#${id}` : location.pathname + location.search
  if ((id ? `#${id}` : '') !== location.hash) history.replaceState(null, '', url)
}
