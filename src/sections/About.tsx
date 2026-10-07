import { useEffect, useRef, useState } from 'react'
import { asset, content } from '../data/content'
import { Counter } from '../components/ui/Counter'
import { Monogram } from '../components/ui/Monogram'
import { Reveal, RevealItem, Stagger } from '../components/ui/Reveal'
import { SectionHeading } from '../components/ui/SectionHeading'

function Portrait() {
  const { photo } = content.about
  const img = useRef<HTMLImageElement>(null)
  const [failed, setFailed] = useState(false)

  // The image may fail before React attaches onError (pre-rendered HTML), so check once on mount too
  useEffect(() => {
    const el = img.current
    if (el && el.complete && el.naturalWidth === 0) setFailed(true)
  }, [])

  const showPhoto = photo && !failed
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
            src={asset(photo)}
            alt={`Portrait of ${content.name.first} ${content.name.last}`}
            width={640}
            height={640}
            {...{ fetchpriority: 'high' }}
            onError={() => setFailed(true)}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="relative grid h-full w-full place-items-center" role="img" aria-label={`${content.name.first} ${content.name.last} monogram`}>
            <div aria-hidden="true" className="dot-grid absolute inset-0 opacity-70" />
            <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(124,92,255,0.22),transparent_60%)]" />
            <Monogram className="relative h-28 w-28" />
          </div>
        )}
      </div>
    </div>
  )
}

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" tabIndex={-1} className="relative py-20 outline-none md:py-28">
      <div className="container-x">
        <SectionHeading index="01" title="About me" id="about-title" />
        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:gap-16">
          <div className="min-w-0">
            <Reveal>
              <p className="max-w-[65ch] text-[1.0625rem] leading-[1.8] text-body md:text-lg">{content.about.text}</p>
            </Reveal>
            <Stagger as="ul" className="mt-10 grid grid-cols-3 gap-3 sm:gap-4" stagger={0.08}>
              {content.about.stats.map((s) => (
                <RevealItem as="li" key={s.label} className="card px-3 py-5 text-center sm:px-5 sm:py-6 sm:text-left">
                  <Counter
                    value={s.value}
                    suffix={s.suffix}
                    className="text-gradient block font-display text-[clamp(2rem,5vw,2.75rem)] font-bold leading-none"
                  />
                  <span className="mt-2 block text-[0.8125rem] leading-snug text-muted sm:text-sm">{s.label}</span>
                </RevealItem>
              ))}
            </Stagger>
          </div>
          <Reveal delay={0.1}>
            <Portrait />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
