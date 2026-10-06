import type { ReactNode } from 'react'
import { RevealHeading } from './RevealHeading'

type Props = {
  id: string
  index: string
  title: string
  children: ReactNode
  /** Full-width content placed above the two-column grid (e.g. the skills marquee). */
  before?: ReactNode
  className?: string
}

/** Two columns on desktop (heading left, content right), one column on mobile. */
export function Section({ id, index, title, children, before, className = '' }: Props) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} tabIndex={-1} className={`scroll-mt-20 py-24 outline-none md:py-32 ${className}`}>
      {before}
      <div className="container-site grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-16">
        <div>
          <div className="lg:sticky lg:top-28">
            <p className="label mb-4 flex items-center gap-3" aria-hidden="true">
              <span className="text-accent">{index}</span>
              <span className="h-px w-10 bg-line" />
            </p>
            <RevealHeading
              id={`${id}-title`}
              text={title}
              className="font-display text-[clamp(2.25rem,5vw,3.5rem)] font-extrabold leading-[1.02] tracking-tight"
            />
          </div>
        </div>
        <div className="min-w-0">{children}</div>
      </div>
    </section>
  )
}
