import { useRef } from 'react'
import { mission } from '../../data/content'
import { gsap, SplitText, useGSAP } from '../../lib/gsap'
import { prefersReducedMotion } from '../../lib/helpers'
import { Accented } from '../ui/SectionHead'
import { Reveal } from '../ui/Reveal'

/** A huge statement whose words light up one by one as it scrolls through the viewport. */
export function Mission() {
  const section = useRef<HTMLElement>(null)
  const text = useRef<HTMLParagraphElement>(null)

  useGSAP(
    () => {
      const el = text.current
      if (!el || prefersReducedMotion()) return
      let split: SplitText | null = null
      let cancelled = false
      void document.fonts.ready.then(() => {
        if (cancelled) return
        split = SplitText.create(el, { type: 'words', aria: 'auto' })
        gsap.fromTo(
          split.words,
          { opacity: 0.16 },
          {
            opacity: 1,
            ease: 'none',
            stagger: 0.1,
            scrollTrigger: { trigger: el, start: 'top 80%', end: 'bottom 45%', scrub: 0.5 },
          },
        )
      })
      return () => {
        cancelled = true
        split?.revert()
      }
    },
    { scope: section },
  )

  return (
    <section ref={section} id="mission" aria-labelledby="mission-label" className="section-y relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 h-[60vmax] w-[60vmax] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(46,230,166,0.07),transparent_65%)]"
      />
      <div className="container-x relative">
        <p id="mission-label" className="label mb-10 flex items-center gap-3">
          <span className="text-emerald">01</span>
          <span className="h-px w-8 bg-line-strong" aria-hidden="true" />
          {mission.label}
        </p>
        <p
          ref={text}
          className="max-w-[22ch] font-display text-[clamp(2rem,5.4vw,4.75rem)] leading-[1.04] font-semibold tracking-[-0.045em] text-bone"
        >
          <Accented text={mission.statement} words={mission.accentWords} />
        </p>
        <Reveal className="mt-12 flex max-w-xl items-start gap-4">
          <span className="mt-3 h-px w-10 shrink-0 bg-emerald" aria-hidden="true" />
          <p className="text-lg text-mist">{mission.support}</p>
        </Reveal>
      </div>
    </section>
  )
}
