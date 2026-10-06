import { useRef, useState } from 'react'
import { AnimatePresence, m } from 'motion/react'
import { asset, profile } from '../data/profile'
import { Icon, type IconName } from '../components/Icon'
import { Magnetic } from '../components/Magnetic'
import { RevealHeading } from '../components/RevealHeading'

export function Contact() {
  const c = profile.contact
  const [copied, setCopied] = useState(false)
  const timer = useRef<number | undefined>(undefined)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(c.email)
    } catch {
      // Fallback for browsers without the async clipboard
      const ta = document.createElement('textarea')
      ta.value = c.email
      ta.setAttribute('readonly', '')
      ta.style.position = 'fixed'
      ta.style.opacity = '0'
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      ta.remove()
    }
    setCopied(true)
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setCopied(false), 2000)
  }

  const details: { icon: IconName; label: string; value: string; href?: string }[] = [
    { icon: 'phone', label: 'Phone', value: c.phone, href: `tel:${c.phone.replace(/\s+/g, '')}` },
    { icon: 'linkedin', label: 'LinkedIn', value: c.linkedin.replace(/^https?:\/\/(www\.)?/, ''), href: c.linkedin },
    { icon: 'github', label: 'GitHub', value: c.github.replace(/^https?:\/\//, ''), href: c.github },
    { icon: 'stackoverflow', label: 'Stack Overflow', value: 'stackoverflow.com/users/12660050', href: c.stackoverflow },
    { icon: 'location', label: 'Location', value: c.location },
  ].filter((d) => d.value) as { icon: IconName; label: string; value: string; href?: string }[]

  return (
    <section id="contact" aria-labelledby="contact-title" tabIndex={-1} className="relative py-24 outline-none md:py-36">
      <div className="container-site">
        <p className="label mb-6 flex items-center gap-3" aria-hidden="true">
          <span className="text-accent">08</span>
          <span className="h-px w-10 bg-line" />
        </p>
        <RevealHeading
          id="contact-title"
          by="chars"
          text={c.heading}
          className="font-display text-[clamp(4rem,17vw,12rem)] font-extrabold leading-[0.88] tracking-[-0.04em]"
        />
        <p data-reveal className="mt-8 max-w-2xl text-lg md:text-xl">
          {c.text}
        </p>

        <div data-reveal className="mt-12 border-y border-line py-8 md:py-10">
          <p className="label mb-3">Email</p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
            <a
              href={`mailto:${c.email}`}
              className="min-w-0 break-all font-display text-[clamp(1.3rem,5.4vw,3.25rem)] font-extrabold leading-tight tracking-tight transition-colors hover:text-accent"
            >
              {c.email}
            </a>
            <button type="button" onClick={copy} className="btn min-w-[9.5rem] justify-center">
              <AnimatePresence mode="wait" initial={false}>
                <m.span
                  key={copied ? 'done' : 'copy'}
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -10, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                  className="inline-flex items-center gap-2"
                >
                  <Icon name={copied ? 'check' : 'copy'} />
                  {copied ? 'Copied' : 'Copy email'}
                </m.span>
              </AnimatePresence>
            </button>
            <span className="sr-only" aria-live="polite">
              {copied ? 'Email address copied to clipboard' : ''}
            </span>
          </div>
        </div>

        <div className="mt-10 grid gap-10 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] md:items-end">
          <dl className="grid gap-x-8 gap-y-5 sm:grid-cols-2">
            {details.map((d) => (
              <div key={d.label} data-reveal>
                <dt className="label mb-1 flex items-center gap-2">
                  <Icon name={d.icon} className="h-3.5 w-3.5 text-accent" />
                  {d.label}
                </dt>
                <dd className="break-words">
                  {d.href ? (
                    <a
                      href={d.href}
                      target={d.href.startsWith('http') ? '_blank' : undefined}
                      rel={d.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="link-underline"
                    >
                      {d.value}
                    </a>
                  ) : (
                    d.value
                  )}
                </dd>
              </div>
            ))}
          </dl>
          <div className="flex flex-wrap gap-3 md:justify-end">
            <Magnetic>
              <a href={`mailto:${c.email}`} className="btn btn-primary">
                <Icon name="mail" /> Email me
              </a>
            </Magnetic>
            <Magnetic>
              <a href={asset(profile.cv)} download className="btn">
                <Icon name="download" /> Download CV
              </a>
            </Magnetic>
          </div>
        </div>
      </div>
    </section>
  )
}
