import { useRef } from 'react'
import { useCountUp } from '../hooks/useCountUp'
import { profile, type Stat } from '../data/profile'
import { Icon } from '../components/Icon'
import { Section } from '../components/Section'

const badgeDot: Record<string, string> = { 'Silver badges': '#A9B1BE', 'Bronze badges': '#C38B5F' }

// 3 + 2 layout on wider screens, 2 + 1 + 2 on phones
const span = ['col-span-1 sm:col-span-2', 'col-span-1 sm:col-span-2', 'col-span-2', 'col-span-1 sm:col-span-3', 'col-span-1 sm:col-span-3']

function StatCard({ stat, className }: { stat: Stat; className: string }) {
  const num = useRef<HTMLSpanElement>(null)
  useCountUp(num, stat.value)
  return (
    <li className={`card p-5 md:p-6 ${className}`}>
      <p className="font-display text-[clamp(2.25rem,4.5vw,3rem)] font-extrabold leading-none tracking-tight tabular-nums">
        {stat.prefix}
        <span ref={num}>{stat.value}</span>
        {stat.suffix}
      </p>
      <p className="mt-3 flex items-center gap-2 font-display text-sm font-semibold text-muted">
        {badgeDot[stat.label] && (
          <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full" style={{ background: badgeDot[stat.label] }} />
        )}
        {stat.label}
      </p>
    </li>
  )
}

export function StackOverflow() {
  const so = profile.stackoverflow
  return (
    <Section id="stackoverflow" index="03" title="Stack Overflow">
      <p className="label mb-6 text-accent">{so.since}</p>
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-6 md:gap-4">
        {so.stats.map((s, i) => (
          <StatCard key={s.label} stat={s} className={span[i] ?? ''} />
        ))}
      </ul>
      <p data-reveal className="mt-8 text-lg text-muted">
        {so.note}
      </p>
      <a
        href={so.url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-flex items-center gap-2 font-display font-semibold text-accent link-underline"
      >
        <Icon name="stackoverflow" /> View my Stack Overflow profile <Icon name="arrow" className="h-3.5 w-3.5" />
      </a>
    </Section>
  )
}
