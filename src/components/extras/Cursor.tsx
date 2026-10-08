import { useEffect, useRef, useState } from 'react'
import { gsap } from '../../lib/gsap'
import { hasFinePointer, prefersReducedMotion } from '../../lib/helpers'

/**
 * Custom cursor (mouse only, motion allowed): a small emerald dot that grows into a ring with a label
 * over anything with a data-cursor attribute, and into a plain ring over other links and buttons.
 */
export function Cursor() {
  const root = useRef<HTMLDivElement>(null)
  const dot = useRef<HTMLSpanElement>(null)
  const ring = useRef<HTMLSpanElement>(null)
  const text = useRef<HTMLSpanElement>(null)
  const [label, setLabel] = useState('')

  useEffect(() => {
    const el = root.current
    if (!el || !hasFinePointer() || prefersReducedMotion()) return
    const html = document.documentElement
    const x = gsap.quickTo(el, 'x', { duration: 0.35, ease: 'power3.out' })
    const y = gsap.quickTo(el, 'y', { duration: 0.35, ease: 'power3.out' })
    gsap.set(ring.current, { scale: 0.2, opacity: 0 })
    gsap.set(text.current, { opacity: 0 })
    let shown = false
    let current = ''

    const move = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      if (!shown) {
        shown = true
        html.classList.add('has-cursor')
        gsap.set(el, { x: e.clientX, y: e.clientY })
      }
      x(e.clientX)
      y(e.clientY)
      const target = (e.target as Element).closest?.('[data-cursor], a, button, [role="button"], input, textarea')
      const next = target?.matches('input, textarea') ? 'text' : target ? (target.getAttribute('data-cursor') ?? 'link') : ''
      if (next === current) return
      current = next
      const labelled = next !== '' && next !== 'link' && next !== 'text'
      if (labelled) setLabel(next)
      const ease = 'expo.out'
      gsap.to(dot.current, { scale: next ? 0 : 1, duration: 0.3, ease })
      // A plain ring never hides what is under it; only the labelled ring gets a backdrop so its label is readable
      gsap.to(ring.current, {
        scale: labelled ? 1 : next === 'link' ? 0.55 : 0.2,
        opacity: next && next !== 'text' ? 1 : 0,
        backgroundColor: labelled ? 'rgba(5, 6, 7, 0.85)' : 'rgba(5, 6, 7, 0)',
        duration: 0.4,
        ease,
      })
      gsap.to(text.current, { opacity: labelled ? 1 : 0, duration: 0.25 })
    }
    const leave = () => gsap.to(el, { opacity: 0, duration: 0.2 })
    const enter = () => gsap.to(el, { opacity: 1, duration: 0.2 })

    window.addEventListener('pointermove', move, { passive: true })
    html.addEventListener('pointerleave', leave)
    html.addEventListener('pointerenter', enter)
    return () => {
      window.removeEventListener('pointermove', move)
      html.removeEventListener('pointerleave', leave)
      html.removeEventListener('pointerenter', enter)
      html.classList.remove('has-cursor')
    }
  }, [])

  return (
    <div ref={root} aria-hidden="true" className="cursor pointer-events-none fixed top-0 left-0 z-[100]">
      <span ref={dot} className="absolute -top-[5px] -left-[5px] h-[10px] w-[10px] rounded-full bg-emerald" />
      <span ref={ring} className="absolute -top-9 -left-9 h-18 w-18 rounded-full border border-emerald" />
      <span
        ref={text}
        className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 font-mono text-[0.68rem] font-medium tracking-[0.1em] whitespace-nowrap text-bone uppercase"
      >
        {label}
      </span>
    </div>
  )
}
