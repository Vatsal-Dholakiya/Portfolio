import { useEffect, useRef, useState } from 'react'
import { Briefcase, Check, Copy, Globe2, MapPin, Send } from 'lucide-react'
import { contact, person } from '../data/content'
import { linkProps, mailto, present } from '../lib/helpers'
import { Toast } from './Toast'
import { GitHubIcon, LinkedInIcon, StackOverflowIcon } from './ui/BrandIcons'
import { Magnetic } from './ui/Magnetic'
import { Reveal } from './ui/Reveal'

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

export function Contact() {
  const { links } = person
  const [copied, setCopied] = useState(false)
  const timer = useRef<number | undefined>(undefined)
  useEffect(() => () => window.clearTimeout(timer.current), [])

  const copy = async () => {
    await copyText(links.email)
    setCopied(true)
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setCopied(false), 2200)
  }

  const [user, domain] = links.email.split('@')
  const socials = present([
    { label: 'GitHub', href: links.github, icon: <GitHubIcon className="h-4 w-4" /> },
    { label: 'Stack Overflow', href: links.stackoverflow, icon: <StackOverflowIcon className="h-4 w-4" /> },
    { label: 'LinkedIn', href: links.linkedin, icon: <LinkedInIcon className="h-4 w-4" /> },
  ])

  return (
    <section id="contact" aria-labelledby="contact-title" tabIndex={-1} className="section-y relative outline-none">
      <div className="container-x">
        <Reveal className="relative overflow-hidden rounded-[1.75rem] border border-border bg-surface px-5 py-14 sm:px-10 md:px-14 md:py-16">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-32 -left-24 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(124,92,255,0.28),transparent_70%)]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-20 -bottom-32 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(34,211,238,0.16),transparent_70%)]"
          />

          <div className="relative grid gap-12 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:gap-14">
            <div className="min-w-0">
              <p className="mono-label">07. {contact.kicker}</p>
              <h2 id="contact-title" className="mt-3 max-w-3xl text-[clamp(2.25rem,5.5vw,3.75rem)] leading-[1.05] font-bold text-text">
                {contact.heading}
              </h2>
              <p className="mt-5 text-lg text-body">{contact.line}</p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
                <a
                  href={mailto(links.email)}
                  className="text-gradient w-fit min-w-0 font-display text-[clamp(1.125rem,4.4vw,2.25rem)] leading-tight font-bold"
                >
                  {/* Allow a line break only before the @ on narrow screens */}
                  {user}
                  <wbr />@{domain}
                </a>
                <button
                  type="button"
                  onClick={copy}
                  aria-label={contact.copyAria}
                  className="btn btn-outline min-h-11 w-fit px-4 py-2.5 font-sans text-[0.9375rem] font-medium"
                >
                  {copied ? <Check className="h-4 w-4 text-accent" aria-hidden="true" /> : <Copy className="h-4 w-4" aria-hidden="true" />}
                  {copied ? contact.copied : contact.copy}
                </button>
              </div>

              {socials.length > 0 && (
                <ul className="mt-8 flex flex-wrap gap-3" aria-label="Profiles">
                  {socials.map((s) => (
                    <li key={s.label}>
                      <a
                        href={s.href}
                        {...linkProps(s.href)}
                        className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface-2 px-4 py-2.5 text-sm font-medium text-text transition-colors hover:border-primary-soft"
                      >
                        <span className="text-primary-soft">{s.icon}</span>
                        {s.label}
                        <span className="sr-only">(opens in a new tab)</span>
                      </a>
                    </li>
                  ))}
                </ul>
              )}

              <div className="mt-10">
                <Magnetic>
                  <a href={mailto(links.email, contact.mailSubject)} className="btn btn-primary">
                    <Send className="h-5 w-5" aria-hidden="true" />
                    {contact.sayHello}
                  </a>
                </Magnetic>
              </div>
            </div>

            <aside className="min-w-0 self-start rounded-2xl border border-border bg-bg/60 p-6 sm:p-7" aria-labelledby="prefs-title">
              <h3 id="prefs-title" className="font-display text-lg font-semibold text-text">
                {contact.preferencesTitle}
              </h3>
              <ul className="mt-5 space-y-4">
                {contact.preferences.map((pref, i) => {
                  const Icon = preferenceIcons[i] ?? Briefcase
                  return (
                    <li key={pref} className="flex items-center gap-3 text-[0.9375rem] text-body">
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-border bg-surface-2 text-primary-soft">
                        <Icon className="h-4 w-4" aria-hidden="true" />
                      </span>
                      {pref}
                    </li>
                  )
                })}
              </ul>
            </aside>
          </div>
        </Reveal>
      </div>
      <Toast show={copied} message={contact.copied} />
    </section>
  )
}
