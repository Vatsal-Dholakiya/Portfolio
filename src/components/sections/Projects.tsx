import { ArrowUpRight, Check } from 'lucide-react'
import { projects, type CaseStudy } from '../../data/content'
import { externalLink } from '../../lib/helpers'
import { GitHubRepos } from '../GitHubRepos'
import { StackOverflowCard } from '../StackOverflowCard'
import { GitHubIcon } from '../ui/BrandIcons'
import { Reveal, RevealItem, Stagger } from '../ui/Reveal'
import { SectionHead } from '../ui/SectionHead'
import { TiltCard } from '../ui/TiltCard'
import { DesktopMock, PhoneMock } from './ProjectMocks'

function CaseStudyBlock({ study, index }: { study: CaseStudy; index: number }) {
  const flip = index % 2 === 1
  return (
    <article id={study.id} aria-labelledby={`${study.id}-title`} className="border-t border-line pt-12 md:pt-16">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <Reveal className={`min-w-0 ${flip ? 'lg:order-2' : ''}`}>
          <p className="label text-emerald">{study.kind}</p>
          <h3 id={`${study.id}-title`} className="mt-3 text-[clamp(1.75rem,3vw,2.5rem)] leading-tight font-bold tracking-[-0.03em]">
            {study.title}
          </h3>
          <p className="mt-2 text-lg text-bone">{study.tagline}</p>
          <p className="mt-5 leading-relaxed text-mist">{study.summary}</p>
          <dl className="mt-6 grid gap-4 border-t border-line pt-6 sm:grid-cols-3">
            {study.meta.map((m) => (
              <div key={m.label} className="min-w-0">
                <dt className="label">{m.label}</dt>
                <dd className="mt-1 text-[0.9375rem] text-bone">{m.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
        <Reveal className={`min-w-0 px-2 ${flip ? 'lg:order-1' : ''}`} delay={0.1}>
          {study.visual === 'phone' ? <PhoneMock /> : <DesktopMock />}
        </Reveal>
      </div>

      <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
        <div className="min-w-0">
          <h4 className="label text-mist">{projects.featuresLabel}</h4>
          <Stagger as="ul" className="mt-4 grid gap-x-8 sm:grid-cols-2" stagger={0.04} amount={0.1}>
            {study.features.map((f) => (
              <RevealItem as="li" key={f} className="flex items-start gap-2.5 border-b border-line py-3 text-[0.9375rem] text-mist">
                <Check className="mt-1 h-4 w-4 shrink-0 text-emerald" aria-hidden="true" />
                {f}
              </RevealItem>
            ))}
          </Stagger>
        </div>
        <div className="min-w-0">
          <h4 className="label text-mist">{projects.impactLabel}</h4>
          <dl className="mt-4 grid grid-cols-2 gap-3">
            {study.impact.map((m) => (
              <div key={m.label} className="card min-w-0 p-4">
                <dt className="sr-only">{m.label}</dt>
                <dd>
                  <span className="block font-display text-[clamp(1.5rem,2.6vw,2rem)] leading-none font-bold text-emerald">{m.value}</span>
                  <span className="mt-2 block text-sm leading-snug text-mist">{m.label}</span>
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-5 text-[0.9375rem] leading-relaxed text-mist">{study.result}</p>
          <ul className="mt-5 flex flex-wrap gap-2" aria-label={`${study.title} technologies`}>
            {study.tags.map((t) => (
              <li key={t} className="chip">
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  )
}

/** Projects: two detailed case studies, more work, then live GitHub repositories and Stack Overflow stats. */
export function Projects() {
  return (
    <section id="projects" aria-labelledby="projects-title" tabIndex={-1} className="section-y relative outline-none">
      <div className="container-x">
        <SectionHead index={5} label={projects.label} title={projects.title} id="projects-title">
          <p className="mt-4 max-w-2xl text-mist">{projects.intro}</p>
        </SectionHead>

        <div className="space-y-16 md:space-y-24">
          {projects.caseStudies.map((study, i) => (
            <CaseStudyBlock key={study.id} study={study} index={i} />
          ))}
        </div>

        <div className="mt-20 border-t border-line pt-12">
          <h3 className="text-2xl font-bold">{projects.moreTitle}</h3>
          <Stagger as="ul" className="mt-6 grid gap-4 md:grid-cols-2" stagger={0.1} amount={0.1}>
            {projects.more.map((p) => (
              <RevealItem as="li" key={p.id} className="min-w-0">
                <TiltCard innerClassName="flex h-full flex-col p-6">
                  <h4 className="text-lg font-semibold">{p.title}</h4>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-mist">{p.summary}</p>
                  <ul className="mt-5 flex flex-wrap gap-2" aria-label={`${p.title} technologies`}>
                    {p.tags.map((t) => (
                      <li key={t} className="chip">
                        {t}
                      </li>
                    ))}
                  </ul>
                  {(p.github || p.live) && (
                    <div className="mt-auto flex flex-wrap gap-4 pt-6">
                      {p.github && (
                        <a
                          href={p.github}
                          {...externalLink}
                          className="link inline-flex items-center gap-2 text-sm font-medium"
                          data-cursor="Code"
                        >
                          <GitHubIcon className="h-4 w-4" />
                          {projects.sourceLabel}
                          <span className="sr-only">: {p.title} (opens in a new tab)</span>
                        </a>
                      )}
                      {p.live && (
                        <a
                          href={p.live}
                          {...externalLink}
                          className="link inline-flex items-center gap-2 text-sm font-medium"
                          data-cursor="Open"
                        >
                          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                          {projects.liveLabel}
                          <span className="sr-only">: {p.title} (opens in a new tab)</span>
                        </a>
                      )}
                    </div>
                  )}
                </TiltCard>
              </RevealItem>
            ))}
          </Stagger>
        </div>

        <div className="mt-20 grid gap-10 lg:grid-cols-[minmax(0,1.9fr)_minmax(0,1fr)] lg:gap-8">
          <GitHubRepos />
          <div className="min-w-0 lg:pt-[5.5rem]">
            <StackOverflowCard />
          </div>
        </div>
      </div>
    </section>
  )
}
