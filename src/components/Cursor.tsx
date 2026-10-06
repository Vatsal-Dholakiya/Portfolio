import { useRef } from 'react'
import { gsap, useGSAP } from '../lib/gsap'
import { hasFinePointer, prefersReducedMotion } from '../lib/motion'

const INTERACTIVE = 'a, button, [role="button"], [data-cursor]'

/** Dot + trailing ring. Desktop only; the ring grows over links and buttons. */
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null)
  const ring = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!hasFinePointer() || prefersReducedMotion() || !dot.current || !ring.current) return
    const html = document.documentElement
    html.classList.add('has-cursor')
    gsap.set([dot.current, ring.current], { xPercent: -50, yPercent: -50, opacity: 0 })

    const dotX = gsap.quickTo(dot.current, 'x', { duration: 0.08, ease: 'power3.out' })
    const dotY = gsap.quickTo(dot.current, 'y', { duration: 0.08, ease: 'power3.out' })
    const ringX = gsap.quickTo(ring.current, 'x', { duration: 0.45, ease: 'power3.out' })
    const ringY = gsap.quickTo(ring.current, 'y', { duration: 0.45, ease: 'power3.out' })
    let visible = false

    const move = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      if (!visible) {
        visible = true
        gsap.set([dot.current, ring.current], { x: e.clientX, y: e.clientY })
        gsap.to([dot.current, ring.current], { opacity: 1, duration: 0.2 })
      }
      dotX(e.clientX)
      dotY(e.clientY)
      ringX(e.clientX)
      ringY(e.clientY)
    }
    const over = (e: PointerEvent) => {
      const hit = (e.target as Element | null)?.closest?.(INTERACTIVE)
      gsap.to(ring.current, { scale: hit ? 2.2 : 1, duration: 0.3, ease: 'power3.out' })
      gsap.to(dot.current, { scale: hit ? 0 : 1, duration: 0.2 })
    }
    const leave = () => {
      visible = false
      gsap.to([dot.current, ring.current], { opacity: 0, duration: 0.2 })
    }
    window.addEventListener('pointermove', move, { passive: true })
    window.addEventListener('pointerover', over, { passive: true })
    document.documentElement.addEventListener('pointerleave', leave)
    return () => {
      html.classList.remove('has-cursor')
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerover', over)
      document.documentElement.removeEventListener('pointerleave', leave)
    }
  })

  return (
    <div className="cursor" aria-hidden="true">
      <div ref={ring} className="pointer-events-none fixed left-0 top-0 z-[90] h-9 w-9 rounded-full border border-accent" />
      <div ref={dot} className="pointer-events-none fixed left-0 top-0 z-[91] h-1.5 w-1.5 rounded-full bg-accent" />
    </div>
  )
}
