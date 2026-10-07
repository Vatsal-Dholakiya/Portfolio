import { useEffect, useId, useState } from 'react'
import { AnimatePresence, m } from 'framer-motion'
import { CheckCheck, ChevronDown, ExternalLink, FolderGit2, Lock } from 'lucide-react'
import { projects, type Project } from '../data/content'
import { EASE } from '../lib/animations'
import { OPEN_PROJECT_EVENT } from '../lib/events'
import { externalLink } from '../lib/helpers'
import { GitHubRepos } from './GitHubRepos'
import { SectionTitle } from './SectionTitle'
import { StackOverflowCard } from './StackOverflowCard'
import { GitHubIcon } from './ui/BrandIcons'
import { Counter } from './ui/Counter'
import { RevealItem, Stagger } from './ui/Reveal'
import { TiltCard } from './ui/TiltCard'

export function Tags({ tags, className = '' }: { tags: string[]; className?: string }) {
  return (
    <ul className={`flex flex-wrap gap-2 ${className}`} aria-label="Technologies">
      {tags.map((t) => (
        <li key={t} className="chip">
          {t}
        </li>
      ))}
    </ul>
  )
}

function ProjectLinks({ project }: { project: Project }) {
  if (project.privateLabel) {
    return (
      <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-2 px-3 py-1.5 text-[0.8125rem] font-medium text-muted">
        <Lock className="h-3.5 w-3.5" aria-hidden="true" />
        {project.privateLabel}
      </span>
    )
  }
  if (!project.github && !project.live) return null
  return (
    <div className="flex flex-wrap gap-x-5 gap-y-2">
      {project.github && (
        <a href={project.github} {...externalLink} className="link inline-flex items-center gap-2 text-sm font-medium">
          <GitHubIcon className="h-4 w-4" /> {projects.sourceLabel}
          <span className="sr-only">: {project.title} (opens in a new tab)</span>
        </a>
      )}
      {project.live && (
        <a href={project.live} {...externalLink} className="link inline-flex items-center gap-2 text-sm font-medium">
          <ExternalLink className="h-4 w-4" aria-hidden="true" /> {projects.liveLabel}
          <span className="sr-only">: {project.title} (opens in a new tab)</span>
        </a>
      )}
    </div>
  )
}

