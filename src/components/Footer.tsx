import { profile } from '../data/profile'
import { Icon, type IconName } from './Icon'

export function Footer() {
  const c = profile.contact
  const links: { icon: IconName; label: string; href: string }[] = [
    { icon: 'linkedin', label: 'LinkedIn', href: c.linkedin },
    { icon: 'github', label: 'GitHub', href: c.github },
    { icon: 'stackoverflow', label: 'Stack Overflow', href: c.stackoverflow },
    { icon: 'mail', label: 'Email', href: c.email && `mailto:${c.email}` },
  ].filter((l) => l.href) as { icon: IconName; label: string; href: string }[]

  return (
    <footer className="border-t border-line">
      <div className="container-site flex flex-col items-center justify-between gap-4 py-8 sm:flex-row">
        <p className="font-display text-sm font-semibold text-muted">{profile.footer}</p>
        <ul className="flex items-center gap-2">
          {links.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                aria-label={l.label}
                target={l.href.startsWith('http') ? '_blank' : undefined}
                rel={l.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="grid h-11 w-11 place-items-center rounded-full border border-line text-muted transition-colors hover:border-accent hover:text-accent"
              >
                <Icon name={l.icon} />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  )
}
