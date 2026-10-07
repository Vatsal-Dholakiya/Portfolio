import { useRef } from 'react'
import { m, useScroll, useSpring } from 'framer-motion'
import { Briefcase } from 'lucide-react'
import { content } from '../data/content'
import { EASE } from '../lib/env'
import { SectionHeading } from '../components/ui/SectionHeading'
import { Reveal } from '../components/ui/Reveal'

export function Experience() {
  const list = useRef<HTMLOListElement>(null)
  const { scrollYProgress } = useScroll({ target: list, offset: ['start 75%', 'end 55%'] })
  const scaleY = useSpring(scrollYProgress, { stiffness: 160, damping: 30, restDelta: 0.001 })

  return (
    <section id="experience" aria-labelledby="experience-title" tabIndex={-1} className="relative py-20 outline-none md:py-28">
      <div className="container-x">
        <SectionHeading index="03" title="Experience" id="experience-title" />

        <ol ref={list} className="relative max-w-4xl space-y-8 pl-10 md:space-y-10 md:pl-14">
          {/* Track and the gradient line that draws downward with scroll */}
          <span aria-hidden="true" className="absolute bottom-3 left-[11px] top-3 w-0.5 rounded-full bg-border md:left-[15px]" />
          <m.span
            aria-hidden="true"
            data-reveal
            className="bg-gradient absolute bottom-3 left-[11px] top-3 w-0.5 origin-top rounded-full md:left-[15px]"
            style={{ scaleY }}
          />

          {content.experience.map((role) => (
            <li key={role.title + role.period} className="relative">
              {/* Dot: pulses once when its role enters the view */}
              <span aria-hidden="true" className="absolute -left-10 top-6 grid h-6 w-6 place-items-center md:-left-14 md:h-8 md:w-8">
                <m.span
                  className={`absolute inset-0 rounded-full ${role.current ? 'bg-highlight/40' : 'bg-primary/40'}`}
                  initial={{ scale: 0.6, opacity: 0 }}
                  whileInView={{ scale: [0.6, 1.9], opacity: [0.9, 0] }}
                  viewport={{ once: true, amount: 1, margin: '0px 0px -30% 0px' }}
                  transition={{ duration: 1.1, ease: EASE }}
                />
                <span className="relative grid h-6 w-6 place-items-center rounded-full border border-border-strong bg-surface md:h-8 md:w-8">
                  <span className={`h-2.5 w-2.5 rounded-full ${role.current ? 'bg-highlight' : 'bg-gradient'}`} />
                </span>
              </span>

              <Reveal as="article" className="card p-6 transition-colors duration-300 hover:border-border-strong md:p-8">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                  <p className="font-mono text-[0.8125rem] text-accent">{role.period}</p>
                  {role.current && (
                    <span className="rounded-full border border-highlight/40 bg-highlight/10 px-2.5 py-0.5 font-mono text-xs text-highlight">
                      Current
                    </span>
                  )}
                </div>
                <h3 className="mt-3 text-[1.375rem] font-semibold leading-snug text-text md:text-2xl">{role.title}</h3>
                <p className="mt-1 flex flex-wrap items-center gap-x-2 text-[0.9375rem] text-muted">
                  <Briefcase className="h-4 w-4 text-primary-soft" aria-hidden="true" />
                  <span className="font-medium text-text">{role.company}</span>
                  <span aria-hidden="true">·</span>
                  <span>{role.location}</span>
                </p>
                <ul className="mt-5 space-y-2.5">
                  {role.points.map((point) => (
                    <li key={point} className="flex gap-3 text-[0.9875rem] leading-relaxed text-body">
                      <span aria-hidden="true" className="bg-gradient mt-[0.7em] h-1.5 w-1.5 shrink-0 rounded-full" />
                      {point}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
