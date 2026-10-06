import { useCallback, useState } from 'react'
import { asset, profile, type Certificate } from '../data/profile'
import { Lightbox } from '../components/Lightbox'
import { Section } from '../components/Section'
import { TiltCard } from '../components/TiltCard'

export function Certificates() {
  const [open, setOpen] = useState<Certificate | null>(null)
  const close = useCallback(() => setOpen(null), [])

  return (
    <Section id="certificates" index="06" title="Certificates">
      <ul className="grid gap-5 sm:grid-cols-2">
        {profile.certificates.map((c) => (
          <li key={c.url} data-reveal>
            <TiltCard>
              <button
                type="button"
                onClick={() => setOpen(c)}
                aria-haspopup="dialog"
                className="card group flex h-full w-full flex-col overflow-hidden text-left transition-colors hover:border-accent"
              >
                <span className="block aspect-[1.414] overflow-hidden border-b border-line bg-bg">
                  <img
                    src={asset(c.image)}
                    alt={`Certificate: ${c.title}`}
                    loading="lazy"
                    decoding="async"
                    width={640}
                    height={452}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                </span>
                <span className="flex flex-1 flex-col p-5">
                  <span className="font-display text-lg font-extrabold leading-snug">{c.title}</span>
                  <span className="mt-2 font-serif text-sm text-muted">
                    {c.issuer}, {c.date}
                  </span>
                  <span className="label mt-4 text-accent">View certificate</span>
                </span>
              </button>
            </TiltCard>
          </li>
        ))}
      </ul>
      <Lightbox cert={open} onClose={close} />
    </Section>
  )
}
