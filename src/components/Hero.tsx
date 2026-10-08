import { useCallback, useRef } from 'react'
import { gsap, ScrollTrigger, useGSAP } from '../lib/gsap'
import { scrollToY } from '../lib/lenis'
import { BuildStage } from './hero/BuildStage'
import { FinalHero } from './hero/FinalHero'

const BUILT_KEY = 'vd-built'
const OFF = { left: { x: '-75vw' }, right: { x: '75vw' }, top: { y: '-90vh' }, bottom: { y: '90vh' } } as const

/**
 * Hero — "Built in front of you".
 * When html.js-build is set (first visit in this session, motion allowed), the section pins and the visitor's
 * scroll assembles the scene, then the camera pushes into the screen to reveal the final hero.
 * Otherwise (repeat visit, reduced motion, no JavaScript) the final hero is shown directly.
 */
export function Hero() {
  const root = useRef<HTMLElement>(null)
  const stRef = useRef<ScrollTrigger | null>(null)

  // Remember the build for this session so a reload starts at the final hero
  const finish = useCallback(() => {
    try {
      sessionStorage.setItem(BUILT_KEY, '1')
    } catch {
      /* storage blocked */
    }
  }, [])

  useGSAP(
    (_context, contextSafe) => {
      const html = document.documentElement
      const building = html.classList.contains('js-build')

      // Final hero entrance (used directly when there is no build sequence)
      const intro = () =>
        gsap
          .timeline()
          .from('[data-hero-line]', { yPercent: 110, duration: 1.1, ease: 'expo.out', stagger: 0.08 })
          .from('[data-hero-item]', { y: 24, opacity: 0, duration: 0.9, ease: 'expo.out', stagger: 0.07 }, '-=0.7')

      if (!building) {
        if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) intro()
        return
      }

      const pin = root.current!.querySelector<HTMLElement>('[data-pin]')!
      const device = root.current!.querySelector<HTMLElement>('[data-device]')!
      const screen = root.current!.querySelector<HTMLElement>('[data-screen]')!
      const pieces = gsap.utils.toArray<HTMLElement>('[data-piece]', root.current)
      const isDesktop = window.matchMedia('(min-width: 768px)').matches
      const visible = pieces.filter((el) => getComputedStyle(el).display !== 'none')

      // Camera push: scale so the screen fills the viewport
      const pushScale = () => Math.max(window.innerWidth / screen.offsetWidth, window.innerHeight / screen.offsetHeight) * 1.04

      gsap.set('[data-final-hero]', { opacity: 0 })
      gsap.set('[data-drag-cursor]', { opacity: 0 })

      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: pin,
          start: 'top top',
          end: () => `+=${window.innerHeight * (isDesktop ? 2.5 : 1.6)}`,
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onLeave: finish,
        },
      })
      stRef.current = tl.scrollTrigger ?? null

      // 1. The device slides up into view as the page loads (scroll then drives the build)
      gsap.from(device, { yPercent: 50, rotateX: 26, opacity: 0, duration: 1.4, ease: 'expo.out', delay: 0.15 })
      tl.to({}, { duration: 0.6 }, 0)

      // The scrubbed timeline is filled in small chunks when the browser is idle, so loading never blocks for long.
      // Pieces stay hidden (CSS) until their chunk places them off-screen.
      const queue: (() => void)[] = []

      // 2. Pieces are dragged in one by one with a bouncy landing
      visible.forEach((el, i) =>
        queue.push(() => {
          const from = (el.dataset.from ?? 'left') as keyof typeof OFF
          const at = 0.6 + i * (isDesktop ? 0.85 : 1.1)
          const cursor = el.querySelector('[data-drag-cursor]')
          const flash = el.querySelector('[data-piece-flash]')
          const body = el.querySelector('[data-piece-body]')
          tl.set(cursor, { opacity: 1 }, at)
            .fromTo(el, { ...OFF[from], rotate: i % 2 ? 9 : -9 }, { x: 0, y: 0, rotate: 0, duration: 0.9, ease: 'back.out(1.6)' }, at)
            .to(body, { scaleX: 1.06, scaleY: 0.94, duration: 0.12, ease: 'power2.out' }, at + 0.82)
            .to(body, { scaleX: 1, scaleY: 1, duration: 0.3, ease: 'elastic.out(1, 0.4)' }, at + 0.94)
            .to(cursor, { opacity: 0, duration: 0.15 }, at + 0.95)
            .fromTo(flash, { opacity: 0.9, scale: 0.98 }, { opacity: 0, scale: 1.04, duration: 0.35 }, at + 0.9)
          gsap.set(el, { visibility: 'visible' })
        }),
      )
      const built = 0.6 + visible.length * (isDesktop ? 0.85 : 1.1) + 0.3

      queue.push(() => {
        // 3. Build succeeded
        tl.to('[data-build-done]', { opacity: 1, duration: 0.3 }, built).to(
          ['[data-build-label]', '[data-build-hint]'],
          { opacity: 0, duration: 0.3 },
          built,
        )

        // 4. Camera pushes into the screen; the final hero takes over
        const push = built + 0.5
        tl.to(device, { scale: pushScale, rotateX: 0, duration: 2, ease: 'power2.in' }, push)
          .to('[data-base]', { yPercent: 160, opacity: 0, duration: 0.8, ease: 'power2.in' }, push)
          .to('[data-build-stage]', { opacity: 0, duration: 0.5 }, push + 1.6)
          .to('[data-final-hero]', { opacity: 1, duration: 0.6 }, push + 1.5)
          .from('[data-hero-line]', { yPercent: 110, duration: 0.8, ease: 'expo.out', stagger: 0.1 }, push + 1.7)
          .from('[data-hero-item]', { y: 24, opacity: 0, duration: 0.6, stagger: 0.06 }, push + 2)
      })

      let handle = 0
      const idle = (fn: () => void) =>
        typeof window.requestIdleCallback === 'function' ? window.requestIdleCallback(fn, { timeout: 250 }) : window.setTimeout(fn, 16)
      const runNext = contextSafe!(() => {
        queue.shift()?.()
        // Keep the scene in step with the scroll position if the visitor is already scrolling
        tl.progress(tl.scrollTrigger?.progress ?? 0)
        if (queue.length) handle = idle(runNext)
      })
      handle = idle(runNext)

      // Keyboard users who tab into the hero while it is still building jump to the end
      const onFocus = () => {
        const st = stRef.current
        if (st && st.progress < 1) scrollToY(st.end)
      }
      const finalHero = root.current!.querySelector('[data-final-hero]')
      finalHero?.addEventListener('focusin', onFocus)
      return () => {
        finalHero?.removeEventListener('focusin', onFocus)
        if (typeof window.cancelIdleCallback === 'function') window.cancelIdleCallback(handle)
        window.clearTimeout(handle)
      }
    },
    { scope: root },
  )

  const skip = useCallback(() => {
    const st = stRef.current
    if (st) scrollToY(st.end + 1)
  }, [])

  return (
    <section ref={root} id="home" aria-label="Introduction" tabIndex={-1} className="relative outline-none">
      <div data-pin className="relative h-[100svh] min-h-[34rem] overflow-hidden">
        <FinalHero />
        <BuildStage onSkip={skip} />
      </div>
    </section>
  )
}
