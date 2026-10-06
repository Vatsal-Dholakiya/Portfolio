import { useRef } from 'react'
import { gsap, ScrollTrigger, useGSAP } from '../lib/gsap'
import { prefersReducedMotion } from '../lib/motion'
import { profile } from '../data/profile'
import { Section } from '../components/Section'

export function Experience() {
  const list = useRef<HTMLOListElement>(null)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      // The line draws itself as you scroll through the roles
      gsap.fromTo(
        '[data-line]',
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: { trigger: list.current, start: 'top center', end: 'bottom center', scrub: 0.5 },
        },
      )
      // Each dot fills when its role reaches the middle of the screen
      gsap.utils.toArray<HTMLElement>('[data-role]').forEach((role) => {
        const fill = role.querySelector('[data-fill]')
        gsap.set(fill, { scale: 0 })
        ScrollTrigger.create({
          trigger: role,
          start: 'top center',
          onEnter: () => gsap.to(fill, { scale: 1, duration: 0.4, ease: 'back.out(2.5)' }),
          onLeaveBack: () => gsap.to(fill, { scale: 0, duration: 0.3, ease: 'power2.in' }),
        })
        gsap.from(role.querySelectorAll('[data-role-body] > *'), {
          y: 24,
          opacity: 0,
          duration: 0.7,
          ease: 'power3.out',
          stagger: 0.07,
          scrollTrigger: { trigger: role, start: 'top 82%', once: true },
        })
      })
    },
    { scope: list },
  )

  return (
    <Section id="experience" index="04" title="Experience">
      <ol ref={list} className="relative space-y-14 pl-10 md:pl-12">
        <span aria-hidden="true" className="absolute bottom-2 left-[7px] top-2 w-px bg-line" />
        <span data-line aria-hidden="true" className="absolute bottom-2 left-[7px] top-2 w-px origin-top bg-accent" />
        {profile.experience.map((r) => (
          <li key={r.period} data-role className="relative">
            <span
              aria-hidden="true"
              className={`absolute -left-10 top-1.5 grid h-[15px] w-[15px] place-items-center rounded-full border-2 bg-bg md:-left-12 ${
                r.current ? 'border-ink' : 'border-accent'
              }`}
            >
              {r.current && <span className="pulse-ring absolute inset-0 rounded-full bg-highlight" />}
              <span data-fill className={`h-[7px] w-[7px] rounded-full ${r.current ? 'bg-highlight' : 'bg-accent'}`} />
            </span>
            <div data-role-body>
              <p className="label flex flex-wrap items-center gap-3">
                {r.period}
                {r.current && (
                  <span className="rounded-full border border-accent px-2.5 py-0.5 text-[0.7rem] tracking-[0.12em] text-accent">
                    Current
                  </span>
                )}
              </p>
              <h3 className="mt-2 font-display text-2xl font-extrabold tracking-tight md:text-[1.75rem]">{r.title}</h3>
              <p className="mt-1 font-display font-semibold text-accent">{r.company}</p>
              <ul className="mt-4 space-y-2.5 text-muted">
                {r.points.map((p) => (
                  <li key={p.slice(0, 30)} className="relative pl-5 before:absolute before:left-0 before:top-[0.8em] before:h-px before:w-2.5 before:bg-line">
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  )
}
