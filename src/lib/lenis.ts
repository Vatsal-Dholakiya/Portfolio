import Lenis from 'lenis'
import { gsap, ScrollTrigger } from './gsap'
import { prefersReducedMotion } from './helpers'
import { afterPinsMeasured } from './ready'

let lenis: Lenis | null = null
let locks = 0

/**
 * Starts Lenis smooth scrolling on GSAP's clock so pinned, scroll-scrubbed scenes and smooth scrolling stay in sync.
 * Skipped with reduced motion. Returns a cleanup that destroys it.
 */
export function initSmoothScroll() {
  if (prefersReducedMotion()) return () => {}
  lenis = new Lenis({ lerp: 0.08, wheelMultiplier: 1 })
  lenis.on('scroll', ScrollTrigger.update)
  const tick = (time: number) => lenis?.raf(time * 1000)
  gsap.ticker.add(tick)
  gsap.ticker.lagSmoothing(0)
  return () => {
    gsap.ticker.remove(tick)
    lenis?.destroy()
    lenis = null
  }
}

/** Scrolls to an absolute position (used by "Skip intro"). */
export function scrollToY(y: number) {
  if (lenis) lenis.scrollTo(y, { duration: 1.2 })
  else window.scrollTo({ top: y, behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
}

/**
 * Scrolls to a section id ("home" = top). The navbar offset comes from each section's CSS scroll-margin-top,
 * which both Lenis and native scrolling respect.
 */
export function scrollToId(id: string, { updateHash = false, focus = true, instant = false } = {}) {
  const target = document.getElementById(id)
  if (!target) return
  forceUnlock()
  const top = id === 'home'
  if (lenis && !instant) {
    // Pinned scenes can still change the page height while the scroll runs; when it ends, check where the
    // section really is and finish the move (at most twice)
    const settle = (tries: number) => () => {
      // Sections land just below the navbar (their scroll-margin-top)
      const off = top ? window.scrollY : target.getBoundingClientRect().top - (parseFloat(getComputedStyle(target).scrollMarginTop) || 0)
      if (Math.abs(off) > 4 && tries > 0) lenis?.scrollTo(top ? 0 : target, { duration: 0.6, onComplete: settle(tries - 1) })
    }
    lenis.scrollTo(top ? 0 : target, { onComplete: settle(2) })
  } else if (top) window.scrollTo({ top: 0, behavior: instant || prefersReducedMotion() ? 'auto' : 'smooth' })
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
  afterPinsMeasured(() => scrollToId(id))
}

/** Browser back/forward between section hashes. */
export function onPopState() {
  const id = location.hash.slice(1) || 'home'
  scrollToId(id, { updateHash: false, focus: false })
}
