import { m, useScroll, useSpring } from 'framer-motion'

/** Thin gradient bar at the very top that fills as the page scrolls. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 220, damping: 40, restDelta: 0.001 })
  return (
    <m.div
      aria-hidden="true"
      className="bg-gradient fixed inset-x-0 top-0 z-[70] h-[3px] origin-left"
      style={{ scaleX }}
      initial={{ scaleX: 0 }}
    />
  )
}
