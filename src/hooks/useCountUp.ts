import { useEffect, type RefObject } from 'react'
import { animate, useInView } from 'framer-motion'
import { EASE } from '../lib/animations'
import { prefersReducedMotion } from '../lib/helpers'

/**
 * Counts a number up from 0 once, when it scrolls into view.
 * The final value is in the HTML, so it is correct without JavaScript or with reduced motion.
 */
export function useCountUp(ref: RefObject<HTMLElement | null>, value: number) {
  const near = useInView(ref, { once: true, margin: '0px 0px 25% 0px' })
  const inView = useInView(ref, { once: true, amount: 0.8 })

  // Reset to zero just before the number scrolls into view; until then the real value stays in the page
  useEffect(() => {
    if (near && !inView && ref.current && !prefersReducedMotion()) ref.current.textContent = '0'
  }, [near, inView, ref])

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
