import { useEffect, useRef } from 'react'
import { prefersReducedMotion } from '../lib/motion'
import type { Theme } from '../lib/theme'

type Node = { x: number; y: number; vx: number; vy: number }

const LINK = 130 // px between nodes
const CURSOR_LINK = 170 // px from cursor

const hexToRgb = (hex: string) => {
  const h = hex.trim().replace('#', '')
  const n = parseInt(h.length === 3 ? h.replace(/./g, '$&$&') : h, 16)
  return `${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}`
}

/**
 * Neural-network style background: drifting nodes linked to their neighbours and to the cursor.
 * Pauses when the hero is off screen or the tab is hidden; a single still frame with reduced motion.
 */
export function NeuralCanvas({ theme }: { theme: Theme }) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    const reduced = prefersReducedMotion()
    const rgb = hexToRgb(getComputedStyle(document.documentElement).getPropertyValue('--accent') || '#8fa3ff')
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const mouse = { x: 0, y: 0, active: false }
    let nodes: Node[] = []
    let w = 0
    let h = 0
    let raf = 0
    let onScreen = true

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      w = rect.width
      h = rect.height
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const count = Math.max(22, Math.min(80, Math.round((w * h) / 17000)))
      nodes = Array.from({ length: count }, (_, i) => nodes[i] ?? {
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
      })
      if (reduced || !raf) draw()
    }

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      ctx.lineWidth = 1
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i]
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const d2 = dx * dx + dy * dy
          if (d2 < LINK * LINK) {
            ctx.strokeStyle = `rgba(${rgb}, ${(1 - Math.sqrt(d2) / LINK) * 0.45})`
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
        if (mouse.active) {
          const d = Math.hypot(a.x - mouse.x, a.y - mouse.y)
          if (d < CURSOR_LINK) {
            ctx.strokeStyle = `rgba(${rgb}, ${(1 - d / CURSOR_LINK) * 0.85})`
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(mouse.x, mouse.y)
            ctx.stroke()
          }
        }
      }
      ctx.fillStyle = `rgba(${rgb}, 0.9)`
      for (const n of nodes) {
        ctx.beginPath()
        ctx.arc(n.x, n.y, 1.8, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const step = () => {
      for (const n of nodes) {
        n.x += n.vx
        n.y += n.vy
        if (n.x < 0 || n.x > w) n.vx *= -1
        if (n.y < 0 || n.y > h) n.vy *= -1
      }
      draw()
      raf = requestAnimationFrame(step)
    }
    const start = () => {
      if (!raf && !reduced && onScreen && !document.hidden) raf = requestAnimationFrame(step)
    }
    const stop = () => {
      cancelAnimationFrame(raf)
      raf = 0
    }

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect()
      mouse.x = e.clientX - r.left
      mouse.y = e.clientY - r.top
      mouse.active = mouse.y >= 0 && mouse.y <= r.height
    }
    const onLeave = () => (mouse.active = false)
    const onVisibility = () => (document.hidden ? stop() : start())

    const io = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting
      if (onScreen) start()
      else stop()
    })
    const ro = new ResizeObserver(resize)

    resize()
    io.observe(canvas)
    ro.observe(canvas)
    if (!reduced) {
      window.addEventListener('pointermove', onMove, { passive: true })
      document.documentElement.addEventListener('pointerleave', onLeave)
      document.addEventListener('visibilitychange', onVisibility)
    }
    start()

    return () => {
      stop()
      io.disconnect()
      ro.disconnect()
      window.removeEventListener('pointermove', onMove)
      document.documentElement.removeEventListener('pointerleave', onLeave)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [theme])

  return <canvas ref={ref} aria-hidden="true" className="absolute inset-0 h-full w-full opacity-60" />
}
