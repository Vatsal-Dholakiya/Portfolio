import { useEffect, useState } from 'react'
import { ScrollTrigger } from '../lib/gsap'

/** Fraction of the viewport height where the "reading line" sits. */
const LINE = 0.4

/**
 * Id of the navbar section under the reading line (40% down the viewport), or null when the line is over
 * anything else (hero, build animation, numbers, How I work). Measured on scroll, resize and after
 * ScrollTrigger re-measures pinned scenes, so it stays right when pins change the page height.
 */
export function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    let frame = 0
    const measure = () => {
      frame = 0
      const line = window.innerHeight * LINE
      let found: string | null = null
      for (const id of ids) {
        const r = document.getElementById(id)?.getBoundingClientRect()
        if (r && r.top <= line && r.bottom > line) {
          found = id
          break
        }
      }
      setActive(found)
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(measure)
    }
    schedule()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    ScrollTrigger.addEventListener('refresh', schedule)
    // Sections are code-split; measure again as they arrive
    const mo = new MutationObserver(schedule)
    mo.observe(document.getElementById('main') ?? document.body, { childList: true, subtree: false })
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      ScrollTrigger.removeEventListener('refresh', schedule)
      mo.disconnect()
    }
  }, [ids])

  return active
}
