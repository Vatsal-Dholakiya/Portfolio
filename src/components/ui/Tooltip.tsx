import { useLayoutEffect, useRef, useState, type ReactNode, type RefObject } from 'react'
import { createPortal } from 'react-dom'
import { m } from 'framer-motion'
import { EASE } from '../../lib/animations'

const GAP = 10
const EDGE = 8

/**
 * Floating tooltip anchored to `anchor`. Rendered in a portal with fixed positioning,
 * flipped below when there is no room above and clamped so it never leaves the viewport.
 */
export function Tooltip({ id, anchor, children }: { id: string; anchor: RefObject<HTMLElement | null>; children: ReactNode }) {
  const box = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState<{ x: number; y: number; below: boolean } | null>(null)

  useLayoutEffect(() => {
    const a = anchor.current?.getBoundingClientRect()
    const t = box.current?.getBoundingClientRect()
    if (!a || !t) return
    const vw = document.documentElement.clientWidth
    const below = a.top - t.height - GAP < EDGE
    const x = Math.min(Math.max(a.left + a.width / 2 - t.width / 2, EDGE), vw - t.width - EDGE)
    const y = below ? a.bottom + GAP : a.top - t.height - GAP
    setPos({ x, y, below })
  }, [anchor])

  return createPortal(
    <m.div
      ref={box}
      id={id}
      role="tooltip"
      className="pointer-events-none fixed top-0 left-0 z-[95] w-max max-w-[min(18rem,calc(100vw-16px))] rounded-xl border border-line-strong bg-graphite px-3.5 py-2.5 text-left text-[0.8125rem] leading-snug text-bone shadow-[0_12px_32px_rgba(0,0,0,0.55)]"
      style={{ x: pos?.x ?? -9999, y: pos?.y ?? -9999 }}
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: pos ? 1 : 0, scale: pos ? 1 : 0.96 }}
      transition={{ duration: 0.18, ease: EASE }}
    >
      {children}
    </m.div>,
    document.body,
  )
}
