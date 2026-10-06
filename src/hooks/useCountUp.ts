import type { RefObject } from 'react'
import { gsap, useGSAP } from '../lib/gsap'
import { prefersReducedMotion } from '../lib/motion'

/**
 * Counts a number up from 0 when the element scrolls into view.
 * The final value is already in the HTML, so it is correct without JavaScript.
 */
export function useCountUp(ref: RefObject<HTMLElement | null>, value: number, duration = 1.6) {
  useGSAP(
    () => {
      const el = ref.current
      if (!el || prefersReducedMotion()) return
      const counter = { v: 0 }
      el.textContent = '0'
      gsap.to(counter, {
        v: value,
        duration,
        ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 90%', once: true },
        onUpdate: () => {
          el.textContent = Math.round(counter.v).toLocaleString('en-GB')
        },
      })
    },
    { dependencies: [value] },
  )
}
