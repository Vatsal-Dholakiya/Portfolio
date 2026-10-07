import { ArrowUpRight, CheckCheck, CircleAlert, ExternalLink, FolderGit2, RefreshCw, Star } from 'lucide-react'
import { content, type Project, type Repo } from '../data/content'
import { useGitHubRepos } from '../hooks/useGitHubRepos'
import { GitHubIcon } from '../components/ui/BrandIcons'
import { Counter } from '../components/ui/Counter'
import { Reveal, RevealItem, Stagger } from '../components/ui/Reveal'
import { SectionHeading } from '../components/ui/SectionHeading'
import { TiltCard } from '../components/ui/TiltCard'

const external = { target: '_blank', rel: 'noopener noreferrer' } as const

const languageColour: Record<string, string> = {
  Java: '#B07219',
  TypeScript: '#3178C6',
  JavaScript: '#F1E05A',
  Python: '#3572A5',
  Kotlin: '#A97BFF',
  HTML: '#E34C26',
  CSS: '#663399',
}

const rtf = new Intl.RelativeTimeFormat('en-GB', { numeric: 'auto' })
function timeAgo(iso: string) {
  const seconds = (new Date(iso).getTime() - Date.now()) / 1000
  const units: [Intl.RelativeTimeFormatUnit, number][] = [
    ['year', 31536000],
    ['month', 2592000],
    ['week', 604800],
    ['day', 86400],
    ['hour', 3600],
    ['minute', 60],
  ]
  for (const [unit, size] of units) if (Math.abs(seconds) >= size) return rtf.format(Math.round(seconds / size), unit)
  return 'just now'
}

function Tags({ tags, className = '' }: { tags: string[]; className?: string }) {
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
  if (!project.github && !project.live) return null
  return (
    <div className="flex flex-wrap gap-4">
      {project.github && (
        <a href={project.github} {...external} className="link inline-flex items-center gap-2 text-sm font-medium">
          <GitHubIcon className="h-4 w-4" /> Source code
          <span className="sr-only">for {project.title} (opens in a new tab)</span>
        </a>
      )}
      {project.live && (
        <a href={project.live} {...external} className="link inline-flex items-center gap-2 text-sm font-medium">
          <ExternalLink className="h-4 w-4" aria-hidden="true" /> Live site
          <span className="sr-only">for {project.title} (opens in a new tab)</span>
        </a>
      )}
    </div>
  )
}

function FeaturedProject({ project }: { project: Project }) {
  return (
    <TiltCard innerClassName="grid gap-8 p-6 sm:p-8 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] md:gap-10 md:p-10">
      <div className="flex min-w-0 flex-col justify-center">
        <p className="mono-label">Featured project</p>
        <h3 className="mt-3 text-[clamp(1.625rem,3vw,2.25rem)] font-bold leading-tight text-text">{project.title}</h3>
        <p className="mt-4 text-[1.0625rem] leading-relaxed text-muted">{project.description}</p>
        <div className="mt-6">
          <Tags tags={project.tags} />
        </div>
        <div className="mt-6">
          <ProjectLinks project={project} />
        </div>
      </div>

      {project.impact && (
        <div className="relative flex min-w-0 flex-col justify-between overflow-hidden rounded-2xl border border-border bg-bg p-6">
          <div aria-hidden="true" className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[radial-gradient(circle,rgba(124,92,255,0.3),transparent_70%)]" />
          <p className="relative">
            <Counter
              value={project.impact.value}
              prefix={project.impact.prefix}
              suffix={project.impact.suffix}
              className="text-gradient block font-display text-[clamp(3.5rem,8vw,5rem)] font-bold leading-none"
            />
            <span className="mt-3 block max-w-[16rem] text-sm text-muted">{project.impact.label}</span>
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
      )}
    </TiltCard>
  )
}

function ProjectCard({ project, wide = false }: { project: Project; wide?: boolean }) {
  if (wide) {
    return (
      <TiltCard innerClassName="grid gap-6 p-6 sm:p-8 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] md:items-center md:gap-10">
        <div className="flex min-w-0 gap-5">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-border bg-surface-2 text-primary-soft">
            <FolderGit2 className="h-5 w-5" aria-hidden="true" />
          </span>
          <div className="min-w-0">
            <h3 className="text-xl font-semibold text-text">{project.title}</h3>
            <p className="mt-2 text-[0.9875rem] leading-relaxed text-muted">{project.description}</p>
          </div>
        </div>
        <div className="flex min-w-0 flex-col gap-5 md:items-end">
          <Tags tags={project.tags} className="md:justify-end" />
          <ProjectLinks project={project} />
        </div>
      </TiltCard>
    )
  }
  return (
    <TiltCard innerClassName="flex h-full flex-col p-6 sm:p-8">
      <span className="grid h-11 w-11 place-items-center rounded-xl border border-border bg-surface-2 text-primary-soft">
        <FolderGit2 className="h-5 w-5" aria-hidden="true" />
      </span>
      <h3 className="mt-5 text-xl font-semibold text-text">{project.title}</h3>
      <p className="mt-3 flex-1 text-[0.9875rem] leading-relaxed text-muted">{project.description}</p>
      <div className="mt-6">
        <Tags tags={project.tags} />
      </div>
      <div className="mt-6">
        <ProjectLinks project={project} />
      </div>
    </TiltCard>
  )
}

