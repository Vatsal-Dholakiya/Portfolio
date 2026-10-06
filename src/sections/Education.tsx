import { profile } from '../data/profile'
import { Section } from '../components/Section'

export function Education() {
  return (
    <Section id="education" index="07" title="Education">
      <ul className="space-y-5">
        {profile.education.map((e) => (
          <li key={e.degree} data-reveal className="card p-6 md:p-8">
            <h3 className="font-display text-xl font-extrabold leading-snug tracking-tight md:text-2xl">{e.degree}</h3>
            <p className="mt-1 font-display font-semibold text-accent">{e.school}</p>
            <p className="mt-4 text-muted">
              <span className="font-display text-sm font-semibold text-ink">Modules: </span>
              {e.modules}
            </p>
          </li>
        ))}
      </ul>
    </Section>
  )
}
