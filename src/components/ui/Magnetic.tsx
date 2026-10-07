import { useEffect, useRef, type ReactNode } from 'react'
import { m, useMotionValue, useSpring } from 'framer-motion'
import { useIsTouch } from '../../hooks/useIsTouch'
import { useReducedMotion } from '../../hooks/useReducedMotion'

/** Pulls its child slightly toward the cursor (desktop only) and scales down a touch on press. */
export function Magnetic({ children, strength = 0.28, className = '' }: { children: ReactNode; strength?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const reduced = useReducedMotion()
  const touch = useIsTouch()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 })

  useEffect(() => {
    const el = ref.current
    if (!el || touch || reduced) return
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      x.set((e.clientX - (r.left + r.width / 2)) * strength)
      y.set((e.clientY - (r.top + r.height / 2)) * strength)
    }
    const leave = () => {
      x.set(0)
      y.set(0)
    }
    el.addEventListener('pointermove', move)
    el.addEventListener('pointerleave', leave)
    return () => {
      el.removeEventListener('pointermove', move)
      el.removeEventListener('pointerleave', leave)
    }
  }, [x, y, strength, touch, reduced])

  return (
    <m.span ref={ref} className={`inline-flex ${className}`} style={{ x: sx, y: sy }} whileTap={{ scale: 0.96 }}>
      {children}
    </m.span>
  )
}
