import { useRef } from 'react'
import { about } from '../../data/content'
import { gsap, SplitText, useGSAP } from '../../lib/gsap'
import { prefersReducedMotion } from '../../lib/helpers'
import { Accented } from '../ui/SectionHead'
import { Reveal } from '../ui/Reveal'

/** About: a short statement whose words light up as it scrolls into view, then two paragraphs. */
export function About() {
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
        split = SplitText.create(el, { type: 'words', aria: 'none' })
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
    <section
      ref={section}
      id="about"
      aria-labelledby="about-label"
      tabIndex={-1}
      className="section-y relative overflow-hidden outline-none"
    >
      <div className="container-x relative">
        <p id="about-label" className="label mb-8 flex items-center gap-3">
          <span className="text-emerald">01</span>
          <span className="h-px w-8 bg-line-strong" aria-hidden="true" />
          {about.label}
        </p>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] lg:gap-16">
          <p
            ref={text}
            className="max-w-[24ch] font-display text-[clamp(1.75rem,3.4vw,2.75rem)] leading-[1.15] font-semibold tracking-[-0.03em] text-bone"
          >
            <Accented text={about.statement} words={about.accentWords} />
          </p>
          <Reveal className="space-y-5 lg:pt-2">
            {about.paragraphs.map((para) => (
              <p key={para} className="text-[1.0625rem] leading-relaxed text-mist">
                {para}
              </p>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  )
}
