import { useRef } from 'react'
import { gsap, useGSAP } from '../lib/gsap'
import { useCountUp } from '../hooks/useCountUp'
import { profile, type Project } from '../data/profile'
import { Icon } from '../components/Icon'
import { RevealHeading } from '../components/RevealHeading'

function Impact({ impact }: { impact: NonNullable<Project['impact']> }) {
  const num = useRef<HTMLSpanElement>(null)
  useCountUp(num, impact.value)
  return (
    <p className="mt-6 flex items-end gap-4 border-y border-line py-5">
      <span className="font-display text-[clamp(3.5rem,8vw,5.5rem)] font-extrabold leading-[0.85] tracking-tight text-accent tabular-nums">
        {impact.prefix}
        <span ref={num}>{impact.value}</span>
        {impact.suffix}
      </span>
      <span className="max-w-[14rem] pb-1 font-display text-sm font-semibold leading-snug text-muted">{impact.label}</span>
    </p>
  )
}

function ProjectCard({ project, index, total }: { project: Project; index: number; total: number }) {
  return (
    <article
      data-project
      className={`card flex shrink-0 flex-col p-6 md:p-8 lg:min-h-[30rem] ${
        project.featured || project.description.length > 400 ? 'lg:w-[34rem]' : 'lg:w-[26rem]'
      } ${project.featured ? 'ring-1 ring-accent/40' : ''}`}
    >
      <div className="flex items-start justify-between gap-4">
        <span className="label whitespace-nowrap">
          {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </span>
        {project.kind && (
          <span className={`label text-right ${project.featured ? 'text-accent' : ''}`}>{project.kind}</span>
        )}
      </div>
      <h3 className="mt-5 font-display text-2xl font-extrabold leading-tight tracking-tight md:text-[1.75rem]">
        {project.title}
      </h3>
      {project.impact && <Impact impact={project.impact} />}
      <p className="mt-5 text-[0.98rem] leading-relaxed text-muted">{project.description}</p>
      <div className="mt-auto pt-6">
        {project.tags.length > 0 && (
          <ul className="flex flex-wrap gap-2" aria-label="Technologies">
            {project.tags.map((t) => (
              <li key={t} data-tag className="tag">
                {t}
              </li>
            ))}
          </ul>
        )}
        {project.links.length > 0 && (
          <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
            {project.links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-display font-semibold text-accent link-underline"
                >
                  {l.label} <Icon name="arrow" className="h-3.5 w-3.5" />
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  )
}

/** Desktop: the section pins and projects scroll horizontally. Mobile / reduced motion: a vertical list. */
export function Work() {
  const section = useRef<HTMLElement>(null)
  const track = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      const popTags = (card: Element, trigger: ScrollTrigger.Vars) =>
        gsap.from(card.querySelectorAll('[data-tag]'), {
          scale: 0.6,
          opacity: 0,
          duration: 0.45,
          ease: 'back.out(2)',
          stagger: 0.05,
          scrollTrigger: { ...trigger, once: true },
        })

      mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
        const el = track.current!
        const distance = () => Math.max(0, el.scrollWidth - el.clientWidth)
        const scroll = gsap.to(el, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: section.current,
            start: 'top top',
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        })
        gsap.utils.toArray<HTMLElement>('[data-project]').forEach((card, i) =>
          popTags(
            card,
            i === 0
              ? { trigger: section.current, start: 'top 60%' }
              : { trigger: card, containerAnimation: scroll, start: 'left 85%' },
          ),
        )
      })

      mm.add('(max-width: 1023px) and (prefers-reduced-motion: no-preference)', () => {
        gsap.utils.toArray<HTMLElement>('[data-project]').forEach((card) =>
          popTags(card, { trigger: card.querySelector('[data-tag]') ?? card, start: 'top 92%' }),
        )
      })
    },
    { scope: section },
  )

  const total = profile.projects.length

  return (
    <section
      ref={section}
      id="work"
      aria-labelledby="work-title"
      tabIndex={-1}
      className="relative overflow-hidden py-24 outline-none md:py-32 lg:flex lg:min-h-screen lg:flex-col lg:justify-center lg:py-20"
    >
      <div className="container-site">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="label mb-4 flex items-center gap-3" aria-hidden="true">
              <span className="text-accent">02</span>
              <span className="h-px w-10 bg-line" />
            </p>
            <RevealHeading
              id="work-title"
              text="Selected work"
              className="font-display text-[clamp(2.25rem,5vw,3.5rem)] font-extrabold leading-[1.02] tracking-tight"
            />
          </div>
          <p className="label hidden items-center gap-2 lg:flex" aria-hidden="true">
            Scroll <Icon name="arrow" className="h-3 w-3 rotate-45" />
          </p>
        </div>

        <div ref={track} className="mt-12 flex flex-col gap-6 lg:flex-row lg:overflow-visible">
          {profile.projects.map((p, i) => (
            <ProjectCard key={p.title} project={p} index={i} total={total} />
          ))}
        </div>
      </div>
    </section>
  )
}
