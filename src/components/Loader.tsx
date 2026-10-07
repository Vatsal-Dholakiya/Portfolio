import { useEffect, useState } from 'react'
import { AnimatePresence, m } from 'framer-motion'
import { EASE } from '../lib/animations'
import { finishIntro } from '../lib/intro'
import { Monogram } from './ui/Monogram'

const SHOW_MS = 550 // monogram on screen (from first paint)
const END_MS = 1100 // overlay fully faded (from first paint); index.html also enforces a 1.15 s cap

declare global {
  interface Window {
    __introStart?: number
  }
}

/**
 * Short intro: the "VD" monogram is wiped in, then the overlay fades away.
 * Shown once per browser session; index.html adds `show-intro` before first paint so it never flashes.
 */
export function Loader() {
  const [active, setActive] = useState(true)
  const [fade, setFade] = useState((END_MS - SHOW_MS) / 1000)

  useEffect(() => {
    const html = document.documentElement
    // Not shown (repeat visit, reduced motion): the overlay stays hidden by CSS
    if (!html.classList.contains('show-intro')) {
      finishIntro()
      return
    }
    try {
      sessionStorage.setItem('vd-intro', '1')
    } catch {
      /* storage blocked */
    }
    // Timers count from the first paint, so slow JavaScript start-up never stretches the intro
    const elapsed = performance.now() - (window.__introStart ?? performance.now())
    const hideIn = Math.max(0, SHOW_MS - elapsed)
    const reveal = window.setTimeout(finishIntro, Math.max(0, hideIn - 50))
    const end = window.setTimeout(() => {
      setFade(Math.max(0.15, (END_MS - Math.max(elapsed, SHOW_MS)) / 1000))
      setActive(false)
    }, hideIn)
    return () => {
      window.clearTimeout(reveal)
      window.clearTimeout(end)
    }
  }, [])

  return (
    <AnimatePresence onExitComplete={() => document.documentElement.classList.remove('show-intro')}>
      {active && (
        <m.div
          key="intro"
          aria-hidden="true"
          className="intro fixed inset-0 z-[100] place-items-center bg-bg"
          exit={{ opacity: 0 }}
          transition={{ duration: fade, ease: EASE }}
        >
          <div className="relative">
            <div className="absolute -inset-16 rounded-full bg-[radial-gradient(circle,rgba(124,92,255,0.25),transparent_70%)]" />
            <div className="relative overflow-hidden rounded-[22px]">
              <Monogram className="h-24 w-24" />
              {/* Wipe that uncovers the monogram from left to right (transform only) */}
              <m.span
                className="absolute inset-0 origin-right bg-bg"
                initial={{ scaleX: 1 }}
                animate={{ scaleX: 0 }}
                transition={{ duration: 0.45, ease: EASE }}
              />
            </div>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  )
}
