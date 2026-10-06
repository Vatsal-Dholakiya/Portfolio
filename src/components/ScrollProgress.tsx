import { useRef } from 'react'
import { gsap, useGSAP } from '../lib/gsap'

/** Thin accent bar at the very top that fills as the page scrolls. */
export function ScrollProgress() {
  const bar = useRef<HTMLDivElement>(null)
  useGSAP(() => {
    gsap.fromTo(
      bar.current,
      { scaleX: 0 },
      { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: 0.3 } },
    )
  })
  return <div ref={bar} aria-hidden="true" className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left scale-x-0 bg-accent" />
}
