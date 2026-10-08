import { useRef } from 'react'
import { gsap, useGSAP } from '../lib/gsap'
import { prefersReducedMotion } from '../lib/helpers'
import { FinalHero } from './hero/FinalHero'

/** Hero: the name, promise and actions, shown first. Lines rise in once on load (skipped with reduced motion). */
export function Hero() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      gsap
        .timeline({ delay: 0.1 })
        .from('[data-hero-line]', { yPercent: 110, duration: 1.1, ease: 'expo.out', stagger: 0.08 })
        .from('[data-hero-item]', { y: 24, opacity: 0, duration: 0.9, ease: 'expo.out', stagger: 0.07 }, '-=0.7')
    },
    { scope: root },
  )

  return (
    <section ref={root} id="home" aria-label="Introduction" tabIndex={-1} className="relative outline-none">
      <FinalHero />
    </section>
  )
}