function FeaturedProject() {
  const p = projects.featured
  const [open, setOpen] = useState(false)
  const panelId = `features-${useId().replace(/[^a-zA-Z0-9]/g, '')}`

  // "See project →" in Experience opens the features
  useEffect(() => {
    const onOpen = (e: Event) => (e as CustomEvent<string>).detail === p.id && setOpen(true)
    window.addEventListener(OPEN_PROJECT_EVENT, onOpen)
    return () => window.removeEventListener(OPEN_PROJECT_EVENT, onOpen)
  }, [p.id])

  return (
    <article id={p.id} className="scroll-mt-[calc(var(--nav-h)+1rem)]" aria-labelledby={`${p.id}-title`}>
      <TiltCard innerClassName="p-6 sm:p-8 md:p-10">
        <div className="grid gap-8 md:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] md:gap-10">
          <div className="flex min-w-0 flex-col justify-center">
            <p className="mono-label">{projects.featuredLabel}</p>
            <h3 id={`${p.id}-title`} className="mt-3 text-[clamp(1.625rem,3vw,2.25rem)] leading-tight font-bold text-text">
              {p.title}
            </h3>
            <p className="mt-4 text-[1.0625rem] leading-relaxed text-body">{p.summary}</p>
            <Tags tags={p.tags} className="mt-6" />
            <div className="mt-6">
              <ProjectLinks project={p} />
            </div>
          </div>

          <div className="relative flex min-w-0 flex-col justify-between overflow-hidden rounded-2xl border border-border bg-bg p-6">
            <div
              aria-hidden="true"
              className="absolute -top-16 -right-16 h-48 w-48 rounded-full bg-[radial-gradient(circle,rgba(124,92,255,0.3),transparent_70%)]"
            />
            <p className="relative">
              <Counter
                value={projects.impact.value}
                prefix={projects.impact.prefix}
                suffix={projects.impact.suffix}
                className="text-gradient block font-display text-[clamp(3.5rem,8vw,5rem)] leading-none font-bold"
              />
              <span className="mt-3 block max-w-[16rem] text-sm text-muted">{projects.impact.label}</span>
            </p>
            {/* Decorative: queued messages being sent automatically */}
            <ul aria-hidden="true" className="relative mt-8 space-y-2.5">
              {[78, 62, 70].map((w, i) => (
                <li key={i} className="flex items-center gap-3 rounded-xl border border-border bg-surface px-3 py-2.5">
                  <span className="h-6 w-6 shrink-0 rounded-full bg-surface-2" />
                  <span className="h-2 rounded-full bg-surface-2" style={{ width: `${w}%` }} />
                  <CheckCheck className="ml-auto h-4 w-4 shrink-0 text-accent" />
                </li>
              ))}
            </ul>
          </div>
        </div>

        {p.features && p.features.length > 0 && (
          <div className="mt-8 border-t border-border pt-6">
            <button
              type="button"
              aria-expanded={open}
              aria-controls={panelId}
              onClick={() => setOpen((o) => !o)}
              className="flex w-full items-center justify-between gap-4 rounded-xl text-left"
            >
              <span className="font-display text-lg font-semibold text-text">{projects.featuresLabel}</span>
              <span className="inline-flex items-center gap-2 text-sm font-medium text-primary-soft">
                {open ? projects.hideFeatures : projects.showFeatures}
                <ChevronDown
                  className={`h-5 w-5 transition-transform duration-500 ease-out-expo ${open ? 'rotate-180' : ''}`}
                  aria-hidden="true"
                />
              </span>
            </button>
            {/* Height changes instantly; only opacity and transform animate */}
            <AnimatePresence initial={false}>
              {open && (
                <m.ul
                  id={panelId}
                  key="features"
                  className="mt-5 grid gap-3 md:grid-cols-2"
                  initial="hidden"
                  animate="show"
                  exit={{ opacity: 0, transition: { duration: 0.2 } }}
                  variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
                >
                  {p.features.map((f) => (
                    <m.li
                      key={f}
                      variants={{
                        hidden: { opacity: 0, y: 12 },
                        show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } },
                      }}
                      className="flex gap-3 rounded-xl border border-border bg-bg/60 p-4 text-[0.9375rem] leading-relaxed text-body"
                    >
                      <CheckCheck className="mt-1 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                      {f}
                    </m.li>
                  ))}
                </m.ul>
              )}
            </AnimatePresence>
          </div>
        )}
      </TiltCard>
    </article>
  )
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <TiltCard innerClassName="flex h-full flex-col p-6 sm:p-8">
      <span className="grid h-11 w-11 place-items-center rounded-xl border border-border bg-surface-2 text-primary-soft">
        <FolderGit2 className="h-5 w-5" aria-hidden="true" />
      </span>
      <h3 className="mt-5 text-xl font-semibold text-text">{project.title}</h3>
      <p className="mt-3 text-[0.9875rem] leading-relaxed text-body">{project.summary}</p>
      {project.items && project.items.length > 0 && (
        <ul className="mt-4 space-y-2">
          {project.items.map((item) => (
            <li key={item.name} className="text-[0.9375rem] text-body">
              {item.github ? (
                <a href={item.github} {...externalLink} className="link font-medium">
                  {item.name}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              ) : (
                <span className="font-medium text-text">{item.name}</span>
              )}
              {item.description && <span className="text-muted"> — {item.description}</span>}
            </li>
          ))}
        </ul>
      )}
      <div className="mt-auto pt-6">
        <Tags tags={project.tags} />
        <div className="mt-5 empty:hidden">
          <ProjectLinks project={project} />
        </div>
      </div>
    </TiltCard>
  )
}

export function Projects() {
  return (
    <section id="projects" aria-labelledby="projects-title" tabIndex={-1} className="section-y relative outline-none">
      <div className="container-x">
        <SectionTitle index={4} title={projects.title} id="projects-title" />
        <FeaturedProject />
        <Stagger as="ul" className="mt-5 grid gap-5 md:grid-cols-2" stagger={0.1} amount={0.1}>
          {projects.others.map((p) => (
            <RevealItem as="li" key={p.id} className="min-w-0">
              <ProjectCard project={p} />
            </RevealItem>
          ))}
        </Stagger>

        <div className="mt-20 grid gap-5 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] lg:items-start">
          <GitHubRepos />
          <StackOverflowCard />
        </div>
      </div>
    </section>
  )
}
