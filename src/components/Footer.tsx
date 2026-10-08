import { useEffect, useState } from 'react'
import { ArrowUp, Mail } from 'lucide-react'
import { footer, person } from '../data/content'
import { linkProps, mailto, present } from '../lib/helpers'
import { GitHubIcon, LinkedInIcon, StackOverflowIcon } from './ui/BrandIcons'

function useLocalTime() {
  const [time, setTime] = useState('')
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: person.timeZone })
    const update = () => setTime(fmt.format(new Date()))
    const first = window.setTimeout(update, 0)
    const id = window.setInterval(update, 15_000)
    return () => {
      window.clearTimeout(first)
      window.clearInterval(id)
    }
  }, [])
  return time
}

export function Footer() {
  const { links } = person
  const time = useLocalTime()
  const socials = present([
    { href: links.github, label: 'GitHub', icon: <GitHubIcon className="h-[18px] w-[18px]" /> },
    { href: links.stackoverflow, label: 'Stack Overflow', icon: <StackOverflowIcon className="h-[18px] w-[18px]" /> },
    { href: links.linkedin, label: 'LinkedIn', icon: <LinkedInIcon className="h-[18px] w-[18px]" /> },
    { href: links.email && mailto(links.email), label: 'Email', icon: <Mail className="h-[18px] w-[18px]" aria-hidden="true" /> },
  ])

  return (
    <footer className="relative overflow-hidden border-t border-line">
      <div className="container-x relative z-10 flex flex-col gap-8 pt-12 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <p className="text-sm text-mist">
            {footer.credit} · <span suppressHydrationWarning>{new Date().getFullYear()}</span>
          </p>
          <p className="label">
            {footer.localTime} <span className="tabular-nums text-mist">{time || '--:--'}</span>
            <span className="hidden md:inline"> · {footer.terminalHint}</span>
          </p>
        </div>
        <div className="flex items-center gap-3">
          <ul className="flex items-center gap-2" aria-label="Profiles">
            {socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} aria-label={s.label} className="icon-btn h-10 w-10" {...linkProps(s.href)}>
                  {s.icon}
                </a>
              </li>
            ))}
          </ul>
          <span aria-hidden="true" className="h-6 w-px bg-line-strong" />
          <a href="#home" className="icon-btn inline-flex h-10 w-auto items-center gap-2 px-3.5 text-sm font-medium">
            <ArrowUp className="h-4 w-4" aria-hidden="true" />
            {footer.backToTop}
          </a>
        </div>
      </div>
      {/* Oversized outlined wordmark, cut off by the bottom edge */}
      <p
        aria-hidden="true"
        className="text-outline pointer-events-none -mb-[0.18em] mt-6 text-center font-display text-[15vw] leading-[0.85] font-extrabold tracking-[-0.06em] uppercase select-none"
      >
        {person.lastName}
      </p>
    </footer>
  )
}