function RepoCard({ repo }: { repo: Repo }) {
  return (
    <TiltCard innerClassName="flex h-full flex-col p-6">
      <div className="flex items-start justify-between gap-4">
        <h4 className="min-w-0 font-display text-lg font-semibold text-text">
          <a href={repo.url} {...external} className="break-words hover:text-primary-soft focus-visible:text-primary-soft">
            <span className="absolute inset-0 rounded-[1.25rem]" aria-hidden="true" />
            {repo.name}
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </h4>
        <ArrowUpRight className="h-5 w-5 shrink-0 text-muted transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
      </div>
      <p className="mt-2 flex-1 text-[0.9375rem] leading-relaxed text-muted">{repo.description || 'No description provided.'}</p>
      <p className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-xs text-muted">
        {repo.language && (
          <span className="inline-flex items-center gap-1.5">
            <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full" style={{ background: languageColour[repo.language] ?? '#9AA3B2' }} />
            {repo.language}
          </span>
        )}
        <span className="inline-flex items-center gap-1">
          <Star className="h-3.5 w-3.5" aria-hidden="true" />
          <span className="sr-only">Stars:</span> {repo.stars}
        </span>
        <span>Updated {timeAgo(repo.updated)}</span>
      </p>
    </TiltCard>
  )
}

function RepoSkeleton() {
  return (
    <li className="card skeleton h-[11.5rem] p-6" aria-hidden="true">
      <span className="block h-5 w-2/5 rounded-md bg-surface-2" />
      <span className="mt-4 block h-3.5 w-11/12 rounded-md bg-surface-2" />
      <span className="mt-2 block h-3.5 w-3/5 rounded-md bg-surface-2" />
      <span className="mt-9 block h-3 w-1/2 rounded-md bg-surface-2" />
    </li>
  )
}

function LatestOnGitHub() {
  const { state, retry } = useGitHubRepos()
  const skeletons = content.github.fallback.length

  return (
    <div className="mt-20">
      <Reveal className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="mono-label">Live from the GitHub API</p>
          <h3 className="mt-2 text-2xl font-bold text-text md:text-[1.75rem]">Latest on GitHub</h3>
        </div>
        <a href={content.links.github} {...external} className="link inline-flex items-center gap-2 text-sm font-medium">
          <GitHubIcon className="h-4 w-4" /> View all on GitHub
          <span className="sr-only">(opens in a new tab)</span>
        </a>
      </Reveal>

      {state.status === 'fallback' && (
        <div role="status" className="mb-6 flex flex-wrap items-center gap-3 rounded-xl border border-border bg-surface px-4 py-3 text-sm text-muted">
          <CircleAlert className="h-4 w-4 shrink-0 text-highlight" aria-hidden="true" />
          <span className="min-w-0 flex-1">{state.reason}. Showing a saved list instead.</span>
          <button type="button" onClick={retry} className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1 font-medium text-primary-soft hover:text-text">
            <RefreshCw className="h-3.5 w-3.5" aria-hidden="true" /> Try again
          </button>
        </div>
      )}

      <div aria-live="polite" aria-busy={state.status === 'loading'}>
        {state.status === 'loading' ? (
          <ul className="grid gap-4 md:grid-cols-2 lg:gap-5">
            {Array.from({ length: skeletons }, (_, i) => (
              <RepoSkeleton key={i} />
            ))}
            <li className="sr-only">Loading repositories from GitHub</li>
          </ul>
        ) : (
          <Stagger as="ul" className="grid gap-4 md:grid-cols-2 lg:gap-5" stagger={0.07} amount={0.1}>
            {state.repos.map((repo) => (
              <RevealItem as="li" key={repo.name}>
                <RepoCard repo={repo} />
              </RevealItem>
            ))}
          </Stagger>
        )}
      </div>
    </div>
  )
}

export function Projects() {
  const featured = content.projects.filter((p) => p.featured)
  const others = content.projects.filter((p) => !p.featured)
  return (
    <section id="projects" aria-labelledby="projects-title" tabIndex={-1} className="relative py-20 outline-none md:py-28">
      <div className="container-x">
        <SectionHeading index="04" title="Projects" id="projects-title" />
        <Stagger as="ul" className="grid gap-5 md:grid-cols-2" stagger={0.1} amount={0.1}>
          {featured.map((p) => (
            <RevealItem as="li" key={p.title} className="md:col-span-2">
              <FeaturedProject project={p} />
            </RevealItem>
          ))}
          {others.map((p, i) => {
            // A card left alone on the last row spans the full width with a horizontal layout
            const alone = others.length % 2 === 1 && i === others.length - 1
            return (
              <RevealItem as="li" key={p.title} className={alone ? 'md:col-span-2' : ''}>
                <ProjectCard project={p} wide={alone} />
              </RevealItem>
            )
          })}
        </Stagger>
        <LatestOnGitHub />
      </div>
    </section>
  )
}
