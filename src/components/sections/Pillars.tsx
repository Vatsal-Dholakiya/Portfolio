import { pillars } from '../../data/content'
import { Icon } from '../Icon'
import { RevealItem, Stagger } from '../ui/Reveal'
import { SectionHead } from '../ui/SectionHead'
import { useSkillTips } from '../../hooks/useSkillTips'
import { SkillChips } from '../ui/SkillChips'
import { TiltCard } from '../ui/TiltCard'

/** Three tall cards: Software Development, Android Development, Learning AI (ember, in progress). */
export function Pillars() {
  const tips = useSkillTips()

  return (
    <section id="pillars" aria-labelledby="pillars-title" tabIndex={-1} className="section-y relative outline-none">
      <div className="container-x">
        <SectionHead index={2} label={pillars.label} title={pillars.title} accent={['properly.']} id="pillars-title">
          <p className="mt-6 text-sm text-ash">{pillars.hint}</p>
        </SectionHead>

        <Stagger as="ul" className="grid gap-4 lg:grid-cols-3 lg:gap-5" stagger={0.12} amount={0.1}>
          {pillars.items.map((p, i) => {
            const ember = p.id === 'ai'
            return (
              <RevealItem as="li" key={p.id} className="min-w-0">
                <TiltCard innerClassName="flex h-full flex-col p-6 sm:p-8">
                  {ember && (
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(255,138,61,0.14),transparent_70%)]"
                    />
                  )}
                  <div className="relative flex items-center justify-between gap-4">
                    <span
                      className={`grid h-14 w-14 place-items-center rounded-2xl border bg-graphite ${
                        ember ? 'border-ember/30 text-ember' : 'border-line text-emerald'
                      }`}
                    >
                      <Icon name={p.icon} className="h-7 w-7" />
                    </span>
                    <span className="font-mono text-sm text-ash">{String(i + 1).padStart(2, '0')}</span>
                  </div>
                  <h3 className="relative mt-10 text-[clamp(1.75rem,3vw,2.25rem)] leading-[1.05] font-extrabold">{p.title}</h3>
                  {p.tag && (
                    <span className="relative mt-3 inline-flex w-fit items-center gap-2 rounded-full border border-ember/30 bg-ember/10 px-3 py-1 font-mono text-[0.7rem] tracking-[0.1em] text-ember uppercase">
                      <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
                        <span className="pulse-dot absolute inset-0 rounded-full bg-ember" />
                        <span className="relative h-1.5 w-1.5 rounded-full bg-ember" />
                      </span>
                      {p.tag}
                    </span>
                  )}
                  <p className={`accent relative mt-5 text-[1.5rem] leading-tight ${ember ? 'text-ember' : 'text-emerald'}`}>{p.promise}</p>
                  <p className="relative mt-4 text-mist">{p.body}</p>
                  <SkillChips
                    group={p.id}
                    skills={p.skills}
                    label={`${p.title} skills`}
                    usedAtLabel={pillars.usedAtLabel}
                    tips={tips}
                    tone={ember ? 'ember' : 'emerald'}
                    className="relative mt-auto pt-8"
                  />
                </TiltCard>
              </RevealItem>
            )
          })}
        </Stagger>

        {pillars.also.length > 0 && (
          <div className="mt-12 grid gap-5 border-t border-line pt-10 md:grid-cols-[minmax(0,14rem)_minmax(0,1fr)]">
            <h3 className="label pt-2 text-mist">{pillars.alsoTitle}</h3>
            <SkillChips group="also" skills={pillars.also} label={pillars.alsoTitle} usedAtLabel={pillars.usedAtLabel} tips={tips} />
          </div>
        )}
      </div>
    </section>
  )
}
