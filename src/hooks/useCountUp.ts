import { useEffect, type RefObject } from 'react'
import { animate, useInView } from 'framer-motion'
import { EASE } from '../lib/animations'
import { prefersReducedMotion } from '../lib/helpers'

/**
 * Counts a number up from 0 once, when it scrolls into view.
 * The final value is in the HTML, so it is correct without JavaScript or with reduced motion.
 */
/** "10,000" or "4.8": grouped digits with a fixed number of decimals. */
export const formatNumber = (n: number, decimals = 0) =>
  n.toLocaleString('en-GB', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })

export function useCountUp(ref: RefObject<HTMLElement | null>, value: number, decimals = 0) {
  const near = useInView(ref, { once: true, margin: '0px 0px 25% 0px' })
  const inView = useInView(ref, { once: true, amount: 0.8 })

  // Reset to zero just before the number scrolls into view; until then the real value stays in the page
  useEffect(() => {
    if (near && !inView && ref.current && !prefersReducedMotion()) ref.current.textContent = formatNumber(0, decimals)
  }, [near, inView, decimals, ref])

  useEffect(() => {
    const el = ref.current
    if (!inView || !el || prefersReducedMotion()) return
    const controls = animate(0, value, {
      duration: 1.4,
      ease: EASE,
      onUpdate: (v) => {
        el.textContent = formatNumber(v, decimals)
      },
    })
    return () => controls.stop()
  }, [inView, value, decimals, ref])
}
