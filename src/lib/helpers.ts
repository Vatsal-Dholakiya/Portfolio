/** Props every external link gets. */
export const externalLink = { target: '_blank', rel: 'noopener noreferrer' } as const

export const isExternal = (href: string) => /^https?:\/\//.test(href)

/** Props for any link: external links open in a new tab, others stay in place. */
export const linkProps = (href: string) => (isExternal(href) ? externalLink : {})

/** mailto: link with an optional pre-filled subject. */
export const mailto = (email: string, subject?: string) => `mailto:${email}${subject ? `?subject=${encodeURIComponent(subject)}` : ''}`

/** Keeps only entries that have a usable value. */
export const present = <T extends { href: string }>(items: T[]) => items.filter((i) => i.href && i.href !== '#')

const rtf = new Intl.RelativeTimeFormat('en-GB', { numeric: 'auto' })
const units: [Intl.RelativeTimeFormatUnit, number][] = [
  ['year', 31536000],
  ['month', 2592000],
  ['week', 604800],
  ['day', 86400],
  ['hour', 3600],
  ['minute', 60],
]

/** "3 weeks ago" style relative time. */
export function timeAgo(iso: string, now = Date.now()) {
  const seconds = (new Date(iso).getTime() - now) / 1000
  for (const [unit, size] of units) if (Math.abs(seconds) >= size) return rtf.format(Math.round(seconds / size), unit)
  return 'just now'
}

const mq = (query: string) => typeof window !== 'undefined' && window.matchMedia(query).matches
export const prefersReducedMotion = () => mq('(prefers-reduced-motion: reduce)')
export const hasFinePointer = () => mq('(hover: hover) and (pointer: fine)')
