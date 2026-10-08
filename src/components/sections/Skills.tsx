import { skills } from '../../data/content'
import { useSkillTips } from '../../hooks/useSkillTips'
import { Icon } from '../Icon'
import { RevealItem, Stagger } from '../ui/Reveal'
import { SectionHead } from '../ui/SectionHead'
import { SkillChips } from '../ui/SkillChips'

/** Skills grouped by area; each chip's tooltip says where the skill was used. */
export function Skills() {
  const tips = useSkillTips()

  return (
    <section id="skills" aria-labelledby="skills-title" tabIndex={-1} className="section-y relative outline-none">
      <div className="container-x">
        <SectionHead index={2} label={skills.label} title={skills.title} id="skills-title">
          <p className="mt-4 text-sm text-ash">{skills.hint}</p>
        </SectionHead>

        <Stagger as="ul" className="grid gap-4 md:grid-cols-2 xl:grid-cols-3" stagger={0.08} amount={0.05}>
          {skills.groups.map((g) => {
            const ember = g.tone === 'ember'
            return (
              <RevealItem as="li" key={g.title} className={`card min-w-0 p-6 ${ember ? 'border-ember/25' : ''}`}>
                <div className="flex items-center gap-3">
                  <span
                    className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl border bg-graphite ${
                      ember ? 'border-ember/30 text-ember' : 'border-line text-emerald'
                    }`}
                  >
                    <Icon name={g.icon} className="h-5 w-5" />
                  </span>
                  <h3 className="text-lg font-semibold">{g.title}</h3>
                  {g.tag && (
                    <span className="ml-auto rounded-full border border-ember/30 bg-ember/10 px-2.5 py-0.5 font-mono text-[0.68rem] tracking-[0.08em] text-ember uppercase">
                      {g.tag}
                    </span>
                  )}
                </div>
                <SkillChips
                  group={g.title}
                  skills={g.skills}
                  label={`${g.title} skills`}
                  usedAtLabel={skills.usedAtLabel}
                  tips={tips}
                  tone={ember ? 'ember' : 'emerald'}
                  className="mt-5"
                />
              </RevealItem>
            )
          })}
        </Stagger>
      </div>
    </section>
  )
}
