import { profile } from '../data/profile'
import { Marquee } from '../components/Marquee'
import { Section } from '../components/Section'

export function Skills() {
  return (
    <Section id="skills" index="05" title="Skills" before={<Marquee items={profile.marquee} />}>
      <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2">
        {profile.skills.map((g) => (
          <div key={g.name} data-reveal>
            <h3 className="label mb-3 border-b border-line pb-3 text-ink">{g.name}</h3>
            <ul className="space-y-1.5">
              {g.items.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  )
}
