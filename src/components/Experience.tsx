import { useRef } from 'react'
import { m, useScroll, useSpring } from 'framer-motion'
import { ArrowRight, Briefcase, MapPin } from 'lucide-react'
import { experience } from '../data/content'
import { EASE } from '../lib/animations'
import { requestOpenProject } from '../lib/events'
import { scrollToId } from '../lib/lenis'
import { SectionTitle } from './SectionTitle'
import { Reveal } from './ui/Reveal'

export function Experience() {
  const list = useRef<HTMLOListElement>(null)
  const { scrollYProgress } = useScroll({ target: list, offset: ['start 75%', 'end 55%'] })
  const scaleY = useSpring(scrollYProgress, { stiffness: 160, damping: 30, restDelta: 0.001 })

  return (
    <section id="experience" aria-labelledby="experience-title" tabIndex={-1} className="section-y relative outline-none">
      <div className="container-x">
        <SectionTitle index={3} title={experience.title} id="experience-title" />

        <ol ref={list} className="relative space-y-8 md:space-y-12">
          {/* Track and the gradient line that draws downward with scroll */}
          <span aria-hidden="true" className="absolute top-3 bottom-3 left-[11px] w-0.5 rounded-full bg-border md:left-1/2 md:-ml-px" />
          <m.span
            aria-hidden="true"
            data-reveal
            className="bg-gradient absolute top-3 bottom-3 left-[11px] w-0.5 origin-top rounded-full md:left-1/2 md:-ml-px"
            style={{ scaleY }}
          />

          {experience.roles.map((role, i) => {
            const right = i % 2 === 1
            return (
              <li key={role.title + role.company} className="relative pl-10 md:grid md:grid-cols-2 md:gap-16 md:pl-0">
                {/* Dot on the line: pulses once when its role enters the view */}
                <span aria-hidden="true" className="absolute top-6 left-0 grid h-6 w-6 place-items-center md:left-1/2 md:-ml-3">
                  <m.span
                    className={`absolute inset-0 rounded-full ${role.current ? 'bg-highlight/40' : 'bg-primary/40'}`}
                    initial={{ scale: 0.6, opacity: 0 }}
                    whileInView={{ scale: [0.6, 2], opacity: [0.9, 0] }}
                    viewport={{ once: true, amount: 1, margin: '0px 0px -30% 0px' }}
                    transition={{ duration: 1.1, ease: EASE }}
                  />
                  <span className="relative grid h-6 w-6 place-items-center rounded-full border border-border-strong bg-surface">
                    <span className={`h-2.5 w-2.5 rounded-full ${role.current ? 'bg-highlight' : 'bg-gradient'}`} />
                  </span>
                </span>

                <Reveal
                  as="article"
                  className={`card p-6 transition-colors duration-300 hover:border-border-strong md:p-7 ${right ? 'md:col-start-2' : 'md:col-start-1'}`}
                >
                  {(role.period || role.current) && (
                    <div className="mb-3 flex flex-wrap items-center gap-x-4 gap-y-2">
                      {role.period && <p className="font-mono text-[0.8125rem] text-accent">{role.period}</p>}
                      {role.current && (
                        <span className="rounded-full border border-highlight/40 bg-highlight/10 px-2.5 py-0.5 font-mono text-xs text-highlight">
                          {experience.currentLabel}
                        </span>
                      )}
                    </div>
                  )}
                  <h3 className="text-[1.375rem] leading-snug font-semibold text-text md:text-2xl">{role.title}</h3>
                  <p className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.9375rem] text-muted">
                    <span className="inline-flex items-center gap-1.5">
                      <Briefcase className="h-4 w-4 text-primary-soft" aria-hidden="true" />
                      <span className="font-medium text-text">{role.company}</span>
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="h-4 w-4 text-primary-soft" aria-hidden="true" />
                      {role.location}
                    </span>
                  </p>
                  <ul className="mt-5 space-y-2.5">
                    {role.points.map((point) => (
                      <li key={point} className="flex gap-3 text-[0.9875rem] leading-relaxed text-body">
                        <span aria-hidden="true" className="bg-gradient mt-[0.7em] h-1.5 w-1.5 shrink-0 rounded-full" />
                        {point}
                      </li>
                    ))}
                  </ul>
                  {role.tags.length > 0 && (
                    <ul className="mt-5 flex flex-wrap gap-2" aria-label="Technologies and skills">
                      {role.tags.map((t) => (
                        <li key={t} className="chip text-[0.75rem]">
                          {t}
                        </li>
                      ))}
                    </ul>
                  )}
                  {role.projectLink && (
                    <a
                      href={`#${role.projectLink.projectId}`}
                      onClick={(e) => {
                        e.preventDefault()
                        requestOpenProject(role.projectLink!.projectId)
                        scrollToId(role.projectLink!.projectId, { updateHash: false })
                      }}
                      className="link mt-5 inline-flex items-center gap-1.5 text-sm font-medium"
                    >
                      {role.projectLink.label}
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </a>
                  )}
                </Reveal>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
