import { useEffect, useRef, useState } from 'react'
import { about, asset } from '../data/content'
import { IconTile } from './Icon'
import { SectionTitle } from './SectionTitle'
import { Counter } from './ui/Counter'
import { Monogram } from './ui/Monogram'
import { Reveal, RevealItem, Stagger } from './ui/Reveal'

function Portrait() {
  const img = useRef<HTMLImageElement>(null)
  const [failed, setFailed] = useState(false)

  // The image can fail before React attaches onError (pre-rendered HTML), so check once on mount too
  useEffect(() => {
    const el = img.current
    if (el && el.complete && el.naturalWidth === 0) setFailed(true)
  }, [])

  const showPhoto = about.photo && !failed
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[18rem] sm:max-w-[22rem] lg:max-w-none">
      {/* Rotating gradient border: an oversized conic gradient turned with transform, clipped by the frame */}
      <div className="absolute inset-0 overflow-hidden rounded-[2rem]">
        <div className="spin-slow absolute -inset-1/2 bg-[conic-gradient(from_0deg,#7C5CFF,#22D3EE,#7C5CFF_45%,transparent_60%,#7C5CFF)]" />
      </div>
      <div className="absolute inset-[3px] overflow-hidden rounded-[calc(2rem-3px)] bg-surface">
        {showPhoto ? (
          <img
            ref={img}
            src={asset(about.photo)}
            srcSet={about.photoSizes.length ? about.photoSizes.map((s) => `${asset(s.src)} ${s.width}w`).join(', ') : undefined}
            sizes="(min-width: 1024px) 460px, (min-width: 640px) 352px, 288px"
            alt={about.photoAlt}
            width={676}
            height={676}
            decoding="async"
            {...{ fetchpriority: 'high' }}
            onError={() => setFailed(true)}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="relative grid h-full w-full place-items-center" role="img" aria-label={about.photoAlt}>
            <div aria-hidden="true" className="dot-grid absolute inset-0 opacity-70" />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(124,92,255,0.22),transparent_60%)]"
            />
            <Monogram className="relative h-28 w-28" />
          </div>
        )}
      </div>
    </div>
  )
}

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" tabIndex={-1} className="section-y relative outline-none">
      <div className="container-x">
        <SectionTitle index={1} title={about.title} id="about-title" />
        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:gap-16">
          <div className="min-w-0">
            <Reveal className="space-y-5">
              {about.paragraphs.map((p) => (
                <p key={p.slice(0, 32)} className="max-w-[65ch] text-[1.0625rem] leading-[1.8] text-body">
                  {p}
                </p>
              ))}
            </Reveal>
            <Stagger as="ul" className="mt-10 grid grid-cols-3 gap-3 sm:gap-4" stagger={0.08}>
              {about.stats.map((s) => (
                <RevealItem as="li" key={s.label} className="card min-w-0 px-3 py-5 text-center sm:px-5 sm:py-6 sm:text-left">
                  {s.value !== undefined ? (
                    <Counter
                      value={s.value}
                      suffix={s.suffix}
                      className="text-gradient block font-display text-[clamp(1.875rem,5vw,2.75rem)] leading-none font-bold"
                    />
                  ) : (
                    <span className="text-gradient block font-display text-[clamp(1.875rem,5vw,2.75rem)] leading-none font-bold">
                      {s.text}
                    </span>
                  )}
                  <span className="mt-2 block text-[0.8125rem] leading-snug text-muted sm:text-sm">{s.label}</span>
                </RevealItem>
              ))}
            </Stagger>
          </div>
          <Reveal delay={0.1}>
            <Portrait />
          </Reveal>
        </div>

        <div className="mt-20">
          <Reveal>
            <h3 className="text-2xl font-bold text-text md:text-[1.75rem]">{about.interestsTitle}</h3>
          </Reveal>
          <Stagger as="ul" className="mt-8 grid gap-4 md:grid-cols-3 lg:gap-5" stagger={0.08}>
            {about.interests.map((item) => (
              <RevealItem as="li" key={item.title} className="card min-w-0 flex flex-col p-6">
                <IconTile name={item.icon} />
                <h4 className="mt-5 font-display text-lg leading-snug font-semibold text-text">{item.title}</h4>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-body">{item.text}</p>
              </RevealItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  )
}
