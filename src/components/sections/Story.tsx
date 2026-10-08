import { useRef } from 'react'
import { story } from '../../data/content'
import { gsap, useGSAP } from '../../lib/gsap'
import { SectionHead } from '../ui/SectionHead'
import { Certificates } from './Certificates'

/**
 * Career and education timeline. Desktop with motion: the section pins and scroll moves the chapters sideways,
 * with the huge years drifting at a different speed. Mobile, reduced motion and no JavaScript: a vertical timeline.
 */
export function Story() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
        const pin = root.current!.querySelector<HTMLElement>('[data-story-pin]')!
        const track = root.current!.querySelector<HTMLElement>('[data-story-track]')!
        const distance = () => Math.max(0, track.scrollWidth - window.innerWidth)
        root.current!.dataset.horizontal = ''

        const move = gsap.to(track, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: pin,
            start: 'top top',
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.8,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        })
        gsap.fromTo(
          '[data-story-progress]',
          { scaleX: 0 },
          { scaleX: 1, ease: 'none', scrollTrigger: { trigger: pin, start: 'top top', end: () => `+=${distance()}`, scrub: 0.8 } },
        )

        // Years parallax inside the moving track
        gsap.utils.toArray<HTMLElement>('[data-year]', root.current).forEach((year) => {
          gsap.fromTo(
            year,
            { x: 80 },
            {
              x: -80,
              ease: 'none',
              scrollTrigger: { trigger: year, containerAnimation: move, start: 'left right', end: 'right left', scrub: true },
            },
          )
        })
        return () => delete root.current?.dataset.horizontal
      })
      mm.add('(max-width: 1023px) and (prefers-reduced-motion: no-preference)', () => {
        gsap.fromTo(
          '[data-story-line]',
          { scaleY: 0 },
          { scaleY: 1, ease: 'none', scrollTrigger: { trigger: '[data-story-track]', start: 'top 70%', end: 'bottom 70%', scrub: 0.5 } },
        )
      })
    },
    { scope: root },
  )

  const last = story.chapters.length - 1

  return (
    <section ref={root} id="story" aria-labelledby="story-title" tabIndex={-1} className="group/story section-y relative outline-none">
      <div className="container-x">
        <SectionHead index={3} label={story.label} title={story.title} accent={['here.']} id="story-title" className="lg:mb-0" />
      </div>

      <div data-story-pin className="story-pin relative">
        {/* Progress line (desktop) */}
        <div aria-hidden="true" className="story-progress container-x mb-10 hidden">
          <div className="h-px w-full bg-line">
            <div data-story-progress className="bg-gradient h-px w-full origin-left" />
          </div>
        </div>

        <div className="relative">
          {/* Vertical line (mobile) */}
          <div
            aria-hidden="true"
            className="absolute top-2 bottom-2 left-[calc(1.25rem+5px)] w-px bg-line md:left-[calc(2rem+5px)] lg:hidden"
          >
            <div data-story-line className="bg-gradient h-full w-full origin-top" />
          </div>

          <ol data-story-track className="story-track container-x flex flex-col gap-12">
            {story.chapters.map((c, i) => {
              const now = i === last
              return (
                <li key={`${c.year}-${c.title}`} className="relative min-w-0 pl-9 lg:pl-0">
                  <span
                    aria-hidden="true"
                    className={`absolute top-2 left-0 h-[11px] w-[11px] rounded-full border-2 lg:hidden ${now ? 'border-ember bg-ember' : 'border-emerald bg-void'}`}
                  />
                  <article className="card relative flex h-full flex-col overflow-hidden p-6 sm:p-8 lg:min-h-[26rem]">
                    <p
                      data-year
                      aria-hidden="true"
                      className={`pointer-events-none font-display text-[clamp(4rem,9vw,8.5rem)] leading-[0.8] font-extrabold tracking-[-0.06em] ${
                        now ? 'text-ember/90' : 'text-outline'
                      }`}
                    >
                      {c.year}
                    </p>
                    <div className="mt-auto pt-10">
                      <p className="label text-mist">
                        <span className="sr-only">{c.year}: </span>
                        {c.place}
                      </p>
                      <h3 className="mt-3 text-[clamp(1.5rem,2.4vw,2rem)] leading-[1.1] font-bold">{c.title}</h3>
                      <p className="mt-3 text-mist">{c.text}</p>
                      {c.badge && (
                        <span className="mt-5 inline-flex rounded-full border border-emerald/30 bg-emerald/10 px-3 py-1 font-mono text-xs tracking-[0.08em] text-emerald uppercase">
                          {c.badge}
                        </span>
                      )}
                    </div>
                  </article>
                </li>
              )
            })}
          </ol>
        </div>
      </div>

      <Certificates />
    </section>
  )
}
