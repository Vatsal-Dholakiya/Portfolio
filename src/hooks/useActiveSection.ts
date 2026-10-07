import { useEffect, useRef, useState } from 'react'
import { replaceHash } from '../lib/lenis'

/**
 * Id of the section crossing the upper-middle of the viewport (null near the top).
 * Also keeps the URL hash in sync without scrolling. Sections that mount later (code-split) are picked up.
 */
export function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = useState<string | null>(null)
  const scrolled = useRef(false)

  useEffect(() => {
    const observed = new Set<Element>()
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id)
      },
      { rootMargin: '-40% 0px -55% 0px' },
    )
    const attach = () => {
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el && !observed.has(el)) {
          observed.add(el)
          io.observe(el)
        }
      }
      if (observed.size === ids.length) mo.disconnect()
    }
    const mo = new MutationObserver(attach)
    mo.observe(document.body, { childList: true, subtree: true })
    attach()

    const onScroll = () => {
      scrolled.current = true
      if (window.scrollY < window.innerHeight * 0.5) setActive(null)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      io.disconnect()
      mo.disconnect()
      window.removeEventListener('scroll', onScroll)
    }
  }, [ids])

  // Keep the hash in sync only after the visitor scrolls, so a direct link like /#projects is not cleared on load
  useEffect(() => {
    if (scrolled.current) replaceHash(active)
  }, [active])

  return active
}
