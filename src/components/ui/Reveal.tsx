import type { ReactNode } from 'react'
import { m } from 'framer-motion'
import { fadeUp, stagger as staggerVariants } from '../../lib/animations'

type As = 'div' | 'li' | 'ul' | 'ol' | 'p' | 'article' | 'section'

/** Fades and slides content up 24px once, when 20% of it is visible. */
export function Reveal({
  children,
  className,
  as = 'div',
  delay = 0,
}: {
  children: ReactNode
  className?: string
  as?: As
  delay?: number
}) {
  const Tag = m[as]
  return (
    <Tag
      data-reveal
      className={className}
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      custom={delay}
    >
      {children}
    </Tag>
  )
}

/** Parent that staggers its RevealItem children. */
export function Stagger({
  children,
  className,
  as = 'div',
  stagger = 0.08,
  amount = 0.2,
}: {
  children: ReactNode
  className?: string
  as?: As
  stagger?: number
  amount?: number
}) {
  const Tag = m[as]
  return (
    <Tag className={className} initial="hidden" whileInView="show" viewport={{ once: true, amount }} variants={staggerVariants(stagger)}>
      {children}
    </Tag>
  )
}

export function RevealItem({ children, className, as = 'div' }: { children: ReactNode; className?: string; as?: As }) {
  const Tag = m[as]
  return (
    <Tag data-reveal className={className} variants={fadeUp}>
      {children}
    </Tag>
  )
}
