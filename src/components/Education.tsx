import { Award, GraduationCap, MapPin } from 'lucide-react'
import { education } from '../data/content'
import { SectionTitle } from './SectionTitle'
import { RevealItem, Stagger } from './ui/Reveal'
import { TiltCard } from './ui/TiltCard'

export function Education() {
  return (
    <section id="education" aria-labelledby="education-title" tabIndex={-1} className="section-y relative outline-none">
      <div className="container-x">
        <SectionTitle index={6} title={education.title} id="education-title" />
        <Stagger as="ul" className="grid gap-4 md:grid-cols-2 lg:gap-5" stagger={0.1} amount={0.15}>
          {education.degrees.map((d) => (
            <RevealItem as="li" key={d.degree} className="min-w-0">
              <TiltCard innerClassName="flex h-full flex-col p-6 sm:p-8">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-border bg-surface-2 text-primary-soft">
                    <GraduationCap className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <div className="flex flex-wrap items-center gap-2">
                    {d.award && (
                      <span className="bg-gradient inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[0.8125rem] font-semibold text-on-gradient">
                        <Award className="h-3.5 w-3.5" aria-hidden="true" />
                        {d.award}
                      </span>
                    )}
                    {d.years && <span className="font-mono text-xs text-accent">{d.years}</span>}
                  </div>
                </div>
                <h3 className="mt-5 text-xl leading-snug font-semibold text-text">{d.degree}</h3>
                <p className="mt-1.5 font-medium text-primary-soft">{d.school}</p>
                <p className="mt-1 inline-flex items-center gap-1.5 text-sm text-muted">
                  <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                  {d.location}
                </p>
                {d.modules.length > 0 && (
                  <div className="mt-6 border-t border-border pt-5">
                    <h4 className="font-mono text-xs tracking-[0.12em] text-muted uppercase">{education.modulesLabel}</h4>
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {d.modules.map((mod) => (
                        <li key={mod} className="chip">
                          {mod}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </TiltCard>
            </RevealItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
