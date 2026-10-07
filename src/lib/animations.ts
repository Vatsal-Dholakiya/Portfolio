import type { Variants } from 'framer-motion'

/** Site-wide easing: cubic-bezier(0.22, 1, 0.36, 1) */
export const EASE = [0.22, 1, 0.36, 1] as const

/** Fade and slide up 24px; accepts a delay via `custom`. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (delay: number = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE, delay } }),
}

/** Parent variant that staggers children (0.06–0.1 s). */
export const stagger = (step = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: step, delayChildren } },
})

/** Small pop-in used for chips and tags. */
export const chip: Variants = {
  hidden: { opacity: 0, y: 10, scale: 0.96 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: EASE } },
}
