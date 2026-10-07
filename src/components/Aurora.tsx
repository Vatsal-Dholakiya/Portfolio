import { useEffect, useRef } from 'react'

/**
 * Pure-CSS aurora: three large soft gradient blobs drifting (transform only) over a dot grid.
 * Paused while the tab is hidden or the hero is off screen; still under reduced motion (see CSS).
 */
export function Aurora() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    let onScreen = true
    const update = () => el.classList.toggle('aurora-paused', document.hidden || !onScreen)
    const io = new IntersectionObserver(([entry]) => {
      onScreen = !!entry?.isIntersecting
      update()
    })
    io.observe(el)
    document.addEventListener('visibilitychange', update)
    return () => {
      io.disconnect()
      document.removeEventListener('visibilitychange', update)
    }
  }, [])

  return (
    <div ref={ref} aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="aurora-blob b1" />
      <div className="aurora-blob b2" />
      <div className="aurora-blob b3" />
      <div className="dot-grid absolute inset-0" />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-bg" />
    </div>
  )
}
