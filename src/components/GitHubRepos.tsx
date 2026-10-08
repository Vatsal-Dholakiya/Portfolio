import { ArrowRight, ArrowUpRight, CircleAlert, RefreshCw, Star } from 'lucide-react'
import { github, person, type Repo } from '../data/content'
import { externalLink, timeAgo } from '../lib/helpers'
import { useFetchWithCache } from '../hooks/useFetchWithCache'
import { GitHubIcon } from './ui/BrandIcons'
import { Reveal, RevealItem, Stagger } from './ui/Reveal'
import { TiltCard } from './ui/TiltCard'

const languageColour: Record<string, string> = {
  Java: '#B07219',
  Kotlin: '#A97BFF',
  TypeScript: '#3178C6',
  JavaScript: '#F1E05A',
  Python: '#3572A5',
  HTML: '#E34C26',
  CSS: '#663399',
}

interface ApiRepo {
  name: string
  description: string | null
  language: string | null
  stargazers_count: number
  pushed_at: string
  html_url: string
  fork: boolean
}

const parse = (json: unknown): Repo[] => {
  if (!Array.isArray(json)) throw new Error('Unexpected response')
  return (json as ApiRepo[])
    .filter((r) => !r.fork && !github.hide.includes(r.name))
    .slice(0, 6)
    .map((r) => ({
      name: r.name,
      description: r.description ?? '',
      language: r.language,
      stars: r.stargazers_count,
      updated: r.pushed_at,
      url: r.html_url,
    }))
}

function RepoCard({ repo }: { repo: Repo }) {
  const description = repo.description || github.descriptions[repo.name] || github.noDescription
  return (
    <TiltCard innerClassName="flex h-full flex-col p-6">
      <div className="flex items-start justify-between gap-4">
        <h4 className="min-w-0 font-display text-lg font-semibold text-bone">
          <a href={repo.url} {...externalLink} className="break-words hover:text-emerald focus-visible:text-emerald">
            {/* Stretched link: the whole card is clickable */}
            <span className="absolute inset-0 rounded-2xl" aria-hidden="true" />
            {repo.name}
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </h4>
        <ArrowUpRight
          className="h-5 w-5 shrink-0 text-ash transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          aria-hidden="true"
        />
      </div>
      <p className="mt-2 flex-1 text-[0.9375rem] leading-relaxed text-mist">{description}</p>
      <p className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-xs text-ash">
        {repo.language && (
          <span className="inline-flex items-center gap-1.5">
            <span
              aria-hidden="true"
              className="h-2.5 w-2.5 rounded-full"
              style={{ background: languageColour[repo.language] ?? '#9AA3B2' }}
            />
            {repo.language}
          </span>
        )}
        <span className="inline-flex items-center gap-1">
          <Star className="h-3.5 w-3.5" aria-hidden="true" />
          <span className="sr-only">{github.starsLabel}:</span> {repo.stars}
        </span>
        <span>
          {github.updatedLabel} {timeAgo(repo.updated)}
        </span>
      </p>
    </TiltCard>
  )
}

function Skeleton() {
  return (
    <li className="card skeleton h-[11.5rem] p-6" aria-hidden="true">
      <span className="block h-5 w-2/5 rounded-md bg-graphite" />
      <span className="mt-4 block h-3.5 w-11/12 rounded-md bg-graphite" />
      <span className="mt-2 block h-3.5 w-3/5 rounded-md bg-graphite" />
      <span className="mt-9 block h-3 w-1/2 rounded-md bg-graphite" />
    </li>
  )
}

export function GitHubRepos() {
  const { state, retry } = useFetchWithCache<Repo[]>({ key: 'gh-repos-v2', url: github.api, parse, fallback: github.fallback })

  return (
    <div className="min-w-0">
      <Reveal className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="label">{github.kicker}</p>
          <h3 className="mt-2 text-2xl font-bold text-bone md:text-[1.75rem]">{github.title}</h3>
        </div>
        <a href={person.links.githubRepos} {...externalLink} className="link inline-flex items-center gap-2 text-sm font-medium">
          <GitHubIcon className="h-4 w-4" />
          {github.viewAll}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
          <span className="sr-only">(opens in a new tab)</span>
        </a>
      </Reveal>

      {state.status === 'fallback' && (
        <div
          role="status"
          className="mb-6 flex flex-wrap items-center gap-3 rounded-xl border border-line bg-carbon px-4 py-3 text-sm text-ash"
        >
          <CircleAlert className="h-4 w-4 shrink-0 text-emerald" aria-hidden="true" />
          <span className="min-w-0 flex-1">{github.errorMessage}</span>
          <button
            type="button"
            onClick={retry}
            className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1 font-medium text-emerald hover:text-bone"
          >
            <RefreshCw className="h-3.5 w-3.5" aria-hidden="true" /> {github.retry}
          </button>
        </div>
      )}

      <div aria-live="polite" aria-busy={state.status === 'loading'}>
        {state.status === 'loading' ? (
          <ul className="grid gap-4 md:grid-cols-2">
            {github.fallback.map((r) => (
              <Skeleton key={r.name} />
            ))}
            <li className="sr-only">{github.loading}</li>
          </ul>
        ) : (
          <Stagger as="ul" className="grid gap-4 md:grid-cols-2" stagger={0.07} amount={0.1}>
            {state.data.map((repo) => (
              <RevealItem as="li" key={repo.name} className="min-w-0">
                <RepoCard repo={repo} />
              </RevealItem>
            ))}
          </Stagger>
        )}
      </div>
    </div>
  )
}
