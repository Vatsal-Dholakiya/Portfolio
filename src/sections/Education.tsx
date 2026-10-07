import { GraduationCap } from 'lucide-react'
import { content } from '../data/content'
import { RevealItem, Stagger } from '../components/ui/Reveal'
import { SectionHeading } from '../components/ui/SectionHeading'
import { TiltCard } from '../components/ui/TiltCard'

export function Education() {
  return (
    <section id="education" aria-labelledby="education-title" tabIndex={-1} className="relative py-20 outline-none md:py-28">
      <div className="container-x">
        <SectionHeading index="06" title="Education" id="education-title" />
        <Stagger as="ul" className="grid gap-4 md:grid-cols-2 lg:gap-5" stagger={0.1} amount={0.15}>
          {content.education.map((d) => (
            <RevealItem as="li" key={d.degree}>
              <TiltCard innerClassName="flex h-full flex-col p-6 sm:p-8">
                <div className="flex items-start justify-between gap-4">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-border bg-surface-2 text-primary-soft">
                    <GraduationCap className="h-6 w-6" aria-hidden="true" />
                  </span>
                  {d.years && <p className="mt-1 font-mono text-xs text-accent">{d.years}</p>}
                </div>
                <h3 className="mt-5 text-xl font-semibold leading-snug text-text">{d.degree}</h3>
                <p className="mt-1.5 font-medium text-primary-soft">{d.school}</p>
                {d.modules.length > 0 && (
                  <div className="mt-6 border-t border-border pt-5">
                    <p className="font-mono text-xs uppercase tracking-[0.12em] text-muted">Modules</p>
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
