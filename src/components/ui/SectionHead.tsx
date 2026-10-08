import { useRef, type ReactNode } from 'react'
import { useSplitReveal } from '../../hooks/useSplitReveal'

/** Renders `text`, setting the listed words in the serif italic accent. */
export function Accented({ text, words = [], className = 'text-emerald' }: { text: string; words?: string[]; className?: string }) {
  if (!words.length) return text
  return text.split(' ').map((word, i) => (
    <span key={i}>
      {i > 0 && ' '}
      {words.includes(word) ? <span className={`accent ${className}`}>{word}</span> : word}
    </span>
  ))
}

/** Section label ("02 — Mission") and a huge kinetic title. */
export function SectionHead({
  index,
  label,
  title,
  accent,
  id,
  children,
  className = '',
  tone = 'emerald',
}: {
  index: number
  label: string
  title: string
  accent?: string[]
  id: string
  children?: ReactNode
  className?: string
  tone?: 'emerald' | 'ember'
}) {
  const ref = useRef<HTMLHeadingElement>(null)
  useSplitReveal(ref)
  return (
    <div className={`mb-12 md:mb-16 ${className}`}>
      <p className="label mb-6 flex items-center gap-3">
        <span className={tone === 'ember' ? 'text-ember' : 'text-emerald'}>{String(index).padStart(2, '0')}</span>
        <span className="h-px w-8 bg-line-strong" aria-hidden="true" />
        {label}
      </p>
      <h2 ref={ref} id={id} className="max-w-[22ch] text-[clamp(2rem,4.2vw,3.5rem)] leading-[1.05] font-bold tracking-[-0.035em]">
        <Accented text={title} words={accent} className={tone === 'ember' ? 'text-ember' : 'text-emerald'} />
      </h2>
      {children}
    </div>
  )
}
