import { useEffect, useState } from 'react'
import { AnimatePresence, m } from 'framer-motion'
import { EASE } from '../lib/env'
import { finishIntro } from '../lib/intro'
import { Monogram } from './ui/Monogram'

const SHOW_MS = 550 // monogram on screen
const FADE_MS = 450 // overlay fade; SHOW_MS + FADE_MS stays under 1.2 seconds

/**
 * Short intro: the "VD" monogram is wiped in, then the overlay fades away.
 * Shown once per browser session; index.html adds `show-intro` before first paint so it never flashes.
 */
export function Intro() {
  const [active, setActive] = useState(true)

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
    const reveal = window.setTimeout(finishIntro, SHOW_MS - 50)
    const end = window.setTimeout(() => setActive(false), SHOW_MS)
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
          transition={{ duration: FADE_MS / 1000, ease: EASE }}
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
