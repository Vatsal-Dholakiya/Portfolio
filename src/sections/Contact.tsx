import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, m } from 'framer-motion'
import { Check, Copy, MapPin, Send } from 'lucide-react'
import { content } from '../data/content'
import { EASE } from '../lib/env'
import { GitHubIcon, LinkedInIcon, StackOverflowIcon } from '../components/ui/BrandIcons'
import { Magnetic } from '../components/ui/Magnetic'
import { Reveal } from '../components/ui/Reveal'

const external = { target: '_blank', rel: 'noopener noreferrer' } as const

export function Contact() {
  const { links } = content
  const [copied, setCopied] = useState(false)
  const timer = useRef<number | undefined>(undefined)
  useEffect(() => () => window.clearTimeout(timer.current), [])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(links.email)
    } catch {
      // Fallback for browsers or frames without the async clipboard
      const field = document.createElement('textarea')
      field.value = links.email
      field.setAttribute('readonly', '')
      field.style.position = 'fixed'
      field.style.opacity = '0'
      document.body.appendChild(field)
      field.select()
      document.execCommand('copy')
      field.remove()
    }
    setCopied(true)
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setCopied(false), 2200)
  }

  const [emailUser, emailDomain] = links.email.split('@')
  const details = [
    { label: 'GitHub', value: links.github.replace(/^https?:\/\//, ''), href: links.github, icon: <GitHubIcon className="h-4 w-4" /> },
    { label: 'Stack Overflow', value: 'stackoverflow.com/users/12660050', href: links.stackoverflow, icon: <StackOverflowIcon className="h-4 w-4" /> },
    { label: 'LinkedIn', value: links.linkedin.replace(/^https?:\/\/(www\.)?/, ''), href: links.linkedin, icon: <LinkedInIcon className="h-4 w-4" /> },
    { label: 'Location', value: content.location, href: '', icon: <MapPin className="h-4 w-4" aria-hidden="true" /> },
  ].filter((d) => d.value)

  return (
    <section id="contact" aria-labelledby="contact-title" tabIndex={-1} className="relative py-20 outline-none md:py-28">
      <div className="container-x">
        <Reveal className="relative overflow-hidden rounded-[1.75rem] border border-border bg-surface px-5 py-14 sm:px-10 md:px-16 md:py-20">
          <div aria-hidden="true" className="pointer-events-none absolute -left-24 -top-32 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(124,92,255,0.28),transparent_70%)]" />
          <div aria-hidden="true" className="pointer-events-none absolute -bottom-32 -right-20 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(34,211,238,0.16),transparent_70%)]" />

          <div className="relative">
            <p className="mono-label">07. Contact</p>
            <h2 id="contact-title" className="mt-3 max-w-3xl text-[clamp(2.25rem,6vw,4rem)] font-bold leading-[1.05] text-text">
              {content.contact.heading}
            </h2>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
              <a
                href={`mailto:${links.email}`}
                className="text-gradient w-fit min-w-0 font-display text-[clamp(1.125rem,5vw,2.5rem)] font-bold leading-tight"
              >
                {/* Allow a line break only before the @ on narrow screens */}
                {emailUser}
                <wbr />@{emailDomain}
              </a>
              <button
                type="button"
                onClick={copy}
                className="btn btn-outline w-fit min-h-11 px-4 py-2.5 font-sans text-[0.9375rem] font-medium"
                aria-label="Copy email address"
              >
                {copied ? <Check className="h-4 w-4 text-accent" aria-hidden="true" /> : <Copy className="h-4 w-4" aria-hidden="true" />}
                {copied ? 'Copied' : 'Copy'}
              </button>
            </div>

            <dl className={`mt-12 grid gap-x-8 gap-y-6 border-t border-border pt-10 sm:grid-cols-2 ${details.length === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'}`}>
              {details.map((d) => (
                <div key={d.label} className="min-w-0">
                  <dt className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.12em] text-muted">
                    <span className="text-primary-soft">{d.icon}</span>
                    {d.label}
                  </dt>
                  <dd className="mt-2 break-words text-[0.9375rem] text-text">
                    {d.href ? (
                      <a href={d.href} {...external} className="link text-text hover:text-primary-soft">
                        {d.value}
                        <span className="sr-only"> (opens in a new tab)</span>
                      </a>
                    ) : (
                      d.value
                    )}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-12">
              <Magnetic>
                <a href={`mailto:${links.email}`} className="btn btn-primary">
                  <Send className="h-5 w-5" aria-hidden="true" />
                  {content.contact.cta}
                </a>
              </Magnetic>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Toast */}
      <div aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-6 z-[90] flex justify-center px-4">
        <AnimatePresence>
          {copied && (
            <m.div
              key="toast"
              role="status"
              className="flex items-center gap-2 rounded-full border border-border-strong bg-surface-2 px-5 py-3 text-sm font-medium text-text shadow-[0_12px_40px_rgba(5,6,10,0.6)]"
              initial={{ opacity: 0, y: 24, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.97 }}
              transition={{ duration: 0.4, ease: EASE }}
            >
              <span className="bg-gradient grid h-5 w-5 place-items-center rounded-full text-on-gradient">
                <Check className="h-3.5 w-3.5" aria-hidden="true" />
              </span>
              Copied!
            </m.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
