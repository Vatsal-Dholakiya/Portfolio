import { ArrowDownRight, Download, Mail } from 'lucide-react'
import { asset, films, hero, person } from '../../data/content'
import { externalLink, linkProps, mailto, present } from '../../lib/helpers'
import { FilmVideo } from '../film/FilmVideo'
import { GitHubIcon, LinkedInIcon, StackOverflowIcon } from '../ui/BrandIcons'
import { Magnetic } from '../ui/Magnetic'

/** The fully assembled hero: name, promise, actions — over the Hero Orbit film (or the studio light until it exists). */
export function FinalHero() {
  const { links } = person
  const socials = present([
    { href: links.github, label: 'GitHub', icon: <GitHubIcon className="h-[18px] w-[18px]" /> },
    { href: links.stackoverflow, label: 'Stack Overflow', icon: <StackOverflowIcon className="h-[18px] w-[18px]" /> },
    { href: links.linkedin, label: 'LinkedIn', icon: <LinkedInIcon className="h-[18px] w-[18px]" /> },
    { href: links.email && mailto(links.email), label: 'Email', icon: <Mail className="h-[18px] w-[18px]" aria-hidden="true" /> },
  ])

  return (
    <div data-final-hero className="relative min-h-[100svh] overflow-hidden">
      {/* Background: the Hero Orbit film, or an emerald studio light sweeping in the void */}
      <div aria-hidden="true" className="absolute inset-0">
        {films.orbit.src ? (
          <FilmVideo film={films.orbit} mode="loop" className="h-full w-full object-cover opacity-70" />
        ) : (
          <>
            <div className="studio-light absolute inset-0" />
            <div className="orbit-light absolute top-1/2 left-1/2 h-[140vmax] w-[140vmax] -translate-x-1/2 -translate-y-1/2 bg-[conic-gradient(from_0deg,transparent_0deg,rgba(46,230,166,0.10)_40deg,transparent_90deg,transparent_200deg,rgba(255,138,61,0.05)_230deg,transparent_270deg)]" />
          </>
        )}
        <div className="vignette absolute inset-0" />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-b from-transparent to-void" />
      </div>

      <div className="container-x relative flex min-h-[100svh] flex-col justify-center pt-[calc(var(--nav-h)+3rem)] pb-[clamp(2.5rem,7vh,4.5rem)]">
        <p data-hero-item className="label mb-5 flex items-center gap-3 text-mist">
          <span className="h-px w-8 bg-emerald" aria-hidden="true" />
          {hero.kicker}
        </p>
        <h1 className="font-display text-[clamp(2.75rem,7vw,6.25rem)] leading-[0.98] font-semibold tracking-[-0.045em]">
          <span className="sr-only">{`${person.firstName} ${person.lastName}`}</span>
          <span aria-hidden="true" data-hero-name className="block">
            <span className="block overflow-hidden pb-[0.06em]">
              <span data-hero-line className="block text-bone">
                {person.firstName}
              </span>
            </span>
            <span className="block overflow-hidden pb-[0.06em]">
              <span data-hero-line className="block text-mist">
                {person.lastName}
              </span>
            </span>
          </span>
        </h1>

        <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:items-end">
          <p data-hero-item className="max-w-[36rem] text-[clamp(1.0625rem,1.4vw,1.25rem)] leading-relaxed text-mist">
            {hero.line}
          </p>
          <div data-hero-item className="flex flex-wrap items-center gap-3 lg:justify-end">
            <Magnetic>
              <a href="#projects" className="btn btn-primary" data-cursor="View">
                {hero.primaryCta}
                <ArrowDownRight className="h-5 w-5" aria-hidden="true" />
              </a>
            </Magnetic>
            <Magnetic>
              <a href={asset(links.cv)} {...externalLink} className="btn btn-ghost" data-cursor="Save">
                <Download className="h-5 w-5" aria-hidden="true" />
                {hero.secondaryCta}
              </a>
            </Magnetic>
          </div>
        </div>

        <div data-hero-item className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
          <div className="flex flex-wrap items-center gap-3">
            <p className="inline-flex items-center gap-2.5 rounded-full border border-emerald/25 bg-emerald/10 px-3.5 py-1.5 text-sm font-medium text-bone">
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="pulse-dot absolute inset-0 rounded-full bg-emerald" />
                <span className="relative h-2 w-2 rounded-full bg-emerald" />
              </span>
              {hero.availability}
            </p>
            <ul className="flex items-center gap-2" aria-label="Profiles">
              {socials.map((s) => (
                <li key={s.label}>
                  <a href={s.href} aria-label={s.label} className="icon-btn h-10 w-10" {...linkProps(s.href)}>
                    {s.icon}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <p className="label hidden items-center gap-2 sm:flex">
            {hero.scrollCue}
            <span className="inline-block h-6 w-px bg-gradient-to-b from-emerald to-transparent" aria-hidden="true" />
          </p>
        </div>
      </div>
    </div>
  )
}
