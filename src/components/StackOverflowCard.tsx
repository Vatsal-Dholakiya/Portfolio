import { ArrowUpRight } from 'lucide-react'
import { person, stackoverflow, type StackOverflowStats } from '../data/content'
import { parseStackOverflow } from '../lib/stackoverflow'
import { externalLink } from '../lib/helpers'
import { useFetchWithCache } from '../hooks/useFetchWithCache'
import { StackOverflowIcon } from './ui/BrandIcons'
import { Counter } from './ui/Counter'
import { Reveal } from './ui/Reveal'

const badgeColour = { gold: '#E8B931', silver: '#B4B8BC', bronze: '#D1A684' } as const

export function StackOverflowCard() {
  const { state } = useFetchWithCache<StackOverflowStats>({
    key: 'so-user-v1',
    url: stackoverflow.api,
    parse: parseStackOverflow,
    fallback: stackoverflow.fallback,
  })
  // Show the fallback figures while loading so the card never jumps
  const stats = state.status === 'loading' ? stackoverflow.fallback : state.data

  return (
    <Reveal as="article" className="card relative flex flex-col overflow-hidden p-6 sm:p-7">
      <div
        aria-hidden="true"
        className="absolute -top-20 -right-20 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(46,230,166,0.12),transparent_70%)]"
      />
      <div className="relative flex items-center gap-3">
        <span className="grid h-11 w-11 place-items-center rounded-xl border border-line bg-graphite text-[#F48024]">
          <StackOverflowIcon className="h-5 w-5" />
        </span>
        <h3 className="font-display text-xl font-semibold text-bone">{stackoverflow.title}</h3>
      </div>
      <p className="relative mt-3 text-[0.9375rem] text-mist">{stackoverflow.caption}</p>

      <dl className="relative mt-6" aria-busy={state.status === 'loading'}>
        <dt className="font-mono text-xs tracking-[0.12em] text-ash uppercase">{stackoverflow.reputationLabel}</dt>
        <dd className="mt-1">
          <Counter
            key={stats.reputation}
            value={stats.reputation}
            className="font-display text-[3.25rem] leading-none font-extrabold tracking-[-0.04em] text-bone"
          />
        </dd>
      </dl>
      <dl className="relative mt-6 grid grid-cols-3 gap-2">
        {(['gold', 'silver', 'bronze'] as const).map((b) => (
          <div key={b} className="rounded-xl border border-line bg-void/60 px-3 py-3">
            <dt className="flex items-center gap-1.5 text-xs text-ash">
              <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full" style={{ background: badgeColour[b] }} />
              {stackoverflow.badgeLabels[b]}
            </dt>
            <dd className="mt-1 font-display text-2xl font-extrabold text-bone">
              <Counter key={stats[b]} value={stats[b]} />
            </dd>
          </div>
        ))}
      </dl>

      <a href={person.links.stackoverflow} {...externalLink} className="btn btn-ghost relative mt-7 w-full text-base">
        {stackoverflow.button}
        <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
        <span className="sr-only">(opens in a new tab)</span>
      </a>
    </Reveal>
  )
}
