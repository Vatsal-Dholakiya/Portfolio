import { useEffect, useRef } from 'react'
import { asset, type Film } from '../../data/content'
import { gsap, ScrollTrigger } from '../../lib/gsap'
import { prefersReducedMotion } from '../../lib/helpers'

/**
 * A generated film. `mode="loop"` autoplays muted and loops (Hero Orbit).
 * `mode="scrub"` follows scroll progress of `trigger` (encode with every frame as a keyframe for instant seeking).
 * With reduced motion only the poster frame is shown.
 */
export function FilmVideo({
  film,
  mode,
  trigger,
  end = 'bottom bottom',
  className = '',
}: {
  film: Film
  mode: 'loop' | 'scrub'
  trigger?: React.RefObject<HTMLElement | null>
  /** ScrollTrigger end for scrub mode */
  end?: string | (() => string)
  className?: string
}) {
  const ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = ref.current
    if (!video || prefersReducedMotion()) return
    if (mode === 'loop') {
      // Play only while on screen (saves battery); paused when the tab is hidden by the browser
      const io = new IntersectionObserver(([e]) => (e?.isIntersecting ? void video.play().catch(() => {}) : video.pause()))
      io.observe(video)
      return () => io.disconnect()
    }
    const target = trigger?.current
    if (!target) return
    const state = { t: 0 }
    const st = ScrollTrigger.create({
      trigger: target,
      start: 'top top',
      end,
      onUpdate: (self) => {
        if (!video.duration) return
        // Smoothed seeking so playback never stutters
        gsap.to(state, {
          t: self.progress * video.duration,
          duration: 0.25,
          ease: 'power2.out',
          overwrite: true,
          onUpdate: () => {
            video.currentTime = state.t
          },
        })
      },
    })
    return () => st.kill()
  }, [mode, trigger, end])

  const src = asset(film.src)
  const mobile = film.mobileSrc ? asset(film.mobileSrc) : ''
  return (
    <video
      ref={ref}
      className={className}
      poster={film.poster ? asset(film.poster) : undefined}
      muted
      playsInline
      loop={mode === 'loop'}
      preload={mode === 'loop' ? 'auto' : 'metadata'}
      aria-label={film.alt}
      tabIndex={-1}
    >
      {mobile && <source src={mobile} type="video/mp4" media="(max-width: 767px)" />}
      {film.webm && <source src={asset(film.webm)} type="video/webm" />}
      <source src={src} type="video/mp4" />
    </video>
  )
}
