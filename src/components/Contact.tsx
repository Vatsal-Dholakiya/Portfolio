import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, m } from 'framer-motion'
import { Briefcase, Check, Copy, Download, Globe2, MapPin, Send } from 'lucide-react'
import { asset, contact, films, person } from '../data/content'
import { EASE } from '../lib/animations'
import { externalLink, mailto, prefersReducedMotion } from '../lib/helpers'
import { Toast } from './Toast'
import { Magnetic } from './ui/Magnetic'
import { Reveal } from './ui/Reveal'
import { useSplitReveal } from '../hooks/useSplitReveal'
import { Accented } from './ui/SectionHead'

const preferenceIcons = [MapPin, Globe2, Briefcase]

async function copyText(text: string) {
  try {
    // Some browsers leave the request pending (e.g. when the page is not focused); give up after 1 second
    await Promise.race([
      navigator.clipboard.writeText(text),
      new Promise((_, reject) => window.setTimeout(() => reject(new Error('Clipboard timeout')), 1000)),
    ])
  } catch {
    // Fallback for older browsers and restricted frames
    const field = document.createElement('textarea')
    field.value = text
    field.setAttribute('readonly', '')
    field.style.position = 'fixed'
    field.style.opacity = '0'
    document.body.appendChild(field)
    field.select()
    document.execCommand('copy')
    field.remove()
  }
}

/** Final call to action: kinetic heading, email with copy, the "compile" button that opens email, CV and preferences. */
export function Contact() {
  const { links } = person
  const [copied, setCopied] = useState(false)
  const [compiled, setCompiled] = useState(-1)
  const timers = useRef<number[]>([])
  const heading = useRef<HTMLHeadingElement>(null)
  useSplitReveal(heading)
  useEffect(() => () => timers.current.forEach((t) => window.clearTimeout(t)), [])

  const later = (fn: () => void, ms: number) => timers.current.push(window.setTimeout(fn, ms))

  const copy = async () => {
    await copyText(links.email)
    setCopied(true)
    later(() => setCopied(false), 2200)
  }

  const href = mailto(links.email, contact.mailSubject)
  // The link opens the email app itself (also inside sandboxed previews); the click plays a one-second build log
  const compile = () => {
    if (prefersReducedMotion() || compiled >= 0) return
    contact.compiling.forEach((_, i) => later(() => setCompiled(i), i * 380))
    later(() => setCompiled(-1), contact.compiling.length * 380 + 2500)
  }

  const [user, domain] = links.email.split('@')
  const backdrop = films.nextChapter.poster

  return (
    <section id="contact" aria-labelledby="contact-title" tabIndex={-1} className="relative overflow-hidden outline-none">
      {/* Background: the last frame of The Next Chapter, or an ember glow until it exists */}
      <div aria-hidden="true" className="absolute inset-0">
        {backdrop ? (
          <img src={asset(backdrop)} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover opacity-35" />
        ) : (
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_75%_30%,rgba(255,138,61,0.10),transparent_70%),radial-gradient(ellipse_50%_50%_at_15%_80%,rgba(46,230,166,0.08),transparent_70%)]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-void via-void/60 to-void" />
      </div>

      <div className="container-x section-y relative">
        <p className="label mb-8 flex items-center gap-3">
          <span className="text-emerald">07</span>
          <span className="h-px w-8 bg-line-strong" aria-hidden="true" />
          {contact.label}
        </p>
        <h2
          ref={heading}
          id="contact-title"
          className="max-w-[16ch] text-[clamp(2.25rem,5vw,4.25rem)] leading-[1.02] font-bold tracking-[-0.04em]"
        >
          <Accented text={contact.heading} words={[contact.accentWord]} />
        </h2>

        <div className="mt-14 grid gap-12 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:gap-16">
          <Reveal className="min-w-0">
            <p className="max-w-2xl text-lg text-mist md:text-xl">{contact.line}</p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
              <a
                href={mailto(links.email)}
                {...externalLink}
                className="w-fit min-w-0 font-display text-[clamp(1.25rem,4.6vw,2.5rem)] leading-tight font-semibold tracking-[-0.03em] text-bone underline decoration-emerald/40 decoration-1 underline-offset-[0.2em] transition-colors hover:text-emerald"
                data-cursor="Write"
              >
                {/* Allow a line break only before the @ on narrow screens */}
                {user}
                <wbr />@{domain}
              </a>
              <button
                type="button"
                onClick={copy}
                aria-label={contact.copyAria}
                className="btn btn-ghost min-h-11 w-fit px-4 py-2.5 text-[0.9375rem]"
                data-cursor="Copy"
              >
                {copied ? <Check className="h-4 w-4 text-emerald" aria-hidden="true" /> : <Copy className="h-4 w-4" aria-hidden="true" />}
                {copied ? contact.copied : contact.copy}
              </button>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Magnetic>
                <a href={href} {...externalLink} onClick={compile} className="btn btn-primary" data-cursor="Send">
                  <Send className="h-5 w-5" aria-hidden="true" />
                  {contact.cta}
                </a>
              </Magnetic>
              <Magnetic>
                <a href={asset(links.cv)} {...externalLink} className="btn btn-ghost" data-cursor="Save">
                  <Download className="h-5 w-5" aria-hidden="true" />
                  {contact.cvLabel}
                </a>
              </Magnetic>
            </div>

            {/* Compile log */}
            <div aria-live="polite" className="mt-5 min-h-[4.5rem] font-mono text-sm">
              <AnimatePresence>
                {compiled >= 0 &&
                  contact.compiling.slice(0, compiled + 1).map((line) => (
                    <m.p
                      key={line}
                      className="flex items-center gap-2 text-emerald"
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25, ease: EASE }}
                    >
                      <Check className="h-3.5 w-3.5" aria-hidden="true" />
                      {line}
                    </m.p>
                  ))}
              </AnimatePresence>
            </div>
          </Reveal>

          <Reveal as="article" className="card min-w-0 self-start p-6 sm:p-7" delay={0.1}>
            <h3 className="label text-mist">{contact.preferencesTitle}</h3>
            <ul className="mt-5 space-y-4">
              {contact.preferences.map((pref, i) => {
                const Icon = preferenceIcons[i] ?? Briefcase
                return (
                  <li key={pref} className="flex items-center gap-3 text-[0.9375rem] text-mist">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-line bg-graphite text-emerald">
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </span>
                    {pref}
                  </li>
                )
              })}
            </ul>
          </Reveal>
        </div>
      </div>
      <Toast show={copied} message={contact.copied} />
    </section>
  )
}
