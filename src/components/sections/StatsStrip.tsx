import { stackoverflow, stats, type StackOverflowStats } from '../../data/content'
import { useFetchWithCache } from '../../hooks/useFetchWithCache'
import { Counter } from '../ui/Counter'
import { RevealItem, Stagger } from '../ui/Reveal'
import { parseStackOverflow } from '../../lib/stackoverflow'

/** Large numbers that count up once. Stats without a value are hidden; Stack Overflow reputation is live. */
export function StatsStrip() {
  const { state } = useFetchWithCache<StackOverflowStats>({
    key: 'so-user-v1',
    url: stackoverflow.api,
    parse: parseStackOverflow,
    fallback: stackoverflow.fallback,
  })
  const reputation = state.status === 'loading' ? stackoverflow.fallback.reputation : state.data.reputation
  const items = stats.items
    .filter((s) => s.value !== undefined)
    .map((s) => (s.live === 'stackoverflow-reputation' ? { ...s, value: reputation } : s))

  return (
    <section id="stats" aria-label={stats.label} className="relative border-y border-line bg-carbon/40">
      <div className="container-x">
        <Stagger as="ul" className="grid grid-cols-2 lg:grid-cols-5" stagger={0.08} amount={0.3}>
          {items.map((s, i) => (
            <RevealItem
              as="li"
              key={s.label}
              className={`min-w-0 border-line px-1 py-9 sm:px-4 md:py-12 lg:border-l lg:px-6 lg:first:border-l-0 lg:first:pl-0 ${
                i % 2 ? 'border-l pl-5 sm:pl-6' : ''
              } ${i >= 2 ? 'border-t lg:border-t-0' : ''}`}
            >
              <p className="font-display text-[clamp(2.25rem,4.5vw,3.5rem)] leading-none font-extrabold tracking-[-0.05em] text-bone">
                <Counter key={s.value} value={s.value!} prefix={s.prefix} suffix={s.suffix} />
              </p>
              <p className="mt-3 max-w-[14rem] text-[0.9375rem] leading-snug text-ash">{s.label}</p>
            </RevealItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
