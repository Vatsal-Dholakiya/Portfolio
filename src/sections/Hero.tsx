import { useRef } from 'react'
import { SplitText, gsap, useGSAP } from '../lib/gsap'
import { introDone } from '../lib/intro'
import { fontsReady, prefersReducedMotion } from '../lib/motion'
import { scrollToId } from '../lib/smoothScroll'
import { useTheme } from '../lib/theme'
import { asset, profile } from '../data/profile'
import { Icon } from '../components/Icon'
import { Magnetic } from '../components/Magnetic'
import { NeuralCanvas } from '../components/NeuralCanvas'

export function Hero() {
  const root = useRef<HTMLElement>(null)
  const theme = useTheme()

  useGSAP(
    () => {
      const html = document.documentElement
      if (prefersReducedMotion()) {
        html.classList.remove('js-anim')
        return
      }
      let split: SplitText | undefined
      let cancelled = false
      Promise.all([introDone, fontsReady()]).then(() => {
        if (cancelled) return
        split = SplitText.create('[data-hero-line]', { type: 'chars', mask: 'lines', linesClass: 'split-line' })
        gsap
          .timeline({ onComplete: () => html.classList.remove('js-anim') })
          .set('[data-hero-name]', { opacity: 1 })
          .from(split.chars, { yPercent: 115, duration: 1, ease: 'power4.out', stagger: 0.035 })
          .fromTo(
            '[data-hero-fade]',
            { y: 24, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', stagger: 0.09 },
            '-=0.55',
          )
      })
      return () => {
        cancelled = true
        split?.revert()
      }
    },
    { scope: root },
  )

  const { first, last } = profile.name

  return (
    <section ref={root} id="top" tabIndex={-1} aria-label="Introduction" className="relative flex min-h-[100svh] items-center overflow-hidden pb-16 pt-28 outline-none">
      <NeuralCanvas theme={theme} />
      {/* Soft fade so the canvas never competes with the text */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_55%,var(--bg)_10%,transparent_70%)] opacity-80" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-bg to-transparent" />

      <div className="container-site relative">
        <p data-hero-fade className="label mb-6 flex items-center gap-3">
          <span className="h-px w-10 bg-accent" aria-hidden="true" />
          {profile.role}
        </p>

        <h1 className="font-display font-extrabold leading-[0.9] tracking-[-0.035em] text-[clamp(3.6rem,18vw,10.5rem)]">
          <span className="sr-only">{`${first} ${last}`}</span>
          <span data-hero-name aria-hidden="true" className="block">
            <span data-hero-line className="block">{first}</span>
            <span data-hero-line className="text-outline block">{last}</span>
          </span>
        </h1>

        <div className="mt-10 grid gap-8 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] md:items-end md:gap-12">
          <p data-hero-fade className="max-w-xl text-lg leading-relaxed md:text-xl">
            {profile.hero.intro}
          </p>
          <p data-hero-fade className="flex max-w-sm gap-2 text-base text-muted">
            <Icon name="location" className="mt-1.5 h-4 w-4 shrink-0 text-accent" />
            {profile.hero.location}
          </p>
        </div>

        <ul data-hero-fade className="mt-10 flex flex-wrap gap-3" aria-label="Quick links">
          <li>
            <Magnetic>
              <a
                href="#work"
                className="btn btn-primary"
                onClick={(e) => {
                  e.preventDefault()
                  scrollToId('work')
                }}
              >
                See my work <Icon name="down" />
              </a>
            </Magnetic>
          </li>
          <li>
            <Magnetic>
              <a href={profile.contact.github} target="_blank" rel="noopener noreferrer" className="btn">
                <Icon name="github" /> GitHub
              </a>
            </Magnetic>
          </li>
          <li>
            <Magnetic>
              <a href={profile.contact.stackoverflow} target="_blank" rel="noopener noreferrer" className="btn">
                <Icon name="stackoverflow" /> Stack Overflow
              </a>
            </Magnetic>
          </li>
          <li>
            <Magnetic>
              <a href={asset(profile.cv)} download className="btn">
                <Icon name="download" /> Download CV
              </a>
            </Magnetic>
          </li>
        </ul>
      </div>
    </section>
  )
}
