import { ArrowUpRight } from 'lucide-react'
import { whatIBuild } from '../../data/content'
import { externalLink } from '../../lib/helpers'
import { Icon } from '../Icon'
import { GitHubIcon } from '../ui/BrandIcons'
import { RevealItem, Stagger } from '../ui/Reveal'
import { SectionHead } from '../ui/SectionHead'
import { TiltCard } from '../ui/TiltCard'

/** Capabilities (what he builds) and project cards. Links that are empty are hidden. */
export function WhatIBuild() {
  return (
    <section id="projects" aria-labelledby="projects-title" tabIndex={-1} className="section-y relative outline-none">
      <div className="container-x">
        <SectionHead index={5} label={whatIBuild.label} title={whatIBuild.title} accent={['build.']} id="projects-title" />

        <Stagger as="ul" className="border-t border-line" stagger={0.1} amount={0.2}>
          {whatIBuild.capabilities.map((c, i) => (
            <RevealItem
              as="li"
              key={c.title}
              className="group grid grid-cols-[auto_minmax(0,1fr)] items-center gap-x-5 gap-y-2 border-b border-line py-7 md:grid-cols-[5rem_minmax(0,1fr)_minmax(0,1fr)_auto] md:gap-x-8 md:py-9"
            >
              <span className="font-mono text-sm text-ash">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="text-[clamp(1.5rem,3.2vw,2.75rem)] leading-[1.05] font-bold transition-transform duration-500 group-hover:translate-x-2">
                {c.title}
              </h3>
              <p className="col-start-2 text-mist md:col-start-auto">{c.text}</p>
              <span className="hidden h-12 w-12 place-items-center rounded-full border border-line text-emerald transition-colors group-hover:border-emerald md:grid">
                <Icon name={c.icon} className="h-5 w-5" />
              </span>
            </RevealItem>
          ))}
        </Stagger>

        <Stagger as="ul" className="mt-16 grid gap-4 md:grid-cols-2 lg:gap-5" stagger={0.1} amount={0.1}>
          {whatIBuild.projects.map((p) => (
            <RevealItem as="li" key={p.id} className="min-w-0">
              <TiltCard innerClassName="flex h-full flex-col p-6 sm:p-8">
                <h3 className="text-[clamp(1.375rem,2.4vw,1.875rem)] leading-tight font-bold">{p.title}</h3>
                <p className="mt-3 text-mist">{p.summary}</p>
                {p.items && p.items.length > 0 && (
                  <ul className="mt-5 space-y-3 border-t border-line pt-5">
                    {p.items.map((item) => (
                      <li key={item.name} className="flex items-start justify-between gap-4">
                        <span className="min-w-0">
                          <span className="block font-medium text-bone">{item.name}</span>
                          <span className="block text-sm text-ash">{item.description}</span>
                        </span>
                        {item.github && (
                          <a
                            href={item.github}
                            {...externalLink}
                            className="icon-btn h-9 w-9 shrink-0"
                            aria-label={`${item.name} source code (opens in a new tab)`}
                          >
                            <GitHubIcon className="h-4 w-4" />
                          </a>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
                <ul className="mt-6 flex flex-wrap gap-2" aria-label={`${p.title} technologies`}>
                  {p.tags.map((t) => (
                    <li key={t} className="chip">
                      {t}
                    </li>
                  ))}
                </ul>
                {(p.github || p.live) && (
                  <div className="mt-auto flex flex-wrap gap-4 pt-7">
                    {p.github && (
                      <a
                        href={p.github}
                        {...externalLink}
                        className="link inline-flex items-center gap-2 text-sm font-medium"
                        data-cursor="Code"
                      >
                        <GitHubIcon className="h-4 w-4" />
                        {whatIBuild.sourceLabel}
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
                        {whatIBuild.liveLabel}
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
    </section>
  )
}
