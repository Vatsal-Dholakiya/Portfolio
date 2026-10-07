import { useEffect, useRef } from 'react'
import { m, type Variants } from 'framer-motion'
import { EASE } from '../lib/animations'

const letter: Variants = {
  hidden: { opacity: 0, y: '0.55em' },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
}

/**
 * The name, revealed letter by letter. Every letter is its own gradient-clipped span, and each span's
 * gradient is sized and offset to the whole heading so the name reads as one continuous gradient.
 */
export function GradientName({ text, play }: { text: string; play: boolean }) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const root = ref.current
    if (!root) return
    const fit = () => {
      const width = root.offsetWidth
      const height = root.offsetHeight
      root.querySelectorAll<HTMLElement>('[data-letter]').forEach((el) => {
        el.style.backgroundSize = `${width}px ${height}px`
        el.style.backgroundPosition = `${-el.offsetLeft}px ${-el.offsetTop}px`
      })
    }
    fit()
    document.fonts?.ready.then(fit)
    const ro = new ResizeObserver(fit)
    ro.observe(root)
    return () => ro.disconnect()
  }, [])

  const words = text.split(' ')
  return (
    <m.span
      ref={ref}
      className="relative inline-block max-w-full"
      initial="hidden"
      animate={play ? 'show' : 'hidden'}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.035 } } }}
    >
      {words.map((word, wi) => (
        <span key={wi}>
          <span className="inline-block whitespace-nowrap">
            {[...word].map((ch, ci) => (
              <m.span key={ci} data-letter data-reveal variants={letter} className="text-gradient inline-block pb-[0.08em]">
                {ch}
              </m.span>
            ))}
          </span>
          {wi < words.length - 1 && ' '}
        </span>
      ))}
    </m.span>
  )
}
