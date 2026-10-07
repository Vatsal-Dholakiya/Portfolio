import { useEffect, useState } from 'react'
import { m, type Variants } from 'framer-motion'
import { ArrowRight, Download, Mail, MapPin } from 'lucide-react'
import { asset, content } from '../data/content'
import { EASE } from '../lib/env'
import { introDone } from '../lib/intro'
import { Aurora } from '../components/Aurora'
import { GradientName } from '../components/GradientName'
import { RoleTyper } from '../components/RoleTyper'
import { GitHubIcon, LinkedInIcon, StackOverflowIcon } from '../components/ui/BrandIcons'
import { Magnetic } from '../components/ui/Magnetic'

const NAME_TIME = 0.55 // seconds after the name starts before the role line follows

const fade = (delay: number): Variants => ({
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE, delay } },
})

export function Hero() {
  const [play, setPlay] = useState(false)
  useEffect(() => {
    let alive = true
    introDone.then(() => alive && setPlay(true))
    return () => {
      alive = false
    }
  }, [])

  const { links } = content
  const socials = [
    { href: links.github, label: 'GitHub', icon: <GitHubIcon /> },
    { href: links.stackoverflow, label: 'Stack Overflow', icon: <StackOverflowIcon /> },
    { href: links.email && `mailto:${links.email}`, label: 'Email', icon: <Mail className="h-5 w-5" aria-hidden="true" /> },
    { href: links.linkedin, label: 'LinkedIn', icon: <LinkedInIcon /> },
  ].filter((s) => s.href)

  const state = play ? 'show' : 'hidden'

  return (
    <section id="top" aria-label="Introduction" className="relative flex min-h-[100svh] items-center overflow-hidden">
      <Aurora />

      <div className="container-x relative pb-28 pt-32">
        <m.p data-reveal className="mono-label text-[0.9375rem]" initial="hidden" animate={state} variants={fade(0)}>
          {content.hero.greeting}
        </m.p>

        <h1 className="mt-4 text-[clamp(2.5rem,7vw,5.5rem)] font-bold leading-[1.05] tracking-[-0.03em]">
          <GradientName text={`${content.name.first} ${content.name.last}`} play={play} />
        </h1>

        <m.p
          data-reveal
          className="mt-4 min-h-[1.3em] font-display text-[clamp(1.375rem,3.6vw,2.25rem)] font-semibold leading-tight text-muted"
          initial="hidden"
          animate={state}
          variants={fade(NAME_TIME)}
        >
          <RoleTyper roles={content.hero.roles} start={play} />
        </m.p>

        {/* Static on purpose: visible from the first paint (it is the page's largest text block) */}
        <p className="mt-6 max-w-[38rem] text-[1.0625rem] leading-relaxed text-body md:text-lg">{content.hero.intro}</p>

        <m.div
          data-reveal
          className="mt-10 flex flex-wrap gap-4"
          initial="hidden"
          animate={state}
          variants={fade(NAME_TIME + 0.2)}
        >
          <Magnetic>
            <a href="#projects" className="btn btn-primary">
              {content.hero.primaryCta}
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </a>
          </Magnetic>
          <Magnetic>
            <a href={asset(links.cv)} download className="btn btn-outline">
              <Download className="h-5 w-5" aria-hidden="true" />
              {content.hero.secondaryCta}
            </a>
          </Magnetic>
        </m.div>

        <m.div
          data-reveal
          className="mt-10 flex flex-wrap items-center gap-3"
          initial="hidden"
          animate={state}
          variants={fade(NAME_TIME + 0.3)}
        >
          <ul className="flex items-center gap-3" aria-label="Profiles">
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  aria-label={s.label}
                  className="icon-btn"
                  {...(s.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                >
                  {s.icon}
                </a>
              </li>
            ))}
          </ul>
          <span aria-hidden="true" className="mx-1 hidden h-6 w-px bg-border-strong sm:block" />
          <p className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-4 py-2 text-sm text-muted">
            <MapPin className="h-4 w-4 text-accent" aria-hidden="true" />
            {content.location}
          </p>
        </m.div>
      </div>

      <m.a
        href="#about"
        aria-label="Scroll to About"
        className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 sm:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: play ? 1 : 0 }}
        transition={{ duration: 0.8, delay: NAME_TIME + 0.6 }}
      >
        <span className="flex h-11 w-7 justify-center rounded-full border border-border-strong pt-2">
          <span className="scroll-dot block h-2 w-1 rounded-full bg-accent" />
        </span>
      </m.a>
    </section>
  )
}
