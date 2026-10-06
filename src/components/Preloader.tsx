import { useRef } from 'react'
import { gsap, useGSAP } from '../lib/gsap'
import { finishIntro } from '../lib/intro'
import { profile } from '../data/profile'

/**
 * Counter 0 → 100 with the initials, then slides up. Shown once per session.
 * Visibility is controlled by the `show-preloader` class set in index.html before first paint,
 * so it never hides content when JavaScript is off.
 */
export function Preloader() {
  const root = useRef<HTMLDivElement>(null)
  const count = useRef<HTMLSpanElement>(null)

  useGSAP(() => {
    const html = document.documentElement
    if (!html.classList.contains('show-preloader')) {
      finishIntro()
      return
    }
    const counter = { v: 0 }
    const done = () => {
      html.classList.remove('show-preloader')
      try {
        sessionStorage.setItem('vd-preloaded', '1')
      } catch {
        /* storage blocked */
      }
    }
    gsap
      .timeline()
      .from('[data-pl-initials]', { yPercent: 100, duration: 0.45, ease: 'power3.out' })
      .to(
        counter,
        {
          v: 100,
          duration: 0.8,
          ease: 'power2.inOut',
          onUpdate: () => {
            if (count.current) count.current.textContent = String(Math.round(counter.v))
          },
        },
        0,
      )
      .to('[data-pl-bar]', { scaleX: 1, duration: 0.8, ease: 'power2.inOut' }, 0)
      .add(finishIntro, 0.95)
      .to(root.current, { yPercent: -100, duration: 0.5, ease: 'power4.inOut' }, 0.85)
      .add(done)
  }, { scope: root })

  return (
    <div
      ref={root}
      aria-hidden="true"
      className="preloader fixed inset-0 z-[100] flex-col justify-between bg-bg p-6 md:p-10"
    >
      <span className="label">Portfolio</span>
      <div className="flex items-end justify-between gap-6">
        <span className="overflow-hidden font-display text-[clamp(4rem,16vw,10rem)] font-extrabold leading-none">
          <span data-pl-initials className="block">
            {profile.initials}
          </span>
        </span>
        <span className="font-display text-[clamp(2.5rem,8vw,5rem)] font-extrabold leading-none tabular-nums text-accent">
          <span ref={count}>0</span>
        </span>
      </div>
      <span data-pl-bar className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-accent" />
    </div>
  )
}
