import { useEffect, type RefObject } from 'react'
import { animate, useInView } from 'framer-motion'
import { EASE, prefersReducedMotion } from '../lib/env'

/**
 * Counts a number up from 0 once, when it scrolls into view.
 * The final value is in the HTML, so it is correct without JavaScript or with reduced motion.
 */
export function useCountUp(ref: RefObject<HTMLElement | null>, value: number) {
  const inView = useInView(ref, { once: true, amount: 0.8 })

  // Start from zero (the element is normally below the fold at this point)
  useEffect(() => {
    if (ref.current && !prefersReducedMotion()) ref.current.textContent = '0'
  }, [ref])

  useEffect(() => {
    const el = ref.current
    if (!inView || !el || prefersReducedMotion()) return
    const controls = animate(0, value, {
      duration: 1.4,
      ease: EASE,
      onUpdate: (v) => {
        el.textContent = String(Math.round(v))
      },
    })
    return () => controls.stop()
  }, [inView, value, ref])
}
