import { useEffect, useState } from 'react'
import { m, useMotionValue, useSpring } from 'framer-motion'
import { hasFinePointer, prefersReducedMotion } from '../lib/env'

/** Soft radial glow that follows the mouse. Desktop (fine pointer) only, off with reduced motion. */
export function CursorGlow() {
  const [enabled, setEnabled] = useState(false)
  const x = useMotionValue(-1000)
  const y = useMotionValue(-1000)
  const sx = useSpring(x, { stiffness: 140, damping: 24, mass: 0.6 })
  const sy = useSpring(y, { stiffness: 140, damping: 24, mass: 0.6 })

  useEffect(() => {
    if (!hasFinePointer() || prefersReducedMotion()) return
    let shown = false
    const move = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      if (!shown) {
        shown = true
        setEnabled(true)
        x.jump(e.clientX)
        y.jump(e.clientY)
        sx.jump(e.clientX)
        sy.jump(e.clientY)
      }
      x.set(e.clientX)
      y.set(e.clientY)
    }
    window.addEventListener('pointermove', move, { passive: true })
    return () => window.removeEventListener('pointermove', move)
  }, [x, y, sx, sy])

  if (!enabled) return null
  return (
    <m.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[1] h-[560px] w-[560px] rounded-full bg-[radial-gradient(circle,rgba(124,92,255,0.12)_0%,rgba(34,211,238,0.05)_40%,transparent_70%)]"
      style={{ x: sx, y: sy, translateX: '-50%', translateY: '-50%' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    />
  )
}
