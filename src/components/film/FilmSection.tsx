import { useCallback, useRef, type ReactNode } from 'react'
import type { Film } from '../../data/content'
import { gsap, useGSAP } from '../../lib/gsap'
import { FilmVideo } from './FilmVideo'

/**
 * A full-screen "shot". With motion allowed the frame pins for `length` viewport heights while scroll scrubs either
 * the generated film (when `film.src` is set) or the code-built `scene` via `animate(timeline, root)`.
 * Reduced motion and no JavaScript: a static, unpinned frame showing the scene's final state.
 */
export function FilmSection({
  id,
  labelledBy,
  film,
  scene,
  animate,
  length = 2,
  mobileLength = 1.4,
  children,
  after,
  className = '',
}: {
  id: string
  labelledBy: string
  film: Film
  scene: ReactNode
  animate?: (tl: gsap.core.Timeline, root: HTMLElement, isDesktop: boolean) => void
  length?: number
  mobileLength?: number
  children?: ReactNode
  /** Content rendered after the pinned frame, inside the same section */
  after?: ReactNode
  className?: string
}) {
  const root = useRef<HTMLElement>(null)
  const pin = useRef<HTMLDivElement>(null)
  const hasFilm = !!film.src
  const scrubEnd = useCallback(
    () => `+=${window.innerHeight * (window.matchMedia('(min-width: 768px)').matches ? length : mobileLength)}`,
    [length, mobileLength],
  )

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add({ desktop: '(min-width: 768px)', motion: '(prefers-reduced-motion: no-preference)' }, (ctx) => {
        const { desktop, motion } = ctx.conditions as { desktop: boolean; motion: boolean }
        if (!motion) return
        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: pin.current,
            start: 'top top',
            end: () => `+=${window.innerHeight * (desktop ? length : mobileLength)}`,
            pin: true,
            scrub: 0.6,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        })
        if (!hasFilm) animate?.(tl, root.current!, desktop)
        // Copy fades in early and out at the end of the shot
        tl.from('[data-film-copy] > *', { y: 30, opacity: 0, stagger: 0.05, duration: 0.15, ease: 'power2.out' }, 0.02)
        if (tl.duration() < 1) tl.to({}, { duration: 1 - tl.duration() })
      })
    },
    { scope: root, dependencies: [hasFilm] },
  )

  return (
    <section ref={root} id={id} aria-labelledby={labelledBy} tabIndex={-1} className={`relative outline-none ${className}`}>
      <div ref={pin} className="relative h-[100svh] min-h-[34rem] overflow-hidden bg-void">
        <div className="absolute inset-0">
          {hasFilm ? <FilmVideo film={film} mode="scrub" trigger={pin} end={scrubEnd} className="h-full w-full object-cover" /> : scene}
        </div>
        <div aria-hidden="true" className="vignette pointer-events-none absolute inset-0" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-b from-transparent to-void"
        />
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-gradient-to-t from-transparent to-void" />
        {children}
      </div>
      {after}
    </section>
  )
}
