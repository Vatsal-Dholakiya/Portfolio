import { useEffect, useState } from 'react'
import { m, useMotionValue, useSpring } from 'framer-motion'
import { useIsTouch } from '../hooks/useIsTouch'
import { useReducedMotion } from '../hooks/useReducedMotion'

/** Soft radial glow that follows the mouse. Desktop (fine pointer) only, off with reduced motion. */
export function CursorGlow() {
  const [enabled, setEnabled] = useState(false)
  const reduced = useReducedMotion()
  const touch = useIsTouch()
  const x = useMotionValue(-1000)
  const y = useMotionValue(-1000)
  const sx = useSpring(x, { stiffness: 140, damping: 24, mass: 0.6 })
  const sy = useSpring(y, { stiffness: 140, damping: 24, mass: 0.6 })

  useEffect(() => {
    if (touch || reduced) return
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
    // Pause (hide) while the tab is hidden; it reappears on the next mouse move
    const onVisibility = () => {
      if (document.hidden) {
        shown = false
        setEnabled(false)
      }
    }
    window.addEventListener('pointermove', move, { passive: true })
    document.addEventListener('visibilitychange', onVisibility)
    return () => {
      window.removeEventListener('pointermove', move)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [x, y, sx, sy, touch, reduced])

  if (!enabled || touch || reduced) return null
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
