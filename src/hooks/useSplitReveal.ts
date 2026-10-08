import { gsap, ScrollTrigger, SplitText, useGSAP } from '../lib/gsap'
import { prefersReducedMotion } from '../lib/helpers'

/**
 * Words of a heading rise out of a mask when it scrolls into view (once).
 * Hidden states are set at runtime by GSAP, so the pre-rendered text is visible without JavaScript.
 */
export function useSplitReveal<T extends HTMLElement>(ref: React.RefObject<T | null>, { start = 'top 85%', delay = 0 } = {}) {
  useGSAP(
    () => {
      const el = ref.current
      if (!el || prefersReducedMotion()) return
      let split: SplitText | null = null
      // Split after web fonts load so line breaks are measured with the real font
      const run = () => {
        split = SplitText.create(el, { type: 'words', mask: 'words', wordsClass: 'split-word', aria: 'auto' })
        gsap.from(split.words, {
          yPercent: 110,
          duration: 1,
          ease: 'expo.out',
          stagger: 0.05,
          delay,
          scrollTrigger: { trigger: el, start, once: true },
        })
      }
      // Split only when the heading approaches the viewport, so page load does not pay for every heading at once
      let cancelled = false
      let near: ScrollTrigger | null = null
      void document.fonts.ready.then(() => {
        if (!cancelled) near = ScrollTrigger.create({ trigger: el, start: 'top bottom+=50%', once: true, onEnter: run })
      })
      return () => {
        cancelled = true
        near?.kill()
        split?.revert()
      }
    },
    { scope: ref },
  )
}
