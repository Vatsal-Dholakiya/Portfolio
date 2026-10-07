import { useEffect, useRef, type ReactNode } from 'react'
import { m, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useIsTouch } from '../../hooks/useIsTouch'
import { useReducedMotion } from '../../hooks/useReducedMotion'

const MAX_TILT = 8 // degrees

/**
 * Card shell with a 3D tilt toward the cursor and a gradient border glow that follows it.
 * The glow is a blurred gradient disc moved with transform; the card surface covers all but a 1px rim.
 * Tilt and glow are desktop only and off with reduced motion.
 */
export function TiltCard({
  children,
  className = '',
  innerClassName = '',
}: {
  children: ReactNode
  className?: string
  innerClassName?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const touch = useIsTouch()
  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)
  const glow = useMotionValue(0)
  const w = useMotionValue(0)
  const h = useMotionValue(0)
  const rotateX = useSpring(useTransform(py, [0, 1], [MAX_TILT, -MAX_TILT]), { stiffness: 180, damping: 20 })
  const rotateY = useSpring(useTransform(px, [0, 1], [-MAX_TILT, MAX_TILT]), { stiffness: 180, damping: 20 })
  const glowX = useTransform([px, w], ([p, width]) => (p as number) * (width as number))
  const glowY = useTransform([py, h], ([p, height]) => (p as number) * (height as number))
  const glowOpacity = useSpring(glow, { stiffness: 200, damping: 30 })

  useEffect(() => {
    const el = ref.current
    if (!el || touch || reduced) return
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      w.set(r.width)
      h.set(r.height)
      px.set((e.clientX - r.left) / r.width)
      py.set((e.clientY - r.top) / r.height)
      glow.set(1)
    }
    const leave = () => {
      px.set(0.5)
      py.set(0.5)
      glow.set(0)
    }
    el.addEventListener('pointermove', move)
    el.addEventListener('pointerleave', leave)
    return () => {
      el.removeEventListener('pointermove', move)
      el.removeEventListener('pointerleave', leave)
    }
  }, [px, py, glow, w, h, touch, reduced])

  return (
    <m.div
      ref={ref}
      className={`group relative h-full rounded-2xl bg-border p-px ${className}`}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
    >
      {/* Border glow layer, clipped to the card's rounded rectangle */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
        <m.div
          className="bg-gradient absolute left-0 top-0 h-56 w-56 rounded-full blur-2xl"
          style={{ x: glowX, y: glowY, translateX: '-50%', translateY: '-50%', opacity: glowOpacity }}
        />
      </div>
      <div className={`relative h-full rounded-[calc(1rem-1px)] bg-surface ${innerClassName}`}>{children}</div>
    </m.div>
  )
}
