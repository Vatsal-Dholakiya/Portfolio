import { profile } from '../data/profile'
import { Section } from '../components/Section'

export function About() {
  const [lead, ...rest] = profile.summary
  return (
    <Section id="about" index="01" title="About">
      <div className="space-y-6">
        <p data-reveal className="font-display text-[clamp(1.35rem,2.4vw,1.75rem)] font-semibold leading-snug tracking-tight">
          {lead}
        </p>
        {rest.map((p) => (
          <p data-reveal key={p.slice(0, 24)} className="text-lg text-muted">
            {p}
          </p>
        ))}
      </div>
    </Section>
  )
}
