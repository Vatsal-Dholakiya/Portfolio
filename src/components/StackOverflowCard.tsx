import { ArrowUpRight } from 'lucide-react'
import { person, stackoverflow, type StackOverflowStats } from '../data/content'
import { externalLink } from '../lib/helpers'
import { useFetchWithCache } from '../hooks/useFetchWithCache'
import { StackOverflowIcon } from './ui/BrandIcons'
import { Counter } from './ui/Counter'
import { Reveal } from './ui/Reveal'

interface ApiResponse {
  items?: { reputation: number; badge_counts: { gold: number; silver: number; bronze: number } }[]
}

const parse = (json: unknown): StackOverflowStats => {
  const user = (json as ApiResponse).items?.[0]
  if (!user) throw new Error('User not found')
  return { reputation: user.reputation, ...user.badge_counts }
}

const badgeColour = { gold: '#E8B931', silver: '#B4B8BC', bronze: '#D1A684' } as const

export function StackOverflowCard() {
  const { state } = useFetchWithCache<StackOverflowStats>({
    key: 'so-user-v1',
    url: stackoverflow.api,
    parse,
    fallback: stackoverflow.fallback,
  })
  // Show the fallback figures while loading so the card never jumps
  const stats = state.status === 'loading' ? stackoverflow.fallback : state.data

  return (
    <Reveal as="article" className="card relative flex flex-col overflow-hidden p-6 sm:p-7 lg:mt-[5.25rem]">
      <div
        aria-hidden="true"
        className="absolute -top-20 -right-20 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(34,211,238,0.16),transparent_70%)]"
      />
      <div className="relative flex items-center gap-3">
        <span className="grid h-11 w-11 place-items-center rounded-xl border border-border bg-surface-2 text-[#F48024]">
          <StackOverflowIcon className="h-5 w-5" />
        </span>
        <h3 className="font-display text-xl font-semibold text-text">{stackoverflow.title}</h3>
      </div>
      <p className="relative mt-3 text-[0.9375rem] text-body">{stackoverflow.caption}</p>

      <dl className="relative mt-6" aria-busy={state.status === 'loading'}>
        <dt className="font-mono text-xs tracking-[0.12em] text-muted uppercase">{stackoverflow.reputationLabel}</dt>
        <dd className="mt-1">
          <Counter
            key={stats.reputation}
            value={stats.reputation}
            className="text-gradient font-display text-[2.75rem] leading-none font-bold"
          />
        </dd>
      </dl>
      <dl className="relative mt-6 grid grid-cols-3 gap-2">
        {(['gold', 'silver', 'bronze'] as const).map((b) => (
          <div key={b} className="rounded-xl border border-border bg-bg/60 px-3 py-3">
            <dt className="flex items-center gap-1.5 text-xs text-muted">
              <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full" style={{ background: badgeColour[b] }} />
              {stackoverflow.badgeLabels[b]}
            </dt>
            <dd className="mt-1 font-display text-2xl font-bold text-text">
              <Counter key={stats[b]} value={stats[b]} />
            </dd>
          </div>
        ))}
      </dl>

      <a href={person.links.stackoverflow} {...externalLink} className="btn btn-outline relative mt-7 w-full text-base">
        {stackoverflow.button}
        <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
        <span className="sr-only">(opens in a new tab)</span>
      </a>
    </Reveal>
  )
}
